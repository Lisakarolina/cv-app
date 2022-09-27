import React, { Component } from "react";

export class Field extends Component {
  constructor(props) {
    super(props);
    this.updateValue = this.updateValue.bind(this);
  }

  updateValue(e) {
    this.props.action(e.target.value, this.props.fieldID);
  }

  render() {
    return (
      <div className="bundle">
        <label htmlFor={this.props.fieldID}>{this.props.fieldLabel}</label>
        <input
          type="text"
          id={this.props.fieldID}
          onChange={this.updateValue}
        />
      </div>
    );
  }
}
