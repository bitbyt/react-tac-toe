import React from "react";
import Box from "./Box";

export default class Board extends React.Component {
  constructor(props) {
    super(props)
    this.state = { }
  }

  clickEvent(e) {
    this.props.resetBoard();
  }

  boardRender() {
    return this.props.grid.map((rows, rowIndex) => {
      let row = rows.map((value, colIndex) => {
        let coord = colIndex.toString() + rowIndex.toString();
        return (
          <Box key={coord} value={value} ref={coord} coord={coord} updateEvent={this.props.updateEvent}/>
        );
      });
      return row
    });
  }

  render() {
    // console.log(this.props.grid);
    return (
      <div class="columns seven">
        <div class="grid">
          {this.boardRender()}
        </div>
        <button type="button" id="ctrl-btn" class="btn btn-primary" onClick={this.clickEvent.bind(this)}>Restart</button>
      </div>
    )
  }
}
