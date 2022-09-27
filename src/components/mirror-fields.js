import React, { Component } from "react";

export class MirrorField extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="mirror-bundle">
        <div>
          {this.props.mirrorFieldLabel}: {this.props.toDisplay}
        </div>
      </div>
    );
  }
}
