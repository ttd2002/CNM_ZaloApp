import React from "react";
import SideBarMenu from "../components/SideBarMenu";
import Chat from "../components/Chat";

const Home = () => {
  return (
    <div className="home">
      <SideBarMenu />
      <Chat />
    </div>

  );
};

export default Home;
