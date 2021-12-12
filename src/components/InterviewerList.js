import React from "react";
import "components/InterviewerList.scss";
import InterviewerListItem from "./InterviewerListItem";
import PropTypes from "prop-types";

const InterviewerList = props => {
  const {interviewers, value, onChange} = props;
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {interviewers.map(interviewerItem => (
          <InterviewerListItem
            key={interviewerItem.id}
            name={interviewerItem.name}
            avatar={interviewerItem.avatar}
            selected={interviewerItem.id === value}
            setInterviewer={() => onChange(interviewerItem.id)}
          />
        ))}
      </ul>
    </section>
  );
};

export default InterviewerList;

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired,
};
