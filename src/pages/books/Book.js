

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchBooks } from '../../redux/action/BookAction';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Loading from '../../components/Loading';
import Avatar from '@mui/material/Avatar';
import { red } from '@mui/material/colors';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { Link } from 'react-router-dom';

const Book = () => {
  const dispatch = useDispatch();
  const books = useSelector(state => state.books);
  const error = useSelector(state => state.error);
  const [loading, setLoading] = useState(true);
  const [searchBook, setSearchBook] = useState('');
  const [selectGenre, setselectGenre] = useState('');
  const [selectYear, setSelectYear] = useState('');
  const [filteredBooks, setFilteredBooks] = useState([]);

  const filterBooks = () => {
    if (searchBook.trim() === '' && selectGenre.trim() === '' && selectYear.trim() === '') {
      setFilteredBooks([]);
    } else {
      const query = searchBook.toLowerCase();
      const genre = selectGenre.toLowerCase();
      const year = selectYear.trim() === '' ? '' : parseInt(selectYear);
      const filtered = books.filter(
        book =>
          (book.title.toLowerCase().includes(query) || book.author.toLowerCase().includes(query)) &&
          (selectGenre === '' || book.genre.map(g => g.toLowerCase()).includes(genre)) &&
          (selectYear === '' || (year >= book.publication_year && year <= book.publication_year + 30)) 
      );
      setFilteredBooks(filtered);
    }
  };

  useEffect(() => {
    dispatch(fetchBooks())
      .then(() => setLoading(false))
      .catch(() => setLoading(false));
  }, [dispatch]);

  useEffect(() => {
    filterBooks();
  }, [searchBook, selectGenre, selectYear]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <div style={{ margin: '10px', display: 'flex', alignItems: 'center' }}>
        <div style={{ position: 'relative', width: '200px' }}>
          <div style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: '10px' }}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Search…"
            inputProps={{ 'aria-label': 'search' }}
            style={{ color: 'inherit', width: '100%', padding: '8px 8px 8px 36px', fontSize: '0.8rem' }}
            onChange={(e) => setSearchBook(e.target.value)}
          />
        </div>
        <div style={{ marginLeft: '10px', width: '200px' }}>
          <select value={selectGenre} onChange={(e) => setselectGenre(e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', fontSize: '0.8rem' }}>
            <option value="">All Genres</option>
            {books.map(book => book.genre.map(g => g.toLowerCase())).flat().filter((value, index, self) => self.indexOf(value) === index).map((genre, index) => (
              <option key={index} value={genre}>{genre}</option>
            ))}
          </select>
        </div>
        <div style={{ marginLeft: '10px', width: '200px' }}>
          <select value={selectYear} onChange={(e) => setSelectYear(e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', fontSize: '0.8rem' }}>
            <option value="">All Years</option>
            {books.map(book => book.publication_year).filter((value, index, self) => self.indexOf(value) === index).map((year, index) => (
              <option key={index} value={year}>{year}-{year + 30}</option> 
            ))}
          </select>
        </div>
      </div>
      <Grid container spacing={2} margin='0.5px'>
        {(searchBook || selectGenre || selectYear ? filteredBooks : books).map((book, index) => (
          <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
            <Card sx={{ position: 'relative', width: '200px' }}>
              <Avatar
                sx={{ position: 'absolute', top: 0, right: 0, bgcolor: red[500], fontSize: '15px' }}
                aria-label="author"
              >
                Read
              </Avatar>
              <Link to={`/book-detail/${book.id}`}>
                <CardMedia
                  component="img"
                  height="200"
                  style={{ width: '200px', marginTop: '-40px' }}
                  image={book.cover_image}
                  alt={book.title}
                />
              </Link>
              <CardContent>
                <Typography variant="body2" color="text.primary">
                  <b>{book.title}</b>
                </Typography>
                <Typography variant="body2" color="text.primary">
                  <i>by {book.author}</i>
                </Typography>
            
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Book; // with genre


