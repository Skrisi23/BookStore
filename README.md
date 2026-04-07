#  AlkotásokTára – Frontend

React alapú webes felhasználói felület az AlkotásokTára alkalmazáshoz.

## Technológiák

- **React 19** – UI framework
- **React Router 7** – Kliens oldali routing
- **Bootstrap 5** – CSS keretrendszer + ikonok
- **Create React App** – Build toolchain

---

## Indítás

### 1. Függőségek telepítése

```bash
npm install
```

### 2. Környezeti változók beállítása

Hozz létre egy `.env` fájlt a gyökérkönyvtárban:

```
REACT_APP_API_URL=http://localhost:5250
```

> Ez a backend API URL-je. Ha a backend más porton fut, módosítsd ennek megfelelően.

### 3. Alkalmazás indítása

```bash
npm start
```

Az alkalmazás elérhető: [http://localhost:3000](http://localhost:3000)

### 4. Build (produkciós verzió)

```bash
npm run build
```

A build kimenet a `build/` mappába kerül.

### 5. Tesztek futtatása

```bash
npm test
```

---

## Mappastruktúra

```
Frontend/
├── public/                        # Statikus fájlok (index.html, favicon, stb.)
├── build/                         # Produkciós build kimenet
├── .env                           # Környezeti változók (API URL)
├── package.json                   # Függőségek és scriptek
└── src/
    ├── App.jsx                    # Fő alkalmazás komponens (routing)
    ├── App.css                    # Globális stílusok
    ├── api.jsx                    # API végpontok definíciója
    ├── index.jsx                  # Belépési pont (React DOM render)
    ├── index.css                  # Alap CSS
    │
    ├── components/                # Újrafelhasználható komponensek
    │   ├── admin/                 # Admin felület komponensei
    │   │   ├── Dashboard.jsx      #   Admin főoldal / áttekintés
    │   │   ├── BookManagement.jsx #   Könyvek kezelése (CRUD)
    │   │   ├── RentalManagement.jsx # Kölcsönzések kezelése
    │   │   ├── PurchaseManagement.jsx # Vásárlások kezelése
    │   │   └── Statistics.jsx     #   Statisztikák megjelenítése
    │   │
    │   ├── auth/                  # Hitelesítés
    │   │   ├── Login.jsx          #   Bejelentkezési űrlap
    │   │   ├── Register.jsx       #   Regisztrációs űrlap
    │   │   └── EmailVerification.jsx # Email cím megerősítése
    │   │
    │   ├── books/                 # Könyvekkel kapcsolatos komponensek
    │   │   ├── BookList.jsx       #   Könyvek listája
    │   │   ├── BookCard.jsx       #   Egyedi könyvkártya
    │   │   ├── BookDetails.jsx    #   Könyv részletei
    │   │   ├── BookDetails.css    #   Könyv részletek stílusok
    │   │   └── CategoryFilter.jsx #   Kategória szűrő
    │   │
    │   ├── cart/                  # Kosár
    │   │   ├── Cart.jsx           #   Kosár megjelenítése
    │   │   ├── CartItem.jsx       #   Egyedi kosár tétel
    │   │   └── Checkout.jsx       #   Fizetési folyamat
    │   │
    │   ├── common/                # Közös / layout komponensek
    │   │   ├── Navbar.jsx         #   Navigációs sáv
    │   │   ├── Footer.jsx         #   Lábléc
    │   │   ├── SearchBar.jsx      #   Kereső mező
    │   │   ├── LoadingSpinner.jsx #   Töltés animáció
    │   │   ├── CookieBanner.jsx   #   Cookie értesítés sáv
    │   │   ├── ScrollToTop.jsx    #   Görgetés tetejére gomb
    │   │   ├── ToastContainer.jsx #   Értesítések megjelenítése
    │   │   └── ToastContainer.css #   Értesítés stílusok
    │   │
    │   └── user/                  # Felhasználói profil
    │       └── Profile.jsx        #   Profil oldal tartalma
    │
    ├── context/                   # React Context providerek
    │   ├── AuthContext.jsx        #   Hitelesítés állapot (login, token, user)
    │   ├── CartContext.jsx        #   Kosár állapot kezelése
    │   └── ToastContext.jsx       #   Értesítések (toast) állapot
    │
    ├── hooks/                     # Egyedi React hookek
    │   └── useScrollAnimation.jsx #   Scroll animáció hook
    │
    └── pages/                     # Oldalak (route-okhoz kötöttek)
        ├── HomePage.jsx           #   Főoldal
        ├── BooksPage.jsx          #   Könyvek oldal
        ├── LoginPage.jsx          #   Bejelentkezés oldal
        ├── CartPage.jsx           #   Kosár oldal
        ├── AdminPage.jsx          #   Admin kezelőfelület
        ├── ProfilePage.jsx        #   Felhasználói profil
        ├── AboutPage.jsx          #   Rólunk oldal
        ├── TermsPage.jsx          #   Felhasználási feltételek
        ├── PrivacyPage.jsx        #   Adatvédelmi nyilatkozat
        └── CookiePolicyPage.jsx   #   Cookie szabályzat
```

---

## Útvonalak (Routes)

| Útvonal      | Oldal                    |
|--------------|--------------------------|
| `/`          | Főoldal                  |
| `/books`     | Könyvek böngészése       |
| `/login`     | Bejelentkezés            |
| `/cart`      | Kosár / Fizetés          |
| `/admin`     | Admin kezelőfelület      |
| `/profile`   | Felhasználói profil      |
| `/verify`    | Email megerősítés        |
| `/about`     | Rólunk                   |
| `/terms`     | Felhasználási feltételek |
| `/privacy`   | Adatvédelmi nyilatkozat  |
| `/cookies`   | Cookie szabályzat        |

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
