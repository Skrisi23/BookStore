// Mock data for books
const mockBooks = [
    {
        id: '1',
        title: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
        genre: 'Classic Literature',
        type: 'both',
        rentPrice: 4.99,
        buyPrice: 12.99,
        coverImage: 'https://images.unsplash.com/photo-1661936901394-a993c79303c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rJTIwY292ZXIlMjBmaWN0aW9ufGVufDF8fHx8MTc1Nzc2NzY0MXww&ixlib=rb-4.1.0&q=80&w=1080',
        rating: 4.2,
        available: true,
        description: 'A classic American novel set in the Jazz Age.'
    },
    {
        id: '2',
        title: 'Modern Web Development',
        author: 'Jane Smith',
        genre: 'Technology',
        type: 'ebook',
        rentPrice: 7.99,
        buyPrice: 29.99,
        coverImage: 'https://images.unsplash.com/photo-1725870475677-7dc91efe9f93?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2llbmNlJTIwdGV4dGJvb2t8ZW58MXx8fHwxNzU3Nzk0Mzk0fDA&ixlib=rb-4.1.0&q=80&w=1080',
        rating: 4.8,
        available: true,
        description: 'Comprehensive guide to modern web development practices.'
    },
    {
        id: '3',
        title: 'Mystery at Midnight',
        author: 'Robert Johnson',
        genre: 'Mystery',
        type: 'physical',
        rentPrice: 3.99,
        buyPrice: 15.99,
        coverImage: 'https://images.unsplash.com/photo-1661936901394-a993c79303c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rJTIwY292ZXIlMjBmaWN0aW9ufGVufDF8fHx8MTc1Nzc2NzY0MXww&ixlib=rb-4.1.0&q=80&w=1080',
        rating: 4.5,
        available: true,
        description: 'A thrilling mystery that will keep you guessing until the end.'
    },
    {
        id: '4',
        title: 'Data Science Fundamentals',
        author: 'Dr. Sarah Wilson',
        genre: 'Science',
        type: 'both',
        rentPrice: 8.99,
        buyPrice: 34.99,
        coverImage: 'https://images.unsplash.com/photo-1725870475677-7dc91efe9f93?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2llbmNlJTIwdGV4dGJvb2t8ZW58MXx8fHwxNzU3Nzk0Mzk0fDA&ixlib=rb-4.1.0&q=80&w=1080',
        rating: 4.6,
        available: true,
        description: 'Learn the fundamentals of data science with practical examples.'
    },
    {
        id: '5',
        title: 'The Art of Fiction',
        author: 'Literary Masters',
        genre: 'Writing',
        type: 'ebook',
        rentPrice: 5.99,
        buyPrice: 19.99,
        coverImage: 'https://images.unsplash.com/photo-1755188977089-3bb40306d57f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGFzc2ljJTIwbGl0ZXJhdHVyZSUyMGJvb2tzfGVufDF8fHx8MTc1Nzc4NTc2MHww&ixlib=rb-4.1.0&q=80&w=1080',
        rating: 4.3,
        available: false,
        description: 'Master the craft of fiction writing with expert guidance.'
    },
    {
        id: '6',
        title: 'Cooking Around the World',
        author: 'Chef Maria Rodriguez',
        genre: 'Cooking',
        type: 'physical',
        rentPrice: 4.99,
        buyPrice: 22.99,
        coverImage: 'https://images.unsplash.com/photo-1661936901394-a993c79303c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rJTIwY292ZXIlMjBmaWN0aW9ufGVufDF8fHx8MTc1Nzc2NzY0MXww&ixlib=rb-4.1.0&q=80&w=1080',
        rating: 4.7,
        available: true,
        description: 'Explore international cuisines with over 200 recipes.'
    },
    {
        id: '7',
        title: 'Philosophy of Mind',
        author: 'Dr. Thomas Brown',
        genre: 'Philosophy',
        type: 'both',
        rentPrice: 6.99,
        buyPrice: 24.99,
        coverImage: 'https://images.unsplash.com/photo-1755188977089-3bb40306d57f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGFzc2ljJTIwbGl0ZXJhdHVyZSUyMGJvb2tzfGVufDF8fHx8MTc1Nzc4NTc2MHww&ixlib=rb-4.1.0&q=80&w=1080',
        rating: 4.1,
        available: true,
        description: 'Explore consciousness, cognition, and the nature of mind.'
    },
    {
        id: '8',
        title: 'Digital Photography Guide',
        author: 'Alex Turner',
        genre: 'Photography',
        type: 'ebook',
        rentPrice: 5.99,
        buyPrice: 18.99,
        coverImage: 'https://images.unsplash.com/photo-1725870475677-7dc91efe9f93?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2llbmNlJTIwdGV4dGJvb2t8ZW58MXx8fHwxNzU3Nzk0Mzk0fDA&ixlib=rb-4.1.0&q=80&w=1080',
        rating: 4.4,
        available: true,
        description: 'Master digital photography techniques and composition.'
    }
];

