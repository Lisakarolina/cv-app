import React, { Component } from "react";
import "./App.css";
import { Field } from "./components/fields.js";
import { MirrorField } from "./components/mirror-fields.js";
import { PeriodField } from "./components/period-field.js";

class App extends Component {
  constructor() {
    super();
    this.state = {
      info: {},
      work: [],
      skills: [],
      additionalPeriodFields: [],
      submitIndicator: 0,
    };
    this.submitValues = this.submitValues.bind(this);
    this.updateInfo = this.updateInfo.bind(this);
    this.updateWork = this.updateWork.bind(this);
    this.updateSkills = this.updateSkills.bind(this);
    this.addNewPeriod = this.addNewPeriod.bind(this);
  }

  updateInfo(newData, id) {
    this.updateState("info", newData, id);
  }

  updateWork(newData) {
    this.setState((prevState) => {
      let newOne = Object.assign({}, prevState);
      this.updateArray(newOne.work, newData);
      return newOne;
    });
    console.log(this.state.work);
  }

  updateSkills(newData, id) {
    this.updateState("skills", newData, id);
  }

  addNewPeriod() {
    this.setState((prev) => ({
      additionalPeriodFields: [
        ...prev.additionalPeriodFields,
        <PeriodField action={this.updateWork} />,
      ],
    }));
  }

  updateArray(arr, newItem) {
    for (let item of arr) {
      if (Object.keys(item)[0] === Object.keys(newItem)[0]) {
        item = Object.assign(item, newItem);
        return;
      }
    }
    arr.push(newItem);
  }

  submitValues() {
    this.setState((prev) => {
      return { submitIndicator: prev.submitIndicator + 1 };
    });
  }

  updateState(area, newdata, id) {
    this.setState((prevState, currentProps) => ({
      [`${area}`]: { ...prevState[`${area}`], [`${id}`]: newdata },
    }));
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (
      this.state.submitIndicator !== nextState.submitIndicator ||
      this.state.additionalPeriodFields !== nextState.additionalPeriodFields
    ) {
      return true;
    }
    return false;
  }

  render() {
    return (
      <div id="container">
        <div id="leftSide">
          <h3>Personal Data</h3>
          <Field fieldLabel="name" fieldID="name" action={this.updateInfo} />
          <Field
            fieldLabel="street"
            fieldID="street"
            action={this.updateInfo}
          />
          <Field fieldLabel="city" fieldID="city" action={this.updateInfo} />
          <Field fieldLabel="phone" fieldID="phone" action={this.updateInfo} />
          <h3 id="work-section">Work Experience</h3>
          <PeriodField action={this.updateWork} />
          <PeriodField action={this.updateWork} />
          <div>{this.state.additionalPeriodFields}</div>
          <button
            type="button"
            name="addWork"
            className="addPeriod"
            onClick={this.addNewPeriod}
          >
            &#10133;
          </button>
          <h3>Skills</h3>
          <Field
            fieldLabel="tools"
            fieldID="tools"
            action={this.updateSkills}
          />
          <Field
            fieldLabel="languages"
            fieldID="languages"
            action={this.updateSkills}
          />
          <button
            id="submit-button"
            type="button"
            name="submit"
            onClick={this.submitValues}
          >
            Submit
          </button>
        </div>
        <div id="rightSide">
          <div id="cv-header">
            <h1>CV</h1>
            <h2 id="lesser-title">{this.state.info.name}</h2>
          </div>
          <div className="mirror-group" id="mirror-personal">
            <h3>Personal Data</h3>
            {Object.keys(this.state.info).map((infoLabel) => (
              <div>{this.state.info[infoLabel]}</div>
            ))}
          </div>
          <div className="mirror-group" id="mirror-work">
            <h3>Work Experience</h3>
            <ul>
              {this.state.work.map((workObj, ind) => (
                <li key={ind.toString()}>
                  from {workObj[Object.keys(workObj)[0]].from} to{" "}
                  {workObj[Object.keys(workObj)[0]].to} :{" "}
                  {workObj[Object.keys(workObj)[0]].what}
                </li>
              ))}
            </ul>
          </div>
          <div className="mirror-group" id="mirror-skills">
            <h3>Skills</h3>
          </div>
          <MirrorField
            mirrorFieldLabel="tools"
            mirrorFieldID="tools"
            toDisplay={this.state.skills.tools}
          />
          <MirrorField
            mirrorFieldLabel="languages"
            mirrorFieldID="languages"
            toDisplay={this.state.skills.languages}
          />
        </div>
      </div>
    );
  }
}

export default App;
