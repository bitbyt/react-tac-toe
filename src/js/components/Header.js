import React from "react";

export default class Header extends React.Component {
  gameStatus() {
    if(this.props.gameState) {
      return (
        <h4 className="info">{this.props.subtitle}</h4>
      )
    } else {
      return (
        <h4 className="info">{this.props.message}</h4>
      )
    }
  }
  render() {
    return(
      <div className="columns five">
        <h2 id="title">{this.props.title}</h2>
        {this.gameStatus()}
        <div className="scoreboard">
          <h5>Score</h5>
          <Scoreboard player="Player One" score="score"/>
          <Scoreboard player="Player Two" score="score"/>
        </div>
      </div>
    );
  }
}

const Scoreboard = (props) => {
  return (
    <div>
      <h6></h6>
      <h5></h5>
    </div>
  )
}
