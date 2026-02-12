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
  authRegister: `${defaultBaseUrl}/api/Auth/register`,
  authVerifyEmail: `${defaultBaseUrl}/api/Auth/verify-email`,
  // Cart endpoints
  cartMyCart: (userId) => `${defaultBaseUrl}/api/Cart/my-cart?userId=${userId}`,
  cartAdd: (userId) => `${defaultBaseUrl}/api/Cart/add?userId=${userId}`,
  cartRemoveItem: (cartItemId, userId) => `${defaultBaseUrl}/api/Cart/item/${cartItemId}?userId=${userId}`,
  cartClear: (userId) => `${defaultBaseUrl}/api/Cart/clear?userId=${userId}`,
  cartCheckout: `${defaultBaseUrl}/api/Cart/checkout`,
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

export async function registerUser(name, email, password, signal) {
  try {
    const response = await fetch(ENDPOINTS.authRegister, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        Nev: name,
        Email: email,
        Jelszo: password
      }),
      signal
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data.message || 'Regisztráció sikertelen'
      };
    }

    // Backend RegisterResponse: { Success, Message, User: { Id, Nev, Email, Letrehozva } }
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
      message: data.message || 'Regisztráció sikertelen'
    };
  } catch (e) {
    console.error('Regisztrációs hiba:', e);
    return {
      success: false,
      message: e.name === 'AbortError' ? 'Kérés megszakítva' : 'Regisztráció során hiba történt'
    };
  }
}
// ==================== CART API ====================

/**
 * Aktív kosár lekérdezése (automatikusan létrehozza, ha nincs)
 */
export async function getMyCart(userId, signal) {
  try {
    return await fetchJson(ENDPOINTS.cartMyCart(userId), { signal });
  } catch (e) {
    console.error('Kosár lekérése sikertelen:', e);
    throw e;
  }
}

/**
 * Könyv hozzáadása a kosárhoz
 */
export async function addToCart(userId, bookId, signal) {
  try {
    const response = await fetch(ENDPOINTS.cartAdd(userId), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        book_id: bookId,
        quantity: 1
      }),
      signal
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data.message || 'Kosárba helyezés sikertelen'
      };
    }

    return {
      success: true,
      cart: data
    };
  } catch (e) {
    console.error('Kosárba helyezési hiba:', e);
    return {
      success: false,
      message: e.name === 'AbortError' ? 'Kérés megszakítva' : 'Hiba történt'
    };
  }
}

/**
 * Elem eltávolítása a kosárból
 */
export async function removeFromCart(cartItemId, userId, signal) {
  try {
    const response = await fetch(ENDPOINTS.cartRemoveItem(cartItemId, userId), {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
      },
      signal
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data.message || 'Törlés sikertelen'
      };
    }

    return {
      success: true,
      cart: data
    };
  } catch (e) {
    console.error('Törlési hiba:', e);
    return {
      success: false,
      message: e.name === 'AbortError' ? 'Kérés megszakítva' : 'Hiba történt'
    };
  }
}

/**
 * Kosár kiürítése
 */
export async function clearCart(userId, signal) {
  try {
    const response = await fetch(ENDPOINTS.cartClear(userId), {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
      },
      signal
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data.message || 'Kosár kiürítése sikertelen'
      };
    }

    return {
      success: true,
      cart: data
    };
  } catch (e) {
    console.error('Kosár kiürítési hiba:', e);
    return {
      success: false,
      message: e.name === 'AbortError' ? 'Kérés megszakítva' : 'Hiba történt'
    };
  }
}

/**
 * Checkout - Fizetés és kölcsönzés létrehozása
 */
export async function checkout(userId, paymentMethod, transactionId = null, rentalDays = 14, signal) {
  try {
    const response = await fetch(ENDPOINTS.cartCheckout, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        user_id: userId,
        payment_method: paymentMethod,
        transaction_id: transactionId,
        rental_days: rentalDays
      }),
      signal
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data.message || 'Checkout sikertelen',
        unavailable_books: data.unavailable_books || null
      };
    }

    return {
      success: true,
      payment: data.payment,
      rentals: data.rentals,
      message: data.message
    };
  } catch (e) {
    console.error('Checkout hiba:', e);
    return {
      success: false,
      message: e.name === 'AbortError' ? 'Kérés megszakítva' : 'Hiba történt a fizetés során'
    };
  }
}
export async function verifyEmail(token, signal) {
  try {
    const response = await fetch(ENDPOINTS.authVerifyEmail, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        Token: token
      }),
      signal
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data.message || 'Email verifikáció sikertelen'
      };
    }

    // Backend VerifyEmailResponse: { Success, Message }
    return {
      success: data.success,
      message: data.message || 'Email sikeresen verifikálva'
    };
  } catch (e) {
    console.error('Email verifikációs hiba:', e);
    return {
      success: false,
      message: e.name === 'AbortError' ? 'Kérés megszakítva' : 'Email verifikáció során hiba történt'
    };
  }
}