import {
  Box,
  Button,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { ArchiveBox, CircleDashed, MagnifyingGlass } from "phosphor-react";
import { useTheme } from "@mui/material/styles";
import React, { useEffect } from "react";
import { ChatList } from "../../data";
import { scrollElements, showScrollbars } from "../../components/Scrollbar";
import Search from "../../components/Search/Search";
import SearchIconWrapper from "../../components/Search/SearchIconWrapper";
import StyledInputBase from "../../components/Search/StyledInputBase";
import ChatElement from "../../components/ChatElement";

// scrollElements.forEach((el) => {
//   el.addEventListener("scroll", showScrollbars);
//   el.addEventListener("mouseenter", showScrollbars);
// });

const Chats = () => {
  const theme = useTheme();
  useEffect(() => {
    scrollElements.forEach((el) => {
      el.addEventListener("scroll", showScrollbars);
      // el.addEventListener("mouseenter", showScrollbars);

      return () => {
        el.removeEventListener("scroll", showScrollbars);
        // el.removeEventListener("mouseenter", showScrollbars);
      };
    });
  }, []); // Chạy một lần sau khi component được render
  return (
    <Box
      sx={{
        position: "relative",
        width: 310,
        backgroundColor:
          theme.palette.mode === "light"
            ? "#F8FAFF"
            : theme.palette.background.paper,
        boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
      }}
    >
      {/* App title */}
      <Stack p={2} spacing={2} sx={{ height: "100vh" }}>
        <Stack
          direction="row"
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Typography variant="h5">ZALO</Typography>
          <IconButton>
            <CircleDashed />
          </IconButton>
        </Stack>

        {/* search */}
        <Stack sx={{ width: "100%" }}>
          <Search>
            <SearchIconWrapper>
              <MagnifyingGlass color="#709CE6" />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search..."
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
        </Stack>

        {/* archive */}
        <Stack spacing={1}>
          <Stack direction={"row"} alignItems={"center"} spacing={1.5}>
            <ArchiveBox size={24} />
            <Button>Archive</Button>
          </Stack>

          <Divider />
        </Stack>

        {/* Chat Element */}
        <Stack
          onScroll={showScrollbars}
          data-scrollbars
          spacing={2}
          direction={"column"}
          sx={{
            flexGrow: 1,
            overflowY: "scroll",
            "&::-webkit-scrollbar": {
              width: "8px", // chiều rộng của thanh cuộn
            },
            "&:-webkit-scrollbar-track": {
              background: "pink", // màu nền của thanh cuộn
            },
            "&:-webkit-scrollbar-thumb": {
              background: "#888", // màu của thanh cuộn
            },
            "&:-webkit-scrollbar-thumb:hover": {
              background: "#555", // màu của thanh cuộn khi di chuột qua
            },
            "&.is-scrolling": {
              "&::-webkit-scrollbar-thumb": {
                background: theme.palette.primary.main, // màu của thanh cuộn khi đang cuộn
                borderRadius: 10,
              },
            },
          }}
        >
          {/* Scroll bar */}
          {/* <SimpleBarStyle> */}
          <Stack spacing={2.4}>
            {/* pinned chat */}
            <Typography variant="subtitle2" sx={{ color: "#676767" }}>
              Pinned
            </Typography>
            {ChatList.filter((el) => el.pinned).map((el) => {
              return <ChatElement {...el} />;
            })}
          </Stack>

          {/* All chats */}
          <Stack spacing={2.4}>
            <Typography variant="subtitle2" sx={{ color: "#676767" }}>
              All Chats
            </Typography>
            {ChatList.filter((el) => !el.pinned).map((el) => {
              return <ChatElement {...el} />;
            })}
          </Stack>
          {/* </SimpleBarStyle> */}
        </Stack>
      </Stack>
    </Box>
  );
};

export default Chats;
