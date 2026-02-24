
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
    <div>
      {/* Page header */}
      <div style={{ backgroundColor: '#1a1a1a', color: '#fff', padding: '3rem 0' }}>
        <div className="container">
          <p style={{ textTransform: 'uppercase', letterSpacing: '6px', fontSize: '0.65rem', color: '#666', marginBottom: '0.8rem' }}>
            Könyvtár
          </p>
          <h1 style={{ fontWeight: 700, fontSize: '2.5rem', letterSpacing: '-1px', marginBottom: '1rem' }}>
            {selectedCategory === 'Minden' ? 'Összes könyv' : selectedCategory}
          </h1>
          <p style={{ color: '#888', fontSize: '1rem', marginBottom: 0, maxWidth: '500px' }}>
            Böngéssz a könyveink között, szűrj kategóriák szerint vagy keress rá kedvenceidre.
          </p>
        </div>
      </div>

      {/* Toolbar: search + category pills */}
      <div style={{ backgroundColor: '#fff', borderBottom: '1px solid #e8e8e8', padding: '1.5rem 0' }}>
        <div className="container">
          <div className="row align-items-center g-3">
            <div className="col-lg-5">
              <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
            </div>
            <div className="col-lg-7">
              {loadingCategories ? (
                <div className="text-center py-2">
                  <div className="spinner-border spinner-border-sm" style={{ color: '#1a1a1a' }} role="status">
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
          </div>
        </div>
      </div>

      {/* Book grid */}
      <div style={{ backgroundColor: '#f5f5f5', minHeight: '60vh', padding: '3rem 0' }}>
        <div className="container">
          <BookList searchTerm={searchTerm} selectedCategory={selectedCategory} />
        </div>
      </div>
    </div>
  );
}

export default BooksPage;
