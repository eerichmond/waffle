import { Box, Button, FormControl, FormGroup, Input, TextareaAutosize } from '@mui/material';
import React, { FC } from 'react';

interface Props {
    userInput: string;
    setUserInput: (input: string) => void;
    send: () => void;
    allowInput?: boolean;
}

const ChatInput: FC<Props> = ({ userInput, setUserInput, send, allowInput }) => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, width: "100%" }}>
            <form
                onSubmit={(event) => {
                    event.preventDefault();
                    send();
                }}
                className="w-full flex flex-row justify-left items-center"
                style={{ width: "100%" }}
            >
                <Input
                    name="message"
                    type="text"
                    value={userInput}
                    placeholder={allowInput ? "Enter your message" : "Submit a username to chat"}
                    onChange={(e) => setUserInput(e.target.value)}
                    disabled={!allowInput}
                    sx={{ flexGrow: 1, width: "100%" }}
                />
                <Button variant="contained"
                    type="submit"
                    sx={{ display: 'flex', alignSelf: 'end', flexGrow: 0, marginTop: 1 }}
                >
                    Send
                </Button>
            </form>
        </Box>
    );
};

export default ChatInput;