import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, List, ListItem, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import ChatedPerson from './ChatedPerson';
import { Container } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedUser } from '../features/userSlice';
// Mock function to simulate fetching users from a database
const fetchUsers = async () => {
  const users = await axios.get('http://localhost:8000/api/allUsers')
  return users.data;
};

const SearchPage = ({ open, onClose, onNewUserSelection }) => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  // const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const selector = useSelector(state => state.online)
  const s = useSelector(state => state.selectedUser)

  useEffect(() => {
    const loadUsers = async () => {
      const data = await fetchUsers();
      setUsers(data);
    };

    loadUsers();
  }, []);

  useEffect(() => {
    const filtered = users.filter((user) =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredUsers(filtered);
    console.log(selector);

  }, [searchTerm, users]);

  const handleOpen = () => {
    setOpen((prev) => !prev);
  };

  const handleUserClick = (user) => {
    const newUser = {
      userId: user._id,
      username: user.username,
      profileUrl: user.profileUrl,
      lastMessage: "No messages yet"
    };
    dispatch(setSelectedUser(newUser));
    onNewUserSelection(newUser);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        User List
        <IconButton
          edge="end"
          color="inherit"
          onClick={onClose}
          aria-label="close"
          style={{ position: 'absolute', right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Search Users"
          type="text"
          fullWidth
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <List>
          {filteredUsers.map((user, index) => (
            <ListItem key={index} sx={{ cursor: 'pointer' }}>
              <ChatedPerson
                userId={user._id}
                name={user.username}
                message={"No messages yet"}
                src={user.profileUrl}
                onclick={() => handleUserClick(user)}
                status={selector.some((u) => u === user._id) ? 'online' : 'offline'}
              />
            </ListItem>
          ))}
        </List>
      </DialogContent>
    </Dialog>
  )
}

export default SearchPage
