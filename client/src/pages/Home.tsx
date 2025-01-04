import React, { useEffect, useState } from 'react'
import UpperNav from '../components/UpperNav'
import { Container, CssBaseline } from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import ChatedPerson from '../components/ChatedPerson'
import MainBox from '../components/MainBox'
import io from 'socket.io-client'
import { useDispatch, useSelector } from 'react-redux'
import { setOnline, setSocketConnection, setAllUsers, setSelectedUser, setDarkMode, setCurrentUser } from '../features/userSlice'
import ChatPage from '../components/ChatPage'
import { Box, Typography } from '@mui/material'
import axios from 'axios';

function Home() {
  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.currentUser)
  const allUsers = useSelector(state => state.allUsers)
  const selectedUser = useSelector(state => state.selectedUser)
  const darkMode = useSelector(state => state.darkMode)
  const [conversation, setConversation] = useState(null);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    dispatch(setDarkMode(newDarkMode));
    localStorage.setItem('darkMode', JSON.stringify(newDarkMode));
  };

  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode !== null) {
      dispatch(setDarkMode(JSON.parse(savedDarkMode)));
    }
  }, [dispatch]);

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            scrollbarColor: darkMode ? "#6b6b6b #2b2b2b" : "#6b6b6b #f5f5f5",
            "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
              backgroundColor: darkMode ? "#2b2b2b" : "#f5f5f5",
              width: "8px",
            },
            "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
              borderRadius: 8,
              backgroundColor: darkMode ? "#6b6b6b" : "#888",
              minHeight: 24,
              border: darkMode ? "3px solid #2b2b2b" : "3px solid #f5f5f5",
            },
            "&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus": {
              backgroundColor: "#959595",
            },
            "&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active": {
              backgroundColor: "#959595",
            },
            "&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover": {
              backgroundColor: "#959595",
            },
            "&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner": {
              backgroundColor: darkMode ? "#2b2b2b" : "#f5f5f5",
            },
          },
        },
      },
    },
  });

  const onlineUsers = useSelector(state => state.online)
  const socketConnection = useSelector(state => state.socketConnection);

  useEffect(() => {
    const socket = io('http://localhost:8000', {
      auth: {
        token: localStorage.getItem('token')
      }
    });

    socket.on('onlineUsers', (users) => {
      dispatch(setOnline(users));
    });

    socket.on('newMessage', ({ conversationId, message }) => {
      dispatch(setAllUsers(prevUsers => prevUsers.map(user => {
        if (user.userId === message.sender || user.userId === message.receiver) {
          return { ...user, lastMessage: message.text };
        }
        return user;
      })));

      if (selectedUser && (selectedUser.userId === message.sender || selectedUser.userId === message.receiver)) {
        setConversation(prev => ({
          ...prev,
          message: [...(prev?.message || []), message]
        }));
      }
    });

    dispatch(setSocketConnection(socket));

    return () => {
      socket.disconnect();
    };
  }, [dispatch, selectedUser]);

  useEffect(() => {
    const fetchAllConversations = async () => {
      if (currentUser && (!allUsers || allUsers.length === 0)) {
        try {
          const response = await axios.get(`http://localhost:8000/api/getAllConversations/${currentUser._id}`);
          dispatch(setAllUsers(response.data));
        } catch (error) {
          console.error('Error fetching all conversations:', error);
        }
      }
    };

    fetchAllConversations();
  }, [dispatch, currentUser, allUsers]);

  const isUserOnline = (userId) => {
    return onlineUsers.some(u => u === userId)
  }

  const handleUserClick = async (user) => {
    dispatch(setSelectedUser(user));
    if (currentUser) {
      try {
        const response = await axios.post('http://localhost:8000/api/getConversation', {
          userId: currentUser._id,
          receiverId: user.userId
        });
        setConversation(response.data);
      } catch (error) {
        console.error('Error fetching conversation:', error);
      }
    }
  };

  const handleBackClick = () => {
    dispatch(setSelectedUser(null));
  };

  const handleNewUserSelection = (newUser) => {
    if (!allUsers.some(user => user.userId === newUser.userId)) {
      dispatch(setAllUsers([...allUsers, newUser]));
    }
    dispatch(setSelectedUser(newUser));
    handleUserClick(newUser);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="xl" style={{
        height: "100vh", 
        padding: 0,
        overflow: 'hidden',
      }}>
        {!selectedUser && (
          <UpperNav 
            darkMode={darkMode} 
            toggleDarkMode={toggleDarkMode} 
            onNewUserSelection={handleNewUserSelection}
          />
        )}
        <Box sx={{ 
          display: 'flex', 
          height: selectedUser ? '100%' : 'calc(100% - 64px)',
          flexDirection: { xs: 'column', sm: 'row' }
        }}>
          <Box sx={{ 
            width: { xs: '100%', sm: selectedUser ? '0%' : '35%' }, 
            height: { xs: selectedUser ? '0%' : '100%', sm: '100%' },
            overflow: 'hidden', 
            transition: 'width 0.3s, height 0.3s'
          }}>
            <MainBox className='overflow-y-auto w-[100%] h-[100%]'>
              {Array.isArray(allUsers) && allUsers.map((user) => (
                <ChatedPerson 
                  key={user.userId} 
                  userId={user.userId}
                  name={user.username} 
                  message={user.lastMessage || "No messages yet"} 
                  src={user.profileUrl} 
                  homeClick={() => handleUserClick(user)}
                  status={isUserOnline(user.userId) ? 'online' : 'offline'}
                />
              ))}
            </MainBox>
          </Box>
          <Box sx={{ 
            width: { xs: '100%', sm: selectedUser ? '100%' : '65%' }, 
            height: '100%',
            overflow: 'hidden', 
            transition: 'width 0.3s'
          }}>
            {selectedUser ? (
              <ChatPage 
                selectedUser={selectedUser} 
                conversation={conversation} 
                onBackClick={handleBackClick}
              />
            ) : (
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <Typography variant="h6">Select a chat to start messaging</Typography>
              </Box>
            )}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default Home;