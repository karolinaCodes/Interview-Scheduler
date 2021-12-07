import React from "react";
import classNames from "classnames";
import "components/DayListItem.scss";

const formatSpots = spots => {
  if (!spots) {
    return "no spots remaining";
  }
  if (spots === 1) {
    return "1 spot remaining";
  }
  return `${spots} spots remaining`;
};

export default function DayListItem(props) {
  const {name, spots, selected, setDay} = props;
  const spotsString = formatSpots(spots);

  const dayClass = classNames(
    "day-list__item",
    {"day-list__item--selected": selected},
    {"day-list__item--full": spots === 0}
  );

  return (
    <li onClick={setDay} className={dayClass}>
      <h2 className="text--regular">{name}</h2>
      <h3 className="text--light">{spotsString}</h3>
    </li>
  );
}
