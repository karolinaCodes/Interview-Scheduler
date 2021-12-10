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
// export function getInterviewersForDay(state, day) {
//   const filterDay = state.days.filter(match => match.name === day)[0];

//   if (!state.days.length || !filterDay) {
//     return [];
//   } else {
//     return filterDay.interviewers.map(id => state.interviewers[id]);
//   }
// }

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

// {
//   "student": "Lydia Miller-Jones",
//   "interviewer": {
//     "id": 1,
//     "name": "Sylvia Palmer",
//     "avatar": "https://i.imgur.com/LpaY82x.png"
//   }
// }
