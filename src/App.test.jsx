import { render, screen, fireEvent, waitFor } from '@testing-library/react';

jest.mock('./context/ToastContext', () => ({
  useToast: () => ({
    success: jest.fn(),
    warning: jest.fn(),
    error: jest.fn(),
    info: jest.fn(),
  }),
  ToastProvider: ({ children }) => <>{children}</>,
}));

jest.mock('./context/AuthContext', () => ({
  useAuth: () => ({
    login: jest.fn().mockResolvedValue({ success: false, message: 'Hibás e-mail cím vagy jelszó' }),
    isAuthenticated: false,
    currentUser: null,
  }),
}));

jest.mock('./context/CartContext', () => ({
  useCart: () => ({
    cartItems: [],
    getTotalPrice: () => 0,
    clearCart: jest.fn(),
    loading: false,
  }),
}));

jest.mock('./api', () => ({
  registerUser: jest.fn(),
  resendVerificationEmail: jest.fn(),
}));

import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Cart from './components/cart/Cart';

describe('Login komponens', () => {
  test('A bejelentkezési űrlap renderelődik és a jelszó megjelenítés gomb működik', () => {
    render(<Login onSuccess={jest.fn()} onSwitchToRegister={jest.fn()} />);

    expect(screen.getByPlaceholderText('pelda@email.com')).toBeInTheDocument();
    expect(screen.getByText('Email cím')).toBeInTheDocument();
    expect(screen.getByText('Jelszó')).toBeInTheDocument();

    const passwordInput = screen.getByPlaceholderText('••••••');
    fireEvent.change(passwordInput, { target: { value: 'TesztJelszo123' } });
    expect(passwordInput.value).toBe('TesztJelszo123');
    expect(passwordInput.type).toBe('password');

    fireEvent.click(screen.getByTitle('Jelszó megjelenítése'));
    expect(passwordInput.type).toBe('text');
  });
});

describe('Register komponens', () => {
  test('Nem egyező jelszó esetén hibaüzenet jelenik meg', async () => {
    render(<Register onSuccess={jest.fn()} onSwitchToLogin={jest.fn()} />);

    fireEvent.change(screen.getByPlaceholderText('pl. Kovács'), { target: { value: 'Teszt' } });
    fireEvent.change(screen.getByPlaceholderText('pl. János'), { target: { value: 'Elek' } });
    fireEvent.change(document.querySelector('input[name="email"]'), { target: { value: 'teszt@teszt.hu' } });

    const passwordInputs = document.querySelectorAll('input[type="password"]');
    fireEvent.change(passwordInputs[0], { target: { value: 'Jelszo123' } });
    fireEvent.change(passwordInputs[1], { target: { value: 'MasikJelszo' } });

    fireEvent.click(screen.getByRole('button', { name: /Regisztráció/i }));

    await waitFor(() => {
      expect(screen.getByText('A jelszavak nem egyeznek!')).toBeInTheDocument();
    });
  });
});

describe('Cart komponens', () => {
  test('Üres kosár esetén a megfelelő üzenet és a Böngészés link megjelenik', () => {
    render(<Cart onCheckout={jest.fn()} />);

    expect(screen.getByText('A kosár üres')).toBeInTheDocument();
    expect(screen.getByText('Adj hozzá könyveket a böngészés során!')).toBeInTheDocument();
    const browseLink = screen.getByText('Böngészés');
    expect(browseLink).toBeInTheDocument();
    expect(browseLink.getAttribute('href')).toBe('/books');
  });
});
