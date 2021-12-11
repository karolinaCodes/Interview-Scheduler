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

  console.log(state.days);

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

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: {...interview},
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    const dayIndex = state.days.findIndex(day => day.appointments.includes(id));

    // update to remove 1 spot after cancelling interview
    const day = {
      ...getDayObj(state, state.day),
      spots: state.days[dayIndex].spots - 1,
    };

    // change the day with updated spots value
    state.days[dayIndex] = day;
    const days = state.days;

    // return promise to update transition to show in appointment
    return axios
      .put(`http://localhost:8001/api/appointments/${id}`, {
        interview,
      })
      .then(() => {
        setState(prev => ({
          ...prev,
          appointments,
          days,
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

    const dayIndex = state.days.findIndex(day => day.appointments.includes(id));

    // update to add 1 spot after cancelling interview
    const day = {
      ...getDayObj(state, state.day),
      spots: state.days[dayIndex].spots + 1,
    };

    // change the day with updated spots value
    state.days[dayIndex] = day;
    const days = state.days;

    return axios
      .delete(`http://localhost:8001/api/appointments/${id}`)
      .then(() => {
        setState(prev => ({
          ...prev,
          appointments,
          days,
        }));
      })
      .catch(err => console.error(err));
  }

  const setDay = day => setState(prev => ({...prev, day}));

  return {state, setDay, bookInterview, cancelInterview};
};

export default useApplicationData;
