import React, { useState } from 'react'

const Chat = ({ socket, username, room }) => {
    const [currentMessage, setCurrentMessage] = useState("")

    const sendMessage = async () => {
        if (currentMessage !== "") {
            const messageData = {
                room: room,
                author: username,
                message: currentMessage,
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
            }
            await socket.emit("send_message", messageData)
        }
    }

    return (
        <div>
            <div>
                <p>Live Chat</p>
            </div>

            <div>
                
            </div>

            <div>
                <input
                    type='text'
                    placeholder='Type your message...'
                    onChange={(e) => {setCurrentMessage(e.target.value)}}
                />
                <button onClick={sendMessage}>&#9658;</button>
            </div>
        </div>
    )
}

export default Chat