import React from "react";

const Message = () => {
    return (
        <div className="messageContainer owner">
            <span className="time">just now</span>
            <div className="message owner">
                <div className="messageInfo">
                    <img
                        className="avatarUser"
                        src="https://images.pexels.com/photos/35537/child-children-girl-happy.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                        alt="avatar"
                    />
                </div>
                <div
                    className="messageContent"
                    style={{
                        wordWrap: "break-word",
                        wordBreak: "break-word",
                        display: "flex",
                        flexDirection: "column-reverse",
                        alignItems: "flex-end",
                    }}
                >
                    <p className="messageText">dfdsddf</p>
                </div>
            </div>

            <span className="time">just now</span>
            <div className="message">
                <div className="messageInfo">
                    <img
                        className="avatarUser"
                        src="https://images.pexels.com/photos/35537/child-children-girl-happy.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                        alt="avatar"
                    />
                </div>
                <div
                    className="messageContent"
                    style={{
                        wordWrap: "break-word",
                        wordBreak: "break-word",
                        display: "flex",
                        flexDirection: "column-reverse",
                        alignItems: "flex-end",
                    }}
                >
                    <p className="messageText">dfdsddf</p>
                </div>
            </div>

            <span className="time">just now</span>
            <div className="message owner">
                <div className="messageInfo">
                    <img
                        className="avatarUser"
                        src="https://images.pexels.com/photos/35537/child-children-girl-happy.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                        alt="avatar"
                    />
                </div>
                <div
                    className="messageContent"
                    style={{
                        wordWrap: "break-word",
                        wordBreak: "break-word",
                        display: "flex",
                        flexDirection: "column-reverse",
                        alignItems: "flex-end",
                    }}
                >
                    <p className="messageText">dfdsddf</p>
                </div>
            </div>
        </div>
    );
};

export default Message;
