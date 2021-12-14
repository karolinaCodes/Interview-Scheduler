import {useState, useEffect} from "react";
import axios from "axios";
import {getDayObj} from "../helpers/selectors";

// manages data of application
const useApplicationData = () => {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: [],
    interviewers: {},
  });

  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:8001/api/days"),
      axios.get("http://localhost:8001/api/appointments"),
      axios.get("http://localhost:8001/api/interviewers"),
    ])
      .then(all => {
        setState(prev => ({
          ...prev,
          days: all[0].data,
          appointments: all[1].data,
          interviewers: all[2].data,
        }));
      })
      .catch(err => console.error(err));
  }, []);

  //fetch number of available spots to book an appointment- pass appointments as parameter to have the most current state of appointments after update with new interview
  function fetchFreeSpots(appointments) {
    const listOfAppointmentIds = state.days.find(
      day => day.name === state.day
    ).appointments;

    const listOfEmptyAppointments = listOfAppointmentIds.filter(
      appId => !appointments[appId].interview
    );

    const spots = listOfEmptyAppointments.length;
    return spots;
  }

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: {...interview},
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    const dayIndex = state.days.findIndex(day => day.name === state.day);

    const updatedDays = {...state.days};
    const spots = fetchFreeSpots(appointments);
    updatedDays[dayIndex].spots = spots;

    // return promise to update transition to show in appointment
    return axios
      .put(`http://localhost:8001/api/appointments/${id}`, {
        interview,
      })
      .then(() => {
        setState(prev => ({
          ...prev,
          appointments,
          updatedDays,
        }));
      })
      .catch(err => console.error(err));
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    const dayIndex = state.days.findIndex(day => day.name === state.day);

    const updatedDays = {...state.days};
    const spots = fetchFreeSpots(appointments);
    updatedDays[dayIndex].spots = spots;

    return axios
      .delete(`http://localhost:8001/api/appointments/${id}`)
      .then(() => {
        setState(prev => ({
          ...prev,
          appointments,
          updatedDays,
        }));
      })
      .catch(err => console.error(err));
  }

  const setDay = day => setState(prev => ({...prev, day}));

  return {state, setDay, bookInterview, cancelInterview};
};

export default useApplicationData;
