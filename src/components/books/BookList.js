import React, { useEffect, useState } from 'react';
import BookCard from './BookCard';
import { getBooks, getAuthors } from '../../api';


export default function BooksList({ searchTerm = '', selectedCategory = 'Minden' }) {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const ac = new AbortController();
    async function load() {
      try {
        setLoading(true);
        // Lekérjük a könyveket és a szerzőket párhuzamosan
        const [booksData, authorsData] = await Promise.all([
          getBooks(ac.signal),
          getAuthors(ac.signal).catch(() => [])
        ]);

        const authors = Array.isArray(authorsData) ? authorsData : [];
        const booksList = Array.isArray(booksData) ? booksData : [];

        // Könyveket normalizáljuk és szerző nevekkel gazdagítjuk
        const normalized = booksList.map(book => {
          const authorId = book.author_id || book.szerzo_id;
          const author = authors.find(a => a.id === authorId);
          const authorName = author?.nev || author?.name || book.szerzo || book.author || '';

          return {
            ...book,
            // Normalizált mezők a szűréshez és megjelenítéshez
            title: book.cim || book.title || '',
            author: authorName,
            category: book.kategoria || book.category || ''
          };
        });

        setBooks(normalized);
      } catch (err) {
        if (err.name !== 'AbortError') {
          const base = process.env.REACT_APP_API_URL || '';
          setError(`Hálózati hiba: ${err.message || String(err)} (próbált URL: ${base}/api/Books)`);
        }
      } finally {
        setLoading(false);
      }
    }
    load();
    return () => ac.abort();
  }, []);

  // Szűrés searchTerm és selectedCategory alapján
  useEffect(() => {
    let filtered = books;

    // Kategória szűrés
    if (selectedCategory && selectedCategory !== 'Minden') {
      filtered = filtered.filter(book => 
        book.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Keresés cím vagy szerző szerint
    if (searchTerm && searchTerm.trim()) {
      const term = searchTerm.toLowerCase().trim();
      filtered = filtered.filter(book =>
        book.title.toLowerCase().includes(term) ||
        book.author.toLowerCase().includes(term)
      );
    }

    setFilteredBooks(filtered);
  }, [books, searchTerm, selectedCategory]);

  if (loading) return <div>Betöltés...</div>;
  if (error) return (
    <div className="alert alert-danger" role="alert">
      <i className="bi bi-exclamation-triangle me-2"></i>
      {error}
    </div>
  );
  if (!filteredBooks.length) return <div>Nincsenek könyvek a megadott szűréshez.</div>;

  return (
    <div className="row">
      {filteredBooks.map((b) => (
        
        <BookCard key={b.id} book={b} />
        
      ))}
    </div>
  );
}