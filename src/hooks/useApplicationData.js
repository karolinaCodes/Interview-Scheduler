import {useState, useEffect} from "react";
import axios from "axios";
import {fetchFreeSpots} from "../helpers/selectors";

// manages data of application
const useApplicationData = () => {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: [],
    interviewers: {},
  });

  // fetch days, appointments and interviewers and add to state
  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
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
    updatedDays[dayIndex].spots = fetchFreeSpots(state, appointments);

    // return promise to update transition to show in appointment component
    return axios
      .put(`/api/appointments/${id}`, {
        interview,
      })
      .then(() => {
        setState(prev => ({
          ...prev,
          appointments,
          updatedDays,
        }));
      });
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
    updatedDays[dayIndex].spots = fetchFreeSpots(state, appointments);

    // return promise to update transition to show in appointment component
    return axios.delete(`/api/appointments/${id}`).then(() => {
      setState(prev => ({
        ...prev,
        appointments,
        updatedDays,
      }));
    });
  }

  const setDay = day => setState(prev => ({...prev, day}));

  return {state, setDay, bookInterview, cancelInterview};
};

export default useApplicationData;
