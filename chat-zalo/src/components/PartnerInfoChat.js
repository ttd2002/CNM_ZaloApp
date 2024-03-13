import React from "react";

const PartnerInfoChat = () => {
    return (
        <div className="partnerInfoChat">
            <div className="infoPartner">
                <div className="infoPartnerTitle">
                    <img
                        className="avatarUser"
                        src="https://images.pexels.com/photos/35537/child-children-girl-happy.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                        alt="avatar"
                    />
                    <div className="partnerNameWrapper">
                        <span className="partnerName">Dat</span>
                        <div className="editIcon">
                            <i className="fa fa-edit" />
                        </div>
                    </div>
                </div>
                <div className="button">
                    <span>0123456789</span>
                </div>
            </div>
        </div>

    );
};

export default PartnerInfoChat;
