

import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { toast } from 'react-toastify';
import { message, toaststyle } from '../../constant/Message'
import { addToCart } from '../../redux/action/BookAction';
import { useDispatch, useSelector } from 'react-redux';

const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const books = useSelector(state => state.books);
  const [quantity, setQuantity] = useState(1); // Default quantity is 1
  const isLoggedIn = localStorage.getItem('isLoggedIn');

  const handleQuantityChange = (event) => {
    // Ensure the quantity is within the range of 1 to 10
    let newQuantity = parseInt(event.target.value);
    newQuantity = isNaN(newQuantity) ? 1 : Math.max(1, Math.min(10, newQuantity)); // Clamp between 1 and 10
    setQuantity(newQuantity);
  };

  const handleAddToCart = () => {
    const book = books.find((book) => book.id === parseInt(id));
    dispatch(addToCart({ ...book, quantity }));
    toast.success(message.CART, {
      ...toaststyle,
      onClose: () => {
        navigate('/cart');
      }
    });
  };

  const handleBuyNow = (totalAmount) => {
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

  const book = books.find((book) => book.id === parseInt(id));

  if (!book) {
    return <div>Book not found</div>;
  }

  return (
    <div style={{ display: 'flex', marginLeft: '15px', marginTop: '25px' }}>
      <img src={book.cover_image} alt={book.title} style={{ width: '200px', marginRight: '15px' }} />
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <h2>{book.title}</h2>
        <div>
          <p>Author: {book.author}</p>
          <p>Price: 50</p>
          <p>Year: {book.publication_year}</p>
          <p>category: {book.genre}</p>
          <select value={quantity} onChange={handleQuantityChange} style={{ marginRight: '10px' }}>
            {[...Array(10)].map((_, index) => (
              <option key={index + 1} value={index + 1}>
                {index + 1}
              </option>
            ))}
          </select>
        </div>
        <div style={{ marginTop: '10px' }}>
          <Button variant="outlined" color="primary" style={{ marginRight: '10px' }} onClick={handleAddToCart}>
            Add to cart
          </Button>
          <Button variant="outlined" color="secondary" onClick={handleBuyNow}>
            Buy Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;