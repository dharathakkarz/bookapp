

import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import { red } from '@mui/material/colors';
import { toast } from 'react-toastify';
import {message,toaststyle} from '../constant/Message'

const Nav = () => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    toast.warning(message.LOGOUT, {
      ...toaststyle ,
    }    
  
  );

  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ backgroundColor: red[500] }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            style={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            BEST BOOKS
          </Typography>
          <div>
            <Button color="inherit" component={Link} to="/cart">
              Cart
            </Button>
            <Button color="inherit" component={Link} to="/">
              Books
            </Button>
            {isLoggedIn ? (
              <>
                <Button color="inherit" onClick={handleLogout}>
                  Logout
                </Button>
                <Button color="inherit" component={Link} to="/update-profile">
                  Update Profile
                </Button>
              </>
            ) : (
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
            )}
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Nav;
