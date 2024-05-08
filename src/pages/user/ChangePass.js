
import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { toast } from 'react-toastify';
import {message,toaststyle} from '../../constant/Message'
import { useNavigate } from 'react-router-dom';

const ChangePass = () => {
  const [open, setOpen] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [error, setError] = React.useState(false);
  const [nestedOpen, setNestedOpen] = React.useState(false);
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [passwordsMatch, setPasswordsMatch] = React.useState(false);
  const [passwordEmptyError, setPasswordEmptyError] = React.useState(false);
  const navigate= useNavigate();


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleCreate = () => {
    const storedUserData = JSON.parse(localStorage.getItem('userData'));
    if (storedUserData && storedUserData.email === email) {
      // Proceed with creating password
      console.log('Creating password...');
      handleClose();
      setNestedOpen(true); // Open nested dialog after creating password
    } else {
      // Show error message
      setError(true);
    }
  };



  const handleNestedClose = () => {
    setNestedOpen(false);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setPasswordEmptyError(false);
    setPasswordsMatch(event.target.value === confirmPassword);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
    setPasswordEmptyError(false);
    setPasswordsMatch(event.target.value === password);
  };

  const handleNestedSubmit = () => {
    if (!password || !confirmPassword) {
      setPasswordEmptyError(true);
      return;
    }

    if (password === confirmPassword) {
      console.log('Passwords match:', password);
      // Update password in localStorage
      const storedUserData = JSON.parse(localStorage.getItem('userData'));
      const updatedUserData = { ...storedUserData, password: password };
      localStorage.setItem('userData', JSON.stringify(updatedUserData));

      handleNestedClose();
      // Show toast message
toast.success(message.PWDCHANGE,{
  ...toaststyle, onClose: () => navigate('/login')
})
     
    
    } else {
      setPasswordsMatch(false);
    }
  };


  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div>
        <Button variant="outlined" onClick={handleClickOpen}>
          Change Password
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
        >
          <DialogContent>
            <DialogContentText>
              To create a new password, please enter your email address here. We will send updates accordingly.
            </DialogContentText>
            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              label="Email Address"
              type="email"
              fullWidth
              variant="standard"
              value={email}
              onChange={handleEmailChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleCreate}>Create</Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={nestedOpen}
          onClose={handleNestedClose}
        >
          <DialogContent>
            <DialogContentText>
              Please enter your new password and confirm it.
            </DialogContentText>
            <TextField
              autoFocus
              required
              error={passwordEmptyError && !password}
              helperText={passwordEmptyError && !password ? 'Please enter a password' : ''}
              margin="dense"
              id="password"
              label="Password"
              type="password"
              fullWidth
              variant="standard"
              value={password}
              onChange={handlePasswordChange}
            />
            <TextField
              required
              error={passwordEmptyError && !confirmPassword || !passwordsMatch}
              helperText={passwordEmptyError && !confirmPassword ? 'Please confirm your password' : !passwordsMatch ? 'Passwords do not match' : ''}
              margin="dense"
              id="confirmPassword"
              label="Confirm Password"
              type="password"
              fullWidth
              variant="standard"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleNestedClose}>Cancel</Button>
            <Button onClick={handleNestedSubmit} disabled={!passwordsMatch || passwordEmptyError}>Submit</Button>
          </DialogActions>
        </Dialog>

      </div>
    </div>
  );
}

export default ChangePass;



