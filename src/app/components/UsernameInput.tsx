import { Input } from '@mui/material';
import React, { useState } from 'react';

interface Props {
  username: string;
  setUsername: (username: string) => void;
}

export const UsernameInput: React.FC<Props> = ({ username, setUsername }) => {
  const [temporaryUsername, setTemporaryUsername] = useState(username);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        setUsername(temporaryUsername);
      }}
    >
      <Input
        type="text"
        onChange={(event) => setTemporaryUsername(event.target.value)}
        placeholder="Username"
        value={temporaryUsername}
        sx={{ width: 300 }}
      />
    </form>
  );
}