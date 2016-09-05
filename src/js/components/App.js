import React from "react";
import Header from "./Header";
import Board from "./Board";

export default class App extends React.Component {

  constructor() {
    super();

    this.state = {
      gameboard: [
        [0,0,0],
        [0,0,0],
        [0,0,0]
      ],
      player1: true,
      turn: 1,
      gameState: true,
      message: ""
    }
  }

  updateEvent(coords) {
    let rowNum = coords[0];
    let colNum = coords[1];
    if(this.state.player1) {
      this.state.gameboard[colNum][rowNum] = 1;
    } else {
      this.state.gameboard[colNum][rowNum] = -1;
    }
    this.setState({gameboard: this.state.gameboard, player1: !(this.state.player1), turn: this.state.turn +1});
    this.checkWin();
    console.log(this.state.gameboard);
    console.log(this.state.turn);
  }

  checkWin() {
    let board = this.state.gameboard
    if(board[0][0] + board[0][1] + board[0][2] === 3) {
      this.state.message = "Player One Wins!"
      this.state.gameState = false
    } else if (board[1][0] + board[1][1] + board[1][2] === 3) {
      this.state.message = "Player One Wins!"
      this.state.gameState = false
    } else if (board[2][0] + board[2][1] + board[2][2] === 3) {
      this.state.message = "Player One Wins!"
      this.state.gameState = false
    } else if (board[0][0] + board[0][1] + board[0][2] === -3) {
      this.state.message = "Player Two Wins!"
      this.state.gameState = false
    } else if (board[1][0] + board[1][1] + board[1][2] === -3) {
      this.state.message = "Player Two Wins!"
      this.state.gameState = false
    } else if (board[2][0] + board[2][1] + board[2][2] === -3) {
      this.state.message = "Player Two Wins!"
      this.state.gameState = false
    } else if(board[0][0] + board[1][0] + board[2][0] === 3) {
      this.state.message = "Player One Wins!"
      this.state.gameState = false
    } else if (board[0][1] + board[1][1] + board[2][1] === 3) {
      this.state.message = "Player One Wins!"
      this.state.gameState = false
    } else if (board[0][2] + board[1][2] + board[2][2] === 3) {
      this.state.message = "Player One Wins!"
      this.state.gameState = false
    } else if (board[0][0] + board[1][0] + board[2][0] === -3) {
      this.state.message = "Player Two Wins!"
      this.state.gameState = false
    } else if (board[0][1] + board[1][1] + board[2][1] === -3) {
      this.state.message = "Player Two Wins!"
      this.state.gameState = false
    } else if (board[0][2] + board[1][2] + board[2][2] === -3) {
      this.state.message = "Player Two Wins!"
      this.state.gameState = false
    } else if (board[0][0] + board[1][1] + board[2][2] === 3) {
      this.state.message = "Player One Wins!"
      this.state.gameState = false
    } else if (board[0][2] + board[1][1] + board[2][0] === 3) {
      this.state.message = "Player One Wins!"
      this.state.gameState = false
    } else if (board[0][0] + board[1][1] + board[2][2] === -3) {
      this.state.message = "Player Two Wins!"
      this.state.gameState = false
    } else if (board[0][2] + board[1][1] + board[2][0] === -3) {
      this.state.message = "Player Two Wins!"
      this.state.gameState = false
    } else if (this.state.turn === 9) {
      this.state.message = "It's a Draw!"
      this.state.gameState = false
    }
  }

  resetBoard() {
    this.state = {
      gameboard: [
        [0,0,0],
        [0,0,0],
        [0,0,0]
      ],
      player1: true,
      turn: 1,
      gameState: true,
      message: ""
    }
    console.log(this.state.gameboard);
    this.setState({gameboard: this.state.gameboard, player1: this.state.player1, turn: this.state.turn, gameState: this.state.gameState, message: this.state.message});
    console.log(this.state);
  }

  render() {
    return(
      <div class="container row">
        <Header title="React Rac City Itch" subtitle="Simple game of tic tac toe on React" gameState={this.state.gameState} message={this.state.message}/>
        <Board grid={this.state.gameboard} updateEvent={this.updateEvent.bind(this)} resetBoard={this.resetBoard.bind(this)}/>
      </div>
    )
  }
}
