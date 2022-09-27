import React, { Component } from "react";

export class PeriodField extends Component {
  constructor(props) {
    super(props);
    this.uniqueID = Math.floor(Math.random() * 100);
    this.state = {};
    this.updateValue = this.updateValue.bind(this);
  }

  updateValue(e) {
    this.setState(
      (prev) => ({
        [`${e.target.id}`]: e.target.value,
      }),
      () => this.props.action({ [`${this.uniqueID}`]: this.state })
    );
  }

  render() {
    return (
      <div>
        <label htmlFor="from">from</label>
        <input type="text" id="from" onChange={this.updateValue} />
        <label htmlFor="to">until</label>
        <input type="text" id="to" onChange={this.updateValue} />
        <label htmlFor="content">:</label>
        <input type="text" id="what" onChange={this.updateValue} />
      </div>
    );
  }
}
