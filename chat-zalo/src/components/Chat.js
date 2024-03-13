import React from 'react'
import ListChat from './ListChat'
import ChatInfo from './ChatInfo'
import ChatBox from './ChatBox'

const Chat = () => {
    return (
        <div className="chatContainer">
            <ListChat />
            <ChatBox />
            <ChatInfo />
        </div>
    )
}

export default Chat