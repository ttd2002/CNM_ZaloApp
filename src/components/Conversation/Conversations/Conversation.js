import React from "react";
import {
  Avatar,
  Divider,
  Badge,
  Box,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import StyledBadge from "../../StyledBadge";
import useConversation from "../../../zustand/useConversation";
import { useSocketContext } from "../../../contexts/SocketContext";


const handleClick = () => {
};
const Conversation = ({conversation, lastIdx}) => {
  
    const {selectedConversation, setSelectedConversation} = useConversation();
    // const {onlineUsers} = useSocketContext();
    // const isOnline = onlineUsers.includes(conversation._id)
    const isSelected = selectedConversation?._id === conversation._id;
    const theme = useTheme();
  return (
    <>
      <Box
        onClick={()=>setSelectedConversation(conversation)}
        sx={{
          cursor: "pointer",
          width: "100%",
          borderRadius: 1,

          backgroundColor: isSelected ? theme.palette.primary.main : 
            theme.palette.mode === "light"
        }}
        p={2}
      >
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Stack direction={"row"} spacing={2}>
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              variant="dot"
            >
              {/* user.avatar */}
              <Avatar src={conversation.avatar} alt="" />
            </StyledBadge>
            {/*User Name - msgs*/}
            <Stack spacing={0.3}>
              <Typography variant="subtitle2">{conversation.name}</Typography>
              {/* <Typography variant="caption">user.messages </Typography> */}
            </Stack>
          </Stack>
        </Stack>
      </Box>
      {!lastIdx && <Divider/>}
    </>
  );
};

export default Conversation;
