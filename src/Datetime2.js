import React from "react";
import "./index.css";

const options = {
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
};

const formatDate = (when) => {
  const formatted = new Date(when).toLocaleString("en-US", options);
  if (formatted === "Invalid Date") {
    return "";
  }
  return formatted;
};

const Datetime = ({ date }) => {
  const formattedDate = formatDate(date);
  return <span>{formattedDate}</span>;
};

export default Datetime;
