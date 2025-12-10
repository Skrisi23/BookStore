
import React, { useState } from 'react';
import BookList from '../components/books/BookList';
import CategoryFilter from '../components/books/CategoryFilter';
import SearchBar from '../components/common/SearchBar';
import { categories } from '../data/mockData';

function BooksPage() {
  const [selectedCategory, setSelectedCategory] = useState('Minden');
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="container-fluid mt-4">
      <div className="row">
        <div className="col-md-2">
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        </div>

        <div className="col-md-10">
          <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
          
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4>{selectedCategory === 'Minden' ? 'Összes könyv' : selectedCategory}</h4>
          </div>

          <BookList searchTerm={searchTerm} selectedCategory={selectedCategory} />
        </div>
      </div>
    </div>
  );
}

export default BooksPage;  
