import React from "react";
import "components/InterviewerListItem.scss";
import classNames from "classnames";

// const interviewer = {
//   id: 1,
//   name: "Sylvia Palmer",
//   avatar: "https://i.imgur.com/LpaY82x.png"
// };

const InterviewerListItem = props => {
  const {id, name, avatar, selected, setInterviewer} = props;

  const interviewerClass = classNames("interviewers__item", {
    "interviewers__item--selected": selected,
  });

  return (
    <li className={interviewerClass} onClick={setInterviewer}>
      <img className="interviewers__item-image" src={avatar} alt={name} />
      {selected && name}
    </li>
  );
};

export default InterviewerListItem;
