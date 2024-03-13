import React from "react";

const ChatBoxHeader = () => {
    return (
        <div className="chatHeaderContainer">
            <div className="partnerInfo">
                <img
                    className="avatarUser"
                    src="https://images.pexels.com/photos/35537/child-children-girl-happy.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    alt="avatar"
                />
                <span>Dat</span>
            </div>
            <div className="chatOptions">
                <i className="optionIcons fa fa-phone" aria-hidden="true"></i>
                <i className="optionIcons fa fa-video-camera " aria-hidden="true" />
                <i className="optionIcons fa fa-ellipsis-h " aria-hidden="true"></i>
            </div>
        </div>
    );
};

export default ChatBoxHeader;
