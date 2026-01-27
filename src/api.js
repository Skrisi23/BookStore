// Use relative paths by default; CRA dev server can proxy to backend
const defaultBaseUrl = process.env.REACT_APP_API_URL || "";

const ENDPOINTS = {
  authors: `${defaultBaseUrl}/api/Author`,
  authorById: (id) => `${defaultBaseUrl}/api/Author/${id}`,
  books: `${defaultBaseUrl}/api/Books`,
  bookById: (id) => `${defaultBaseUrl}/api/Books/${id}`,
  bookCategories: `${defaultBaseUrl}/api/Books/categories`,
  booksByCategory: (category) => `${defaultBaseUrl}/api/Books/by-category/${encodeURIComponent(category)}`,
  booksByPrice: `${defaultBaseUrl}/api/Books/by-price`,
  bookPriceStats: `${defaultBaseUrl}/api/Books/price-stats`,
  copies: `${defaultBaseUrl}/api/Copies`,
  rentals: `${defaultBaseUrl}/api/Rentals`,
  users: `${defaultBaseUrl}/api/Users`,
  authLogin: `${defaultBaseUrl}/api/Auth/login`,
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
    throw new Error(`Lekérési hiba ${res.status}: ${text}`);
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

// Új kategória és ár alapú lekérdezések
export async function getCategories(signal) {
  try {
    return await fetchJson(ENDPOINTS.bookCategories, { signal });
  } catch (e) {
    console.error('Kategóriák lekérése sikertelen:', e);
    return [];
  }
}

export async function getBooksByCategory(category, signal) {
  try {
    return await fetchJson(ENDPOINTS.booksByCategory(category), { signal });
  } catch (e) {
    console.error(`Könyvek lekérése kategória alapján (${category}) sikertelen:`, e);
    return [];
  }
}

export async function getBooksByPrice(minAr, maxAr, signal) {
  try {
    const url = `${ENDPOINTS.booksByPrice}?minAr=${minAr}&maxAr=${maxAr}`;
    return await fetchJson(url, { signal });
  } catch (e) {
    console.error(`Könyvek lekérése ár alapján (${minAr}-${maxAr}) sikertelen:`, e);
    return [];
  }
}

export async function getBookPriceStats(signal) {
  try {
    return await fetchJson(ENDPOINTS.bookPriceStats, { signal });
  } catch (e) {
    console.error('Ár statisztikák lekérése sikertelen:', e);
    return { min: 0, max: 10000, avg: 5000 };
  }
}

export async function loginUser(emailOrUsername, password, signal) {
  try {
    const response = await fetch(ENDPOINTS.authLogin, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        Email: emailOrUsername,
        Jelszo: password
      }),
      signal
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data.message || 'Bejelentkezés sikertelen'
      };
    }

    // Backend LoginResponse: { Success, Message, User: { Id, Nev, Email, Letrehozva } }
    if (data.success) {
      return {
        success: true,
        user: {
          id: data.user.id,
          nev: data.user.nev,
          email: data.user.email,
          letrehozva: data.user.letrehozva
        }
      };
    }

    return {
      success: false,
      message: data.message || 'Bejelentkezés sikertelen'
    };
  } catch (e) {
    console.error('Bejelentkezési hiba:', e);
    return {
      success: false,
      message: e.name === 'AbortError' ? 'Kérés megszakítva' : 'Bejelentkezés során hiba történt'
    };
  }
}