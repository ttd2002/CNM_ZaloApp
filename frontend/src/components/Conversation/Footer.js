import {
  Box,
  Stack,
  IconButton,
  TextField,
  InputAdornment,
  Fab,
  Tooltip,
} from "@mui/material";
import React from "react";
import { styled, useTheme } from "@mui/material/styles";
import {
  Camera,
  File,
  Image,
  LinkSimple,
  PaperPlaneTilt,
  Smiley,
  Sticker,
  User,

} from "phosphor-react";
// import { Picker } from "emoji-mart";
// import data from '@emoji-mart/data'
import EmojiPicker from "emoji-picker-react";
const StyledInput = styled(TextField)(({ theme }) => ({
  "& .MuiInputBase-input": {
    paddingTop: "12px",
    paddingBottom: "12px",
  },
}));

const Actions = [
  {
    color: "#4da5fe",
    icon: <Image size={20} />,
    y: 102,
    title: "Photo/Video",
  },
  {
    color: "#1b8cfe",
    icon: <Sticker size={24} />,
    y: 157,
    title: "Stickers",
  },
  {
    color: "#0172e4",
    icon: <Camera size={24} />,
    y: 212,
    title: "Image",
  },
  {
    color: "#0159b2",
    icon: <File size={24} />,
    y: 267,
    title: "Document",
  },
  {
    color: "#013f7f",
    icon: <User size={24} />,
    y: 322,
    title: "Contact",
  },
];

const ChatInput = ({ setOpenPicker }) => {
  const [openActions, setOpenActions] = React.useState(false);
  return (
    <StyledInput
      fullWidth
      placeholder="Write a message..."
      variant="filled"
      InputProps={{
        disableUnderline: true,
        startAdornment: (
          <Stack sx={{ width: "max-content" }}>
            <Stack sx={{ position: "relative", display: openActions ? "inline-block" : "none" }}>
              {Actions.map((el) => (
                <Tooltip title={el.title} placement="right">
                  <Fab
                    size="medium"
                    sx={{
                      position: "absolute",
                      top: -el.y,
                      backgroundColor: el.color,
                    }}
                  >
                    {el.icon}
                  </Fab>
                </Tooltip>
              ))}
            </Stack>

            <InputAdornment>
              <IconButton onClick={() => {
                setOpenActions((prev) => !prev);
              }}>
                <LinkSimple />
              </IconButton>
            </InputAdornment>
          </Stack>
        ),
        endAdornment: (
          <InputAdornment>
            <IconButton
              onClick={() => {
                setOpenPicker((prev) => !prev);
              }}
            >
              <Smiley />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

const Footer = () => {
  const theme = useTheme();
  const [openPicker, setOpenPicker] = React.useState(false);
  return (
    <Box
      p={2}
      sx={{
        height: 100,
        width: "100%",
        backgroundColor:
          theme.palette.mode === "light"
            ? "#F8FAFF"
            : theme.palette.background.paper,
        boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
      }}
    >
      <Stack direction={"row"} alignItems={"center"} spacing={3}>
        <Stack sx={{ width: "100%" }}>
          {/* Chat input */}
          {/* <Box sx={{zIndex: 10, position: "fixed", bottom: 81, right: 100, }}>
          <Picker theme={theme.palette.mode}  data={data} onEmojiSelect={console.log}/>
          </Box> */}
          {/* Emoji BOX */}
          <Box
            sx={{
              display: openPicker ? "inline" : "none",
              zIndex: 10,
              position: "fixed",
              bottom: 70,
              right: 90,
            }}
          >
            <EmojiPicker height={"400px"} width={"330px"} />
          </Box>

          <ChatInput setOpenPicker={setOpenPicker} />
        </Stack>

        <Box
          sx={{
            height: 48,
            width: 48,
            backgroundColor: theme.palette.primary.main,
            borderRadius: 1.5,
          }}
        >
          <Stack
            sx={{ height: "100%", width: "100%" }}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <IconButton>
              <PaperPlaneTilt color="#fff" />
            </IconButton>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};

export default Footer;
