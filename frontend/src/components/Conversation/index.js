import { Box, Stack, useTheme } from "@mui/material";
import React, { useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Message from "./Message";
import { scrollElements, showScrollbars } from "../Scrollbar";


// scrollElements.forEach((el) => {
//   el.addEventListener("scroll", showScrollbars);
//   el.addEventListener("mouseenter", showScrollbars);
//  });

const Conversation = () => {
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
  const theme = useTheme();
  return (
    <Stack height={"100%"} maxHeight={"100vh"} width={"auto"}>
      {/* Chat header */}
      <Header />
      {/* MSG */}
      <Box
        onScroll={showScrollbars}
        data-scrollbars
        width={"100%"}
        sx={{
          flexGrow: 1,
          height: "100%",
          overflowY: "scroll",
          "&::-webkit-scrollbar": {
            width: "8px", // chiều rộng của thanh cuộn
          },
          "&:-webkit-scrollbar-track": {
            background: "#f1f1f1", // màu nền của thanh cuộn
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
        <Message menu={true} />
      </Box>

      {/* Chat footer */}
      <Footer />
    </Stack>
  );
};

export default Conversation;
