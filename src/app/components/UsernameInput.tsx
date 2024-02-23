{/* <form
          onSubmit={(event) => {
            event.preventDefault();
            setUsername(temporaryUsername);
          }}
        >
          <input
            type="text"   
            value={temporaryUsername}
            onChange={(event) => setTemporaryUsername(event.target.value)}         
            placeholder="Enter your username"
          />
          <button type="submit">Submit</button>
        </form> */}

// a component to render this
import React, { useState } from 'react';

interface UsernameInputProps {
    username: string;
    setUsername: (username: string) => void;
}

export const UsernameInput: React.FC<UsernameInputProps> = ({ username, setUsername }) => {
    const [temporaryUsername, setTemporaryUsername] = useState(username);

    return (
        <form
            onSubmit={(event) => {
                event.preventDefault();
                setUsername(temporaryUsername);
            }}
        >
            <input
                type="text"
                value={temporaryUsername}
                onChange={(event) => setTemporaryUsername(event.target.value)}
                placeholder="Enter your username"
                style={{ 
                    backgroundColor: "white",
                    color: "black",
                    border: "1px solid black",
                 }}
            />
            <button type="submit" onClick={() => setUsername(temporaryUsername)}>Submit</button>
        </form>
    );
}