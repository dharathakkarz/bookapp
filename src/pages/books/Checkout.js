

import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useLocation, useNavigate } from 'react-router-dom';

const Checkout = () => {
  const [shippingInfo, setShippingInfo] = useState({
    MobileNum: '',
    address: '',
    city: '',
    postalCode: '',
    amount: ''
  });

  const [isFormFilled, setIsFormFilled] = useState(false);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const totalAmount = queryParams.get('amount');
  const navigate = useNavigate();

  useEffect(() => {
    // Load data from local storage
    const storedUserData = JSON.parse(localStorage.getItem('userData'));
    if (storedUserData) {
      const { phn, address } = storedUserData;
      setShippingInfo(prevState => ({
        ...prevState,
        MobileNum: phn || '',
        address: address || '',
      }));
    }
  }, []);

  useEffect(() => {
    // Check if at least one of the four fields is filled
    const { MobileNum, address, city, postalCode } = shippingInfo;
    const isFilled = MobileNum !== '' && address !== '' && city !== '' && postalCode !== '';
    setIsFormFilled(isFilled);
  }, [shippingInfo]);

  const handlePay = () => {
    navigate('/paynow');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Shipping info:', shippingInfo);
  };

  return (
    <div>
      <h2><center>Checkout Information</center></h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', maxWidth: '400px', margin: 'auto' }}>
        <TextField
          label="Mobile Number"
          variant="outlined"
          name="MobileNum"
          value={shippingInfo.MobileNum}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Address"
          variant="outlined"
          name="address"
          value={shippingInfo.address}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <TextField
            label="City"
            variant="outlined"
            name="city"
            value={shippingInfo.city}
            onChange={handleChange}
            style={{ marginRight: '10px' }}
          />
          <TextField
            label="Postal Code"
            variant="outlined"
            name="postalCode"
            value={shippingInfo.postalCode}
            onChange={handleChange}
          />
        </div>
        <TextField
          label="Total Amount"
          variant="outlined"
          name="amount"
          value={totalAmount}
          onChange={handleChange}
          fullWidth
          margin="normal"
          disabled
        />
        <Button type="submit" variant="contained" onClick={handlePay} color="primary" style={{ marginTop: '20px' }} disabled={!isFormFilled}>
          PayNow
        </Button>
      </form>
    </div>
  );
};

export default Checkout;
