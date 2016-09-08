import React from "react";

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this._createRoomHandle = this._createRoomHandle.bind(this);
    this._joinRoomHandle = this._joinRoomHandle.bind(this);
    this.state = {
    }
  }

  _createRoomHandle(e) {
    e.preventDefault();
    this.props.createRoom(this.refs.usernameForm.refs.usernameInput.value);
    console.log(this.refs.usernameForm.refs.usernameInput.value);
  }

  _joinRoomHandle(e) {
    e.preventDefault();
    this.props.joinRoom(this.refs.usernameForm.refs.usernameInput.value, this.refs.joinRoom.refs.roomKeyInput.value);
  }

  render() {
    return (
      <div>
        <UsernameForm ref="usernameForm" />
        <CreateRoom click={this._createRoomHandle}/>
        <JoinRoom ref="joinRoom" click={this._joinRoomHandle}/>
      </div>
    )
  }
}

//Username form
class UsernameForm extends React.Component {
  render() {
    return (
      <div>
        <h3>Enter your name</h3>
        <input ref="usernameInput" className="u-full-width" type="text" />
      </div>
    )
  }
}

//Component to create a room
class CreateRoom extends React.Component {
  render() {
    return (
      <div>
        <button className="createRoom" onClick={this.props.click}>Create Room</button>
      </div>
    )
  }
}

//Component to join a room
class JoinRoom extends React.Component {
  render() {
    return (
      <div>
        <h3>Enter room key:</h3>
        <form>
          <input ref="roomKeyInput" className="u-full-width" type="text" />
          <button className="JoinRoom" onClick={this.props.click}>Join Room</button>
        </form>
      </div>
    )
  }
}