// Application state
let currentLanguage = 'en';
let currentUser = null;
let isAdminLoggedIn = false;
let cartItems = [];
let filteredBooks = [...mockBooks];

// Translation object
const translations = {
    en: {
        signIn: 'Sign In',
        signUp: 'Sign Up',
        signOut: 'Sign Out',
        email: 'Email',
        password: 'Password',
        fullName: 'Full Name',
        dontHaveAccount: "Don't have an account?",
        alreadyHaveAccount: "Already have an account?",
        rent: 'Rent',
        buy: 'Buy',
        unavailable: 'Unavailable',
        addedToCart: 'Added to cart',
        removedFromCart: 'Removed from cart',
        checkout: 'Checkout successful!',
        invalidCredentials: 'Invalid credentials',
        loginSuccessful: 'Login successful!',
        registerSuccessful: 'Registration successful!',
        adminPanel: 'Admin Panel'
    },
    hu: {
        signIn: 'Bejelentkezés',
        signUp: 'Regisztráció',
        signOut: 'Kijelentkezés',
        email: 'E-mail',
        password: 'Jelszó',
        fullName: 'Teljes név',
        dontHaveAccount: "Nincs még fiókja?",
        alreadyHaveAccount: "Már van fiókja?",
        rent: 'Bérlés',
        buy: 'Vásárlás',
        unavailable: 'Nem elérhető',
        addedToCart: 'Kosárhoz adva',
        removedFromCart: 'Eltávolítva a kosárból',
        checkout: 'Sikeres vásárlás!',
        invalidCredentials: 'Helytelen adatok',
        loginSuccessful: 'Sikeres bejelentkezés!',
        registerSuccessful: 'Sikeres regisztráció!',
        adminPanel: 'Admin panel'
    }
};

// Utility functions
function t(key) {
    return translations[currentLanguage][key] || key;
}

function showToast(message, type = 'success') {
    const toastContainer = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    
    toastContainer.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let starsHTML = '';
    
    for (let i = 0; i < fullStars; i++) {
        starsHTML += '<i class="fas fa-star"></i>';
    }
    
    if (hasHalfStar) {
        starsHTML += '<i class="fas fa-star-half-alt"></i>';
    }
    
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
        starsHTML += '<i class="far fa-star"></i>';
    }
    
    return starsHTML;
}

function scrollToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
}

// Book rendering functions
function renderBooks(books = filteredBooks) {
    const bookGrid = document.getElementById('bookGrid');
    
    if (books.length === 0) {
        bookGrid.innerHTML = '<p class="text-center">No books found.</p>';
        return;
    }
    
    bookGrid.innerHTML = books.map(book => `
        <div class="book-card ${!book.available ? 'unavailable' : ''}">
            <img src="${book.coverImage}" alt="${book.title}" class="book-cover" 
                 onerror="this.src='https://via.placeholder.com/280x200?text=No+Image'">
            <div class="book-info">
                <h3 class="book-title">${book.title}</h3>
                <p class="book-author">by ${book.author}</p>
                <span class="book-genre">${book.genre}</span>
                <span class="book-type">${book.type}</span>
                <div class="book-rating">
                    <span class="stars">${generateStars(book.rating)}</span>
                    <span>${book.rating}</span>
                </div>
                <p>${book.description}</p>
                ${book.available ? `
                    <div class="book-actions">
                        ${book.type !== 'physical' ? `
                            <button class="rent-btn" onclick="addToCart('${book.id}', 'rent')">
                                ${t('rent')} $${book.rentPrice}
                            </button>
                        ` : ''}
                        <button class="buy-btn" onclick="addToCart('${book.id}', 'buy')">
                            ${t('buy')} $${book.buyPrice}
                        </button>
                    </div>
                ` : `<p class="text-muted">${t('unavailable')}</p>`}
            </div>
        </div>
    `).join('');
}

