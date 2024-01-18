import './App.css';
import io from 'socket.io-client'
import React, { useState } from 'react'
import Chat from './Chat';

const socket = io.connect("http://localhost:3001")

function App() {
  const [username, setUsername] = useState('')
  const [room, setRoom] = useState('')
  const [showChat, setShowChat] = useState(false)

  const JoinRoom = (e) => {
    e.preventDefault()

      if (username !== "" && room !== "") {
        socket.emit("join_room", room)
        setShowChat(true)
      }
  }

    return (
    <div className='App'>
        {!showChat ? (
          <div className='joinChatContainer'>
            <h3>Join A Chat</h3> 
            <input 
              type='text' 
              placeholder='Username' 
              value={username}
              onChange={(e) => {
                setUsername(e.target.value)
              }}
            />
          
            <input 
              type='text' 
              placeholder='Room ID' 
              value={room}
              onChange={(e) => {
                setRoom(e.target.value)
              }}
            />
            <button onClick={JoinRoom}>Join a Room</button>
          </div>
        ) : (
            <Chat socket={socket} username={username} room={room} />
      )}
        
    </div>
  );
}


export default App;
