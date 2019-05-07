import React from "react";

interface Props {
  changeDate: (date: any) => void;
  today: string;
  defaultValue: string;
}

const Filter: React.FC<Props> = ({ changeDate, today, defaultValue }) => {
  return (
    <input type="date" onChange={changeDate} max={today} value={defaultValue} />
  );
};

export default Filter;
