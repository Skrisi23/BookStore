const defaultBaseUrl = process.env.REACT_APP_API_URL || "http://localhost:5000";

const ENDPOINTS = {
  authors: `${defaultBaseUrl}/api/Author`,
  authorById: (id) => `${defaultBaseUrl}/api/Author/${id}`,
  books: `${defaultBaseUrl}/Api/Books`, // ha a backend /api/Books, módosítsd ide
  bookById: (id) => `${defaultBaseUrl}/Api/Books/${id}`,
  copies: `${defaultBaseUrl}/api/Copies`,
  rentals: `${defaultBaseUrl}/api/Rentals`,
  users: `${defaultBaseUrl}/api/Users`,
};

async function fetchJson(url, options = {}) {
  const res = await fetch(url, options);
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Fetch error ${res.status}: ${text}`);
  }
  return res.json();
}

export async function getAuthors(signal) {
  return fetchJson(ENDPOINTS.authors, { signal });
}
export async function getAuthorById(id, signal) {
  return fetchJson(ENDPOINTS.authorById(id), { signal });
}
export async function getBooks(signal) {
  return fetchJson(ENDPOINTS.books, { signal });
}
export async function getBookById(id, signal) {
  return fetchJson(ENDPOINTS.bookById(id), { signal });
}
export async function getCopies(signal) {
  return fetchJson(ENDPOINTS.copies, { signal });
}
export async function getRentals(signal) {
  return fetchJson(ENDPOINTS.rentals, { signal });
}
export async function getUsers(signal) {
  return fetchJson(ENDPOINTS.users, { signal });
}