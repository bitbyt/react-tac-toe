import express from 'express';
const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const async = require('async');

let gameBoard = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
];
let gameBoardStore = {};
let host = {};

io.on('connection', function(socket) {

    //generates a random string as key to create rooms in socket
    function generateRoomKey() {
      let roomKey = "";
      let roomKeyLength = 6;
      let possible = "abcdefghijklmnopqrstuvwxyz";

      for( let i=0; i < roomKeyLength; i++ ) {
        roomKey += possible.charAt(Math.floor(Math.random() * possible.length));
      };
      return roomKey;
    }


    function authenticate(playerID, roomName, firstPlayer, gameBoard) {
      io.to(playerID).emit('authenticate', {
        roomName: roomName,
        player1: firstPlayer,
        gameBoard: gameBoard
      });
    }

    function checkWin(gameboard) {
      let board = gameboard;
      let message = "";
      let gameState = true;
      if(board[0][0] + board[0][1] + board[0][2] === 3) {
        message = "Player One Wins!"
        gameState = false
      } else if (board[1][0] + board[1][1] + board[1][2] === 3) {
        message = "Player One Wins!"
        gameState = false
      } else if (board[2][0] + board[2][1] + board[2][2] === 3) {
        message = "Player One Wins!"
        gameState = false
      } else if (board[0][0] + board[0][1] + board[0][2] === -3) {
        message = "Player Two Wins!"
        gameState = false
      } else if (board[1][0] + board[1][1] + board[1][2] === -3) {
        message = "Player Two Wins!"
        gameState = false
      } else if (board[2][0] + board[2][1] + board[2][2] === -3) {
        message = "Player Two Wins!"
        gameState = false
      } else if(board[0][0] + board[1][0] + board[2][0] === 3) {
        message = "Player One Wins!"
        gameState = false
      } else if (board[0][1] + board[1][1] + board[2][1] === 3) {
        message = "Player One Wins!"
        gameState = false
      } else if (board[0][2] + board[1][2] + board[2][2] === 3) {
        message = "Player One Wins!"
        gameState = false
      } else if (board[0][0] + board[1][0] + board[2][0] === -3) {
        message = "Player Two Wins!"
        gameState = false
      } else if (board[0][1] + board[1][1] + board[2][1] === -3) {
        message = "Player Two Wins!"
        gameState = false
      } else if (board[0][2] + board[1][2] + board[2][2] === -3) {
        message = "Player Two Wins!"
        gameState = false
      } else if (board[0][0] + board[1][1] + board[2][2] === 3) {
        message = "Player One Wins!"
        gameState = false
      } else if (board[0][2] + board[1][1] + board[2][0] === 3) {
        message = "Player One Wins!"
        gameState = false
      } else if (board[0][0] + board[1][1] + board[2][2] === -3) {
        message = "Player Two Wins!"
        gameState = false
      } else if (board[0][2] + board[1][1] + board[2][0] === -3) {
        message = "Player Two Wins!"
        gameState = false
      }
      return {message: message, gameState: gameState} ;

      // else if (turn === 9) {
      //   message = "It's a Draw!"
      //   gameState = false
      // }
    }

    function resetBoard(gameRoom) {
      gameBoardStore[gameRoom].board = gameBoard;
    }

    socket.on('create room', function(userName) {
      //geerate room key everytime room is created
      let gameRoom = generateRoomKey();
      console.log("room created " + gameRoom);

      let player1ID = socket.id;
      let playerOneName = userName;
      socket.join(gameRoom);
      gameBoardStore[gameRoom] = {board: gameBoard, playerOne: playerOneName};
      host[player1ID] = gameRoom;
      console.log(gameBoardStore[gameRoom]);

      authenticate(player1ID, gameRoom, true, gameBoardStore[gameRoom].board);
    });

    socket.on('join room', function(joinObjects) {
      console.log(joinObjects.userName + " " + "joined the game");

      if(joinObjects.joinKey in gameBoardStore) {
        let gameRoom = joinObjects.joinKey;
        let player2ID = socket.id;
        let playerTwoName = joinObjects.userName;
        gameBoardStore[gameRoom]['playerTwo'] = playerTwoName;
        socket.join(gameRoom);

        authenticate(player2ID, gameRoom, false, gameBoardStore[gameRoom].board);
        gameBoardStore[gameRoom]['playerTurn'] = 1;
        console.log(gameBoardStore[gameRoom]);
        io.in(gameRoom).emit('game start', {
          playerOneName: gameBoardStore[gameRoom].playerOne,
          playerTwoName: playerTwoName,
          gameBegin: true,
          playerTurn: gameBoardStore[gameRoom].playerTurn
        });
      } else {
        io.to(socket.id).emit('joinError', "Oops, can't join that room");
      }
    });

    socket.on('update board', function(data) {
        gameBoardStore[data.gameRoom].board = data.gameBoard;
        //emit the gameboard back
        checkWin(gameBoardStore[data.gameRoom].board);
        io.in(data.gameRoom).emit('get board updates', {
            game: gameBoardStore[data.gameRoom].board,
            result: checkWin(gameBoardStore[data.gameRoom].board)
        });
    });

    socket.on('reset board', function(data) {
      resetBoard(data);
      io.in(data).emit('reset update', )
    });

    //socket when a user logs out
    socket.on('disconnect', function() {
      console.log(socket.id);
      if(socket.id in host) {
        delete gameBoardStore[host[socket.id]];
        console.log(gameBoardStore);
      }
    });
});

app.use(express.static(__dirname + '/src'));

app.use('/haha', express.static('public'));

// app.listen(process.env.PORT || 1337);

// server.listen(app.get('port'), function() {
//   console.log('Server running at localhost', app.get('port'))
// });
server.listen(1337);
