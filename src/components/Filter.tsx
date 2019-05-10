import React from "react";
import { DatePicker } from "antd";
import moment from "moment";

interface Props {
  changeDate: (date: any) => void;
  today: string;
  defaultValue: string;
}

const Filter: React.FC<Props> = ({ changeDate, today, defaultValue }) => {
  return (
    <DatePicker
      onChange={changeDate}
      defaultValue={moment(defaultValue, "YYYY-MM-DD")}
    />
  );
};

export default Filter;
