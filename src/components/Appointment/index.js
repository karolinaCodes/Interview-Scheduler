import React from "react";
import "./styles.scss";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import useVisualMode from "../../hooks/useVisualMode";
import Form from "./Form";
import Status from "./Status";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";

const Appointment = props => {
  const {id, time, interview, interviewers, bookInterview, cancelInterview} =
    props;
  const {mode, transition, back} = useVisualMode(interview ? SHOW : EMPTY);

  function save(student, interviewer) {
    transition(SAVING);
    const interview = {
      student,
      interviewer,
    };
    bookInterview(id, interview)
      .then(() => transition(SHOW))
      .catch(err => console.error(err));
  }

  function deleteInterview(id) {
    transition(DELETING);
    cancelInterview(id)
      .then(() => transition(EMPTY))
      .catch(err => console.error(err));
  }

  return (
    <article className="appointment">
      <Header time={time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={interview.student}
          interviewer={interview.interviewer}
          onDelete={() => deleteInterview(id)}
        />
      )}
      {mode === CREATE && (
        <Form interviewers={interviewers} onCancel={back} onSave={save} />
      )}
      {mode === SAVING && <Status message={"Saving..."} />}
      {mode === DELETING && <Status message={"Deleting..."} />}
    </article>
  );
};

export default Appointment;
