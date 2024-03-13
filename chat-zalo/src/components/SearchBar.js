import React from 'react'

const SearchBar = () => {
    return (
        <div className="searchBar">
            <div className="searchContainer">
                <i className="iconSearch fa fa-search" aria-hidden="true"></i>
                <input type="text" placeholder="Search" />
            </div>
            <div className="addFriend creatGroupChat">
                <i className="iconAdd fa fa-user-plus" aria-hidden="true"></i>
                <i className="iconAdd fa fa-users" aria-hidden="true"></i>
            </div>
        </div>
    )
}

export default SearchBar