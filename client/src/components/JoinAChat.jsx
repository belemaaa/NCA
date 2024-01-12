import React, { useState } from 'react'
import { Socket } from 'socket.io-client'

const JoinAChat = () => {
    const [username, setUsername] = useState('')
    const [room, setRoom] = useState()

    const JoinRoom = () => {
        if (username !== "" && room !== "") {
            Socket.emit("join_room", room)
        }
    }

  return (
    <div>
        <h3>Join A Chat</h3>
        <form>
            <input 
                type='text' 
                placeholder='Username' 
                onChange={(e) => {setUsername(e.target.value)}}
            />

            <input 
                type='text' 
                placeholder='Room ID' 
                onChange={(e) => {setRoom(e.target.value)}}
            />

            <button>Join a rOOM</button>
        </form>
    </div>
  )
}

export default JoinAChat