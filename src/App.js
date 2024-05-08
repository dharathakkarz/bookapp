
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Book from './pages/books/Book';
import BookDetails from './pages/books/BookDetails';
import Nav from './components/Nav';
import { useSelector } from 'react-redux';
import Cart from './pages/cart/Cart';
import Checkout from './pages/books/Checkout';
import Pay from './pages/books/Pay';
import Login from './pages/user/Login';
import Signup from './pages/user/Signup';
import ChangePass from './pages/user/ChangePass';
import UpdateProfile from './pages/user/UpdateProfile';


function App() {
  const books = useSelector(state => state.books);

  return (
    <Router>
     
      <Nav />
      <Routes>
        <Route path='/' element={<Book />} />
        <Route path='/book-detail/:id' element={<BookDetails books={books} />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/checkout' element={<Checkout />} />
        <Route path='/paynow' element={<Pay />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/chenge-pass' element={<ChangePass />} />
        <Route path='/update-profile' element={<UpdateProfile />} />
       

      </Routes>
    
    </Router>
  );
}

export default App;


