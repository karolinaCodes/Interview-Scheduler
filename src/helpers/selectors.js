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

//fetch number of available spots to book an appointment- pass appointments as parameter to have the most current state of appointments after update with new interview
export function fetchFreeSpots(state, appointments) {
  // return appointment ids for current day
  const listOfAppointmentIds = state.days.find(
    day => day.name === state.day
  ).appointments;

  const listOfEmptyAppointments = listOfAppointmentIds.filter(
    appId => !appointments[appId].interview
  );

  //return number of spots
  return listOfEmptyAppointments.length;
}
