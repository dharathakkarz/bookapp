


import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { red } from '@mui/material/colors'; 

const Nav = () => {
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
          <div style={{
            position: 'relative',
            borderRadius: '4px',
            backgroundColor: 'rgba(255, 255, 255, 0.15)',
            marginLeft: 0,
            width: '150px', // Adjust width as needed
          }}>
            {/* <div style={{
              padding: '4px', // Adjust padding as needed
              height: '100%',
              position: 'absolute',
              display: 'flex',
              alignItems: 'center',
            }}>
              <SearchIcon />
            </div> */}
            {/* <InputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              style={{
                color: 'inherit',
                width: '100%',
                padding: '4px 4px 4px 36px', // Adjust padding as needed
                fontSize: '0.8rem', // Adjust font size as needed
              }}
            /> */}
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Nav;  // without searching

