import { Box, Stack } from "@mui/material";
import React from "react";
import { Chat_History } from "../../data";
import {
  Timeline,
  TextMsg,
  MediaMSG,
  ReplyMSG,
  LinkMsg,
  DocMsg,
} from "./MsgTypes";

const Message = ({ menu }) => {
  return (
    <Box p={3}>
      <Stack spacing={3}>
        {Chat_History.map((el) => {
          switch (el.type) {
            case "divider":
              //Time line
              return <Timeline el={el} />;
            case "msg":
              switch (el.subtype) {
                case "img":
                  // img message
                  return <MediaMSG el={el} menu={menu} />;

                case "doc":
                  // doc message
                  return <DocMsg el={el} menu={menu} />;

                case "link":
                  // link message
                  return <LinkMsg el={el} menu={menu} />;

                case "reply":
                  // reply message
                  return <ReplyMSG el={el} menu={menu} />;

                default:
                  //text msg
                  return <TextMsg el={el} menu={menu} />;
              }

            default:
              return <></>;
          }
        })}
      </Stack>
    </Box>
  );
};

export default Message;
