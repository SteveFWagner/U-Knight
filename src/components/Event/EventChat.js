import React, { Component } from 'react'
import io from "socket.io-client";


export default class EventChat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      message: '',
      messages: [],
      user_id: 0,
      eventRoomId: 0,
    }
  }
  
  componentDidMount() {
    this.getEventMessages()
  }

  getEventMessages = () => {

  }

  joinRoom = () => {

  }


  render() {
    return (
      <div>

      </div>
    )
  }
}
