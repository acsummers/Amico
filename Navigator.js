import React, { Component } from 'react';
import {
  View
} from 'react-native';

import Messages from "./Messages.js";

import SocketIOClient from 'socket.io-client';

const host_url = 'http://localhost:5000';

_storeMessages = () => {

}


 export default class AppNavigator extends Component {
  state = {
    currentRoom: 'stuff',
    username: 'acb687',
    currentKey: 0,
    messages: []
  }
  socket = SocketIOClient(host_url);
    socket = this.socket.on('/', (receivedMessage) => {
      if (receivedMessage.username !== this.state.username) {
        this.setState(previousState => ({
         currentKey: previousState.currentKey+1,
         messages: [{key:previousState.currentKey, message:receivedMessage.message, author:receivedMessage.username}, ...previousState.messages]
      }), this._storeMessages);
        
    }
      });
    socket = this.socket.on('connect', () => {
      if (this.state.currentRoom != null)
        this.socket.emit('/join', {room: this.state.currentRoom});
    });


  _sendMessage = (inputValue) => {
      var emptyRegex = /^\s*$/;
      if (!emptyRegex.exec(inputValue)) {
            this.setState( (previousState) => {return {
              currentKey: previousState.currentKey+1,
              messages: [{key:previousState.currentKey, message:inputValue, author:this.state.username}, ...previousState.messages]
            }});
            //CB change the username here
            this.socket.emit('/', {message: inputValue, currentRoom: this.state.currentRoom, username: this.state.username});
          }
    };


  render() {
    return (
    <Messages sendMessage={this._sendMessage} currentRoom={this.state.currentRoom} messages={this.state.messages} username={this.state.username}/>
    );
  }
}  
