import React from "react";
import { Box, Stack, useTheme,Typography } from "@mui/material";
import Message from "./Message";
import useGetMessages from "../../hooks/useGetMessages";
import MessageSkeleton from "../skeletons/MessageSkeleton";
const Messages = () => {
  const {messages, loading} = useGetMessages();
  console.log("Messages:",messages);
    const theme = useTheme();


  return (
    <Stack sx={{
        overflowY: "scroll", // Kích hoạt thanh trượt khi nội dung vượt quá chiều cao
        "&::-webkit-scrollbar": {
          width: "8px", // Chiều rộng của thanh trượt
        },
        "&::-webkit-scrollbar-track": {
          background: theme.palette.background.default, // Màu nền của thanh trượt
        },
        "&::-webkit-scrollbar-thumb": {
          background: theme.palette.primary.main, // Màu của nút trượt
          borderRadius: "4px", // Độ cong của nút trượt
        },
      }}
    >
      {!loading &&
    messages.length > 0 &&
    messages.map((conversation) =>
      conversation.messages.map((message) => (
        <Message key={message._id} message={message} />
      ))
    )}
     {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />  )}
     {!loading && messages.length === 0 && (
    <Typography align="center" fontSize={20}  variant="body1">Send a message to start the conversation!</Typography>
     )}
    
    
    
    </Stack>
  );
};

export default Messages;
