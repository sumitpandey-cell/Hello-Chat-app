import { Avatar, Container } from '@mui/material'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useState } from 'react';
import { TextField, IconButton, InputAdornment } from '@mui/material';
import AttachFileIcon from '@mui/icons-material/AttachFile';


function Chat() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const param = useParams()
  const [user, setUser] = React.useState([])

  useEffect(() => {
    const userData = async () => {
      const users = await axios.get('http://localhost:8000/api/allUsers')
      const one = users.data.filter(u => u._id === param.id)
      setUser(one)
    }
    userData()
  }, [])

  const sendMessage = () => {
    if (message.trim() !== '') {
      setMessages([...messages, { text: message, type: 'sent' }]);
      setMessage(''); // Clear the input field
    }
  };

  // const receiveMessage = (text) => {
  //   setMessages([...messages, { text, type: 'received' }]);
  // };

  return (
      <Container>
        <div className="flex h-[90vh] flex-col p-4 ">
      {/* Chat history */}
      <div className="flex-1 overflow-y-auto mb-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex mb-2 ${
              msg.type === 'sent' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`p-3 max-w-xs rounded-lg shadow-md ${
                msg.type === 'sent'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-black'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* Input field and send button */}
      <div className="flex flex-row items-center">
        <TextField
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          variant="outlined"
          placeholder="Type a message"
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton>
                  <AttachFileIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
          className="mr-2"
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          Send
        </button>
      </div>
    </div>
      </Container>
  )
}

export default Chat