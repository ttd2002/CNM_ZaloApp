import React from "react";
import { Box, Stack, useTheme,Typography } from "@mui/material";
import Header from "./Header";
import Footer from "./Footer";
import Messages from "./Messages";
import useConversation from "../../zustand/useConversation";

const MessageContainer = () => {
  const theme = useTheme();
const {selectedConversation, setSelectedConversation}  = useConversation();
  return (
    <>  
   {!selectedConversation ? (<NoChatSelected/> ): (

<Stack height={"100%"} maxHeight={"100vh"} width={"auto"}>
      {/* Chat header */}
      <Header />

      {/* MSG */}
      <Box
        width={"100%"}
        sx={{
          flexGrow: 1,
          height: "100%",
          overflowY: "scroll",
          "&::-webkit-scrollbar": {
            width: "8px",
          },
          "&:-webkit-scrollbar-track": {
            background: "#f1f1f1",
          },
          "&:-webkit-scrollbar-thumb": {
            background: "#888",
          },
          "&:-webkit-scrollbar-thumb:hover": {
            background: "#555",
          },
          "&.is-scrolling": {
            "&::-webkit-scrollbar-thumb": {
              background: theme.palette.primary.main,
              borderRadius: 10,
            },
          },
        }}
      >
        {/* Hiển thị danh sách tin nhắn */}
        <Messages/>

        {/* <MessageList userId={selectedUser._id} /> */}


      </Box>
      {/* Chat footer */}
      <Footer/>

    </Stack>
)}
    </>
  );
};
const NoChatSelected = () => {
  return (
    <>
      <Stack direction={"Column"} sx={{ width: "100%" }}>
        <Typography fontSize={60} variant="subtitle1" align="center" mt={2}>Welcome to Zano</Typography>
        <Typography fontSize={30} variant="body1" align="center" mt={2}>Select a chat to start messaging!</Typography>
      </Stack>
    </>
  );
};

export default MessageContainer
;
