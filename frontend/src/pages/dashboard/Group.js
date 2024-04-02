import {
  Box,
  Stack,
  Typography,
  Link,
  IconButton,
  useTheme,
  Divider,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Search from "../../components/Search/Search";
import SearchIconWrapper from "../../components/Search/SearchIconWrapper";
import StyledInputBase from "../../components/Search/StyledInputBase";
import { MagnifyingGlass, Plus } from "phosphor-react";
import { ChatList } from "../../data";
import ChatElement from "../../components/ChatElement";
import { scrollElements, showScrollbars } from "../../components/Scrollbar";
import CreateGroup from "../../sections/main/CreateGroup";
const Group = () => {
  const theme = useTheme();
  const [openDialog, setOpenDialog] = useState(false);
  const handeCloseDialog = () => {
    setOpenDialog(false);
  };

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
    <>
      <Stack direction={"row"} sx={{ width: "100%" }}>
        {/* Left */}
        <Box
          sx={{
            height: "100vh",
            width: 310,
            backgroundColor:
              theme.palette.mode === "light"
                ? "#F8FAFF"
                : theme.palette.background.paper,
            boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
          }}
        >
          <Stack p={3} spacing={2} sx={{ maxHeight: "100vh" }}>
            <Stack>
              <Typography variant="h5">Groups</Typography>
            </Stack>

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

            <Stack
              direction={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Typography variant="subtitle2" component={Link}>
                Create New Group
              </Typography>
              <IconButton onClick={() => {
                setOpenDialog(true);
              }}>
                <Plus style={{ color: theme.palette.primary.main }} />
              </IconButton>
            </Stack>

            <Divider />

            <Stack
            spacing={2}
              onScroll={showScrollbars}
              data-scrollbars
              sx={{
                flexGrow: 1,
                overflowY: "scroll",
                height: "100%",
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
              {/* sidebar */}

              <Stack spacing={2.5}>
                {/*  */}
                <Typography variant="subtitle2" sx={{ color: "#676767" }}>
                  Pinned
                </Typography>

                {/* Chat list */}
                {ChatList.filter((el) => el.pinned).map((el) => {
                  return <ChatElement {...el} />;
                })}
                {/*  */}
                <Typography variant="subtitle2" sx={{ color: "#676767" }}>
                  All Groups
                </Typography>

                {/* Chat list */}
                {ChatList.filter((el) => !el.pinned).map((el) => {
                  return <ChatElement {...el} />;
                })}
              </Stack>
            </Stack>
          </Stack>
        </Box>

        {/* Right */}
        {/* Reuse conversation */}

      </Stack>
      {openDialog && <CreateGroup open={openDialog} handleClose={handeCloseDialog}/>}
    </>
  );
};

export default Group;
