import React from "react";

const InputMessage = () => {
    return (
        <div className="inputMessage">
            <input type="text" placeholder="Type something..." className="" />

            <button type="submit" className="send" >
                Send
            </button>
        </div>
    );
};

export default InputMessage;
