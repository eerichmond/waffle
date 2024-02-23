import { Box, Button, TextareaAutosize } from "@mui/material";
import React, { FC } from "react";

interface Props {
  userInput: string;
  setUserInput: (input: string) => void;
  send: () => void;
}

const ChatInput: FC<Props> = ({ userInput, setUserInput, send }) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <TextareaAutosize
        minRows={5}
        style={{ padding: 10, width: "100%" }}
        placeholder="Message ..."
        onChange={event => setUserInput(event.target.value)}
        value={userInput}
      ></TextareaAutosize>
      <Button variant="contained" onClick={() => send()} sx={{ display: "flex", alignSelf: "end" }}>
        Send
      </Button>
    </Box>
  );
};

export default ChatInput;
