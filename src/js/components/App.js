import React from "react";
import Header from "./Header";
import Board from "./Board";
import Login from "./Login";
import io from "socket.io-client";
let socket = io.connect();

export default class App extends React.Component {

  componentDidMount() {
    socket.on('authenticate', authenticated => {
      this.setState({
        roomName: authenticated.roomName,
        player1: authenticated.player1,
        gameboard: authenticated.gameBoard
      });
      console.log(this.state.player1);
    });
    socket.on('game start', gameStart => {
      this.setState({
        playerOneName: gameStart.playerOneName,
        playerTwoName: gameStart.playerTwoName,
        gameBegin: gameStart.gameBegin,
        turn: gameStart.playerTurn,
        isWaiting: false
      })
      console.log("game starts with " + this.state.playerOneName + " & " + this.state.playerTwoName);
    });
    //Error listener for when player fails to join the room
    socket.on('joinError', error => {
      console.log(error);
    });

    socket.on('get board updates', gameUpdate => {
      this.setState({
        gameboard: gameUpdate.game,
        message: gameUpdate.result.message,
        gameState: gameUpdate.result.gameState
      });
    });
  }

  constructor() {
    super();

    this._createRoom = this._createRoom.bind(this);
    this._joinRoom = this._joinRoom.bind(this);

    this.state = {
      gameboard: [],
      player1: false,
      playerOneName: "",
      playerTwoName: "",
      turn: 1,
      gameState: true,
      gameBegin: false,
      isWaiting: false,
      message: "",
      roomName: "",
      userName: ""
    }
  }

  _createRoom(userName) {
    socket.emit('create room', userName);
    this.setState({userName: userName, isWaiting: true});
  }

  _joinRoom(userName, joinKey) {
    console.log("joined!");
    socket.emit('join room', {joinKey: joinKey, userName: userName});
    this.setState({userName: userName});
  }

  updateEvent(coords) {
    let rowNum = coords[0];
    let colNum = coords[1];
    let board = this.state.gameboard;
    if(this.state.player1) {
      board[colNum][rowNum] = 1;
    } else {
      board[colNum][rowNum] = -1;
    }
    this.setState({gameboard: board, turn: this.state.turn +1});
    socket.emit('update board', {gameRoom: this.state.roomName, gameBoard: this.state.gameboard});
    this.checkWin();
    console.log(this.state.gameboard);
    console.log(this.state.turn);
  }

  resetBoard() {
    socket.emit('reset board', this.state.roomName);
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
    console.log(this.state.gameBegin);
    let gameRender
    if(!this.state.gameBegin && !this.state.isWaiting) {
        gameRender = <Login createRoom={this._createRoom} joinRoom={this._joinRoom}/>
    } else if(!this.state.gameBegin && this.state.isWaiting) {
        gameRender = <h1>{"Your room key is:" + this.state.roomName}</h1>
    } else if(this.state.gameBegin && !this.state.isWaiting) {
        gameRender = <Board grid={this.state.gameboard} updateEvent={this.updateEvent.bind(this)} resetBoard={this.resetBoard.bind(this)}/>
    }
    return(
      <div class="container row">
        <Header title="React Rac City Itch" subtitle="Simple game of tic tac toe on React" gameState={this.state.gameState} message={this.state.message}/>
        {gameRender}
      </div>
    )
  }
}
