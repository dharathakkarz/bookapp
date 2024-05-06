import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const Checkout = () => {
  const [shippingInfo, setShippingInfo] = useState({
    fullName: '',
    address: '',
    city: '',
    postalCode: '',
    country: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Shipping info:', shippingInfo);
  };

  return (
    <div>
      <h2>Shipping Information</h2>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Mobile Number"
          variant="outlined"
          name="Mobile Num"
          value={shippingInfo.MobileNum}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Address"
          variant="outlined"
          name="address"
          value={shippingInfo.address}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="City"
          variant="outlined"
          name="city"
          value={shippingInfo.city}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Postal Code"
          variant="outlined"
          name="postalCode"
          value={shippingInfo.postalCode}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Country"
          variant="outlined"
          name="country"
          value={shippingInfo.country}
          onChange={handleChange}
          fullWidth
          required
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default Checkout;

