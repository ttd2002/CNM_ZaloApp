import React from 'react'
import SearchBar from './SearchBar'
import Chats from './Chats'

const ListChat = () => {
    return (
        <div className="listChatContainer">
            <SearchBar />
            <Chats />
        </div>
    )
}

export default ListChat