function filterBooks() {
    const searchQuery = document.getElementById('searchInput').value.toLowerCase();
    const genreFilter = document.getElementById('genreFilter').value;
    const typeFilter = document.getElementById('typeFilter').value;
    const sortFilter = document.getElementById('sortFilter').value;
    
    let filtered = mockBooks.filter(book => {
        const matchesSearch = book.title.toLowerCase().includes(searchQuery) ||
                             book.author.toLowerCase().includes(searchQuery);
        const matchesGenre = !genreFilter || book.genre === genreFilter;
        const matchesType = !typeFilter || book.type === typeFilter;
        
        return matchesSearch && matchesGenre && matchesType;
    });
    
    // Sort books
    filtered.sort((a, b) => {
        switch (sortFilter) {
            case 'author':
                return a.author.localeCompare(b.author);
            case 'rating':
                return b.rating - a.rating;
            case 'price':
                return a.buyPrice - b.buyPrice;
            default:
                return a.title.localeCompare(b.title);
        }
    });
    
    filteredBooks = filtered;
    renderBooks(filtered);
}

// Cart functions
function addToCart(bookId, action) {
    const book = mockBooks.find(b => b.id === bookId);
    if (!book) return;
    
    const price = action === 'rent' ? book.rentPrice : book.buyPrice;
    const itemId = `${book.id}-${action}`;
    
    const existingItem = cartItems.find(item => item.id === itemId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cartItems.push({
            id: itemId,
            bookId: book.id,
            title: book.title,
            author: book.author,
            coverImage: book.coverImage,
            action: action,
            price: price,
            quantity: 1,
            type: book.type
        });
    }
    
    updateCartDisplay();
    showToast(`${book.title} - ${t(action)} ${t('addedToCart')}`);
}

function updateCartQuantity(itemId, change) {
    const item = cartItems.find(item => item.id === itemId);
    if (!item) return;
    
    item.quantity += change;
    
    if (item.quantity <= 0) {
        removeFromCart(itemId);
        return;
    }
    
    updateCartDisplay();
}

function removeFromCart(itemId) {
    cartItems = cartItems.filter(item => item.id !== itemId);
    updateCartDisplay();
    showToast(t('removedFromCart'));
}

function updateCartDisplay() {
    const cartCount = document.getElementById('cartCount');
    const cartItems_el = document.getElementById('cartItems');
    const cartEmpty = document.getElementById('cartEmpty');
    const cartFooter = document.getElementById('cartFooter');
    const cartTotal = document.getElementById('cartTotal');
    
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    cartCount.textContent = totalItems;
    cartTotal.textContent = totalPrice.toFixed(2);
    
    if (cartItems.length === 0) {
        cartItems_el.style.display = 'none';
        cartEmpty.style.display = 'block';
        cartFooter.style.display = 'none';
    } else {
        cartItems_el.style.display = 'block';
        cartEmpty.style.display = 'none';
        cartFooter.style.display = 'flex';
        
        cartItems_el.innerHTML = cartItems.map(item => `
            <div class="cart-item">
                <img src="${item.coverImage}" alt="${item.title}" class="cart-item-image"
                     onerror="this.src='https://via.placeholder.com/60x80?text=No+Image'">
                <div class="cart-item-info">
                    <div class="cart-item-title">${item.title}</div>
                    <div class="cart-item-author">by ${item.author}</div>
                    <span class="cart-item-action">${t(item.action)}</span>
                    <div class="cart-item-controls">
                        <button class="quantity-btn" onclick="updateCartQuantity('${item.id}', -1)">-</button>
                        <span>${item.quantity}</span>
                        <button class="quantity-btn" onclick="updateCartQuantity('${item.id}', 1)">+</button>
                        <span style="margin-left: auto;">$${(item.price * item.quantity).toFixed(2)}</span>
                        <button class="remove-btn" onclick="removeFromCart('${item.id}')">Remove</button>
                    </div>
                </div>
            </div>
        `).join('');
    }
}

function checkout() {
    if (cartItems.length === 0) return;
    
    cartItems = [];
    updateCartDisplay();
    closeModal('cartModal');
    showToast(t('checkout'));
}

// Modal functions
function showModal(modalId) {
    document.getElementById(modalId).classList.add('show');
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('show');
}

// Authentication functions
let isSignUp = false;

