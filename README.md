#  AlkotásokTára – Backend API

ASP.NET Core 8 REST API a BookStore könyvesbolt és kölcsönző alkalmazáshoz.  
Adatbázis: **MariaDB**, ORM: **Entity Framework Core (Pomelo)**, Dokumentáció: **Swagger/OpenAPI**.

---

##  Indítás

```bash
cd Backend/Backend
dotnet run
```

Az API alapértelmezett címe: **http://localhost:5250**  
Swagger UI: **http://localhost:5250/swagger**

---

##  Konfiguráció (`appsettings.json`)

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=...;Database=...;Uid=...;Pwd=...;"
  },
  "Smtp": {
    "Host": "sandbox.smtp.mailtrap.io",
    "Port": 2525,
    "Username": "...",
    "Password": "...",
    "FromEmail": "noreply@bookstore.com",
    "FromName": "BookStore Library"
  }
}
```

> Az SMTP beállítások a Mailtrap sandbox-hoz vannak konfigurálva (fejlesztői email teszteléshez).

---

##  Projektstruktúra

```
Backend/
├── Program.cs                          # Alkalmazás belépési pontja, DI regisztráció, middleware
├── appsettings.json                    # Kapcsolati string, SMTP, naplózás
│
├── Api/
│   └── Controllers/                   # HTTP végpontok (REST API réteg)
│       ├── AuthController.cs          # Bejelentkezés, regisztráció, email verifikáció
│       ├── AuthorController.cs        # Szerzők CRUD
│       ├── BooksController.cs         # Könyvek CRUD, kategória és árszűrés
│       ├── CartController.cs          # Kosár kezelés, checkout, kölcsönzés/vásárlás
│       ├── CopiesController.cs        # Könyvpéldányok kezelése
│       ├── PaymentsController.cs      # Fizetések, vásárlások, bevétel-statisztika
│       ├── RentalsController.cs       # Kölcsönzések, visszahozás, email értesítők
│       └── UsersController.cs         # Felhasználók CRUD, profil szerkesztés
│
├── Application/
│   ├── DTOs/                          # Data Transfer Object-ek (kérés/válasz modellek)
│   │   ├── AuthDto.cs                 # Login/Register/VerifyEmail/ChangePassword kérés-válasz DTO-k
│   │   ├── AuthorDto.cs               # Szerző DTO (id, nev)
│   │   ├── BookDto.cs                 # Könyv DTO-k (BookDto, CreateBookDto, UpdateBookDto)
│   │   ├── CartDto.cs                 # Kosár és kosárelem DTO-k, AddToCartDto
│   │   ├── CheckoutDto.cs             # Checkout kérés (rental_days, payment_method) és válasz DTO
│   │   ├── CopiesDto.cs               # Könyvpéldány DTO (book_id, leltari_szam, elerheto)
│   │   ├── PaymentDto.cs              # Fizetés DTO-k (PaymentDto, CreatePaymentDto, UpdatePaymentStatusDto)
│   │   ├── RentalDto.cs               # Kölcsönzés DTO (enriched: user_name, book_title, due_date)
│   │   ├── UserGetDto.cs              # Felhasználó lekérdező DTO (csak olvasásra)
│   │   └── UserSendDto.cs             # Felhasználó létrehozó/módosító DTO
│   │
│   └── Mappers/
│       └── AutoMapperProfile.cs       # AutoMapper leképezések (entity ↔ DTO)
│
├── Domain/
│   └── Model/                         # Adatbázis entitások (EF Core modellek)
│       ├── BookStoreContext.cs         # DbContext – táblák, kapcsolatok, entity konfiguráció
│       ├── author.cs                   # Szerzők tábla
│       ├── book.cs                     # Könyvek tábla
│       ├── book_author.cs             # Könyv–szerző kapcsolótábla (ha szükséges)
│       ├── cart.cs                     # Kosár fejléc tábla
│       ├── cart_item.cs               # Kosár elemek (copy_id, quantity, order_type, price)
│       ├── category.cs                # Kategóriák tábla
│       ├── copy.cs                    # Könyvpéldányok (leltári szám, elérhetőség)
│       ├── payment.cs                 # Fizetések (összeg, módszer, státusz, order_type)
│       ├── purchase_item.cs           # Vásárolt könyvek (payment_id, book_id, qty, unit_price)
│       ├── rental.cs                  # Kölcsönzések (due_date, visszahozva_datuma)
│       └── users.cs                   # Felhasználók (last_name, first_name, default_address, is_verified)
│
└── Services/
    ├── IEmailService.cs               # Email service interfész
    ├── EmailService.cs                # MailKit SMTP implementáció (Mailtrap sandbox)
    └── RentalNotificationService.cs   # Háttérszolgáltatás: naponta automatikus kölcsönzés-emlékeztetők
