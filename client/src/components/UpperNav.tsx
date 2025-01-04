import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import MoreIcon from '@mui/icons-material/MoreVert';
import SearchPage from './SearchPage'
import Backdrop from './Backdrop'
import Drawer from './Drawer'
import AddIcon from '@mui/icons-material/Add';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useTheme } from '@mui/material/styles';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import{ useState } from 'react';

export default function PrimarySearchAppBar({ darkMode, toggleDarkMode, onNewUserSelection }) {
  const [addGroup, setAddGroup] = React.useState(false)
  const [notifications, setNotifications] = React.useState(false)
  const arr = [<Drawer/> ]
  const menuNumber = 9
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [searchPageOpen, setSearchPageOpen] = useState(false);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleNotifications = () => {
    setNotifications((prev) => !prev)
  }

  const handleAddGroup = () => {
    setSearchPageOpen(true);
  };

  const handleCloseSearchPage = () => {
    setSearchPageOpen(false);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {
        arr.map((item, index) => (
          <MenuItem onClick={handleMenuClose} key={index}>{item}</MenuItem>
        ))
      }
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 18 new notifications"
          color="inherit"
        >
          <Badge>
          <AddIcon
                onClick={handleAddGroup}
                sx={{
                  cursor: 'pointer',
                }}
              />
          </Badge>
        </IconButton>
        <p>Add User</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
      <Box component='section' sx={{ flexGrow: 1, minWidth: '100px' }}>
        <AppBar position="static" color={darkMode ? 'default' : 'primary'}>
          <Toolbar>
            
            <Typography
              variant="h6"
              noWrap
              component="div"
              
            >
              HELLO
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              <IconButton size="large" aria-label="show {menuNumber} new mails" color="inherit">
                <Badge badgeContent={menuNumber} color="error">
                  <MailIcon />
                </Badge>
              </IconButton>
              <IconButton
                size="large"
                aria-label="show 17 new notifications"
                color="inherit"
                onClick={handleNotifications}
              >
                <AddIcon
                onClick={handleAddGroup}
                sx={{
                  cursor: 'pointer',
                }}
              />
              </IconButton>
              
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <IconButton color="inherit" onClick={toggleDarkMode}>
                {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
              </IconButton>
            </Box>
            <Box sx={{
              display: { xs: 'flex', md: 'none' }
            }}>
              <IconButton
                size="large"
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
        {renderMobileMenu}

        {renderMenu}
          <React.Suspense fallback={<Backdrop />}>
            <SearchPage 
              open={searchPageOpen} 
              onClose={handleCloseSearchPage} 
              onNewUserSelection={onNewUserSelection}
            />
          </React.Suspense>
      {notifications && (
        <React.Suspense fallback={<Backdrop />}>
          <SearchPage search={false}/>
        </React.Suspense>
      )}
      </Box>
  );
}