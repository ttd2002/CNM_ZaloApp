import React from 'react'
import ChatBoxHeader from './ChatBoxHeader'
import Messages from './Messages'
import Media from './Media'
import InputMessage from './InputMessage'

const ChatBox = () => {
    return (
        <div className="chatBox">
            <ChatBoxHeader />
            <Messages />
            <Media />
            <InputMessage />
        </div>
    )
}

export default ChatBox