

import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardContent, CardMedia, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { toast } from 'react-toastify';
import { message, toaststyle } from '../../constant/Message';

const Cart = () => {
  const [cart, setCart] = useState(useSelector(state => state.cart));
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('isLoggedIn');

  const handleRemoveFromCart = (itemId) => {
    const newCart = cart.filter(item => item.id !== itemId);
    setCart(newCart);
    toast.warning(message.REMOVE, {
      ...toaststyle,
    });
  };

  const handleCheckout = (totalAmount) => {
    if (isLoggedIn === "true") {
      navigate(`/checkout?amount=${totalAmount}`);
    } else {
      toast.error(message.ERROR,{
        ...toaststyle,
        onClose: () => {
          navigate('/login');
        }
      })
    }
  };

  const handleIncrementQuantity = (itemId) => {
    const updatedCart = cart.map(item => {
      if (item.id === itemId) {
        const newQuantity = Math.min(10, item.quantity + 1);
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    setCart(updatedCart);
  };

  const handleDecrementQuantity = (itemId) => {
    const updatedCart = cart.map(item => {
      if (item.id === itemId) {
        const newQuantity = Math.max(1, item.quantity - 1);
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    setCart(updatedCart);
  };

  const calculateTotalAmount = () => {
    return cart.reduce((total, item) => total + (50 * item.quantity), 0);
  };

  return (
    <div>
      <h2>Cart</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {cart && cart.map((item, index) => (
          <Card key={index} style={{ maxWidth: 345, margin: '10px' }}>
            <CardMedia
              component="img"
              height="140"
              image={item.cover_image}
              alt={item.title}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {item.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <b>Author: </b>{item.author}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <b>Price: </b> 50
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <b>Year:</b> {item.publication_year}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <b>Category:</b> {item.genre}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <b>Quantity:</b> {item.quantity}
              </Typography>
              <AddIcon onClick={() => handleIncrementQuantity(item.id)} />
              <RemoveIcon onClick={() => handleDecrementQuantity(item.id)} />
              <Typography variant="body2" color="text.secondary">
                <b>Total:</b> {50 * item.quantity}
              </Typography>

              <Button variant="outlined" color="primary" onClick={() => handleRemoveFromCart(item.id)}>
                Remove
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => handleCheckout(calculateTotalAmount())}
                style={{ marginLeft: '20px' }}
                disabled={isLoggedIn !== "true"}
              >
                Checkout
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Cart;
