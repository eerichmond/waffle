import { Input } from '@mui/material';
import React, { useState } from 'react';

interface Props {
  username: string;
  setUsername: (username: string) => void;
}

export const UsernameInput: React.FC<Props> = ({ username, setUsername }) => {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        setUsername(username);
      }}
    >
      <Input
        type="text"
        onChange={(event) => setUsername(event.target.value)}
        placeholder="Username"
        value={username}
        sx={{ width: 300 }}
      />
    </form>
  );
}