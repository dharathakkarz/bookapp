


// import React from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import Button from '@mui/material/Button';

// const BookDetails = ({ books }) => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const handleAddToCart = () => {
   
//     navigate('/cart');
//   };

//   const book = books.find((book) => book.id === parseInt(id));

//   if (!book) {
//     return <div>Book not found</div>;
//   }

//   return (
//     <div style={{ display: 'flex', marginLeft: '15px', marginTop: '25px' }}>
//       <img src={book.cover_image} alt={book.title} style={{ width: '200px', marginRight: '15px' }} />
//       <div style={{ display: 'flex', flexDirection: 'column' }}>
//         <h2>{book.title}</h2>
//         <div>
//           <p>Author: {book.author}</p>
//           <p>Price: 50</p>
//           <p>Year: {book.publication_year}</p>
//           <p>category: {book.genre}</p>
//         </div>
//         <div style={{ marginTop: '10px' }}>
//           <Button variant="outlined" color="primary" style={{ marginRight: '10px' }} onClick={handleAddToCart}>
//             Add to cart
//           </Button>
//           <Button variant="outlined" color="secondary">
//             Buy Now
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BookDetails;




import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';

const BookDetails = ({ books }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1); // Default quantity is 1

  const handleQuantityChange = (event) => {
    // Ensure the quantity is within the range of 1 to 10
    let newQuantity = parseInt(event.target.value);
    newQuantity = isNaN(newQuantity) ? 1 : Math.max(1, Math.min(10, newQuantity)); // Clamp between 1 and 10
    setQuantity(newQuantity);
  };

  const handleAddToCart = () => {
    // Navigate to the cart page with the selected quantity
    navigate(`/cart?bookId=${id}&quantity=${quantity}`);
  };
  const handleBuyNow = () => {
    // Navigate to the cart page with the selected quantity
    navigate('/checkout');
  };

  // const handleBuyNow = () => {
  //   // Open the checkout page as a popup
  //   const checkoutPageUrl = '/checkout';
  //   const popupWindow = window.open(checkoutPageUrl, '_blank', 'width=600,height=400');
  //   if (popupWindow) {
  //     popupWindow.focus();
  //   } else {
  //     // Handle if popup blocking is enabled
  //     navigate(checkoutPageUrl);
  //   }
  // };
  

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