```

---

##  API Végpontok

###  Auth – `/api/Auth`
| Metódus | Útvonal | Leírás |
|---------|---------|--------|
| `POST` | `/login` | Bejelentkezés (email + jelszó) |
| `POST` | `/register` | Regisztráció (név, email, jelszó, + opcionális last_name/first_name/default_address) |
| `POST` | `/verify-email` | Email cím megerősítése token alapján |
| `POST` | `/resend-verification` | Verifikációs email újraküldése |
| `PATCH` | `/{id}/change-password` | Jelszó módosítása |

### 👤 Users – `/api/Users`
| Metódus | Útvonal | Leírás |
|---------|---------|--------|
| `GET` | `/` | Összes felhasználó (admin) |
| `GET` | `/{id}` | Felhasználó lekérése |
| `POST` | `/` | Új felhasználó (admin) |
| `PUT` | `/{id}` | Felhasználó módosítása (admin) |
| `PATCH` | `/{id}/profile` | Profil adatok frissítése (last_name, first_name, default_address) |
| `DELETE` | `/{id}` | Felhasználó törlése |

###  Books – `/api/Books`
| Metódus | Útvonal | Leírás |
|---------|---------|--------|
| `GET` | `/` | Összes könyv |
| `GET` | `/{id}` | Könyv lekérése |
| `GET` | `/by-category/{kategoria}` | Könyvek kategória szerint |
| `GET` | `/by-price?minAr=&maxAr=` | Könyvek ártartomány szerint |
| `GET` | `/categories` | Összes kategória |
| `GET` | `/price-stats` | Min/max/átlag ár statisztika |
| `POST` | `/` | Új könyv létrehozása |
| `PUT` | `/{id}` | Könyv módosítása |
| `DELETE` | `/{id}` | Könyv törlése |

###  Authors – `/api/Author`
| Metódus | Útvonal | Leírás |
|---------|---------|--------|
| `GET` | `/` | Összes szerző |
| `GET` | `/{id}` | Szerző lekérése |
| `POST` | `/` | Új szerző |
| `PUT` | `/{id}` | Szerző módosítása |
| `DELETE` | `/{id}` | Szerző törlése |

###  Copies – `/api/Copies`
| Metódus | Útvonal | Leírás |
|---------|---------|--------|
| `GET` | `/` | Összes példány |
| `GET` | `/{id}` | Példány lekérése |
| `GET` | `/by-book/{bookId}` | Adott könyv összes példánya (darabszámmal) |
| `POST` | `/` | Új példány létrehozása |
| `PUT` | `/{id}` | Példány módosítása |
| `DELETE` | `/{id}` | Példány törlése |
| `PUT` | `/toggle-book-availability/{bookId}` | Könyv összes példányának elérhetőség-toggle |

###  Cart – `/api/Cart`
| Metódus | Útvonal | Leírás |
|---------|---------|--------|
| `GET` | `/my-cart?userId=` | Aktív kosár lekérése (vagy létrehozása) |
| `GET` | `/` | Összes kosár (admin) |
| `GET` | `/{id}` | Kosár lekérése ID alapján |
| `POST` | `/add?userId=` | Könyv hozzáadása (order_type: `rental` vagy `purchase`) |
| `DELETE` | `/item/{cartItemId}?userId=` | Elem eltávolítása a kosárból |
| `DELETE` | `/clear?userId=` | Kosár kiürítése |
| `POST` | `/checkout` | Fizetés végrehajtása – kölcsönzések + vásárlások rögzítése |

> **Checkout logika:** kölcsönzésnél copy lefoglalódik, `rental` rekord keletkezik; vásárlásnál `purchase_item` rekord keletkezik, copy elérhetetlenné válik.

###  Payments – `/api/Payments`
| Metódus | Útvonal | Leírás |
|---------|---------|--------|
| `GET` | `/` | Összes fizetés |
| `GET` | `/{id}` | Fizetés lekérése |
| `GET` | `/user/{userId}` | Felhasználó fizetései |
| `GET` | `/status/{status}` | Fizetések státusz szerint |
| `GET` | `/today-revenue` | Mai bevétel összesítő |
| `GET` | `/purchases` | Vásárlások részletei (purchase_items táblából) |
| `POST` | `/` | Új fizetés rögzítése |
| `PUT` | `/{id}/status` | Fizetés státuszának módosítása |
| `DELETE` | `/{id}` | Fizetés törlése |

###  Rentals – `/api/Rentals`
| Metódus | Útvonal | Leírás |
|---------|---------|--------|
| `GET` | `/` | Összes kölcsönzés (admin, enriched adatokkal) |
| `GET` | `/{id}` | Kölcsönzés lekérése |
| `GET` | `/user/{userId}` | Felhasználó kölcsönzései |
| `POST` | `/` | Kölcsönzés manuális rögzítése |
| `PUT` | `/{id}` | Kölcsönzés módosítása |
| `DELETE` | `/{id}` | Kölcsönzés törlése |
| `PATCH` | `/{id}/return` | Könyv visszahozása (admin, késés detektálással) |
| `POST` | `/send-notifications` | Összes emlékeztető email kiküldése manuálisan |
| `POST` | `/{id}/send-reminder` | Konkrét kölcsönzéshez felszólító email küldése |
| `POST` | `/send-custom-email` | Egyéni email küldése bármely felhasználónak |

---

##  Adatbázis séma (főbb táblák)

```
users           → id, name, last_name, first_name, default_address, email, password_hash,
                  created, is_verified, verification_token, token_expires

