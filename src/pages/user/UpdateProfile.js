


import React, { useState, useEffect } from 'react';
import { CssVarsProvider } from '@mui/joy/styles'; 
import Sheet from '@mui/joy/Sheet';
import CssBaseline from '@mui/joy/CssBaseline';

import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';

import { useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';
import { message, toaststyle } from '../../constant/Message';

const UpdateProfile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});

  useEffect(() => {
    // Retrieve user data from localStorage
    const storedUserData = JSON.parse(localStorage.getItem('userData'));
    if (storedUserData) {
      setUserData(storedUserData);
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleUpdate = () => {
    // Update user data in localStorage
    localStorage.setItem('userData', JSON.stringify(userData));
    toast.success(message.UPDATE, {
      ...toaststyle,
      onClose: () => navigate('/'), // Redirect to profile page after update
    });
  };

  return (
    <CssVarsProvider> 
      <main>
        <CssBaseline />
        <Sheet
          sx={{
            width: 300,
            mx: 'auto', 
            my: 4, 
            py: 3, 
            px: 2, 
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            borderRadius: 'sm',
            boxShadow: 'md',
          }}
          variant="outlined"
        >
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input
              name="username"
              type="text"
              placeholder="Enter name"
              value={userData.username || ''}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Phone</FormLabel>
            <Input
              name="phn"
              type="text"
              placeholder="Enter Number"
              value={userData.phn || ''}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              name="email"
              type="email"
              placeholder="Enter Email"
              value={userData.email || ''}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input
              name="password"
              type="password"
              placeholder="Password"
              value={userData.password || ''}
              onChange={handleInputChange}
            />
          </FormControl>
      
         <Button variant="solid" color="primary" onClick={handleUpdate}>Update </Button>
        </Sheet>
      </main>
    </CssVarsProvider>
  );
}

export default UpdateProfile;
