import React from "react";

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this._createRoomHandle = this._createRoomHandle.bind(this);
    this.state = {
    }
  }

  _createRoomHandle(e) {
    e.preventDefault();
    this.props.createRoom();
    console.log("clicked");
  }

  render() {
    return (
      <div>
        <UsernameForm />
        <CreateRoom click={this._createRoomHandle}/>
        <JoinRoom />
      </div>
    )
  }
}

//Username form
const UsernameForm = (props) => {
  return (
    <div>
      <h3>What's your name?</h3>
      <form>
        <input className="u-full-width" type="text" />
      </form>
    </div>
  )
}

//Component to create a room
const CreateRoom = (props) => {
  return (
    <div>
      <button className="createRoom" onClick={props.click}>Create Room</button>
    </div>
  )
}

//Component to join a room
const JoinRoom = (props) => {
  return (
    <div>
      <h3>Enter room key:</h3>
      <form>
        <input className="u-full-width" type="text" />
      </form>
      <button className="JoinRoom">Join Room</button>
    </div>
  )
}
