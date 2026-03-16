
import React, { useState, useEffect } from 'react';
import BookList from '../components/books/BookList';
import CategoryFilter from '../components/books/CategoryFilter';
import { getCategories } from '../api';

const SORT_OPTIONS = [
  { value: 'default', label: 'Alap sorrend', icon: 'bi-list-ul' },
  { value: 'title-asc', label: 'Cím: A → Z', icon: 'bi-sort-alpha-down' },
  { value: 'title-desc', label: 'Cím: Z → A', icon: 'bi-sort-alpha-up' },
  { value: 'price-asc', label: 'Ár: növekvő', icon: 'bi-sort-numeric-down' },
  { value: 'price-desc', label: 'Ár: csökkenő', icon: 'bi-sort-numeric-up' },
  { value: 'category-asc', label: 'Téma: A → Z', icon: 'bi-tag' },
];

function BooksPage() {
  const [selectedCategory, setSelectedCategory] = useState('Minden');
  const [searchTerm, setSearchTerm] = useState('');
  const [categories, setCategories] = useState(['Minden']);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [sortBy, setSortBy] = useState('default');

  const isFiltered = selectedCategory !== 'Minden' || searchTerm.trim() !== '' || sortBy !== 'default';
  const currentSort = SORT_OPTIONS.find(o => o.value === sortBy);

  const clearAll = () => {
    setSelectedCategory('Minden');
    setSearchTerm('');
    setSortBy('default');
  };

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
    <div className="page-enter">
      {/* Hero header */}
      <div style={{ backgroundColor: '#1a1a1a', color: '#fff', padding: '3rem 0 2.5rem' }}>
        <div className="container">
          <p className="hero-label" style={{ textTransform: 'uppercase', letterSpacing: '6px', fontSize: '0.62rem', color: '#555', marginBottom: '0.6rem' }}>
            Könyvtár
          </p>
          <h1 className="hero-title-1" style={{ fontWeight: 700, fontSize: '2.4rem', letterSpacing: '-1px', marginBottom: '0.4rem' }}>
            {selectedCategory === 'Minden' ? 'Összes könyv' : selectedCategory}
          </h1>
          <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '2rem', maxWidth: '460px' }}>
            Böngéssz a könyveink között, szűrj kategóriák szerint vagy keress rá kedvenceidre.
          </p>

          {/* Search bar in header */}
          <div style={{ maxWidth: '560px', position: 'relative' }}>
            <i className="bi bi-search" style={{
              position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)',
              color: '#888', fontSize: '0.9rem', zIndex: 1
            }}></i>
            <input
              type="text"
              placeholder="Keress cím vagy szerző szerint..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '0.85rem 3rem 0.85rem 2.6rem',
                fontSize: '0.9rem',
                backgroundColor: '#2a2a2a',
                border: '1px solid #333',
                borderRadius: 0,
                color: '#fff',
                outline: 'none',
                transition: 'border-color 0.2s',
              }}
              onFocus={e => e.target.style.borderColor = '#666'}
              onBlur={e => e.target.style.borderColor = '#333'}
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                style={{
                  position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)',
                  background: 'none', border: 'none', color: '#888', cursor: 'pointer', padding: '0.2rem',
                  fontSize: '0.85rem'
                }}
                title="Törlés"
              >
                <i className="bi bi-x-lg"></i>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Filter bar */}
      <div style={{ backgroundColor: '#fff', borderBottom: '1px solid #e8e8e8', padding: '0' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'stretch', gap: 0, minHeight: '54px' }}>

            {/* Categories */}
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', overflowX: 'auto', paddingRight: '1rem', scrollbarWidth: 'none' }}>
              {loadingCategories ? (
                <div className="spinner-border spinner-border-sm ms-2" style={{ color: '#aaa' }} role="status">
                  <span className="visually-hidden">Betöltés...</span>
                </div>
              ) : (
                <CategoryFilter
                  categories={categories}
                  selectedCategory={selectedCategory}
                  onCategoryChange={setSelectedCategory}
                />
              )}
            </div>

            {/* Divider */}
            <div style={{ width: '1px', backgroundColor: '#e8e8e8', flexShrink: 0 }}></div>

            {/* Sort dropdown */}
            <div style={{ display: 'flex', alignItems: 'center', padding: '0 1.2rem', gap: '0.5rem', flexShrink: 0 }}>
              <i className={`bi ${currentSort.icon}`} style={{ color: '#888', fontSize: '0.85rem' }}></i>
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                style={{
                  border: 'none',
                  outline: 'none',
                  fontSize: '0.78rem',
                  fontWeight: 500,
                  color: sortBy !== 'default' ? '#1a1a1a' : '#888',
                  cursor: 'pointer',
                  backgroundColor: 'transparent',
                  letterSpacing: '0.3px',
                  padding: '0.2rem 0'
                }}
              >
                {SORT_OPTIONS.map(o => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>

            {/* Divider + clear */}
            {isFiltered && (
              <>
                <div style={{ width: '1px', backgroundColor: '#e8e8e8', flexShrink: 0 }}></div>
                <button
                  onClick={clearAll}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '0.4rem',
                    padding: '0 1.2rem', border: 'none', background: 'none',
                    fontSize: '0.75rem', fontWeight: 600, color: '#888',
                    cursor: 'pointer', letterSpacing: '0.3px', textTransform: 'uppercase',
                    flexShrink: 0, transition: 'color 0.15s'
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = '#1a1a1a'}
                  onMouseLeave={e => e.currentTarget.style.color = '#888'}
                >
                  <i className="bi bi-x"></i>
                  Törlés
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Book grid */}
      <div style={{ backgroundColor: '#f5f5f5', minHeight: '60vh', padding: '3rem 0' }}>
        <div className="container">
          <BookList searchTerm={searchTerm} selectedCategory={selectedCategory} sortBy={sortBy} />
        </div>
      </div>
    </div>
  );
}

export default BooksPage;
