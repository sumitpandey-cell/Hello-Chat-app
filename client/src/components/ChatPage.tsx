import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Typography, AppBar, Toolbar, Avatar, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedUser } from '../features/userSlice';

function ChatPage({ conversation, onBackClick }) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const currentUser = useSelector(state => state.currentUser);
  const socketConnection = useSelector(state => state.socketConnection);
  const selectedUser = useSelector(state => state.selectedUser);
  const dispatch = useDispatch();

  useEffect(() => {
    if (conversation && conversation.message) {
      console.log("conversation",conversation);
      setMessages(conversation.message);
    }
  }, [conversation]);

  useEffect(() => {
    if (socketConnection) {
      socketConnection.on('newMessage', (data) => {
        setMessages(prevMessages => [...prevMessages, data.message]);
      });
    }

    console.log("messages", messages);
    return () => {
      if (socketConnection) {
        socketConnection.off('newMessage');
      }
    };
  }, [socketConnection]);

  const handleSendMessage = async () => {
    if (message.trim() && selectedUser && socketConnection && currentUser) {
      try {
        socketConnection.emit('sendMessage', {
          senderId: currentUser._id,
          receiverId: selectedUser.userId,
          text: message
        });
        setMessage('');
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
    console.log("message",messages);
  };

  const handleBack = () => {
    dispatch(setSelectedUser(null));
    onBackClick();
  };

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="back" onClick={handleBack}>
            <ArrowBackIcon />
          </IconButton>
          <Avatar src={selectedUser.profileUrl} sx={{ marginRight: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {selectedUser.username}
          </Typography>
        </Toolbar>
      </AppBar>
      <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 2 }}>
        {messages.map((msg, index) => {
          const isSender = msg.senderId === currentUser._id;
          return (
            <Box 
              key={index} 
              sx={{ 
                mb: 2, 
                display: 'flex', 
                justifyContent: isSender ? 'flex-end' : 'flex-start'
              }}
            >
              <Box
                sx={{
                  maxWidth: '70%',
                  p: 1,
                  borderRadius: 2,
                  backgroundColor: isSender ? 'primary.main' : 'grey.300',
                  color: isSender ? 'white' : 'black',
                  textAlign: isSender ? 'right' : 'left',
                }}
              >
                <Typography>{msg.text}</Typography>
              </Box>
            </Box>
          );
        })}
      </Box>
      <Box sx={{ p: 2, backgroundColor: 'background.default',display: 'flex' }}>
        <TextField
        fullWidth
          variant="outlined"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
        />
        <Button onClick={handleSendMessage} sx={{ mt: 1, backgroundColor: "black" }}>Send</Button>
      </Box>
    </Box>
  );
}

export default ChatPage;