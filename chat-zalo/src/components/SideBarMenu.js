import React from "react";

const SideBarMenu = () => {
    return (
        <div className="sidebarContainer">
            <div className="sidebarTop">
                <img
                    className="avatarUser"
                    src="https://images.pexels.com/photos/35537/child-children-girl-happy.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    alt="avatar"
                />
                <div>
                    <i className="iconSidebar fa fa-comments" aria-hidden="true" />
                </div>
                <div>
                    <i className="iconSidebar fa fa-address-book" aria-hidden="true" />
                </div>
                <div>
                    <i className="iconSidebar fa fa-check-square" aria-hidden="true" />
                </div>
                <div>
                    <i className="iconSidebar fa fa-video-camera" aria-hidden="true" />
                </div>
            </div>
            <div className="sidebarBottom">
                <div>
                    <i className="iconSidebar fa fa-cog" aria-hidden="true" />
                </div>
            </div>
        </div>
    );
};

export default SideBarMenu;
