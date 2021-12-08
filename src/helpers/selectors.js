export function getAppointmentsForDay(state, day) {
  const dayAppointmentArr = state.days.filter(dayItem => dayItem.name === day);

  if (!dayAppointmentArr.length) {
    return [];
  }

  const appointmentIds = dayAppointmentArr[0].appointments;

  const appointments = appointmentIds.map(
    appointmentId => state.appointments[`${appointmentId}`]
  );

  return appointments;
}
