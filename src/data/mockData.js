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

export const mockBooks = [
  {
    id: 1,
    title: "A Gyűrűk Ura",
    author: "J.R.R. Tolkien",
    category: "Fantasy",
    year: 1954,
    isbn: "978-0-618-00222-1",
    price: 4500,
    available: true,
    availableForRent: true,
    rentalPrice: 500,
    coverImage: "https://via.placeholder.com/200x300?text=LOTR",
    description: "Egy epikus fantasy kaland a Középföldén..."
  },
  {
    id: 2,
    title: "Harry Potter és a Bölcsek Köve",
    author: "J.K. Rowling",
    category: "Fantasy",
    year: 1997,
    isbn: "978-0-439-70818-8",
    price: 3200,
    available: true,
    availableForRent: true,
    rentalPrice: 400,
    coverImage: "https://via.placeholder.com/200x300?text=HP",
    description: "Harry Potter felfedezi, hogy varázsló..."
  },
  {
    id: 3,
    title: "1984",
    author: "George Orwell",
    category: "Klasszikus",
    year: 1949,
    isbn: "978-0-452-28423-4",
    price: 2800,
    available: true,
    availableForRent: true,
    rentalPrice: 350,
    coverImage: "https://via.placeholder.com/200x300?text=1984",
    description: "Egy disztópikus víziója a jövőnek..."
  },
  {
    id: 4,
    title: "Dűne",
    author: "Frank Herbert",
    category: "Sci-Fi",
    year: 1965,
    isbn: "978-0-441-17271-9",
    price: 5200,
    available: true,
    availableForRent: true,
    rentalPrice: 600,
    coverImage: "https://via.placeholder.com/200x300?text=Dune",
    description: "Sci-fi eposz a sivatagi bolygón..."
  },
  {
    id: 5,
    title: "A Da Vinci-kód",
    author: "Dan Brown",
    category: "Thriller",
    year: 2003,
    isbn: "978-0-307-47467-1",
    price: 3500,
    available: false,
    availableForRent: false,
    rentalPrice: 450,
    coverImage: "https://via.placeholder.com/200x300?text=DaVinci",
    description: "Rejtélyek és kódok a történelemben..."
  }
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
