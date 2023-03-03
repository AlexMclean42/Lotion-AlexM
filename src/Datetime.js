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

class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      datetime: new Date().toISOString().substr(0, 19),
      formattedDatetime: formatDate(new Date()),
    };
  }

  handleDatetimeChange = (event) => {
    const selectedDate = new Date(event.target.value);
    const formatted = formatDate(selectedDate);
    this.setState({ datetime: event.target.value, formattedDatetime: formatted });
  };

  render() {
    return (
      <div>
        <input
          type="datetime-local"
          value={this.state.datetime}
          onChange={this.handleDatetimeChange}
          className="calander"
        />
      </div>
    );
  }
}

export default MyComponent;
