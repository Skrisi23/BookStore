import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import BooksPage from './pages/BooksPage';
import AuthorsPage from './pages/AuthorsPage';
import AboutPage from './pages/AboutPage';
import * as api from './services/api';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('books');
  const [books, setBooks] = useState([]);
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [booksData, authorsData] = await Promise.all([
        api.fetchBooks(),
        api.fetchAuthors()
      ]);
      setBooks(booksData);
      setAuthors(authorsData);
    } catch (error) {
      console.error('Error loading data:', error);
      alert('Hiba történt az adatok betöltése során');
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'books':
        return (
          <BooksPage
            books={books}
            authors={authors}
            onAddBook={api.addBook}
            onUpdateBook={api.updateBook}
            onDeleteBook={api.deleteBook}
            onRefresh={loadData}
          />
        );
      case 'authors':
        return (
          <AuthorsPage
            authors={authors}
            onAddAuthor={api.addAuthor}
            onUpdateAuthor={api.updateAuthor}
            onDeleteAuthor={api.deleteAuthor}
            onRefresh={loadData}
          />
        );
      case 'about':
        return <AboutPage />;
      default:
        return <BooksPage books={books} authors={authors} onRefresh={loadData} />;
    }
  };

  return (
    <div className="App">
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <div className="container mt-4">
        {renderPage()}
      </div>
    </div>
  );
}

export default App;
