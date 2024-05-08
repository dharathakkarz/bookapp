

import React from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import Sheet from '@mui/joy/Sheet';
import CssBaseline from '@mui/joy/CssBaseline';
import Typography from '@mui/joy/Typography';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import Link from '@mui/joy/Link';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';


import { toast } from 'react-toastify';
import {message,toaststyle} from '../../constant/Message'

const Signup = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  // Email validation function
  const validateEmail = (value) => {
    if (!value) {
      return 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{3,}$/i.test(value)) {
      return 'Invalid email address';
    }
    return true;
  };

  const onSubmit = (data) => {
    localStorage.setItem('userData', JSON.stringify(data));
    toast.success(message.REGISTER, {
      ...toaststyle , onClose: () => navigate('/login')
    }
   
  
  );
    // navigate('/login');
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
          <div>
            <Typography level="h4" component="h1">
              <b>Welcome!</b>
            </Typography>
            <Typography level="body-sm">Sign in to continue.</Typography>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl>
              <FormLabel>UserName</FormLabel>
              <Input
                {...register("username", { required: true })}
                type="text"
                placeholder="Enter Name"
              />
              {errors.username && <span>This field is required</span>}
            </FormControl>
            <FormControl>
              <FormLabel>Phone</FormLabel>
              <Input
                {...register("phn", { required: true })}
                type="text"
                placeholder="Enter Number"
              />
              {errors.phn && <span>This field is required</span>}
            </FormControl>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                {...register("email", { required: true, validate: validateEmail })}
                type="email"
                placeholder="Enter Email"
              />
              {errors.email && <span>{errors.email.message}</span>}
            </FormControl>
            <FormControl>
              <FormLabel>Password</FormLabel>
              <Input
                {...register("password", { required: true })}
                type="password"
                placeholder="password"
              />
              {errors.password && <span>This field is required</span>}
            </FormControl>
            <FormControl>
              <FormLabel>Address</FormLabel>
              <Input
                {...register("address", { required: true })}
                type="text"
                placeholder="Enter Address"
              />
              {errors.address && <span>This field is required</span>}
            </FormControl>
         
            <Button sx={{ mt: 1 }} type="submit">Sign Up</Button>
          </form>
          <Typography
            endDecorator={<Link href="/login">Login</Link>}
            fontSize="sm"
            sx={{ alignSelf: 'center' }}
          >
            Already have an account?
          </Typography>
        </Sheet>
      </main>
    </CssVarsProvider>
  );
};

export default Signup;

