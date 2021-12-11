export function getAppointmentsForDay(state, day) {
  const found = state.days.filter(dayItem => dayItem.name === day);

  if (!found.length) {
    return [];
  }

  const appointmentIds = found[0].appointments;

  const appointments = appointmentIds.map(id => state.appointments[`${id}`]);

  return appointments;
}

export function getInterviewersForDay(state, day) {
  const found = state.days.filter(dayItem => dayItem.name === day)[0];

  if (!state.days.length || !found) {
    return [];
  }

  return found.interviewers.map(id => state.interviewers[id]);
}

//return a new object containing the interview data
export function getInterview(state, interview) {
  const outputInterview = {};
  if (!interview) {
    return null;
  }
  outputInterview.student = interview.student;
  outputInterview.interviewer = state.interviewers[interview.interviewer];
  return outputInterview;
}

// retrieves day object for specific state day from days array
export function getDayObj(state, day) {
  return state.days.find(dayObj => dayObj.name === day);
}
