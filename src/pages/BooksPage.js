
import React, { useState, useEffect } from 'react';
import BookList from '../components/books/BookList';
import CategoryFilter from '../components/books/CategoryFilter';
import SearchBar from '../components/common/SearchBar';
import { getCategories } from '../api';

function BooksPage() {
  const [selectedCategory, setSelectedCategory] = useState('Minden');
  const [searchTerm, setSearchTerm] = useState('');
  const [categories, setCategories] = useState(['Minden']);
  const [loadingCategories, setLoadingCategories] = useState(true);

  // Kategóriák betöltése a backend-ből
  useEffect(() => {
    const ac = new AbortController();
    async function loadCategories() {
      try {
        setLoadingCategories(true);
        const cats = await getCategories(ac.signal);
        // Backend listát ['Minden'] prefix-szel egészítjük ki
        const allCategories = ['Minden', ...(Array.isArray(cats) ? cats : [])];
        setCategories(allCategories);
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.error('Kategóriák betöltése sikertelen:', err);
          // Fallback kategóriák
          setCategories(['Minden', 'Fantasy', 'Sci-Fi', 'Krimi', 'Klasszikus', 'Disztópia']);
        }
      } finally {
        setLoadingCategories(false);
      }
    }
    loadCategories();
    return () => ac.abort();
  }, []);

  return (
    <div className="container-fluid mt-4">
      <div className="row">
        <div className="col-md-2">
          {loadingCategories ? (
            <div className="text-center py-3">
              <div className="spinner-border spinner-border-sm text-primary" role="status">
                <span className="visually-hidden">Kategóriák betöltése...</span>
              </div>
            </div>
          ) : (
            <CategoryFilter
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />
          )}
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
