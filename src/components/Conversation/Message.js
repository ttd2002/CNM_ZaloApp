import React from "react";
import { Avatar, Stack, Typography } from "@mui/material";
import { useAuthContext } from "../../contexts/authContext";
import useConversation from "../../zustand/useConversation";
import { extractTime } from "../../utils/extractTime";

const Message = ({ message }) => {
  const authUser = JSON.parse(localStorage.getItem("user"));
  const { selectedConversation } = useConversation();
  const fromMe = message.senderId === authUser._id;
  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const profilePic = fromMe ? authUser.profilePic : selectedConversation.profilePic;
  const bubbleBgcolor = fromMe ? "blue" : "";
  const formmattedTime = extractTime(message.createdAt)
  const messageID = message._id;
  // console.log(messageID);
  return (
    <Stack
      className={`chat ${chatClassName}`}
      direction={fromMe ? "row-reverse" : "row"}
      alignItems="center"
      spacing={1}
      mt={1}
    >
      <Avatar alt="" src={profilePic} />
      <Typography
        variant="body1"
        sx={{
          backgroundColor: fromMe ? "#1976D2" : "",
          color: fromMe ? "blue" : "",
          borderRadius: "8px",
          py: 1,
          px: 2,
        }}
      >
        {message["content"]}
      </Typography>
      {/* <Typography>{formmattedTime}</Typography> */}
    </Stack>
  );
};

export default Message;
