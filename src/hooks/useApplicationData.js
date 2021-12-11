import {useState, useEffect} from "react";
import axios from "axios";
import {getAppointmentsForDay} from "../helpers/selectors";

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

  const calcSpots = (state, day) => {
    const dailyAppointments = getAppointmentsForDay(state, state.day);
    const spots = dailyAppointments.reduce(
      (acc, curr) => (!curr.interview ? ++acc : acc),
      0
    );
    return spots;
  };

  const spots = calcSpots(state, state.day);
  console.log(spots);

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: {...interview},
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    // return promise to update transition to show in appointment
    return axios
      .put(`http://localhost:8001/api/appointments/${id}`, {
        interview,
      })
      .then(() => {
        setState(prev => ({
          ...prev,
          appointments,
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

    return axios
      .delete(`http://localhost:8001/api/appointments/${id}`)
      .then(() => {
        setState(prev => ({
          ...prev,
          appointments,
        }));
      })
      .catch(err => console.error(err));
  }

  const setDay = day => setState(prev => ({...prev, day}));

  return {state, setDay, bookInterview, cancelInterview};
};

export default useApplicationData;
