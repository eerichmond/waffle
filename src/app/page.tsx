"use client";

import { useState, useEffect } from "react";

import { useQuery, useAction } from "convex/react";
import { api } from "@/convex/_generated/api";
import ChatBox from "./components/ChatBox";
import Slider from "./components/Slider";
import { UsernameInput } from "./components/UsernameInput";
import ContentEditable from "./ContentEditableComponent";
import { Box, Container, CssBaseline, Paper, TextareaAutosize, ThemeProvider, Typography, createTheme } from "@mui/material";
import { v4 as uuidv4 } from 'uuid';
import { get } from "https";

function getOrCreateUniqueId() {
  try {
    let uid = localStorage.getItem('uid') || '';
    if (!uid) {
      uid = uuidv4(); // Generate a new UUID
      localStorage.setItem('uid', uid);
    }
    return uid;
  } catch (e) {
    // console.warn(e);
    return uuidv4();
  }
}

function tryGetUsernameFromLocalStorage() {
  try {
    return localStorage.getItem('username') || '';
  } catch (e) {
    return '';
  }
}

export default function Home() {
  const [userId, setUserId] = useState("");
  const [username, setUsername] = useState("");
  const [userInput, setUserInput] = useState("");
  const [fontScaleFactor, setFontScaleFactor] = useState(20);

  const postMessage = useAction(api.messages.writeMessage);

  useEffect(() => {
    if (!userId) {
      setUserId(getOrCreateUniqueId());
      if (!username) {
        setUsername(tryGetUsernameFromLocalStorage());
      }
    }
  }, [userId]);

  useEffect(() => {
    if (username) {
      try {
        localStorage.setItem('username', username);
      } catch (e) {
        console.warn(e);
      }
    }
  }, [username]);

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
            <Typography variant="subtitle1" sx={{ color: "white", marginTop: -2 }}>Chat with relevant messages instantly!</Typography>
          </Box>

          <img src="/waffle.webp" height={130} width={130} />
        </Box>
        <Paper elevation={2} sx={{ borderRadius: 2, height: '100%', marginTop: 2, padding: 4 }}>
          <Box sx={{ display: "flex", flexDirection: 'row', alignItems: 'end', justifyContent: 'space-between' }}>
            <UsernameInput username={username} setUsername={setUsername} />
            <div className="flex flex-row gap-2 items-center">
              <div>Similarity Scale</div>
              <Slider min={0} max={40} value={fontScaleFactor} setValue={setFontScaleFactor} />
            </div>
          </Box>
          <ChatBox
            userId={userId}
            addMessage={message => postMessage({ message, author: userId, name: username })}
            userInput={userInput}
            setUserInput={setUserInput}
            allowInput={!!username && !!userId}
            fontScaleFactor={fontScaleFactor}
          />
        </Paper>
      </Container>
    </ThemeProvider >
  );
}
