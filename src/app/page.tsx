"use client";

import { useState } from "react";

import { useQuery, useAction } from "convex/react";
import { api } from "@/convex/_generated/api";
import ChatBox from "./components/ChatBox";
import { UsernameInput } from "./components/UsernameInput";
import ContentEditable from "./ContentEditableComponent";
import { Box, Container, CssBaseline, Paper, TextareaAutosize, ThemeProvider, Typography, createTheme } from "@mui/material";

export default function Home() {
  const [username, setUsername] = useState("");
  const [newMessage, setNewMessage] = useState("");

  const postMessage = useAction(api.messages.writeMessage);
  const messages = useQuery(api.messages.getMessagesWithRelativeSimilarity, {
    username: username,
  });

  return (
    <ThemeProvider theme={createTheme()}>
      <CssBaseline />
      <Container sx={{ display: 'flex', flexDirection: 'column', height: '100%', p: 2 }}>
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography
              component="h1"
              variant="h1"
              sx={{ color: 'rgb(250,180,69)', textShadow: '2px 2px 3px rgba(0, 0, 0, .5)' }}>
              Waffle
            </Typography>
            <Typography variant="subtitle1" sx={{ color: "white", marginTop: -2 }}>See relevant topics instantly!</Typography>
          </Box>

          <img src="/waffle.webp" height={130} width={130} />
        </Box>
        <Paper elevation={2} sx={{ borderRadius: 2, height: '100%', marginTop: 2, padding: 4 }}>
          <Box sx={{ display: "flex", flexDirection: 'column', alignItems: 'end' }}>
            <UsernameInput username={username} setUsername={setUsername} />
          </Box>
          <ChatBox
            messages={messages || []}
            addMessage={(message) => postMessage({ message, author: username })}
            userInput={newMessage}
            setUserInput={setNewMessage}
          />
        </Paper>
      </Container>
    </ThemeProvider >
  );
}
