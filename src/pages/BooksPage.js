
import React, { useState, useEffect } from 'react';
import BookList from '../components/books/BookList';
import CategoryFilter from '../components/books/CategoryFilter';
import SearchBar from '../components/common/SearchBar';
import { mockBooks, categories } from '../data/mockData';

function BooksPage() {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Minden');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    setTimeout(() => {
      setBooks(mockBooks);
      setFilteredBooks(mockBooks);
      setLoading(false);
    }, 500);
  }, []);

  useEffect(() => {
    let filtered = books;

    
    if (selectedCategory !== 'Minden') {
      filtered = filtered.filter(book => book.category === selectedCategory);
    }

    
    if (searchTerm) {
      filtered = filtered.filter(book =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredBooks(filtered);
  }, [selectedCategory, searchTerm, books]);

  return (
    <div className="container-fluid mt-4">
      <div className="row">
        {/* Bal oldali kategória szűrő */}
        <div className="col-md-2">
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        </div>

        {/* Jobb oldali könyvek */}
        <div className="col-md-10">
          <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
          
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4>
              {selectedCategory === 'Minden' ? 'Összes könyv' : selectedCategory}
              <span className="badge bg-secondary ms-2">{filteredBooks.length}</span>
            </h4>
          </div>

          <BookList books={filteredBooks} loading={loading} />
        </div>
      </div>
    </div>
  );
}

export default BooksPage;
