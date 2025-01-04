import { Box, Typography } from '@mui/material'
import React from 'react'

function ChatMesssage({
    message
}) {
    const now = new Date();
  
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const time = `${hours}:${minutes}`;
    return (
        <Box
            sx={{
                position: 'relative',
                backgroundColor: '#075E54',
                color: '#fff',
                padding: '8px 12px',
                borderRadius: '8px',
                maxWidth: '200px',
                '&:after': {
                    content: '""',
                    position: 'absolute',
                    top: '50%',
                    right: '-10px',
                    transform: 'translateY(-50%)',
                    borderWidth: '5px',
                    borderStyle: 'solid',
                    borderColor: 'transparent transparent transparent #075E54',
                },
            }}
        >
            <Typography variant="body1">{message}</Typography>
            <Typography
                variant="caption"
                sx={{
                    display: 'block',
                    textAlign: 'right',
                    marginTop: '4px',
                    fontSize: '10px',
                }}
            >
                {time}
            </Typography>
        </Box>
    )
}

export default ChatMesssage