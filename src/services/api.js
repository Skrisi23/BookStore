const API_BASE_URL = 'http://localhost/bookstore/api';

export const fetchBooks = async () => {
  const response = await fetch(`${API_BASE_URL}/books.php`);
  if (!response.ok) throw new Error('Failed to fetch books');
  return response.json();
};

export const addBook = async (book) => {
  const response = await fetch(`${API_BASE_URL}/books.php`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(book)
  });
  if (!response.ok) throw new Error('Failed to add book');
  return response.json();
};

export const updateBook = async (id, book) => {
  const response = await fetch(`${API_BASE_URL}/books.php?id=${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(book)
  });
  if (!response.ok) throw new Error('Failed to update book');
  return response.json();
};

export const deleteBook = async (id) => {
  const response = await fetch(`${API_BASE_URL}/books.php?id=${id}`, {
    method: 'DELETE'
  });
  if (!response.ok) throw new Error('Failed to delete book');
  return response.json();
};

export const fetchAuthors = async () => {
  const response = await fetch(`${API_BASE_URL}/authors.php`);
  if (!response.ok) throw new Error('Failed to fetch authors');
  return response.json();
};

export const addAuthor = async (author) => {
  const response = await fetch(`${API_BASE_URL}/authors.php`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(author)
  });
  if (!response.ok) throw new Error('Failed to add author');
  return response.json();
};

export const updateAuthor = async (id, author) => {
  const response = await fetch(`${API_BASE_URL}/authors.php?id=${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(author)
  });
  if (!response.ok) throw new Error('Failed to update author');
  return response.json();
};

export const deleteAuthor = async (id) => {
  const response = await fetch(`${API_BASE_URL}/authors.php?id=${id}`, {
    method: 'DELETE'
  });
  if (!response.ok) throw new Error('Failed to delete author');
  return response.json();
};
