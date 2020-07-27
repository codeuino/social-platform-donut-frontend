import React from "react";
import DatePicker from "react-datepicker";
import "./DatePicker.scss";

import "react-datepicker/dist/react-datepicker.css";

const CustomDatePicker = (props) => {
  return (
    <div className="datepicker-wrapper">
      <div className="datepicker-label">{props.placeholder}</div>
      <DatePicker
        selected={props.date}
        onChange={props.handleDateChange}
        maxDate={new Date()}
        dateFormat="MMM dd, yyyy"
        className="picker"
      />
    </div>
  );
};

export default CustomDatePicker;
