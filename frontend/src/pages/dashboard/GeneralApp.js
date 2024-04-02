import React from "react";
import Chats from "./Chats";
import { Box, Stack, useTheme } from "@mui/material";
import Conversation from "../../components/Conversation";
import Contact from "../../components/Contact";
import { useSelector } from "react-redux";
import SharedMessages from "../../components/SharedMessages";
import StarredMessages from "../../components/StarredMessages";

const GeneralApp = () => {
  const theme = useTheme();
  const { sidebar } = useSelector((store) => store.app);
  return (
    <>
      <Stack direction={"row"} sx={{ width: "100%" }}>
        {/* Chats */}
        <Chats />
        {/* Box conversation */}
        <Box
          sx={{
            height: "100%",
            width: sidebar.open ? "calc(100vw - 720px)" : "calc(100vw - 400px)",
            backgroundColor:
              theme.palette.mode === "light"
                ? "#F0F4FA"
                : theme.palette.background.default,
          }}
        >
          {/* conversation */}
          <Conversation />
        </Box>
        {/* Contact */}
        {sidebar.open &&
          (() => {
            switch (sidebar.type) {
              case "CONTACT":
               return <Contact />;

              case "STARRED":
                return <StarredMessages/>

              case "SHARED":
                return <SharedMessages/>

              default:
                break;
            }
          })()}
      </Stack>
    </>
  );
};

export default GeneralApp;
