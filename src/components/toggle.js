import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";

export default class toggle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle: false
    };
  }

  lowToHigh() {
    this.setState({ toggle: true });
    this.props.filter();
  }

  highToLow() {
    this.setState({ toggle: false });
    this.props.filter();
  }

  render() {
    return (
      <div style={{ display: "flex" }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <FontAwesomeIcon
            icon={faArrowUp}
            size="2x"
            style={{ color: "black", marginTop: "5px" }}
            onClick={this.lowToHigh.bind(this)}
            className="toggleButtons"
          />
        </div>
        <button className="queryButtonStyles" onClick={this.props.filter}>
          {this.props.name}
        </button>
        <FontAwesomeIcon
          icon={faArrowDown}
          size="2x"
          style={{ color: "black", marginTop: "5px" }}
          onClick={this.highToLow.bind(this)}
          className="toggleButtons"
        />
      </div>
    );
  }
}
