// import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
// import Book from './pages/books/Book';
// import BookDetails from './pages/books/BookDetails';
// import Nav from './components/Nav';

// function App() {
//   return (
//    <>
//    <Router>
//     <Nav/>
//     <Routes>
//       <Route path='/' element={<Book/>}/>
//       <Route path='/book-detail/:id' element={<BookDetails />}/>
  
//     </Routes>
//    </Router>
   
//    </>
//   );
// }

// export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Book from './pages/books/Book';
import BookDetails from './pages/books/BookDetails';
import Nav from './components/Nav';
import { useSelector } from 'react-redux';
import Cart from './pages/cart/Cart';
import Checkout from './pages/books/Checkout';

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
       

      </Routes>
    </Router>
  );
}

export default App;