function toggleAuthMode() {
    isSignUp = !isSignUp;
    const authTitle = document.getElementById('authTitle');
    const authSubmit = document.getElementById('authSubmit');
    const authSwitchText = document.getElementById('authSwitchText');
    const authSwitchBtn = document.getElementById('authSwitchBtn');
    const nameGroup = document.getElementById('nameGroup');
    
    if (isSignUp) {
        authTitle.textContent = t('signUp');
        authSubmit.textContent = t('signUp');
        authSwitchText.textContent = t('alreadyHaveAccount');
        authSwitchBtn.textContent = t('signIn');
        nameGroup.style.display = 'block';
    } else {
        authTitle.textContent = t('signIn');
        authSubmit.textContent = t('signIn');
        authSwitchText.textContent = t('dontHaveAccount');
        authSwitchBtn.textContent = t('signUp');
        nameGroup.style.display = 'none';
    }
}

function handleAuth(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const name = document.getElementById('name').value;
    
    if (isSignUp) {
        // Mock registration
        currentUser = { email, name };
        showToast(t('registerSuccessful'));
    } else {
        // Mock login
        currentUser = { email, name: email.split('@')[0] };
        showToast(t('loginSuccessful'));
    }
    
    updateAuthDisplay();
    closeModal('authModal');
    document.getElementById('authForm').reset();
}

function signOut() {
    currentUser = null;
    updateAuthDisplay();
    showToast('Signed out successfully');
}

function updateAuthDisplay() {
    const authBtn = document.getElementById('authBtn');
    
    if (currentUser) {
        authBtn.textContent = currentUser.name || t('signOut');
        authBtn.onclick = signOut;
    } else {
        authBtn.textContent = t('signIn');
        authBtn.onclick = () => showModal('authModal');
    }
}

// Admin functions
function showAdminLogin() {
    const email = prompt('Admin Email:');
    const password = prompt('Admin Password:');
    
    if (email === 'admin@library.com' && password === 'admin123') {
        isAdminLoggedIn = true;
        showAdminPanel();
        showToast('Admin login successful');
    } else {
        showToast(t('invalidCredentials'), 'error');
    }
}

function showAdminPanel() {
    document.getElementById('adminPanel').style.display = 'flex';
    showAdminView('dashboard');
}

function hideAdminPanel() {
    document.getElementById('adminPanel').style.display = 'none';
    isAdminLoggedIn = false;
}