authors         → id, name

books           → id, cim, boritokep, kiadasi_datum, tartalom, ar, kategoria, author_id

copies          → id, book_id, inventory_number, available
                  (1 copy = 1 fizikai könyvpéldány)

carts           → id, user_id, status (active/checked_out), created_at, updated_at

cart_items      → id, cart_id, copy_id, quantity, price, order_type (rental/purchase), added_at

payments        → id, user_id, order_type, amount, payment_method, payment_date, status

purchase_items  → id, payment_id, book_id, quantity, unit_price
                  (vásárolt könyvek részletei)

rentals         → id, user_id, copy_id, payment_id, rental_date, due_date, return_date
                  (due_date = lejárati határidő)
```


##  Főbb technológiák & csomagok

| Csomag | Verzió | Felhasználás |
|--------|--------|-------------|
| `Microsoft.EntityFrameworkCore` | 8.x | ORM, adatbázis-kezelés |
| `Pomelo.EntityFrameworkCore.MySql` | 8.x | MariaDB/MySQL EF Core provider |
| `AutoMapper` | 13.x | Entity ↔ DTO leképezések |
| `BCrypt.Net-Next` | 4.x | Jelszó hashelés |
| `MailKit` | 4.x | SMTP email küldés |
| `Swashbuckle.AspNetCore` | 6.x | Swagger/OpenAPI dokumentáció |

---

##  Email szolgáltatás

Az `EmailService` az alábbi email típusokat kezeli:

- **Verifikációs email** – regisztrációkor és újraküldésnél
- **Kölcsönzés emlékeztető** – közelgő lejárat előtt (pl. 3 nappal)
- **Lejárt kölcsönzés értesítő** – határidő átlépésekor
- **Egyéni email** – admin által küldött tetszőleges üzenet

A `RentalNotificationService` egy `BackgroundService`, amely naponta automatikusan végigfut az aktív kölcsönzéseken és elküldi az értesítőket.

---

##  Autentikáció

Az API jelenleg **nem használ JWT tokent** – a hitelesítés email + jelszó alapú, a session kezelése a frontend `localStorage`-ban történik. Az admin jogosultság ellenőrzése a felhasználó `nev` vagy `email` mező `"admin"` tartalmán alapul.

>  Éles környezetbe kerülés előtt javasolt JWT alapú autentikáció bevezetése.
