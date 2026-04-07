# AlkotásokTára – Desktop Admin Alkalmazás

WPF alapú asztali adminisztrációs alkalmazás az AlkotásokTára könyvesbolt kezeléséhez. Az alkalmazás a backend REST API-n keresztül kommunikál, és kizárólag admin felhasználók számára érhető el.

## Technológiák

- **WPF** (.NET 8.0)
- **MVVM** minta (CommunityToolkit.Mvvm)
- **Material Design** (MaterialDesignThemes)
- **LiveCharts2** (SkiaSharp – dashboard diagramok)
- **Dependency Injection** (Microsoft.Extensions.DependencyInjection)
- **Newtonsoft.Json** (API kommunikáció)

## Előfeltételek

- [.NET 8.0 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)
- A backend API fusson (`http://localhost:5250` alapértelmezetten)

## Indítás

```bash
cd Desktop/God.Support.mode/God.Support.mode
dotnet restore
dotnet run
```

## Konfiguráció

Az `App.config` fájlban állítható:

| Kulcs          | Alapérték                  | Leírás                    |
| -------------- | -------------------------- | ------------------------- |
| `ApiBaseUrl`   | `http://localhost:5250`    | Backend API URL           |
| `AdminUserId`  | `1`                        | Admin felhasználó azonosító |

A beállítások a futó alkalmazásból is módosíthatók a **Beállítások** oldalon.

## Mappastruktúra

```
God.Support.mode/
├── App.config                          # Alkalmazás konfiguráció (API URL, admin ID)
├── App.xaml                            # Alkalmazás erőforrások, Material Design téma
├── App.xaml.cs                         # DI konténer, login flow, alkalmazás indítás
├── AssemblyInfo.cs                     # Assembly metaadatok
├── God.Support.mode.csproj             # Projekt fájl, NuGet csomagok
├── God.Support.mode.sln                # Solution fájl
├── MainWindow.xaml                     # Fő ablak – oldalsó navigáció + tartalom
├── MainWindow.xaml.cs                  # Fő ablak code-behind (navigáció kezelés)
│
├── Models/                             # API DTO-k (Data Transfer Objects)
│   ├── AuthDtos.cs                     # Bejelentkezés kérés/válasz modellek
│   ├── AuthorDto.cs                    # Szerző adatok
│   ├── BookDto.cs                      # Könyv adatok (lekérdezés)
│   ├── CartDto.cs                      # Kosár adatok
│   ├── CopyDto.cs                      # Könyv példány adatok
│   ├── CreateBookDto.cs                # Könyv létrehozás DTO
│   ├── PaymentDto.cs                   # Fizetés / rendelés adatok
│   ├── RentalDto.cs                    # Kölcsönzés adatok
│   ├── UpdateBookDto.cs                # Könyv módosítás DTO
│   └── UserDto.cs                      # Felhasználó adatok
│
├── ViewModels/                         # MVVM ViewModelek
│   ├── LoginViewModel.cs              # Bejelentkezési logika
│   ├── MainViewModel.cs               # Fő ablak navigáció, oldal váltás
│   ├── DashboardViewModel.cs          # Irányítópult – statisztikák, diagramok
│   ├── UsersViewModel.cs              # Felhasználók kezelése (CRUD)
│   ├── BooksViewModel.cs              # Könyvek kezelése (CRUD)
│   ├── RentalsViewModel.cs            # Kölcsönzések kezelése
│   ├── OrdersViewModel.cs             # Rendelések / fizetések kezelése
│   ├── CartsViewModel.cs              # Kosarak megtekintése
│   └── SettingsViewModel.cs           # Alkalmazás beállítások
│
├── Views/                              # XAML nézetek (oldalak)
│   ├── LoginWindow.xaml/.cs            # Bejelentkezési ablak
│   ├── DashboardPage.xaml/.cs          # Irányítópult oldal
│   ├── UsersPage.xaml/.cs              # Felhasználók oldal
│   ├── BooksPage.xaml/.cs              # Könyvek oldal
│   ├── RentalsPage.xaml/.cs            # Kölcsönzések oldal
│   ├── OrdersPage.xaml/.cs             # Rendelések oldal
│   ├── CartsPage.xaml/.cs              # Kosarak oldal
│   └── SettingsPage.xaml/.cs           # Beállítások oldal
│
├── Services/                           # Üzleti logika és API kommunikáció
│   ├── IApiService.cs                  # API service interfész
│   ├── ApiService.cs                   # HTTP kérések a backend felé
│   ├── IAuthService.cs                 # Autentikáció interfész
│   ├── AuthService.cs                  # JWT alapú bejelentkezés
│   ├── NotificationService.cs          # Alkalmazáson belüli értesítések
│   └── SettingsService.cs              # App.config olvasás/írás
│
├── Converters/                         # WPF value converterek
│   ├── StatusToBrushConverter.cs       # Státusz → szín átalakító
│   └── VisibilityConverters.cs         # Bool/null → Visibility átalakítók
│
└── Resources/                          # Erőforrások (ikonok, képek)
```

## Főbb funkciók

| Oldal           | Leírás                                                    |
| --------------- | --------------------------------------------------------- |
| **Bejelentkezés** | Admin autentikáció JWT tokennel                          |
| **Irányítópult**  | Összesítő statisztikák, diagramok (LiveCharts)           |
| **Felhasználók**  | Felhasználók listázása, szerkesztése, törlése            |
| **Könyvek**       | Könyvek CRUD műveletei, borítókép kezelés                |
| **Kölcsönzések**  | Aktív és lezárt kölcsönzések áttekintése                 |
| **Rendelések**    | Fizetések és rendelési tételek megtekintése              |
| **Kosarak**       | Felhasználói kosarak tartalma                             |
| **Beállítások**   | API URL és admin ID módosítása futás közben               |

## Alkalmazás folyamat

1. Az alkalmazás induláskor a **LoginWindow**-t jeleníti meg
2. Sikeres admin bejelentkezés után megnyílik a **MainWindow**
3. A bal oldali navigációval válthatók az oldalak
4. Minden adat a backend REST API-ból érkezik valós időben