function showAdminView(view) {
    const adminView = document.getElementById('adminView');
    const navBtns = document.querySelectorAll('.admin-nav-btn');
    
    navBtns.forEach(btn => btn.classList.remove('active'));
    document.querySelector(`[data-view="${view}"]`).classList.add('active');
    
    switch (view) {
        case 'dashboard':
            adminView.innerHTML = `
                <h1>Dashboard</h1>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin: 2rem 0;">
                    <div style="background: var(--card-background); padding: 1.5rem; border-radius: var(--radius); border: 1px solid var(--border-color);">
                        <h3>Total Books</h3>
                        <p style="font-size: 2rem; font-weight: 600; color: var(--primary-color);">${mockBooks.length}</p>
                    </div>
                    <div style="background: var(--card-background); padding: 1.5rem; border-radius: var(--radius); border: 1px solid var(--border-color);">
                        <h3>Available Books</h3>
                        <p style="font-size: 2rem; font-weight: 600; color: var(--success-color);">${mockBooks.filter(b => b.available).length}</p>
                    </div>
                    <div style="background: var(--card-background); padding: 1.5rem; border-radius: var(--radius); border: 1px solid var(--border-color);">
                        <h3>Cart Items</h3>
                        <p style="font-size: 2rem; font-weight: 600; color: var(--primary-color);">${cartItems.length}</p>
                    </div>
                    <div style="background: var(--card-background); padding: 1.5rem; border-radius: var(--radius); border: 1px solid var(--border-color);">
                        <h3>Revenue</h3>
                        <p style="font-size: 2rem; font-weight: 600; color: var(--success-color);">$1,234</p>
                    </div>
                </div>
            `;
            break;
        case 'books':
            adminView.innerHTML = `
                <h1>Book Management</h1>
                <p>Total Books: ${mockBooks.length}</p>
                <div style="margin: 2rem 0;">
                    <table style="width: 100%; border-collapse: collapse;">
                        <thead>
                            <tr style="background: var(--secondary-color);">
                                <th style="padding: 1rem; text-align: left; border: 1px solid var(--border-color);">Title</th>
                                <th style="padding: 1rem; text-align: left; border: 1px solid var(--border-color);">Author</th>
                                <th style="padding: 1rem; text-align: left; border: 1px solid var(--border-color);">Genre</th>
                                <th style="padding: 1rem; text-align: left; border: 1px solid var(--border-color);">Type</th>
                                <th style="padding: 1rem; text-align: left; border: 1px solid var(--border-color);">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${mockBooks.map(book => `
                                <tr>
                                    <td style="padding: 1rem; border: 1px solid var(--border-color);">${book.title}</td>
                                    <td style="padding: 1rem; border: 1px solid var(--border-color);">${book.author}</td>
                                    <td style="padding: 1rem; border: 1px solid var(--border-color);">${book.genre}</td>
                                    <td style="padding: 1rem; border: 1px solid var(--border-color);">${book.type}</td>
                                    <td style="padding: 1rem; border: 1px solid var(--border-color);">
                                        <span style="background: ${book.available ? 'var(--success-color)' : 'var(--destructive-color)'}; color: white; padding: 0.25rem 0.5rem; border-radius: calc(var(--radius) / 2); font-size: 0.75rem;">
                                            ${book.available ? 'Available' : 'Unavailable'}
                                        </span>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            `;
            break;
        case 'orders':
            adminView.innerHTML = `
                <h1>Order Management</h1>
                <p>Recent orders and rental tracking</p>
                <div style="margin: 2rem 0;">
                    <p style="color: var(--text-muted);">No orders yet. This would show customer orders and rental due dates.</p>
                </div>
            `;
            break;
        case 'users':
            adminView.innerHTML = `
                <h1>User Management</h1>
                <p>Manage registered users and their accounts</p>
                <div style="margin: 2rem 0;">
                    <p style="color: var(--text-muted);">No registered users yet. This would show user accounts and their rental history.</p>
                </div>
            `;
            break;
    }
}

// Language switching
function switchLanguage(lang) {
    currentLanguage = lang;
    
    // Update UI text
    updateAuthDisplay();
    renderBooks();
    
    // Update form labels
    document.querySelector('label[for="email"]').textContent = t('email') + ':';
    document.querySelector('label[for="password"]').textContent = t('password') + ':';
    document.querySelector('label[for="name"]').textContent = t('fullName') + ':';
    
    showToast(`Language switched to ${lang === 'en' ? 'English' : 'Magyar'}`);
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Search and filter events
    document.getElementById('searchInput').addEventListener('input', filterBooks);
    document.getElementById('genreFilter').addEventListener('change', filterBooks);
    document.getElementById('typeFilter').addEventListener('change', filterBooks);
    document.getElementById('sortFilter').addEventListener('change', filterBooks);
    
    // Language selection
    document.getElementById('languageSelect').addEventListener('change', function(e) {
        switchLanguage(e.target.value);
    });
    
    // Cart events
    document.getElementById('cartBtn').addEventListener('click', () => showModal('cartModal'));
    document.getElementById('closeCart').addEventListener('click', () => closeModal('cartModal'));
    document.getElementById('checkoutBtn').addEventListener('click', checkout);
    
    // Auth events
    document.getElementById('authBtn').addEventListener('click', () => showModal('authModal'));
    document.getElementById('closeAuth').addEventListener('click', () => closeModal('authModal'));
    document.getElementById('authForm').addEventListener('submit', handleAuth);
    document.getElementById('authSwitchBtn').addEventListener('click', toggleAuthMode);
    
    // Admin events
    document.getElementById('adminLink').addEventListener('click', showAdminLogin);
    document.getElementById('adminLogout').addEventListener('click', hideAdminPanel);
    
    // Admin navigation
    document.querySelectorAll('.admin-nav-btn[data-view]').forEach(btn => {
        btn.addEventListener('click', () => showAdminView(btn.dataset.view));
    });
    
    // Close modals when clicking outside
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.remove('show');
            }
        });
    });
    
    // Check for admin mode in URL
    if (window.location.hash === '#admin') {
        showAdminLogin();
    }
    
    // Initialize
    renderBooks();
    updateCartDisplay();
    updateAuthDisplay();
});

// Make functions globally accessible
window.addToCart = addToCart;
window.updateCartQuantity = updateCartQuantity;
window.removeFromCart = removeFromCart;
window.scrollToSection = scrollToSection;
window.showAdminView = showAdminView;