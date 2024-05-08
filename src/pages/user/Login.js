


import React, { useState, useEffect } from 'react';
import { CssVarsProvider } from '@mui/joy/styles'; 
import Sheet from '@mui/joy/Sheet';
import CssBaseline from '@mui/joy/CssBaseline';
import Typography from '@mui/joy/Typography';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import Link from '@mui/joy/Link';
import { useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';
import {message,toaststyle} from '../../constant/Message'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (isLoggedIn) {
      
      navigate('/');
    }
  }, [navigate]);

  const handleLogin = () => {
    const storedData = JSON.parse(localStorage.getItem('userData'));
    if (storedData && storedData.email === email && storedData.password === password) {

      setError('');

      localStorage.setItem('isLoggedIn', 'true');
      toast.success(message.LOGIN, {
        ...toaststyle , onClose: () => navigate('/')
      }    
    
    );
   
      // navigate('/');
    } else {
      // Invalid credentials
      setError('Invalid email or password');
      toast.error(message.LOGINFAIL, {
        ...toaststyle 
      }    
    
    );

    }
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
            <FormLabel>Email</FormLabel>
            <Input
              name="email"
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input
              name="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          {error && <Typography sx={{ color: 'red' }}>{error}</Typography>}
          <Button sx={{ mt: 1 }} onClick={handleLogin}>Log in</Button>
          <Typography
            endDecorator={<Link href="/chenge-pass">Recover</Link>}
            fontSize="sm"
            sx={{ alignSelf: 'center' }}
          >
            Forgot Password?
          </Typography>
          <Typography
            endDecorator={<Link href="/signup">Sign up</Link>}
            fontSize="sm"
            sx={{ alignSelf: 'center' }}
          >
            Don&apos;t have an account?
          </Typography>
        </Sheet>
      </main>
    </CssVarsProvider>
  );
}

export default Login;
