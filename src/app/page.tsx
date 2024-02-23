"use client";

import { useEffect, useRef, useState } from "react";

import { sizeBySimilarity } from "./utils";
import ContentEditable from 'react-contenteditable';
import { useQuery, useAction } from "convex/react";
import { api } from "@/convex/_generated/api";
import ChatBox from "./components/ChatBox";
import { UsernameInput } from "./components/UsernameInput";
import ContentEditable from "./ContentEditableComponent";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Box, Container, CssBaseline, Paper, TextareaAutosize, ThemeProvider, Typography, createTheme } from "@mui/material";

export default function Home() {
  const [username, setUsername] = useState("");
  const [userInput, setUserInput] = useState("");

  const postMessage = useAction(api.messages.writeMessage);
  const messages = useQuery(api.messages.getMessagesWithRelativeSimilarity, {
    username: username,
  });

  return (
    <ThemeProvider theme={createTheme()}>
      <CssBaseline />
      <Container sx={{ display: 'flex', flexDirection: 'column', height: '100%', p: 4 }}>
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
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            {messages?.map(({ _id, author, message, }) => {
              return (
                <Box key={_id} style={{ border: "solid 1px lightgray", padding: "10px 0" }}>
                  {message} <span style={{ fontSize: 'smaller' }}>{author}</span>
                </Box>
              );
            })}
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: 2 }}>
            <div className="w-full h-full flex gap-2 flex-col">
              <div
                className="h-1/4 flex flex-row gap-2"
              >
                <UsernameInput username={username} setUsername={setUsername} />
              </div>
              <div
                className="h-3/4"
              >
                <ChatBox
                  messages={messages || []}
                  addMessage={(message) => postMessage({ message, author: username })}
                  userInput={userInput}
                  setUserInput={setUserInput}
                />
              </div>
            </div>
            {/* <TextareaAutosize
              minRows={5}
              placeholder="Enter your thesis here"
              onChange={event => setThesis(event.target.value)}
              value={thesis}
            ></TextareaAutosize>
            <ContentEditable thesis={thesis} thoughts={thoughts} setThoughts={setThoughts} /> */}
          </Box>
        </Paper>
      </Container>
    </ThemeProvider >
  );
}
