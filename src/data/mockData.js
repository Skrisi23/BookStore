// src/data/mockData.js

export const categories = [
  "Minden",
  "Fantasy",
  "Sci-Fi",
  "Krimi",
  "Romantikus",
  "Történelmi",
  "Thriller",
  "Klasszikus"
];



export const mockAuthors = [
  { id: 1, name: "J.R.R. Tolkien", birthYear: 1892, country: "Egyesült Királyság" },
  { id: 2, name: "J.K. Rowling", birthYear: 1965, country: "Egyesült Királyság" },
  { id: 3, name: "George Orwell", birthYear: 1903, country: "Egyesült Királyság" },
  { id: 4, name: "Antoine de Saint-Exupéry", birthYear: 1900, country: "Franciaország" }
];

export const mockUsers = [
  {
    id: 1,
    username: "admin",
    password: "admin123",
    role: "admin",
    name: "Admin Felhasználó",
    email: "admin@bookstore.hu"
  },
  {
    id: 2,
    username: "user",
    password: "user123",
    role: "user",
    name: "Teszt Felhasználó",
    email: "user@bookstore.hu"
  }
];

export const mockRentals = [
  {
    id: 1,
    bookId: 1,
    bookTitle: "A Gyűrűk Ura",
    userId: 2,
    userName: "Teszt Felhasználó",
    rentedDate: "2025-10-15",
    dueDate: "2025-11-15",
    returnedDate: null,
    status: "active" // active, returned, overdue
  },
  {
    id: 2,
    bookId: 3,
    bookTitle: "1984",
    userId: 2,
    userName: "Teszt Felhasználó",
    rentedDate: "2025-10-20",
    dueDate: "2025-11-20",
    returnedDate: null,
    status: "active"
  }
];

export const mockPurchases = [
  {
    id: 1,
    userId: 2,
    userName: "Teszt Felhasználó",
    items: [
      { bookId: 2, bookTitle: "Harry Potter", price: 3200, quantity: 1 }
    ],
    totalPrice: 3200,
    purchaseDate: "2025-10-25",
    status: "completed"
  }
];
