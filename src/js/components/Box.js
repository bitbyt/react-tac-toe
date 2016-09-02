import React from "react";

export default class Box extends React.Component {
  constructor(props) {
    super(props)
    this.state = { }
  }

  clickHandler(e) {
    // console.log(this.props.coord);
    this.props.updateEvent(this.props.coord);
  }

  playerRender() {
    if(this.props.value === 1) {
      return (
        <div id="playerOne" class="content"><i class="crossIcon"></i></div>
      )
    } else if(this.props.value === -1) {
      return (
        <div id="playerTwo" class="content"><i class="circleIcon"></i></div>
      )
    } else {
      return (
        <div class="content" onClick={this.clickHandler.bind(this)}></div>
      )
    }
  }

  render() {
    return (
      <div className="box" ref={this.props.ref}>
        {this.playerRender()}
      </div>
    )
  }
}
