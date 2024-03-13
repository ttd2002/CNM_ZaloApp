import React from "react";

const Media = () => {
    return (
        <div className="mediaContainer">
            <div>
                <div>
                    <i className="mediaIcons fa fa-smile-o" aria-hidden="true" />
                </div>
                <div>
                    <input type="image" style={{ display: "none" }} id="image" alt="image" />
                    <label htmlFor="image" className="">
                        <i className="mediaIcons fa fa-image " aria-hidden="true" />
                    </label>
                </div>
                <div>
                    <input type="file" style={{ display: "none" }} id="file" alt="file" />
                    <label htmlFor="file" className="">
                        <i className="mediaIcons fa fa-paperclip " aria-hidden="true" />
                    </label>
                </div>
                <div>
                    <i className="mediaIcons fa fa-ellipsis-h " aria-hidden="true" />
                </div>
            </div>
        </div>
    );
};

export default Media;
