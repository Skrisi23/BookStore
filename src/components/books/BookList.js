import React, { useEffect, useState } from 'react';
import BookCard from './BookCard';
import { getBooks } from '../../api';


export default function BooksList() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const ac = new AbortController();
    async function load() {
      try {
        setLoading(true);
        const data = await getBooks(ac.signal);
        
        setBooks(Array.isArray(data) ? data : []);
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

  if (loading) return <div>Betöltés...</div>;
  if (error) return (
    <div className="alert alert-danger" role="alert">
      <i className="bi bi-exclamation-triangle me-2"></i>
      {error}
    </div>
  );
  if (!books.length) return <div>Nincsenek könyvek.</div>;

  return (
    <div className="row">
      {books.map((b) => (
        
        <BookCard key={b.id} book={b} />
        
      ))}
    </div>
  );
}