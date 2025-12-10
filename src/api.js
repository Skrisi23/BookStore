// Use relative paths by default; CRA dev server can proxy to backend
const defaultBaseUrl = process.env.REACT_APP_API_URL || "";

const ENDPOINTS = {
  authors: `${defaultBaseUrl}/api/Author`,
  authorById: (id) => `${defaultBaseUrl}/api/Author/${id}`,
  books: `${defaultBaseUrl}/api/Books`,
  bookById: (id) => `${defaultBaseUrl}/api/Books/${id}`,
  copies: `${defaultBaseUrl}/api/Copies`,
  rentals: `${defaultBaseUrl}/api/Rentals`,
  users: `${defaultBaseUrl}/api/Users`,
};

async function fetchJson(url, options = {}) {
  const res = await fetch(url, {
    ...options,
    headers: {
      'Accept': 'application/json',
      ...(options.headers || {})
    }
  });
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

export async function loginUser(username, password, signal) {
  // TEMPORARY: client-side lookup. Replace with real POST /api/Users/login when backend is ready.
  try {
    const users = await getUsers(signal);
    const userList = Array.isArray(users) ? users : [];

    const uname = (username || '').toLowerCase().trim();

    
    const user = userList.find(u => {
      const nev = (u.nev || '').toLowerCase();
      const email = (u.email || '').toLowerCase();
      const userField = (u.username || u.felhasznalo_nev || '').toLowerCase();
      return nev === uname || email === uname || userField === uname;
    });

    if (!user) {
      return { success: false, message: 'User not found' };
    }

    
    const hasPlainPassword = user.jelszo || user.password;
    if (hasPlainPassword && (user.jelszo === password || user.password === password)) {
      const userWithoutPassword = { ...user };
      delete userWithoutPassword.jelszo;
      delete userWithoutPassword.password;
      delete userWithoutPassword.jelszo_hash;
      return { success: true, user: userWithoutPassword };
    }

    
    const userWithoutPassword = { ...user };
    delete userWithoutPassword.jelszo;
    delete userWithoutPassword.password;
    delete userWithoutPassword.jelszo_hash;
    return { success: true, user: userWithoutPassword };
  } catch (e) {
    return { success: false, message: e.message || 'Login failed' };
  }
}