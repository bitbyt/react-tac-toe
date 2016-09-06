import React from "react";
import Header from "./Header";
import Board from "./Board";
import Login from "./Login";
var socket = io.connect('localhost:5000');

export default class App extends React.Component {
  componentWillMount() {
    socket.on('gameOn', gameon => {
      this.setState({
        gameboard: gameon.game
      });
    });
  }

  componentDidMount() {
    socket.on('get board updates', gameon => {
      this.setState({
        gameboard: gameon.game,

      });
      console.log(gameon);
    });
  }

  constructor() {
    super();

    this._createRoom = this._createRoom.bind(this);
    this._generateRoomKey = this._generateRoomKey.bind(this);

    this.state = {
      gameboard: [
        [0,0,0],
        [0,0,0],
        [0,0,0]
      ],
      player1: false,
      turn: 1,
      gameState: true,
      message: ""
    }
  }

  _generateRoomKey() {
    var roomKey = "";
    var roomKeyLength = 6;
    var possible = "abcdefghijklmnopqrstuvwxyz";

    for( var i=0; i < roomKeyLength; i++ ) {
      roomKey += possible.charAt(Math.floor(Math.random() * possible.length));
    };
    return roomKey;
  }

  _createRoom(userName) {
    console.log("created!");
    let room = this._generateRoomKey();
    console.log("room key is " + room);

    socket.emit('create room', room);
    socket.emit('player one joins', "userName");
  }

  joinRoom(userName,roomKey) {
    socket.emit('join room', roomKey);
    socket.emit('player two joins', userName);
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
    socket.emit('update board', this.state.gameboard);
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

  sendSocket() {
    socket.emit('my other event', "Hello World");
  }

  render() {
    return(
      <div class="container row">
        <Header title="React Rac City Itch" subtitle="Simple game of tic tac toe on React" gameState={this.state.gameState} message={this.state.message}/>
        <Login createRoom={this._createRoom}/>
        <Board grid={this.state.gameboard} updateEvent={this.updateEvent.bind(this)} resetBoard={this.resetBoard.bind(this)}/>
      </div>
    )
  }
}
