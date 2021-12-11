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

const Appointment = props => {
  // console.log(props);
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

  // function delete (id){

  // }

  return (
    <article className="appointment">
      <Header time={time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={interview.student}
          interviewer={interview.interviewer}
          // onDelete={}
        />
      )}
      {mode === CREATE && (
        <Form interviewers={interviewers} onCancel={back} onSave={save} />
      )}
      {mode === SAVING && <Status message={"Saving..."} />}
    </article>
  );
};

export default Appointment;
