import React from "react";
import DayListItem from "./DayListItem";

const DayList = props => {
  const {days, value, onChange} = props;
  return (
    <ul>
      {days.map(dayItem => {
        return (
          <DayListItem
            key={dayItem.id}
            name={dayItem.name}
            spots={dayItem.spots}
            selected={dayItem.name === value}
            setDay={() => onChange(dayItem.name)}
          />
        );
      })}
    </ul>
  );
};

export default DayList;
