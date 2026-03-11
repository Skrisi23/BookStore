-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Mar 10, 2026 at 03:11 PM
-- Server version: 10.11.16-MariaDB-cll-lve
-- PHP Version: 8.4.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dongeszh_BookStore`
--
CREATE DATABASE IF NOT EXISTS `dongeszh_BookStore` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `dongeszh_BookStore`;

-- --------------------------------------------------------

--
-- Table structure for table `authors`
--

CREATE TABLE `authors` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- Dumping data for table `authors`
--

INSERT INTO `authors` (`id`, `name`) VALUES
(1, 'J. K. Rowling'),
(2, 'J. R. R. Tolkien'),
(3, 'George Orwell'),
(4, 'F. Scott Fitzgerald'),
(5, 'Harper Lee'),
(6, 'Jack El-Hai'),
(7, 'Egyed Anikó'),
(8, 'Dr. Kende Péter'),
(9, 'Osbáth Norbert'),
(10, 'Erdélyi István'),
(11, 'Somkuti Bálint'),
(12, 'Jules Verne'),
(13, 'Lauren Roberts'),
(14, 'Eric Knight'),
(15, 'Summer Rayne Oakes'),
(16, 'Bálint György'),
(17, 'Csányi Vilmos'),
(18, 'Bencze Zoltán'),
(19, 'Sam Coffman'),
(20, 'Sky S.T.'),
(21, 'Váncsa István'),
(22, 'A. G. Slatter'),
(23, 'A.J. Kazinski'),
(24, 'H. G. Wells'),
(25, 'Uj teszt'),
(26, 'Jimmy Wales'),
(27, 'Alan Dean Foster'),
(28, 'Villám Attila'),
(29, 'Vékony Blanka'),
(30, 'Ambrus Éva'),
(31, 'Zilahy Ágnes'),
(32, 'Váczi Ernő'),
(33, 'Kemény János'),
(34, 'Luca Caioli'),
(35, 'Földes András'),
(36, 'Lukács Ákos'),
(37, 'Mike Tyson'),
(38, 'Magyari Hajnalka'),
(39, 'Sziklainé Lengyel Zsófia'),
(40, 'Hatos Pál'),
(41, 'Papp István'),
(42, 'M. Tayyib Gökbilgin'),
(43, 'Borovszky Samu'),
(44, 'Turbucz Dávid'),
(45, 'Földes György'),
(46, 'Csillag Péter'),
(47, 'Veszprémy László Bernát'),
(48, 'Szombathy Gyula'),
(49, 'Anthony Hopkins'),
(50, 'Gyárfás Dorka'),
(51, 'Philip Lerman'),
(52, 'Gaál Ildikó'),
(53, 'Quentin Tarantino'),
(54, 'Kelecsényi László'),
(55, 'Homoki-Nagy István'),
(56, 'Bud Spencer'),
(57, 'Patti Smith'),
(58, 'Giles Smith'),
(59, 'Serj Tankian'),
(60, 'Till Lindemann'),
(61, 'Nyerges Attila'),
(62, 'Lakatos György'),
(63, 'Paul Stanley'),
(64, 'Bródy János'),
(65, 'Fodor Sándor'),
(66, 'Rob Halford'),
(67, 'Benedek Szabolcs'),
(68, 'dr. Molnár István Jenő'),
(69, 'Andrew Keith'),
(70, 'Adele Faber'),
(71, 'Britz-Farkas Nelli'),
(72, 'Szladek Andrea'),
(73, 'Dr. Mary Hartzell'),
(74, 'Dr. Daniel J. Siegel'),
(75, 'Leslie Bruce'),
(76, 'Marc Bracket');

-- --------------------------------------------------------

--
-- Table structure for table `books`
--

CREATE TABLE `books` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `author_id` int(11) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `release_date` date DEFAULT NULL,
  `content` text DEFAULT NULL,
  `price` decimal(10,2) NOT NULL DEFAULT 0.00,
  `category` varchar(100) NOT NULL DEFAULT 'Egyéb'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- Dumping data for table `books`
--

INSERT INTO `books` (`id`, `title`, `author_id`, `image`, `release_date`, `content`, `price`, `category`) VALUES
(1, 'Harry Potter és a bölcsek köve', 1, 'https://m.media-amazon.com/images/I/81YOuOGFCJL._AC_UF1000,1000_QL80_.jpg', '1997-06-26', 'A Harry Potterről szóló, hétkötetesre tervezett regényfolyam első része. A könyvben megismerkedhetünk többek között a Roxfort varázslóiskolával, Harryvel, a varázslópalántával, és tanúi lehetünk csodálatosan izgalmas kalandjainak. \"Harry Potter kisfiú, történetünk kezdetén 11 éves, valamint varázsló is, talán a leghatalmasabb varázsló, a kiválasztott, aki meg tud küzdeni a gonosz erőivel, erről azonban fogalma sincs. (..) Harry aztán egy napon levelet kap, pontosabban néhány tízezer levelet, a biztonság kedvéért, mivel a nagybácsi elkobzós kedve magasra hág, amelyből megtudja, hogy a következő szemesztert Roxfortban kezdheti, a világ legnevesebb bentlakásos varázslóiskolájában, amely nem kis mértékben hasonlít a brit iskolarendszer hírhedett public schooljaira, talán attól eltekintve, hogy koedukált. Harry, a kifosztott árva ekkor belép abba a világba, amelyhez szülei is tartoztak, hogy megküzdjön azzal a Ki-Ne-Mondd-A-Nevét sötét erővel, amely árvává tette. Harry kiválasztott, homlokán a jegy, de egyben közönséges nebuló is, akinek minden kiválasztottsága ellenére fel kell mutatnia valamit, esetünkben kiemelkedő sportteljesítményt és kellő csapatszellemet, hogy elnyerje az egyszerű diáktársat megillető tiszteletet, és megússza valahogy a vizsgáit. A Gonosz Erőt nem könnyű legyőzni, de egy elitiskola hierarchiájában kiküzdeni valami helyet, főként, ha az alsóbbrendű muglik között nevelkedett az ember, és mit sem tud a magasabb bűbájról, az még nehezebb. Több tucatnyi sajtótermék próbált már magyarázatot találni Harry Potter sikerére. Kezdjük talán azzal, hogy a könyv jó, szellemes, technikás, sodorja az olvasót, és ez elmondható a magyar kiadásról is, amely eltalálta a helyes középutat a máris nemzetközi kultusz tárgyát alkotó invenciók (Muggle: a tökfej normális világ, Quidditsch: a nagy nemzeti varázsló sport) túlzott magyarítása és elvtelen átvétele között.\" Babarczi Eszter, MagyarNarancs, 2000', 4990.00, 'Fantázia'),
(2, 'A Gyűrűk Ura: A Gyűrű Szövetsége', 2, 'https://images-na.ssl-images-amazon.com/images/I/91b0C2YNSrL.jpg', '1954-07-29', 'Különös világba visz ez a regény: emberfeletti és emberalatti lények lakják. Anyagi valósága nincsen, baljós fekete várai, csodás fehér tornyai, fullasztó erdői, gyilkos hegyei, sötét mélységei gondoskodnak róla, hogy egy pillanatig ne érezzük magunkat a hétköznapok közegében, ám mégis otthon legyünk benne, megértsük bűneit is, erényeit is. Hisz nincs az a tündérmese, melynek ne lenne élményalapja, melyet ne kötne elszakíthatatlan szál a megtörténthez. A könyv írójának, a kiváló angol nyelvtudós Tolkiennek a képzeletét is történelmi közelmúltunk apokaliptikus eseménysora termékenyítette meg, hogy létrehozza a Jó és Rossz harcának hatalmas, mondai méretű körképét, s ha már a valóságban nem találta, legalább az időtlenben, a mesében keresse a kiutat, annak eszközeivel kovácsoljon fegyvert számunkra, amivel le tudjuk győzni – önmagunkat a mesebeli Jóval azonosítva – a korántsem mesebeli Rosszat. A testi -lelki torzulásokat elénkbe táró írásművek tömkelegében üdítő színfolt egy ilyen naív könyv. Higgyünk hát a mesének -adjuk át varázslatos sodrának a minddennapok szürke kérge alatt örökké ott élő gyermeki önmagunkat.', 5990.00, 'Fantázia'),
(3, '1984', 3, 'https://m.media-amazon.com/images/I/71kxa1-0mfL._AC_UF1000,1000_QL80_.jpg', '1949-06-08', '\"Üdvözlet az egyformaság korából, a magányosság korából, a Nagy Testvér korából, a duplagondol korából\" - írja a naplójába Winston Smith, a lázadó, a gondolatbűnöző, aki nem hajlandó elismerni, hogy a 2x2 a Párt akarata szerint lehet három vagy öt. Talán valóban \"csak\" keserű üdvözlet lesz ez a regény a jövőben, örök emlékeztető a totalitárius XX. századra, és persze szellemes szatíra, mint a nagy példakép, Swift Gulliver-e. Talán. De most még a zsigereinkben érezzük, mit jelent a Nagy Testvér, a gondolatbűn, a gondolatrendőrség, az újbeszél, a duplagondol; s az óceániai Párt három jelmondata is hátborzongatóan ismerős:\r\n\r\nA háború: Béke\r\nA szabadság: Szolgaság\r\nA tudatlanság: Erő\r\n\r\nS bár sok mindent be tudunk helyettesíteni a történelem valós alakjaival, eszméivel, intézményeivel, ebben a regényben mégis az írói fantázia a leglenyűgözőbb; 1948-ban, betegen, kiábrándultan Orwell olyan regényvilágot alkotott, amely borzongató realitásával rabul ejti az olvasót akkor is, ha közben könnyedén - talán túlságosan is könnyedén - azt mondja: Orwell jóslata, hála istennek, nem teljesedett be.', 3990.00, 'Disztópia'),
(4, 'A nagy Gatsby', 4, 'https://m.media-amazon.com/images/I/81af+MCATTL._AC_UF1000,1000_QL80_.jpg', '1925-04-10', 'Jay Gatsby, a titokzatos milliomos felemelkedésének, tündöklésének és bukásának története sosem volt még ennyire aktuális. A 20. század egyik kiemelkedő világirodalmi alkotása művészi tökéllyel jeleníti meg az amerikai álom olyan örök témáit, mint a pénz és a hatalom bűvölete, az ambíció, a lehetetlen megkísértése és az újrakezdés lehetősége, miközben érzékletes képet fest a húszas évek túlhabzó dzsesszkorszakáról is. A szegény sorból származó Gatsby beleszeret egy gazdag lányba, Daisybe, de a háború elsodorja őket egymástól, s míg a fiatalember a tengerentúlon harcol, a lány férjhez megy egy faragatlan, ám dúsgazdag emberhez, Tom Buchananhez. Hazatérése után Gatsby fanatikus akarással, az eszközökben sem válogatva vagyont szerez, hogy \"méltó\" legyen Daisyhez, és hogy a világítótorony reményt adó zöld fényét követve újrateremthesse a múltat és visszahódíthassa a fiatal asszonyt. A gazdasági összeomlás előszobájában zajló szerelmi háromszög, a fényűző partik, a politikusok és filmsztárok, a luxusautók és hidroplánok ma is ismerős színfalai mögött azonban végül a boldogtalan házasságok és beteljesületlen szerelmek, a szegénység és az elnyomás, a reménytelenség, a kiábrándultság és a magány világát találjuk.\r\nF. Scott Fitzgerald 1925-ben, A nagy Gatsby-vel ért pályája csúcsára: ez az a regénye, amely egymagában is előkelő helyet biztosítana számára a világirodalom nagyjai között. Mesteri szimbólumok, elegáns szerkezet, kristálytiszta próza, s a görög tragédiák sorsszerűségével kibontakozó cselekmény teszik remekművé és ma is letehetetlen olvasmánnyá A nagy Gatsby-t.\r\nA regényt most új fordításban vehetik kézbe az olvasók.', 3490.00, 'Klasszikus Irodalom'),
(5, 'Ne bántsátok a feketerigót!', 5, 'https://libris.to/media/jacket/00184312_to-kill-a-mockingbird.jpg', '1960-07-11', 'A mély déli államokban tapasztalható faji igazságtalanságokkal foglalkozó regény.', 4290.00, 'Klasszikus Irodalom'),
(6, 'Az utolsó igaz ember', 23, 'https://s01.static.libri.hu/cover/42/a/1888684_4.jpg', '2012-05-12', 'Szerzetesek, gyermekorvosok, emberjogi aktivisták, környezetvédők. Emberek a világ minden sarkában, akik másokért áldozzák az életüket. És akiket sorban utolér a végzet. Rejtélyes körülmények között halnak meg és mindannyiuk hátán beégetett számjegyeket találnak. Az Interpol riasztja a koppenhágai rendőrséget, mert nagy a valószínűsége, hogy a következő haláleset Dániában következik be. Niels Bentzon túsztárgyaló kapja a feladatot, hogy felkutassa és figyelmeztesse azokat az embereket, akik beleillenek a sorba, s ezért veszélyben lehetnek, különös tekintettel az éppen zajló klímacsúcs résztvevőire. De ki szolgált rá, hogy jó embernek nevezzék? Niels hamar ráébred, hogy a jók sem annyira jók, mint elsőre gondolnánk. Nem tudja, mihez kezdjen, ám ekkor találkozik Hanna Lund asztrofizikussal, és a helyzet gyökeresen megváltozik. Hanna ugyanis az áldozatok hátába égetett számjegyekben rendszert vél felfedezni - méghozzá elég különös rendszert.', 1990.00, 'Krimi, bűnügyi, thriller'),
(7, 'A náci és a pszichiáter', 6, 'https://s01.static.libri.hu/cover/94/1/12837089_4.jpg', '2025-01-01', 'A második világháború végén Hermann Göring egy amerikaiak által működtetett börtönbe került ötvenkét magas rangú náci vezető, tizenhat bőrönd és egy piros kalapdoboz társaságában. Csomagja mélyén egy kávésdobozban rézfiolák lapultak, bennük áttetsző folyadék: a halálát okozó kálium-cianid. Az Egyesült Államok hadserege Douglas M. Kelley századost, az ambiciózus katonai pszichiátert kérte fel, hogy figyelje a náci foglyok mentális állapotát. Kelley élete legnagyobb kihívásaként tekintett a megbízásra, és égett a vágytól, hogy feltárja, pszichológiai értelemben mi különbözteti meg ezeket a szörnyetegeket a többi embertől. A hatalmas szakmai lehetőség idővel veszedelmes vállalkozássá vált: Kelley saját legnagyobb meglepetésére megértést és elismerést kezdett tanúsítani a náci foglyok, kiváltképp Hermann Göring iránt. Jack El-Hai kortárs forrásokat és Douglas M. Kelley feljegyzéseit felhasználva hiteles és hátborzongató betekintést nyújt a világtörténelem hírhedt epizódjába és a börtönpszichiáter elméjébe, aki bizalmas közelségbe került a gonosszal. A könyvből Nürnberg címmel James Vanderbilt készített filmet 2025-ben Rami Malek és Russel Crowe főszereplésével.', 4799.00, 'Egyetemes történelem'),
(8, 'HErBY - A magyar vlogger', 7, 'https://s01.static.libri.hu/cover/33/d/9402879_4.jpg', '2023-01-01', 'HErBY élő legenda a magyar YouTube világában. A videói által betekinthetünk a mindennapjaiba és a kulisszák mögé. Egy vlogger élete nem csupa fény és csillogás, de rengeteg kihívással is meg kell küzdenie. A könyv éppúgy szól a sikereiről, mint azokról az időkről, amikor padlóra került. Egy emberről, akinek mások szórakoztatása a mindene, miközben nem adatott meg számára, hogy gond nélkül elvegyülhessen a tömegben. Jó helyen jársz, ha a YouTube-videózásról és az online média világáról szeretnél többet megtudni, ugyanakkor nem csupán önfejlesztő könyvet tartasz a kezedben. Őszintén és kendőzetlenül megmutatja Dely Péter életútját, szól az őt támogató nézőkről ugyanúgy, mint az életét megkeserítő trollokról. Vajon honnan meríti azt a hatalmas erőt, amely motiválja és előreviszi a pályáján?', 5677.00, 'Életrajzok'),
(9, 'Az Orbán - Az ember, aki bezsebelte az országát', 8, 'https://s01.static.libri.hu/cover/46/e/12729147_4.jpg', '2025-05-22', 'Minden, ami meghatározza életünket az Orbán által tönkretett közéletben, minden, ami körülvesz minket az általa szétrombolt politikában, olyan, mint Orbán kézcsókja (amint megemeli a hölgyek kezét, de félúton megállítja, odahajol tíz-húsz centire, mint aki kezet csókol, csak éppen nem teszi): hazug és mímelt, csak látszat.', 6900.00, 'Életrajzok'),
(10, 'Amiről nem készült fotó - A magyar történelem 70 igaz története, soha el nem készült fotókkal illusztrálva', 9, 'https://s01.static.libri.hu/cover/4f/a/12818212_4.jpg', '2025-11-18', 'A könyv a magyar történelmet nem a tankönyvek száraz adathalmazain keresztül, hanem emberi sorsokon, drámai pillanatokon és vizuálisan megragadható jeleneteken keresztül mutatja be hetven, mesterséges intelligenciával generált fotó segítségével.\r\n\r\nAz olyan bejegyzések, mint \"Széchenyi utoljára látja Pestet, mielőtt elmegyógyintézetbe vonul\" vagy \"Kádár János premier előtt nézi a Csillagok háborúját\", egyedi látásmódot és stílust tükröznek, amelyek a személyes drámát helyezik a középpontba, és a történelmet emberközelivé teszik. Ez a megközelítés kerüli a hagyományos történetírást, helyette az olvasó érzelmi és intellektuális bevonódására épít.\r\n\r\nA bemutatott történetek sorsfordító, elgondolkodtató és gyakran kevéssé ismert pillanatokra fókuszálnak, amelyekben a történelem nagy erői egyetlen emberi döntésben vagy sorsban sűrűsödnek össze. A cél egy olyan történeti mozaik létrehozása volt, amely egy még teljesebb és árnyaltabb képet fest a magyar múlt összetettségéről - bár nem valódi képekkel, de hetven igazi és különleges történettel.', 8990.00, 'Magyar történelem'),
(11, 'A Magyar Honfoglalás és előzményei', 10, 'https://s01.static.libri.hu/cover/8b/1/2404076_4.jpg', '2000-07-22', '\",,Néhány évvel ezelőtt, egy őszi reggelen, kollégám, Siklósi Gyula különös kérdéssel fordult hozzám: nem óhajtok-e honfoglalás kori temetőt ásatni? A kérdés váratlan volt, de a válaszom természetesen igenlő. Hiszen már évek, évtizedek óta készültem erre a találkozásra őseinkkel...\",,Egy régi dűlőút mentén jelölték ki a házhelyeket, a kiöregedett őszibarackfás helyén. Egymás után kezdték építeni a házakat a hegyek tövében magasodó domboldalon. A helyszínre érkezve nagy, tátongó alapgödör fogadott. Falánál néhány sír maradványa mutatkozott, az egyik csontváz koponyája még eredeti helyén volt... Felmértük a területet, rajzban rögzítettük a váratlanul előkerült sírok helyét, és lefényképeztük a lelőhelyet... lelkes önkéntesek (,,társadalmi munkát\" végzők) segítségére támaszkodhattunk csak. Eljöttek a budapesti Ságvári Endre ELTE Gyakorló Gimnázium diákjai, fiam osztálytársai Máthé Pál tanár vezetésével, de besegítettek végzős régészhallgatók is az egyetemről. Amikor aztán már minden erőforrás kiapadni látszott, a Régészeti Intézet könyvtárosai és adattári dolgozói jöttek ki se-gíteni.\",,... a feltárások elején az egyik sírban, női csontváz mellett, két átfúrt ezüstpénzt találtunk, amelyek egykor az elhunyt mellényét díszíthették. A két pénzdarab a sírokat a 10. század derekára kel-tezi.\",,Ami a feltárás eredményeit illeti, 1994-ben sikerült végre az ásatás értékes honfoglalás kori adalékait közzétennünk... A budakeszi leletek fontosságát már jelzi maga a helységnév: a Keszi-ből, az egyik korai törzsnévből képezték. A Duna nyugati oldaláról eddig kevés hasonló korú és jellegű temetőt ismerhettünk, jóllehet őseink a 10. század elejétől az egész Dunántúlt birtokolták.\"\"', 2000.00, 'Magyar történelem'),
(12, 'Arcok és történetek - Magyar segítség a kereszténység bölcsőjében', 11, 'https://s01.static.libri.hu/cover/07/1/8401126_4.jpg', '2022-09-01', 'A Közel-Keleten jelenleg a világ egyik legnagyobb humanitárius válsága zajlik, ám elvétve akad olyan híradás, amely foglalkozna a kereszténység bölcsőjében mindennapos tragédiákkal. Magyarország egyedülálló programot indított el, hogy felvállalja az üldözött keresztények ügyét\r\nés nemzetközi szintre emelje a megsegítésüket célzó erőfeszítéseket.\r\nA Hungary Helps Program több mint ötszázezer ember számára\r\nközel kétszáz projekttel segítette eddig a válságövezetekben szenvedőket, hogy a kivándorlás helyett szülőföldjükön maradhassanak.\r\nSzerzőink és fotósaink felkeresték Irak, Szíria, Libanon és Jordánia keresztény közösségeit - útjuk lenyomata ez az album, amely a keresztények megtartásáért folytatott küzdelmet nem a híradásokban szereplő számokon és adatokon keresztül mutatja be, hanem emberi sorsokon és történeteken át hoz közelebb az olvasókhoz egy olyan világot, ahol gyakran a magyar segítség az egyetlen esély.', 5605.00, 'Tudomány és Természet'),
(13, 'Negyedik generációs hadviselés - Árnyékháborúk a modern korban', 11, 'https://s01.static.libri.hu/cover/94/0/10983401_4.jpg', '2024-01-01', 'A hadseregek működése és a hadviselés módszertana mindig is magán viselte az adott kor társadalmának lenyomatát. Éppen ezért fontos elgondolkodnunk rajta, hogy a hidegháború vége óta napjainkig eltelt évtizedekben miként alakult át a hadviselés, és milyen jelenségekre lehetünk figyelmesek a közelmúltban, illetve a szemünk előtt jelenleg zajló konfliktusok kapcsán.\r\n\r\nHa végigtekintünk e változásokon, azt láthatjuk, hogy egyre inkább az olyan hadviselési módok jutnak vezető szerephez, amelyek nem csupán a hagyományos katonai módszerekkel élnek, hanem a társadalom egészére hatással kívánnak lenni. Az új paradigmával kapcsolatban viszont egyelőre még zavaró fogalmi káosz uralkodik. Sokan \"hibrid hadviselésről\" beszélnek, holott ennek tényleges létezésére nincsen igazi bizonyíték. Ezzel szemben a negyedik generációs hadviselés megjelenését több tapasztalat is igazolja: ez az új módszer maga a korábbi korlátokat elvető nagystratégia, a modern érdekérvényesítésnek a globalizáció hatására átalakult, nemzetközi és belföldi szereplők által használt eszköztára. Egyaránt magába olvaszt civil és katonai módszereket, olcsó, hatékony és könnyen letagadható, így ez a megoldás mindinkább előtérbe kerül a költséges és hosszan elhúzódó hagyományos konfliktusokhoz képest, miközben nem biztos, hogy a Nyugat tradicionális katonai eszközei a jövőben működnek majd vele szemben.\r\n\r\nA szerző könyvében áttekinti ezen új módszertan elméleti hátterét, és esettanulmányokon keresztül felvázolja az aktuális trendeket, illetve a jövőben várható további változások körvonalait is, hogy minden érdeklődő számára világossá tegye, miként alakul át a hadtudomány napjainkban.', 4702.00, 'Tudomány és Természet'),
(14, 'Negyedik generációs hadviselés', 11, 'https://s01.static.libri.hu/cover/e7/0/11055759_4.jpg', '2024-06-19', 'A hadseregek működése és a hadviselés módszertana mindig is magán viselte az adott kor társadalmának lenyomatát. Éppen ezért fontos elgondolkodnunk rajta, hogy a hidegháború vége óta napjainkig eltelt évtizedekben miként alakult át a hadviselés, és milyen jelenségekre lehetünk figyelmesek a közelmúltban, illetve a szemünk előtt jelenleg zajló konfliktusok kapcsán.  Ha végigtekintünk e változásokon, azt láthatjuk, hogy egyre inkább az olyan hadviselési módok jutnak vezető szerephez, amelyek nem csupán a hagyományos katonai módszerekkel élnek, hanem a társadalom egészére hatással kívánnak lenni. Az új paradigmával kapcsolatban viszont egyelőre még zavaró fogalmi káosz uralkodik. Sokan ,,hibrid hadviselésről\" beszélnek, holott ennek tényleges létezésére nincsen igazi bizonyíték. Ezzel szemben a negyedik generációs hadviselés megjelenését több tapasztalat is igazolja: ez az új módszer maga a korábbi korlátokat elvető nagystratégia, a modern érdekérvényesítésnek a globalizáció hatására átalakult, nemzetközi és belföldi szereplők által használt eszköztára. Egyaránt magába olvaszt civil és katonai módszereket, olcsó, hatékony és könnyen letagadható, így ez a megoldás mindinkább előtérbe kerül a költséges és hosszan elhúzódó hagyományos konfliktusokhoz képest, miközben nem biztos, hogy a Nyugat tradicionális katonai eszközei a jövőben működnek majd vele szemben.  A szerző könyvében áttekinti ezen új módszertan elméleti hátterét, és esettanulmányokon keresztül felvázolja az aktuális trendeket, illetve a jövőben várható további változások körvonalait is, hogy minden érdeklődő számára világossá tegye, miként alakul át a hadtudomány napjainkban. ', 3465.00, 'Egyetemes történelem'),
(15, 'Álom és Halál', 23, 'https://s01.static.libri.hu/cover/97/9/1888683_4.jpg', '2013-06-15', 'Niels Bentzon, a koppenhágai rendőrség túsztárgyalója a dán főváros egyik hídjának tetején állva egy fiatal, meztelen nőt próbál lebeszélni arról, hogy a mélybe vesse magát. Ám pályafutása során először kudarcot vall: az ismeretlen nő minden igyekezete ellenére összetört koponyával és egy titokzatos feljegyzéssel a kezén végzi a síneken. Bentzont nagyon megviseli a kudarc. Presztízskérdés számára, hogy igazolja a gyanúját: a lány nem önként választotta a halált, hanem belehajszolták. Erre utal a boncolás eredménye is, amely szerint a nőt közvetlenül az öngyilkossága előtt vízbe fojtották, majd újraélesztették. Az azonosításkor kiderül, hogy az áldozat a Királyi Balett szólótáncosa, aki egy kisebb társasággal egy elképesztő időtöltés rabja volt...', 1990.00, 'Krimi, bűnügyi, thriller'),
(16, 'A bundák hazája', 12, 'https://s01.static.libri.hu/cover/85/9/10375483_4.jpg', '2023-06-15', 'A prémvadászat igencsak jövedelmező, ám korántsem veszélytelen foglalkozás volt annak idején, különösen a sarkkör ismeretlen, vad és kiszámíthatatlan területein. Egy bátor csapat azonban a növekvő igények által hajtva új vadászterületek felfedezésére indul. Váratlan útitársként nyakukba szakad egy hóbortos csillagász, aki napfogyatkozást kíván megfigyelni. Hőseink kalandról-kalandra haladnak céljuk felé, mígnem a kemény tél megállásra és berendezkedésre kényszeríti őket. És ekkor a messzi Észak megmutatja kiszámíthatatlan arcát: ami stabil volt, instabillá lesz, és már a csillagászokban sem lehet megbízni. De mi történik itt? Nos, Verne egy kiváló regényéből a remek jellemrajzok és feszes cselekményvezetés mellett mindezt megtudjuk Gaál Mózes eredeti műfordítását felhasználva. A szöveget mai nyelvünk szerint átírtuk és számos magyarázó jegyzettel láttuk el.', 1190.00, 'Szépirodalom'),
(17, 'Az első posztmodern háború I. - Az orosz-ukrán háború katonai, biztonságpolitikai tanulságai', 11, 'https://s01.static.libri.hu/cover/3f/d/12890711_4.jpg', '2025-10-29', 'Az első posztmodern háború - Az orosz-ukrán háború katonai, biztonságpolitikai tanulságai című könyv I. kötete az előzményektől a 2023. júniusi Prigozsin-lázadásig tárgyalja a határaink mentén zajló háború eseményeit. A mű katonai szempontból, tudományos-ismeretterjesztő stílusban mutatja be az orosz-ukrán konfliktust, az előzményektől kezdve egészen a haditechnikára és a világrendre gyakorolt várható hatásáig. A nyugati és orosz forrásokat egyaránt felhasználó elemzés realista módon, a nyilvánosságra hozott célok, a geopolitikai korlátok, a hadtörténelmi tapasztalatok és a katonai lehetőségek szemszögéből közelíti meg az orosz agresszióval szemben harcoló Ukrajna küzdelmeit. A szerző nem törekszik egységes időrendi szerkezetbe foglalni a harcokat, ahogy a folyamatban lévő háború katonai történetének megírása sem célja. Mivel jelenleg mindkét oldal bizalmasan kezeli veszteségeit, a bevethető erők nagyságát, illetve a küzdelmekből levont következtetéseit, ez a törekvés hiábavaló is lenne. A könyv fő célja a háború azon katonai és biztonságpolitikai érdekességeinek, összefüggéseinek közérthető bemutatása, amelyek nemcsak a téma iránt érdeklődők, hanem a szélesebb nagyközönség figyelmére is számot tarthatnak. Dr. SOMKUTI BÁLINT: Hadtörténész, biztonságpolitikai elemző. Fő kutatási területe a modern érdekérvényesítés, ezen belül napjaink katonai műveletei, valamint a nem-hagyományos módszerek, elsősorban a gerilla- és irreguláris hadviselés. 2008-ban szerezte meg történészi diplomáját a Károli Gáspár Református Egyetem Bölcsészettudományi Karán, 2012-ben védte meg a Nemzeti Közszolgálati Egyetem Hadtudományi Iskolájában disszertációját, amelynek a 4. generációs hadviselés volt a témája. 12 évnyi, multinacionális cégeknél eltöltött idő után egyaránt dolgozott az állami szférában, újságíróként és vállalkozóként is. Kiemelt érdeklődési köréhez tartoznak a jelen és a múlt hadiflottái és légierői, valamint a haditechnika és a hadtudomány.', 3199.00, 'Egyetemes történelem'),
(18, 'Az első posztmodern háború II. - Az orosz-ukrán háború katonai, biztonságpolitikai tanulságai', 11, 'https://s01.static.libri.hu/cover/2c/1/12890712_4.jpg', '2025-04-23', 'Az orosz-ukrán háborúról szóló könyv második kötete a 2023 júniusi Prigozsin lázadás ismertetésével kezdődik, és a 2025 tavaszáig tartó eseményekbe nyújt betekintést. Folytatva az első kötetben megkezdetteket, elsősorban biztonságpolitikai szempontból, tudományos-ismeretterjesztő stílusban tárgyalja az első \"igazság utáni vagy túli\" háború katonai, külpolitikai, haditechnikai eseményeit. A szerző a történtek leírásában továbbra is egyaránt támaszkodik nyugati és orosz forrásokra, fenntartva Tacitus alapelvét: \"Sine ira et studio!\" Célja, hogy közérthető módon mutassa be a háború olyan katonai, biztonságpolitikai érdekességeit, összefüggéseit, amelyek nemcsak a hadtörténelem és külpolitika iránt érdeklődők, de a szélesebb nagyközönség figyelmét is felkelthetik. Dr. SOMKUTI BÁLINT: Hadtörténész, biztonságpolitikai elemző. Fő kutatási területe a modern érdekérvényesítés, ezen belül napjaink katonai műveletei, valamint a nem-hagyományos módszerek, elsősorban a gerilla- és irreguláris hadviselés. Történészi diploma után 2012-ben védte meg a Nemzeti Közszolgálati Egyetem Hadtudományi Iskolájában disszertációját, amelynek a 4. generációs hadviselés volt a témája. 12 évnyi, multinacionális cégeknél eltöltött idő után egyaránt dolgozott az állami szférában, újságíróként és vállalkozóként is. Kiemelt érdeklődési köréhez tartoznak a jelen és a múlt hadiflottái és légierői, valamint a haditechnika és a hadtudomány.', 3499.00, 'Egyetemes történelem'),
(19, 'A rejtelmes sziget', 12, 'https://s01.static.libri.hu/cover/6d/5/3547620_4.jpg', '2016-12-17', 'Mindenki ismeri Verne trilógiába összefogható ciklusának ezt a darabját, A rejtelemes sziget című robinzonádot. Nem is akarunk túl sokat a műről mondani, inkább e kiadásról: a fordítás Szász Károly klasszikus, 1876. évi fordításán alapul, a szükséges nyelvi-nyelvtani simításokkal. Ami a kiadvány értékét növeli és azt egyedive tesz, az a számos, a kifejezéseket magyarázó internetes hivatkozás, mely egy kattintással elénk varázsolja azokat a fogalmakat, melyeket Verne használ.', 690.00, 'Szépirodalom'),
(20, 'Fearless - A rettenthetetlen', 13, 'https://s01.static.libri.hu/cover/65/9/12626392_4.jpg', '2025-07-14', 'A Powerless-trilógia harmadik része. Árulóként kellett menekülnie, most menyasszonyként tér vissza. Az Átlagos Paedyn Gray halálos ítéletre számított, nem lánykérésre. Nagyobb meglepetés nem érhette volna sem őt, sem a királyságot, amikor Kitt Azer megkérte a kezét, elvégre megölte a fiú apját, a királyt. Uralkodóként viszont Paedyn segíthetne megteremteni az egységes Ilyát, ahol az Átlagosok végre félelem nélkül élhetnek együtt az Elitekkel. Egyre közeledik az idő, amikor a lánynak döntenie kell a házassági ajánlatról, ám ő egyszerre viaskodik az eszével, a szívével és az újabb titokzatos Próbákkal, amiket ki kell állnia. Mindeközben Kai Azer mindent elkövet, hogy Paedyn az övé lehessen, akkor is, ha ezért a királyával kell szembeszállnia. Még soha nem volt ilyen nehéz a választás önfeláldozás és önzés között. Ahogy ilyen végzetes sem. A lebilincselően izgalmas, romantikus fantasysorozat harmadik része, ami az egész világon egy csapásra meghódította az olvasókat.', 4890.00, 'Szépirodalom'),
(21, 'Powerless - Hatalom nélkül', 13, 'https://s01.static.libri.hu/cover/3c/3/11318236_4.jpg', '2024-06-19', 'A hatalmas TikTok-siker után végre magyarul is olvasható a nemzetközi bestseller!  Vadász és préda. A sors egymásnak rendelte őket. Ilyában évtizedek óta csak az Eliteket tűrik meg. Amióta a király kihirdette, hogy minden Átlagost száműzni kell a birodalomból, bűnnek számít, ha valakinek nincs természetfeletti képessége. Paedyn Átlagos, gyerekkora óta az életét kockáztatja azzal, hogy a város nyomornegyedében bujkál, és Látónak adja ki magát. Egy nap tudtán kívül megmenti Kait, Ilya egyik hercegét, majd arra kényszerítik, hogy részt vegyen egy könyörtelen viadalon, aminek az egyedüli célja, hogy az Elitek fitogtathassák az erejüket. A lányra nemcsak a nála jóval tapasztaltabb ellenfelei jelentenek veszélyt, hanem a herceg iránt egyre erősödő érzései is... A trilógia második része 2025 első felében jelenik meg.', 3600.00, 'Szépirodalom'),
(22, 'Lassie hazatér', 14, 'https://s01.static.libri.hu/cover/62/9/6216456_4.jpg', '2020-04-15', 'A skót hegyvidék erdeiben vízmosásokon, vadcsapásokon át egy kutya vándorol dél felé, Yorkshire irányában. Persze ő nem tudja, hogy Yorkshire felé halad, s hogy mintegy négyszáz mérföldes út áll előtte, csak azt tudja, vagy inkább érzi, hogy valahol délen, egy bányászfaluban kis gazdája, Joe várja, s hogy el kell jutnia hozzá mindenáron. Lassie, a gyönyörű skót juhászkutya éhezve, fázva, kimerülten vonszolja magát, de célját nem adja fel. Joe már tizenkét éves, és megérti, hogy munkanélküli apja kénytelen volt egyetlen értékét, a kutyáját eladni a rudlingi hercegnek. Szíve mélyén azonban mégis visszavárja Lassie-t. Hogyan találkozik össze ismét a kisfiú és kutyája? - erről szól Eric Knight legendás, csodaszép regénye.', 2199.00, 'Szépirodalom'),
(23, 'Barátom, a filodendron - Zöld harmónia az otthonunkban és a szívünkben', 15, 'https://s01.static.libri.hu/cover/08/7/6705447_4.jpg', '2020-01-21', 'Mindenki megérdemli, hogy megtapasztalja, milyen pozitív hatással van ránk, ha vannak növényeink, amelyekről gondoskodhatunk. A növények ugyanis nemcsak szépek és tisztítják a levegőt, de csökkentik a stresszt, a vérnyomást, és úgy általában is jót tesznek a testünknek és a lelkünknek is. A gondozásuk valójában mindfulness gyakorlat, amely révén megélhetjük, hogy a másokkal való törődés örömforrás.  Summer Rayne Oakes BARÁTOM, A FILODENDRON című könyve hiánypótló és egészen különleges kötet: nemcsak praktikus gyakorlati információkkal és tanácsokkal lát el bennünket, de újfajta szemléletmódot is képvisel. Útmutatásait követve megtanulhatjuk a növények nézőpontjából szemlélni a világot, modern fogyasztói igényeinket pedig fenntarthatóbbakkal cserélhetjük fel. A jutalmunk zöldellő kert, otthon, és egy kiegyensúlyozottabb, boldogabb élet.  ,,Lépjünk be hát a növények világába, és fedezzük fel, hogyan kezdhetünk neki a saját személyes zöld életterünk megteremtésének - az otthonunkban, a gondolatainkban és a szívünkben.\"', 2499.00, 'Kerti növények'),
(24, 'Minden héten szüret', 16, 'https://s01.static.libri.hu/cover/53/b/3801133_4.jpg', '2017-05-23', 'Bálint György - vagy ahogyan az országban hosszú évtizedek óta mindenki ismeri, Bálint gazda - már számos újságcikkel, televíziós műsorral és szakkönyvvel lopta magát a szívünkbe. Könyvei közül az egyik legkeresettebb az először 1985-ben megjelent Minden héten szüret című munka, melynek negyedik, átdolgozott kiadását tartja kezében az olvasó. A képekkel gazdagon illusztrált kötetben 52 kerti növény portréja olvasható. A könyvben megtalálhatók a hazai kiskertekben már jól ismert és mostanság elterjedőben lévő zöldségek, gyümölcsök és dísznövények (paradicsom, alma, körte, rózsa, orgona, brokkoli, bimbós kel, stb.), de Bálint gazda a népszerűségnek még kevéssé örvendő, ám annál izgalmasabb növényekről (cikória, mángold, csicsóka, gumós kömény) sem feledkezett meg. Az amatőr kertészek mellett, akik inkább a termesztéstechnikára kíváncsiak, a növények kultúrtörténete iránt érdeklődők is örömüket lelhetik e könyv olvasásában, hiszen a gyakorlati tanácsok mellett rengeteg érdekesség is található ebben a színes, a szerzőre jellemzően szerethető stílusban megírt kötetben.', 2290.00, 'Kerti növények'),
(25, 'Sétálgatok a kertemben', 17, 'https://s01.static.libri.hu/cover/0c/3/9352759_4.jpg', '2022-01-20', 'Csányi Vilmos etológus állatvilágról, kutyákról, majmokról és persze emberekről szóló könyveit mindenki ismeri. Szépirodalmi írásai is népszerűek. Most új szerepben ismerjük meg: saját kertjében vezet körbe bennünket. A séta során különleges virágairól, fáiról és bokrairól mesél, arról, hogyan kerültek hozzá a világ minden tájáról egyes növényritkaságok, hogyan gondozza őket, hogyan beszélget velük pontosan úgy, ahogyan a kutyáival is. Különleges és személyes élmény részese lehet az olvasó; a kert lakóival nemcsak történetükön keresztül, de képeken is megismerkedhet. CSÁNYI VILMOS etológus, akadémikus, író. Eredetileg vegyészként dolgozott, majd ő maga szervezte meg az ELTE-n az etológia tanszéket, amelynek vezetője is lett. Kutatásai középpontjában a kutya és az ember viselkedése, a biológiai és a kulturális evolúció kérdései állnak.', 4549.00, 'Kerti növények'),
(26, 'Tanyánk kezikönyve', 18, 'https://s01.static.libri.hu/cover/11/e/12878160_4.jpg', '2025-05-16', 'Magyar önellátó gazdálkodást már folytató és még tervező álmodozóknak és akaróknak szóló kézikönyv, részletesen leírom, hogy szerintem hogyan vidd véghez az álmod, sos segédlettel és adatokkal.', 2000.00, 'Kerti növények'),
(27, 'Túlélők kertje - Hogyan termesszük meg magunknak az élelmiszert', 19, 'https://s01.static.libri.hu/cover/c8/6/12630921_4.jpg', '2025-06-26', 'Mi lenne, ha egy napon zárva találnánk az élelmiszerüzleteket? Az összeset... Nem fordulhat elő? A katasztrófák korát éljük: ami nemrég még lehetetlennek tűnt, ma már távolról sem az. Tegyük fel magunknak a kérdést: mit tennénk, ha a túlélés érdekében mindenképpen magunknak kellene előállítanunk az élelmiszert?Ez az ábrákkal, képekkel gazdagon illusztrált könyv ebben segíti a tanulni, kertészkedni vágyó olvasót: lépésről lépésre bevezet a túlélőkert telepítésének és fenntartásának művészetébe, az ehető növények természetrajzába. Éppúgy szól a hobbikert telepítése iránt érdeklődőknek, mint azoknak, akik egy esetleges katasztrófa utáni helyzet kezelésére is fel akarnak készülni.', 5599.00, 'Kerti növények'),
(28, 'Most főzünk, vagy bulizunk?', 20, 'https://s01.static.libri.hu/cover/70/8/12293996_4.jpg', '2025-01-25', '2024-ben bebizonyítottuk, hogy tudunk mi főzni és dumálni, akár egyszerre, egyidőben is. Idén bebizonyítjuk, hogy nem csak dumálni, de bulizni is tudunk főzés közben, helyett, előtt, után... Idei vendégeim: Garajszki Rozika, író, boldog nagymama, és szívesebben ír, mint főz. Jaj, és annyira jókat lehet vele beszélgetni! Kovács Katalin, költő, sőt, rímfaragó, aki mindenből képes legalább egy rímet kihozni! A humora meg verhetetlen! Pálinkás Angéla, könyvblogger, aki a halak nagy ellensége! Hittétek volna erről a szelíden mosolygó ,,kishölgyről\", hogy vad horgász? Halak, reszkessetek! Sike Erzsébet, énekesnő, költő, és profi konyhatündér. Állandóan süt-főz! Ráadásul barátnők vagyunk 14 éves korunk óta! T. Fiser Ildikó író, könyvblogger, és szenzációs a humora! Náluk mindig van egy buli, amire hol számított, hol meg nem, ezért állandóan főz valamit! Tóth Klaudia, a szavak és a színek mestere! Ez odáig fajult, hogy már a tyúkjai is színes tojásokat tojnak! Komolyan! Apropó, halat meg akkorát fogott, de tényleg akkorát! Cserni András, író, költő, fiatal, tehetséges... (ez már elég lenne, hogy utáljam!) és tud főzni, sőt, sütni is! Mi lesz még belőle tíz év múlva?! Csörgő Iván, író, aki mindig, mindent megtervez! Sőt, van egy B, meg egy C terve is! Szerencsére, a humora is fantasztikus! Dudás Joe Bence, zenész, dalszövegíró, és a konyhában is gyakran alkot, legalábbis az anyukája, Sike Erzsike szerint. Dvariecki Bálint, a könyveink kiadója, imádja a heavy metalt, a kemény rockot, de állítása szerint írni nem szeret. Mondja ő! Hahaha! Erdős Sándor, író, költő, hihetetlen elme, bármihez fog, arannyá válik a kezében: legyen az vers, próza, vagy egy halászlé... na jó, abból speciel paprikás krumpli lett! Surovec Róbert, író, aki szerencsére csak a könyveiben gyilkol. Bár, ki tudja... Sütő Gyula, a nagy Ho-ho-horgász, kiválóan főz, és nem mellesleg a kedvenc öcsém (na jó, az egyetlen! de ettől még a kedvencem is!) Társszerzők: Garajszki Rozika, Kovács Katalin, Pálinkás Angéla, Sike Erzsébet, T. Fiser Ildikó, Tóth Klaudia, Cserni András, Csörgő Iván, Dudás Joe Bence, Dvariecki Bálint, Erdős Sándor, Surovec Róbert, Sütő Gyula', 2999.00, 'Szakácskönyvek'),
(29, 'Két könyv között... minden, ami csirke!', 20, 'https://s01.static.libri.hu/cover/d3/f/12293995_4.jpg', '2025-05-10', 'Két könyv között... ... minden, ami csirke! Egy újabb sztorizós szakácskönyv - ezúttal A Magyar Könyv is Magyar Termék Mozgalom hivatalos bloggereitől. Aki olvasta a Most főzünk, vagy dumálunk? vagy a Most főzünk, vagy bulizunk? című szakácskönyveket, már sejtheti, hogy mire készüljön ismét! Ezúttal az én ,,csibéimmel\", azaz a bloggerekkel fogok egy különleges szakácskönyv-sorozatot az útjára indítani. Lesz itt minden: receptek, történetek, könyves élmények, saját írások! Első alkalommal a csirke kerül az asztalra - meg a tepsibe, fazékba. Mellé kínálunk rengeteg kacagtató sztorit, még ha nem is köretnek, de felhőtlen szórakozásnak! Üdvözlettel a konyhából és a könyvek mellől: Sky S.T. - Sütő Éva (Sky) és szerzőtársai: Elena Honoria (Elena), Haupt-Kutas Mónika (Móni), Lexy Könyv Otthona (Lexy), Menyhei Mónika (Moncsi), Nagy Dóra (Dóri), Oláh Timi (Timi), Pálinkás Angéla (Angi), Társszerzők: Elena Honoria, Haupt-Kutas Mónika, Lexy Könyv Otthona, Menyhei Mónika, Nagy Dóra, Oláh Timi, Pálinkás Angéla,', 2999.00, 'Szakácskönyvek'),
(30, 'Most főzünk, vagy dumálunk?', 20, 'https://s01.static.libri.hu/cover/e5/c/10951104_4.jpg', '2024-05-19', 'Szakácskönyvből sosem elég. Van, aki a receptek, más a színes fotók miatt vásárolja. Aztán olyan is van, aki azért, mert tényleg elképzelése sincs, mit főzzön, kellenek az újabb és újabb ötletek. Sky és vendégei nem szakácsok, de még csak nem is cukrászok, sőt, ha igazat akarunk mondani, még csak nem is feltétlenül konyhatündérek. Legalább is nem mindenki. Hogy mégis vették a bátorságot, és szakácskönyvet írtak? Nem is akármilyet, RENDHAGYÓT? Na, igen, mert legalább annyi benne a jó sztori, mint a házias recept. Ráadásul ezek egyikéhez sem kell szakembernek lenned, hogy el tudd készíteni. Sky szavaival élve - konyhaszüzek is megpróbálhatják! Legfeljebb, ha nem sikerül, még mindig szórakozhatnak egy jót a történeteken. Vendégek: Szabó Borka - író, könyves szakember; Sike Erzsébet (Zsike) - énekesnő, dalszövegíró; Pető Fanni (Fay) - MKMT-nagykövet, borítótervező; Pálinkás Angéla (Angi) - MKMT-nagykövet, könyvblogger; Pintér Tünde - háziasszony, Sky unokanővére; Menyhei Mónika (Moncsi) - költő, könyvblogger; K. Kormos Noémi - MKMT-nagykövet, író; Goran Episcopus - költő, író, illusztrátor, felszentelt pap; Dvariecki Bálint - a Helma Kiadó ügyvezetője; Budai Ferenc (Fecó) - költő, író, ezermester.', 2690.00, 'Szakácskönyvek'),
(31, 'Lakoma 1.', 21, 'https://s01.static.libri.hu/cover/a1/7/10470022_4.jpg', '2023-05-12', 'Lassan másfél évtizede jelent meg először - és vált rögtön klasszikussá - Váncsa István Lakoma című monumentális szakácskönyvsorozatának első része. Az azóta több kiadást megélt kötet jelentősen bővített változatát veheti kézbe az olvasó, csaknem nyolcszáz receptet és negyvenkét esszét tartalmaz. Kiválóan használható szakácskönyv és élvezetes olvasmány, lényege a teljesen egyedi, szubjektív, szellemes-míves irodalmi szöveg. Megtudhatjuk belőle, miért Dante tollára való az avatatlan személy és egy komolyabb csili találkozása, hogyan szabadulhatunk, ha ránk ül egy teve, mi köze a francia délnyugat konyhájának a sólethez, hogyan készül a szultán gyönyöre, a sajttorta nadrág nélkül vagy épp a vezír ujja. Profi gasztronómusoknak, alkalmi főzőknek és fotelséfeknek egyaránt kihagyhatatlan.', 7199.00, 'Szakácskönyvek'),
(32, 'Olasz lakoma', 21, 'https://s01.static.libri.hu/cover/b0/e/11488354_4.jpg', '2024-02-11', 'Szűk évtizede jelent meg és vált rögtön klasszikussá Váncsa István Lakoma sorozatának az itáliai konyhákat bemutató kötete, amelynek most jelentősen bővített, csaknem ezer receptet és negyvenhárom izgalmas gasztroesszét - s egyben különleges, szellemes-míves irodalmi szöveget - tartalmazó példányát veheti kézbe az olvasó, a tradicionális olasz gasztronómia pazar tárházát. Megtudhatjuk belőle, miért rúgta ki Verdi a szakácsai többségét, szükségből lett-e Beethoven kedvenc fogása a sajtos makaróni, hogyan készül Horatius levese, a Három Velence marhapörköltje, a Donizetti-torta, vagy például hogyan olvassuk az Ulyssest. Ahogy a tömény és nagyon markáns ízű, valójában csaknem ihatatlan innivalókat, mondjuk a Friuli-Venezia Giuliából való Amaro Nonini Quintessenziát szokás. Cseppenként. Profi séfeknek, alkalmi főzőcskézőknek és egyszerű irodalomkedvelőknek egyaránt kihagyhatatlan.', 7199.00, 'Szakácskönyvek'),
(33, 'Francia lakoma', 21, 'https://s01.static.libri.hu/cover/a3/8/12728812_4.jpg', '2025-01-03', 'Váncsa István hat évvel ezelőtt megjelent és rögtön klasszikussá vált Lakoma című monumentális szakácskönyvsorozatának harmadik kötetét bővített kiadásban, nyolcszáznegyven recepttel és huszonkilenc szórakoztató, lebilincselő gasztroesszével veheti kézbe az olvasó. A Francia lakoma egyszerre kimeríthetetlen szakácskönyv és sziporkázóan szellemes, mesterien megmunkált irodalmi szöveg, melyből kiderül, hogyan lett egy Madeleine Paulmier nevezetű szobalány Proust ikonikus süteményének névadója, mi köze az athéni demokrácia szárba szökkenésének az osztrigahéjhoz, vagy a bouillabaisse nevű híres hallevesnek Venus Marssal megejtett félrelépéséhez, és mit szólt az egészhez Vulcanus. Profi szakácsoknak, kezdő és haladó konyhaművészeknek, a kultúrtörténet szerelmeseinek egyaránt kötelező olvasmány.', 7999.00, 'Szakácskönyvek'),
(34, 'A csonthárfa dala', 22, 'https://s01.static.libri.hu/cover/78/5/8870935_4.jpg', '2022-05-17', 'Miren O\'Malley családja valamikor régen alkut kötött a tengerrel: minden nemzedékből egy gyereket megkap a tenger királynője, cserébe a hajóik minden útjukról sértetlenül térnek vissza a kikötőbe, és ők jólétben élhetnek. De immár hosszú évek óta nem tudják teljesíteni az alku rájuk eső részét, s a család lassan elszegényedik. Miren nagyanyja elszánta magát, hogy helyreállítja a régi dicsőséget, akár unokája szabadságának árán is. Sötét családi titkokról, varázslatról, boszorkányságról, a tengerben élő mitikus lényekről, valamint erős nőkről és rajtuk uralkodni vágyó férfiakról szól ez a lenyűgöző, félelmetességében is gyönyörű történet.', 3890.00, 'Fantázia'),
(35, 'A holtak grimoárja', 22, 'https://s01.static.libri.hu/cover/ca/e/12909256_4.jpg', '2025-05-13', 'Mihez kezdesz, ha egy boszorkánycsaládba születsz, de nincs benned varázserő? Sok évvel ezelőtt Silverton városa a pusztulás szélére került, de megérkeztek a Briar boszorkányok, akik varázserejüket a város védelmére használták. A család matriarchájának váratlan halálával azonban elérkezett a változás ideje. A varázserő nélkül született Ellie mindig is kívülállónak érezte magát, míg rá nem jött, hogy van egy különleges képessége: látja a halottakat, és beszélni is tud velük. Ők a várost védelmező boszorkányfamília legsötétebb titkairól: gonosz varázslatokról, gyilkosságokról és elveszett mágianaplókról mesélnek neki. Amikor Ellie megérti, hogy a falakon kívül leselkedő ellenségnél nagyobb veszélyt jelentenek a hatalom birtoklásáért küzdő családtagjai, döntenie kell: kiben bízhat, és ki akarja elpusztítani mindazt, amit a Briar boszorkányok felépítettek. A csonthárfa dala és A tövisek útja díjnyertes szerzőjének új gótikus meséje szellemekről, boszorkányokról, halálos titkokról és múltbeli bűnökről.', 6990.00, 'Sci-fi'),
(36, 'A tövisek útja', 22, 'https://s01.static.libri.hu/cover/63/e/11597102_4.jpg', '2024-09-18', 'Asher Todd a gyerekek nevelőnőjeként érkezik a titokzatos Morwood családhoz. Arról ugyan, hogy mit jelent nevelőnőnek lenni, vajmi keveset tud, de jártas a botanikában, a gyógynövénytermesztésben, és ez még nem minden. Neki is megvannak a maga sötét és baljós titkai, a Morwood ház pedig egyenesen titkokkal táplálkozik. Asher egy szörnyű bosszú tervével érkezik, csakhogy megszereti a rábízottakat, Tarn lakóit, és már nem tudja, képes lesz-e végrehajtani a tervét - és ha igen, azzal kinek okozza a legtöbb szenvedést. Miközben egyre nehezebben tudja féken tartani a múltja kísérteteit, és belegabalyodik a titkok, hazugságok hálójába, Asher rájön, hogy csapdába került. A csonthárfa dala díjnyertes szerzőjének új könyvében a sötét mágia, a megtorlás és a hátborzongató családi titkok szövedékéből magával ragadó és lebilincselő mese született.', 5490.00, 'Fantázia'),
(37, 'A hableány halála', 23, 'https://s01.static.libri.hu/cover/93/9/7365226_4.jpg', '2021-05-07', '1834, Dánia. A világhírre áhítozó, különc Hans Christian Andersen hazatér külföldi útjáról, ám nem fogadják tárt karokkal. Nem elég, hogy művei sem a kritikusok, sem a közönség körében nem aratnak tetszést, még azzal is gyanúsítják, hogy brutálisan meggyilkolt egy utcalányt. Ha nem akar búcsút inteni a fejének, neki kell felderítenie az ügyet. Nagy nehézségek árán sikerül megnyernie magának az áldozat húgát, aki korábban szentül meg volt győződve a bűnösségéről, és együtt erednek a kíméletlen gonosztevő nyomába. Úgy tűnik, a gyilkos beteges érdeklődést táplál a női test iránt, és a vérszomja határtalan...A. J. Kazinski és Thomas Rydahl első közös regénye különleges krimi, Andersen legismertebb, tragikus végű meséjének hátborzongató \"előtörténete\".', 2390.00, 'bűnügyi, thriller'),
(38, 'Szent szövetség', 23, 'https://s01.static.libri.hu/cover/79/c/3589367_4.jpg', '2016-01-07', 'Eva úgy érzi, az élete teljesen összeomlott. Elvesztette a párját, Martint, és újságírói munkáját is. Egy pszichológus segítségével próbál túljutni a szörnyű időszakon, és különösebb lelkesedés nélkül, de munkába áll egy óvodában mint konyhai dolgozó. Megismerkedik az ötéves Maltéval, akinek édesanyja a királyi háznál dolgozik: udvarhölgy. Egy napon a kisfiú becsempész Eva táskájába egy rajzot, ami a nő legnagyobb döbbenetére egy véres gyilkosságot ábrázol. Rövidesen kiderül, hogy a gyerek nagybátyja öngyilkos lett. Az ügy felkelti Eva érdeklődését. Újságírói szimatát követve nyomozásba kezd, nem sejtve, mekkora bajt zúdít ezzel a fejére, hiszen kutatásai a dán királyi ház felé vezetik.', 1990.00, 'bűnügyi, thriller'),
(39, 'Névtelen család', 12, 'https://s01.static.libri.hu/cover/9d/2/10475403_4.jpg', '2023-04-07', 'Verne csillapíthatatlan angolgyűlölete szabadon száguld ebben a regényben, mely a függetlenedési törekvések idején játszódik Kanadában és egy alakuló államot mutat be, mely önállóságra törekszik a déli szomszéd Egyesült Államoktól, de Francia- és Angolországtól egyaránt. Testvér harcol testvér ellen, és aki régen ellenség volt, egy generációval később már barát - vagy fordítva. A történelemlecke mellett bőséges és lebilincselő tájrajzokat kapunk, megismerjük az észak-amerikai indiántörzseket, kultúrájukat és hiedelmeik jó részét ugyancsak. Verne azúttal egy igazi történelmi regényt tsz le elénk az asztalra, amiben nincsenek világmegváltó találmányok, de vannak emberi sorsok és drámák.', 1190.00, 'Szépirodalom'),
(46, 'A láthatatlan ember', 24, 'https://s01.static.libri.hu/cover/3c/7/1082424_4.jpg', '2011-02-09', 'A klasszikus kalandregény színes képregény-változata. PDF-formátumú e-könyv.', 5000.00, 'Képregény'),
(52, 'Asadsd', 1, 'https://i1.sndcdn.com/avatars-80tzyUYLmx5Mnj9E-4RvMow-t1080x1080.jpg', '2026-02-24', '343', 34.00, 'ssd'),
(53, 'A bizalom hét törvénye - Hogyan alkossunk tartós dolgokat?', 26, 'https://s01.static.libri.hu/cover/b1/3/13039953_4.jpg', '2026-03-18', 'A Wikipédiának kezdetben nem jósoltak nagy jövőt. Hiszen a vadidegenek közötti bizalom és jó szándék működteti őket! Hogyan is lehetne ilyen törékeny alapra építkezni? A globális bizalmi válság idején talán nehéz elhinni, de az emberi természetben eredendően ott rejlik a megosztásra és együttműködésre való hajlam. Jimmy Wales, a világ legnagyobb tudástárává fejlődött online enciklopédia, a Wikipédia társalapítója ebből a kiindulópontból fogalmazza meg praktikus tanácsait. Saját tapasztalatait felidézve, számos vállalat és kezdeményezés fellendülését nyomon követve, cégvezetőkkel és szakértőkkel folytatott beszélgetésekre alapozva foglalja össze a bizalom szerepével, kialakításával és megtartásával kapcsolatos tanulságokat. Útmutatójának segítségével tartós sikereket érhetünk el, legyen szó profitorientált, illetve nonprofit szervezetről, vagy bárkiről, aki olyasmit kíván létrehozni, ami kiállja az idő próbáját. \"Fontos könyv! Reménnyel tölt el, mégis rendkívül gyakorlatias.\" Yuval Noah Harari', 7191.00, 'Karrierépítés'),
(54, 'Az út végén a halál', 27, 'https://s01.static.libri.hu/cover/49/b/12937188_4.jpg', '1992-03-25', 'A Föld felé tartó óriás Sulaco űrhajón elektromos tűz üt ki, és az automatika egy mentőkabinban kilövi a fedélzetén hibernálva fekvő utasokat: egy sebesült katonát, egy kislány, egy széttépett androidot és egy nőt, Ripleyt.\r\nNem véletlen, ha ismerős a név, ő az aki A nyolcadik utas a halálban és A bolygó neve halálban már két alkalommal is megküzdött az emberekben csak táplálékot látó idegenekkel. Most itt a harmadik rész, a rémálom folytatódik\r\nA mentőkabinban ugyanis rajtuk kívül ott szunnyad egy földönkívüli tojása és áldozatra vár. Ripleyék egy börtönbolygón landolnak, ám a szerencsétlenséget csak a nő éli túl\r\nEzen a fegyvertelen, lezüllött büntetőtelepen indul ismét útjára a halál, ezúttal megállíthatatlanul. Az életüket félő elítélteknek Ripley vezetésével csupán egyetlen reményük maradt: hátha az emberi lelemény képes megfékezni az idegen mindent elsöprő erejét.\r\nA könyvet az amerikai sikerfilm forgatókönyve alapján Alan Dean Foster írta, aki nem ismeretlen már a hazai közönség előtt.', 1140.00, 'Sci-fi'),
(55, 'Alien: Covenant - Eredet', 27, 'https://s01.static.libri.hu/cover/c1/1/4114415_4.jpg', '2017-05-26', 'A Covenant missziója a legnagyobb szabású, legfontosabb vállalkozás a Weyland-Yutani történetében. Az Origae-6-osra induló hajónak kétezer telepest kell eljuttatnia az űr ismert régióján túlra - olyan művelet ez, amely meghatározhatja a cég és az emberi faj jövőjét.\r\n\r\nMégis vannak olyanok, akik akár az életüket is hajlandóak feláldozni a küldetés megakadályozása érdekében. Miközben a telepeshajó már orbitális pályán kering, készen az indulásra, olyan erőszakos merényletek követik egymást, amelyekből lassan kibontakozik egy a start elszabotálását célzó összeesküvés. Jacob Branson kapitány és felesége, Daniels a hajón végzi az indulás előtti feladatokat, a biztonságiak főnöke, Daniel Lopé pedig csapata legutolsó, kulcsfontosságú tagját próbálja megtalálni a Földön. Lopé és új társa együtt indulnak el, hogy megtalálják és megfékezzék azokat, akik kárt akarnak tenni a hajóban és végeznének utasaival...\r\n\r\nEz egy új történet Alan Dean Fostertől, az első Alien regények írójától. Az Eredet az Alien: Covenant hivatalos előzménye, amelyből megismerhetjük azt a világot is, amelyet a telepesek maguk mögött hagytak.', 3695.00, 'Sci-fi');
INSERT INTO `books` (`id`, `title`, `author_id`, `image`, `release_date`, `content`, `price`, `category`) VALUES
(56, 'Star Wars: A közelgő vihar - Legendák - Legendák', 27, 'https://s01.static.libri.hu/cover/b3/2/3998034_4.jpg', '2017-03-16', 'Palpatine szenátort kancellárrá választották, hogy megmentse a galaxist a széthullástól, azonban a Köztársaság mégis hanyatlik...\r\n\r\nEgy apró, ám stratégiailag annál fontosabb bolygó egyik befolyásos hatalmi frakciója arra készül, hogy csatlakozzon a függetlenségi mozgalomhoz. A kancellár kérésére a Jedi Tanács két mestert - Obi-van Kenobit és Luminara Undulit - és tanítványaikat - Anakin Skywalkert és Barriss Offeet - küldi a helyzet stabilizálására.\r\n\r\nHogy teljesíthessék a feladatukat, a Jediknek közel lehetetlen kihívásokkal kell megbirkózniuk, furcsa idegenekkel kell összebarátkozniuk, és két hatalmas sereget is meg kell győzniük, miközben végig a nyomukban jár az ellenség, és mindent megtesz, hogy a küldetésük kudarcba fulladjon...', 3515.00, 'Sci-fi'),
(57, 'A király vacsorája - Egy magyar séf kalandjai Angliában', 28, 'https://s01.static.libri.hu/cover/26/0/12882134_4.jpg', '2025-03-19', 'Hogy kerül egy magyar fine dining szakács a brit királyi udvarba? Nem egyszerűen és nem is a leghagyományosabb módon... Az úton üvöltöző konyhafőnökök, részeges skót hajóskapitányok, pöfékelő angol katonatisztek és persze szebbnél szebb nők jönnek szembe. Aki pedig rendíthetetlenül halad előre, néha a főnökei elől futva, máskor a vaksötétben tapogatózva, bizarr kalandokba keveredve, az maga Villám Attila. A magyar séf húszévesen döntött úgy, hogy nekivág az angliai kalandnak, és két évtized alatt a ranglétra legaljáról London csúcsáig jutott. Közben megismerte a brit társadalom valamennyi szegmensét, színes történetei pedig kendőzetlenül mutatják be a vendéglátás ritkán látott bugyrait. A St. James\'s Palace vezető konyhafőnökeként eltöltött évei után most visszatért Magyarországra, könyvében pedig a nem éppen szokványos életútja mellett az imádott hivatásával kapcsolatos gondolatait, kulisszatitkait is megosztja olvasóival.', 4999.00, 'Szakácskönyvek'),
(58, 'Kutya jó étrend', 29, 'https://s01.static.libri.hu/cover/7a/6/12762728_4.jpg', NULL, 'A házilag készült ételeknél nincs is jobb. Miért ne kényeztethetnénk hát ezzel kutyusunkat? Ha mi főzzük meg négylábú kedvencünk napi eledelét, saját magunk választhatjuk ki az alapanyagok forrását és minőségét, így sokkal változatosabban, egészségesebben, és legfőképpen kutyánk igényeire szabva tudjuk táplálni őt. Legyen válogatós, falánk, vagy energiabomba, esetleg idősebb kedvencünk, ebben a könyvben igazi csemegéket találhatunk neki: többek között leveseket, ragukat, rizottókat, gombócokat, és persze nem maradhatnak el a jól megérdemelt jutalomfalatok sem.A könyv szerzői maguk is 6 boldog kutya büszke gazdái, emellett kiváló dietetikusok, így a könyvben nemcsak 54 kutya jó finomság, de sok-sok hasznos kutyadietetikai ismeret is megtalálható kedvenceink megfelelő és kiegyensúlyozott táplálásához, hogy mindig játékosak, energikusak és egészségesek legyenek.', 4090.00, 'Szakácskönyvek'),
(59, 'Válogatós gyerekek', 30, 'https://s01.static.libri.hu/cover/dc/4/12762727_4.jpg', '2025-03-19', 'Ambrus Éva hozzátáplálásról szóló első könyve, az Anya, kérek még! óriási népszerűségnek örvend a kisgyerekes családok körében. A kiadványban megtalálható sok-sok hasznos tanács és egészséges finomság édesanyák tömegét tette magabiztossá a gyerektáplálásban.Ám a legtöbb apróság életében egyszer csak elérkezik az az időszak, amikor válogatni kezd, és a korábban kedvelt ételeket egyszerűen nem hajlandó megenni. A kifogások sora igen változatos: nem tetszik a színe; csak a rizst eszem meg; húst nem kérek; és sorolhatnánk még. Szülőként persze mindenféle praktikával megpróbálkozunk, de sorra kudarcot vallunk. Ám mielőtt végleg feladnád, és gyermeked venné át az irányítást az étkezésben, ismerd meg a válogatós evés valós hátterét. A szerző legújabb könyve ehhez nyújt támogatást. A nem evésnek számtalan oka lehet, de szerencsére a megoldások lehetősége is igen változatos.A könyvet olvasva saját magad is könnyen felismerheted, hogy gyermeked valóban válogatós-e, vagy csupán odafigyel teste szükségleteire. Ha eddig nem fordítottál elegendő figyelmet a megfelelő étkezési szokások kialakítására, most bizony elérkezett az ideje. Könnyen követhető gyakorlati tanácsok és számtalan gyerekbarát recept lesz ebben a segítségedre, így a nehezebb időszakok sem okoznak problémát majd.', 3890.00, 'Szakácskönyvek'),
(60, 'Valódi magyar szakácskönyv', 31, 'https://s01.static.libri.hu/cover/80/b/1142592_4.jpg', '2011-03-10', ',,Van már tuczat számra olyan szakács-könyv, melyet nem lehet megérteni, vagy pedig nagyszabása drága összetételei miatt, utasitásait sok-sok családnak lehetetlen követni. Ebben a második kiadásban is, - habár különösen a >>különlegességek<< czime alatt, sokkal bővebb az elsőnél -, bizonyára van még hiány is és ha e hiányokra reá mutatnak, nem veszem rossz néven. S ha valaha abban a szerencsés helyzetben lehetnék, hogy még egy harmadik kiadást rendezhetnék sajtó alá, legszivesebben helyre pótolnám a tudtomon kivül ejtett hiányokat, mert hibák nem hiszem, hogy lennének benne.\" - Zilahy Ágnes', 500.00, 'Szakácskönyvek'),
(61, 'Zsurmák', 32, 'https://s01.static.libri.hu/cover/46/d/1080868_4.jpg', '2012-03-23', 'A művelődéstörténeti és ismeretterjesztő munka nem csupán a híres magyar versenylovak történetét mutatja be, hanem kortörténeti kalauz is a témában érdeklődők számára, ugyanakkor személyes érintettség okán a Szerző életpályájának főbb momentumait is figyelemmel kísérheti az olvasó. Váczi Ernő, aki 1995-1999 között az Alagi Versenyló Tréningközpont vezetője, a Nemzeti Lóverseny Kft. szakmai-igazgató helyettese volt - főbb kitüntetései: Köztársasági Elnöki Arany Emlékérem, 1996; Gróf Széchenyi István Lovas Emlékérem, 2003 -, egyszerre mutatja be a magyar lovas történelmet és két évtized írásainak legjavát. A lovakról sokan írtak sokféleképpen, ki szakmai oldalról, ki a műhelytitkok oldaláról, ki anekdotázva és szórakoztatóan. A jelen mű ötvözi mindezeket, a szakmai mélység mellett mindvégig jelen van a személyes történet is, így a gazdag válogatás a legszínesebb és legváltozatosabb gyűjtemény lehet a lovas irodalomban. A múltba tekintés, az elveszett értékek felidézése sok száz éves történelmi ívet rajzol fel, melynek historiográfiai értéke elvitathatatlan, a tradíció és a gyökerek nélkül ma sincs hova fejlődni. Az író és szakíró Váczi Ernő különleges útra invitálja olvasóit, melyet mintegy kétszáz korabeli és színes fotó szegélyez.  Szerkesztő: Pekár István', 980.00, 'Sport, természetjárás'),
(62, 'Medvekaland a Kárpátokban', 33, 'https://s01.static.libri.hu/cover/ea/f/1079865_4.jpg', '2009-03-19', 'Kemény János báró - író, szerkesztő, irodalom- és színházszervező - abból a családból jött, mely nemcsak az emlékíró fejedelmet, hanem Kemény Zsigmondot is adta a magyar irodalomnak. Erdély egyik legnagyobb mecénása volt, aki vagyona nagy részét az erdélyi magyar irodalom szolgálatába állította. Iskolát alapított, színházat szervezett, létrehozta a marosvécsi Helikont, mely a két világháború között az erdélyi magyar írók legjelentősebb irodalmi csoportosulása volt. Az Erdélyi Szépmíves Céh kiadóvállalat, akárcsak az Erdélyi Helikon folyóirat, a vécsi íróközösség eszmei irányítása alatt működött mindvégig. Az ebben a periódusban megjelent kötetek, e szellemi örökség képezi a kibontakozó, modern erdélyi magyar irodalom kincsestárát.Kemény János érett prózaíró, a komikum és gyöngédség, a bölcs világlátás mestere. 1944-ig több regénye és novelláskötete jelent meg. Az 50-es évek súlyos méltánytalanságain, amikor is mészégető munkásként tartotta el családját, nagyvonalúan tette túl magát, és folytatta a regényírást. A különböző társadalmi rangú és anyanyelvű embereket összekötő természetszeretet, barátság, békességre vágyakozás nem csupán témája, hanem szinte formaadója is lírai hangulatú történeteinek. Válogatásunk az író halász-, vadász és madarászemlékeiből merít. Apró elbeszéléseken, történeteken keresztül ismerjük meg az erdélyi fenyvesek, havasok világának fáradhatatlan vándorát, vadászát, természetíróját. Az utazók, a szegény emberek, vadorzók, rőzseszedők és vadászok íróját, a hegyek hűséges emberét, a bérces kishon legjobb ismerőjét. Kemény János írásait jóízű humor, a természet szeretete és a vándorlásai során megismert emberek iránti baráti, emlékező hang jellemzi.', 2490.00, 'Sport, természetjárás'),
(63, 'Cristiano Ronaldo - Szenvedélye a tökéletesség', 34, 'https://s01.static.libri.hu/cover/05/a/11086128_4.jpg', '2013-07-13', 'Cristiano Ronaldo életrajza - egy olyan játékosé, aki megállíthatatlanul küzd azért, hogy a világ legjobbja legyen. A fiú, aki aranyból van, minden idők egyik legjobb játékosa. Madeira szigetének egy munkásnegyedéből indult, ahonnan útja a Sporting Lisszabonhoz vezetett, ahol közel állt ahhoz, hogy abbahagyja a focit, majd mindössze tizennyolc évesen a Manchester Unitedhoz igazolt, ahol az Aranylabdáig jutott.', 2990.00, 'Sport, természetjárás'),
(64, 'Suárez - A futballvilág legellentmondásosabb megítélésű sztárjának különleges élettörténete', 34, 'https://s01.static.libri.hu/cover/8f/f/1946189_4.jpg', '2014-01-28', 'Amikor 2013 szeptemberének végén Luis Suárez visszatért legfrissebb botrányát, az ellenfele megharapását követő tízmeccses eltiltás után, nem tűnt valószínűnek, hogy valaha sikerül elhallgattatnia a viselkedését kritizálókat.\r\nA következő hónapok során elképesztő teljesítményt nyújtott a pályán: 31 gólig jutott, és négy év szünet után visszavezette a Liverpool csapatát a Bajnokok Ligájába. A nyári brazíliai világbajnokságon Suárez mindössze két mérkőzésen szerepelt - előbb két gólt szerzett, majd egy újabb pillanatnyi elmezavar következett, amely után ismét nem Messivel és Ronaldóval, hanem Dr. Jekyll-lel és Mr. Hyde-dal emlegették együtt a nevét.\r\nA világ legjobb labdarúgóit bemutató nagy sikerű könyvek szerzője, Luca Caioli betekintést enged a napjaink egyik legnépszerűbb futballistájának életébe, a nélkülözéssel teli uruguayi gyermekévektől a 2014. júliusi barcelonai csúcsszerződésig.', 3790.00, 'Sport, természetjárás'),
(65, 'Haaland - A gólok királya', 34, 'https://s01.static.libri.hu/cover/0b/6/10380286_4.jpg', '2023-06-17', 'Megállíthatatlan lendület, rendkívüli hidegvér és kérlelhetetlen pontosság - ezek jellemzik Erling Braut Haalandot, aki rengeteg gólt lőtt és számtalan új rekordot állított fel, amióta elkezdett futballozni. Amikor a Premier League-be került, már az első idényben új gólrekordot ért el és ő szerzett a leggyorsabban 5 gólt egy meccsen a Bajnokok Ligájában.\r\n\r\nTudta, hogy\r\n- már 5 éves korában megdöntött egy világrekordot?\r\n- édesapja is játszott a Manchester Cityben?\r\n- egy (U20-as) világbajnoki mérkőzésen 9 gólt szerzett?\r\n- Zlatan Ibrahimović volt az egyik legnagyobb példaképe?\r\n\r\nE könyvből megismerhetjük a norvég csatár gyermekkorát, első sikereit egy norvég kisvárosi futballcsapatban. Érdekes beszámolót kapunk a különböző egyesületekben töltött idényeiről - a Molde FK, az RB Salzburg, a Borussia Dortmund, valamint a Manchester City csapataiban rúgott rengeteg góljáról, és természetesen a norvég válogatottbeli szerepléseiről is.\r\n\r\nAz olasz újságíró, Luca Caioli, francia szerzőtársával, Cyril Collot-val dokumentálja Haaland felfelé ívelő labdarúgó-karrierjét, amelynek még koránt sincs vége. A könyv sok háttérinformációval nyújt bepillantást a norvég labdarúgósztár életébe.', 3790.00, 'Sport, természetjárás'),
(66, 'Messi - A fiú, aki legenda lett', 34, 'https://s01.static.libri.hu/cover/d3/e/10380285_4.jpg', '2023-03-21', 'Lionel Messi egy igazi legenda. Hihetetlen technikájával és a játék iránti lelkesedésével elkápráztatja a futballrajongókat, rengeteg trófeát nyert el és számos rekordot döntött meg pályafutása során. Kétségtelenül ő a futball valaha volt egyik legjobb játékosa.\r\n\r\nTudta, hogy\r\n- első barcelonai szerződését egy szalvétára írták?\r\n- karja röntgenvizsgálata közben derült ki, hogy növekedésihormon-problémái vannak?\r\n- miért nem vette át első Bajnokok Ligája-aranyérmét?\r\n\r\nMindez és még sok minden más is kiderül Luca Caioli könyvéből, amely pontos képet fest a szupersztárról, az argentínai gyermekkortól a spanyol futballakadémián eltöltött éveken át az FC Barcelonában elért nagyszerű sikerekig és a Paris Saint-Germainben töltött időszakig. Izgalmas és szórakoztató könyv arról a játékosról, akit joggal tartanak számon Pelé és Maradona utódjaként.\r\n\r\nLuca Caioli (Milánó, 1958) számos regény és sportolói életrajz szerzője, többek között Cristiano Ronaldo, Kylian Mbappé és Erling Haaland pályafutásáról is írt könyvet. Műveit negyven nyelvre fordították le és több mint egymillió példányban keltek el. Harmincéves újságírói pályafutása során a legjelentősebb európai lapoknak és sportcsatornáknak tudósított. Jelenleg Madridban él.', 4740.00, 'Sport, természetjárás'),
(67, 'Erőss Zsolt - A Himalájánál magasabbra', 35, 'https://s01.static.libri.hu/cover/f4/8/1142773_4.jpg', NULL, 'A legnagyobb magyar hegymászó emlékére. Ahogy Erőss Zsolt élete, úgy életrajzi könyve sem szokványos. A történetekből megismerhetjük a hegymászó kalandjait Erdélytől a Himalájáig, az első sziklamászástól a tragédiával végződő legutolsó expedícióig. Az alpinizmus mellett feltárulnak előttünk Ázsia, Afrika és Dél-Amerika egzotikus vidékei, amelyek évtizedek alatt Erőss Zsolt második otthonává váltak. A könyv azonban akkor is lenyűgöző lenne, ha főszereplője ki sem lépett volna a kertjéből. Nem csak azt meséli el, hogyan hódította meg első magyarként a világ legmagasabb csúcsát, hanem azt is, miért nem esett kétségbe egyik lábának elvesztése után, és miért volt egyértelmű számára, hogy folytatnia kell a hegymászást. A neves alpinista kalandjait, életét olyan bölcs eltökéltség hajtotta, amely ötleteket adhat számunkra is, hogyan váltsuk valóra vágyainkat a Föld egy távoli pontján, vagy akár egészen közel. A regényes életrajz írója, Földes András amellett, hogy Erőss Zsolt barátja volt, hegymászó is. Elkísérte őt néhány expedíciójára, hogy belülről mutathassa meg ezt a félelmetes, ugyanakkor lenyűgöző világot. ,,Ez a derű, ez a megható és naiv elhivatottság volt az, ami népszerűvé tette jóval a hegymászók körein túl is. Megdöbbentem, amikor láttam, a városban járva nemcsak fiatalok, sportemberek ismerik fel, hanem idős asszonyok, öregurak is szorongatják a kezét. Sorsa már nem a hegyekről szólt, hanem arról, hogy mindig van tovább, hogy érdemes küzdeni, hogy van remény. És mindezt hitelesebben közvetítette, mint egy délutáni szappanopera. Nem manír volt csendessége, és hogy közvetlenül, türelmesen viszonyult barátaihoz, hegymászótanítványaihoz, majd később rajongóihoz is. Előadásait ezrek látogatták, mert szavaiból nem saját nagyszerűségének tudata sugárzott, hanem a szeretet az iránt, aminek él. Nem gondolta, hogy valaha tett volna bármit, amivel a többiek fölé kerekedett. Egyszerűen csak élt. Tudta azt is, hogy az élethez hozzátartozik a halál, ezzel lesz kerek a történet. Így most csak annyi történt, hogy Erőss Zsolt teljessé tette életét, felmászott a hegyek közé, és tovább emelkedett a szokásosnál.\" - Földes András', 2590.00, 'Sport, természetjárás'),
(68, 'A Ferjáncz', 36, 'https://s01.static.libri.hu/cover/1d/3/1081998_4.jpg', '2013-09-17', 'Ki e könyv főszereplője? Ferjáncz Attila, a magyar ralisport királya! A Bajnok!,,Az autósport szerelmeseinek körében neve a mai napig fogalom. Harminckétszeres magyar bajnok, huszonháromszoros Európa-bajnoki futamgyőztes és kétszeres Európa-bajnoki bronzérmes. A számtalan kiváló és sikeres magyar autóversenyző között egyértelműen az ő neve fémjelzi és tette híressé a magyar autósportot a 20. században. Az autóversenyző, akivel ma is bárki, bármikor szívesen megmérkőzne - akár a győzelem leghalványabb esélye nélkül is. Akiről tudják bizonyosan, hogy nélküle más sporttörténelmet írtak volna a krónikások...\"A kötet szerzője, Lukács Ákos csaknem fél évszázada kötött barátságot a bajnokkal. Ott volt azon a bizonyos József Attila Rallye-n, ahol Ferjáncz Attila életében először állt rajthoz. ,,Ott, 1964-ben, a Műegyetem előtti szlalompályán, ahol a bámészkodók és a meglepődött versenyzőtársak ünnepelték a tizenhét éves srácot, aki kényszerből rükvercbe kapcsolta a Wartburg sebességváltóját, azaz hátrafelé száguldott gyorsabban, mint a többiek előre! Azon a versenyen született meg a magyar és a nemzetközi autósport legendája!\"Ferjáncz Attila versenyzői pályafutásáról, küzdelmeiről, csapatáról, az autósportról, családjáról, az MNASZ elnökeként betöltött szerepéről, élete történetéről, s több mint fél évszázad társadalmi lenyomatáról olvashat a következő oldalakon...', 2490.00, 'Sport, természetjárás'),
(69, 'Kendőzetlen igazság', 37, 'https://s01.static.libri.hu/cover/8f/1/4469755_4.jpg', '2018-03-20', 'TYSON ÖNÉLETRAJZA UGYANOLYAN ÜTŐS, MINT A STÍLUSA A RINGBEN\"Iron Mike\" Tyson Brooklyn legszegényebb és legveszélyesebb gettójában nőtt fel. Jamaicai apját alig ismerte, anyja pedig az alkohol és a kábítószer rabjaként kevés figyelmet fordított legkisebb gyermekére. Már egészen fiatal korában belecsöppent az egymással harcoló suhancbandák kíméletlen világába. Pályafutását, saját szavaival élve, piti bűnözőként kezdte, aki kapható volt mindenre, csak hogy megmeneküljön a pár évvel idősebb \"\"nagymenők\"\" állandó terrorizálásától. Megjárta a javítóintézetet és a fiatalkorúak börtönét is, mígnem egy váratlan találkozás gyökeresen megváltoztatta egyre kilátástalanabb sorsát. Cus D\'Amato, a neves bokszedző védőszárnyai alá került, aki fiaként nevelte, és megállíthatatlanul repítette a csúcsra, bár Mike világbajnoki címét már nem érhette meg. Tyson szókimondó önéletrajzi művében valóban felfedi az igazságot: nem szépít, nem magyarázkodik, nem köntörfalaz - hamisítatlan gettóstílusban mutatja be az életét: a ringben elért sikereit éppúgy, mint magánéleti problémáit, kicsapongó életmódját és számtalan személyes konfliktusát.', 3190.00, 'Sport, természetjárás'),
(70, 'Sorozatgyilkos nők', 38, 'https://s01.static.libri.hu/cover/a3/c/13028005_4.jpg', '2026-03-20', 'Ha sorozatgyilkosokról hallunk, általában rossz arcú, agresszív férfiakat képzelünk magunk elé, pedig a gyilkos ösztön, a bosszú és a hatalomvágy női sorsokban is megjelenhet. Magyari Hajnalka könyve olyan nőket mutat be, akik átlépték a társadalom által kijelölt határokat - némelyek tudatosan, mások megbomlott elméjük miatt, esetleg a túlélés kényszerétől hajtva. Vannak köztük méregkeverők, bábák, feleségek, árvák és özvegyek, akiknek a történetei nemcsak a bűnügyi krónikák egy-egy fejezetét jelentik, hanem tükrei annak a világnak, amelyben a női lét korlátai olykor végzetes tettekhez vezettek.A szerző nem a szenzációt keresi, hanem az összefüggéseket: hogyan lett a női tapasztalatból bűn, a társadalmi elnyomásból pedig hatalomvágy és bosszú? A nőtörténet és a kriminológia határán mozgó mű sajtóforrások, levéltári dokumentumok és helyszíni kutatások alapján olyan női sorozatgyilkosokat idéz meg, akiknek az élettörténete a társadalom- és nőtörténet iránt érdeklődő olvasók számára is provokatív és elgondolkodtató olvasmány.KOVÁCSNÉ MAGYARI HAJNALKA (PhD) andragógus, szépségtörténész és nőtörténet-kutató, az MTA-VEAB Nőtörténeti Bizottság tagja, az MTA-HTK Lendület Munkaformák Kutatócsoport kutatótagja, az Interpress Magazin (IPM) állandó szerzője.', 3999.00, 'Magyar történelem'),
(71, '88 történet \'44-ből-Epizódok holokauszttúlélők és embermentők emlékeiből', 39, 'https://s01.static.libri.hu/cover/e6/0/12947181_4.jpg', '2026-02-16', ',,A személyes borzalmakon átsugárzik az élni vágyás, fel-felcsillan a humor... Ráadásul ezek a mi saját, magyar történeteink.\"Hetényi Zsuzsa előszavából ,,Ha mind az áldott történetre vágyunk, miért nincs az átkozottnak vége már...\"Schäffer Erzsébet zárszavábólTúlélők és Világ Igaza címmel kitüntetett embermentők idézik fel 80+8 történetben, mit jelentett gyerekként vagy fiatal felnőttként a zsidóüldözés idején élni Magyarországon, vagy ott, ahová a vészkorszak kiszámíthatatlan eseményei sodorták őket. Hétköznapi tárgyak kapcsán felbukkanó emlékeik különös erővel elevenítik fel nemcsak a munkaszolgálat, a koncentrációs táborok, a német megszállás, a nyilas uralom vagy éppen Budapest ostroma és a gettó mindennapjait, hanem bemutatják a vészkorszak félelmeit és reményeit, tragikus vagy megkönnyebbülést hozó pillanatait. A személyes elbeszéléseket családi fotók és egy rendhagyó, 300 kifejezést tartalmazó fogalomtár egészíti ki, hogy az olvasó könnyebben értelmezhesse az epizódokat.Sziklainé Lengyel Zsófia interjúiból olyan kötet született, amely egyszerre őriz emlékeket, tanít, kérdez és válaszol arra, hogy lehetett túlélni, segíteni, emberségesnek maradni az embertelenségben. Könyve mindazokhoz szól, akik szeretnék megismerni az 1944-45-ös események egy fontos szeletét - méghozzá nem a tankönyvekből, hanem az azokat átélők saját hangján.', 4500.00, 'Magyar történelem'),
(72, 'Hideg polgárháború', 40, 'https://s01.static.libri.hu/cover/af/7/13080022_4.jpg', '2025-03-16', 'A Tanácsköztársaság megbukott, Kun Béla elmenekült, Tolnában már Prónay Pál katonái akasztanak kegyetlen élvezettel bűnöst és ártatlant egyaránt.A magyar történelem egyik mélypontjához érkezett. Az ország nagy része megszállás alatt áll, Budapest szinte éhezik, a kormány összetétele hetenként változik. Ám a kommün napjaiban alámerült fővárosi félvilág hamar újjászületik, az orfeumokban újra szól a muzsika és folyik a pezsgő. És aztán jön Trianon. Gyászpompa, harangzúgás és nagy fogadkozások: nem, nem soha! 1920 nyarán megszületik a jelszó is: Csonka Magyarország nem ország, egész Magyarország mennyország.Trianont korszakválasztónak tekinti mindenki, de az ország szétdarabolásának fájdalmas emlékezete mélyebb törésvonalakat is takar: a 400 év után újra függetlenné lett Magyarországot egyéb módon is szétszabdalták, megcsonkították belső konfliktusai. Az ezekből kiformálódott felemás, boldog-boldogtalan Csonka-Magyarország ma is velünk van abban a ,,hideg polgárháborúban\", amelynek 1919 és 1922 közötti, Kun Béla bukásától Horthy Miklós felemelkedésén át Bethlen István hatalmának megszilárdulásáig tartó nyitó korszakát tárgyalja ez a kötet. Azt az időszakot, amikor - egy rezignált bölcs politikus szavaival - ,,a korszak kérge még nem hűlt ki, és a jósok kétheti felmondásra sem mertek jósolni.\"HATOS PÁL történész, akinek nagy sikert aratott korábbi kötetei, az 1918-as összeomlást elmesélő Elátkozott köztársaság, valamint a Tanácsköztársaság történetét izgalmas új színekben bemutató Rosszfiúk világforradalma szintén a Jaffa Kiadónál jelent meg.', 4999.00, 'Magyar történelem'),
(73, 'A magyar kommunisták 1918-1989', 41, 'https://s01.static.libri.hu/cover/f6/7/11893573_4.jpg', '2025-02-17', 'Nincs még egy történelmi fogalom, amelyet olyan sokan ismernek és félreismernek, mint a kommunista. Ellenfeleik és a velük rokonszenvezők sok mindent láttak bennük: radikális felforgatókat éppen úgy, mint radikális megváltókat. E mozgalom tanításai az utolsó állomást jelentették az emberiség utópiáinak történetében: hívei nem csupán a gazdaság és a politika világát, hanem az emberi lét számos megnyilvánulását is át akarták formálni egy jobb és szabadabb világ reményében.A magyar történelemben szinte csak gondolatnyi idővel, alig egy évvel az orosz bolsevikokat követően bukkantak fel az első kommunisták, hogy rendkívüli körülmények közepette átalakítsák a korabeli Magyarországot. Három ízben: 1919-ben, 1945-ben és 1956-ban fogtak hozzá, hogy meggyökereztessék itthoni földben a Szovjet-Oroszországból származó eszmét, de minél inkább követték az eredeti mintát, annál jobban elutasította őket a korabeli magyar társadalom, s minél jobban alkalmazkodtak a hazai valósághoz, annál távolabbra kerültek az alapító atyák elképzeléseitől. Végső soron a diktatúra tapasztalata az, amit legfőbb örökségként ránk hagyományoztak.A magyar kommunisták arra vállalkozik, hogy bemutassa azokat a történelmi körülményeket, politikai vitákat, belső frakcióharcokat, az ellenfelek kíméletlen eltiprását, a kényszerű átalakulásokat, amelyek e több mint 70 éves történetet jellemzik. Nem csupán Kun Béla és Rákosi Mátyás, Nagy Imre és Kádár János neve fémjelzi a magyar kommunistákat, hanem a szellem olyan nagyságai is, mint Lukács György és Déry Tibor, vagy épp a hatalom olyan könyörtelen megszállottjai, mint Szamuely Tibor vagy Péter Gábor. A kötet voltaképpen utazás a mozgalom belső világában, hogy jobban lássuk és értsük a mögöttünk lévő század magyar történelmét.Papp István történész Mezőtúron született 1979-ben. Az ELTE történelem-politikaelmélet szakán diplomázott, és doktori tanulmányait követően 2005 óta az Állambiztonsági Szolgálatok Történeti Levéltárának munkatársa, jelenleg a tudományos főosztály vezetője. Nős, feleségével és két lányával Zuglóban él.', 4199.00, 'Magyar történelem'),
(74, 'Oszmán-magyar kapcsolatok', 42, 'https://s01.static.libri.hu/cover/4d/9/9996426_4.jpg', '2023-06-17', 'Hatalmi harcok Európában: törökök és magyarok A Közép-Európa központjának számító Magyarország az újkori és modern kori Európa hatalmi harcainak fontos helyszíneként hosszú évszázadokon keresztül az oszmán és Habsburg uralkodók közötti katonai és politikai küzdelmek és egyezkedések történelmi színteréül szolgált. Az oszmánok és a magyarok a 14. században, a török Balkánon való megjelenése során léptek először kapcsolatba egymással, ezután a mohácsi ütközet sorsfordítónak bizonyult a két fél viszonyában. A 16. században a magyarok egyre kiemelkedőbb szerepet játszottak az oszmánok Duna-menti politikájában, e kölcsönhatás pedig a későbbi századokban tovább mélyült. A történelmi sorsközösség újabb fejezete volt az, amikor az 1848-as forradalom és szabadságharc leverése után a magyarok oszmán földön kértek és kaptak menedéket. A Habsburgok és Oroszország tiltakozására és kérvényére, hogy adják ki a magyar politikusokat, Abdulmedzsid szultán azt a feleletet adta, hogy akkor is megvédi őket, ha egy magyarért akár ötvenezer oszmán életet kell adnia. M. Tayyib Gökbilgin, az oszmán-magyar kapcsolatok egyik legjelentősebb törökországi kutatója jelen munkájában e közös történelemnek ered nyomába. A történész tizenhárom tanulmányát magába foglaló kötet a török hódoltság korával kapcsolatos általános gondolatokkal kezdődik, majd részletesen tárgyalja a következő kérdéseket: oszmán-magyar harcok II. Murád uralkodása idején, Mátyás király levelei II. Bajazidnak, Nagy Szulejmán magyar és európai politikájának különböző időszakai, az oszmánok Duna-menti és földközi-tengeri politikája a 16. század közepén, az 1566-os szigetvári hadjárat előzményei és előkészületei, Buda török fennhatóság alatt, Kara Üvejsz pasa mint budai beglerbég, valamint Erdély a 17. század elején. A könyv utolsó fejezetei olyan témákat vesznek górcső alá, mint Thököly Imre szerepe az oszmán-magyar kapcsolatokban, Rákóczi Ferenc és az Oszmán Birodalomban menedékre lelt bujdosók, végül pedig a 19. század végi török-magyar kapcsolatok.', 2800.00, 'Magyar történelem'),
(75, 'A honfoglalás története', 43, 'https://s01.static.libri.hu/cover/8b/5/9451045_4.jpg', '2023-06-19', 'Borovszky Samu (1860 - 1912) az MTA levelező tagja, történész, avatott tollú szakíró, a honfoglalás kori magyar történelem kutatója élvezetes, könnyed stílusban, hatalmas tudással vázolja föl a honfoglalás korának magyar kultúráját, népeit, népünk kapcsolódását a helyi népekhez, kultúránk és népünk eredetét, hitvilágát, pogány vallását. Részlet a műből: Ha valaki ügyét szerencsésen akarta végezni, hozzáfordult könyörgéseivel s egy-egy ügylet sikeres lebonyolítása után tiszteletére áldomást ittak. Ez áldomások minden szerződésnél elmaradhatatlanok voltak s egy-egy családnak vagy nemzetségnek külön pohara is volt erre a célra. A XVI. században még a Hegyalján széltére ittak ez áldomás-poharakból, mikor alkut kötöttek s az írott levelek azt is elárulják, hogy abban az időben e poharat Ukkon poharának nevezték. Ez ugyanaz az elnevezés, ami a finn Ukon pikari vagy Ukon malja. S a pogány finnek a maguk főistenét valóban Ukonnak nevezték. Íme, így tudjuk meg, hogy őseink legfőbb istenének a neve Ukkon volt. Volt egy másik hatalmas istensége is a pogány magyaroknak. Kisebb ugyan, mint a legfőbb isten, de szintén általánosan tisztelt. Ez volt a saját nemzeti istenük, kinek neve ma is él népünk tudatában. ', 990.00, 'Magyar történelem'),
(76, 'Horthy Miklós, a haditengerész', 44, 'https://s01.static.libri.hu/cover/a1/a/9794661_4.jpg', '2022-11-19', 'Horthy Miklós személyéről és tevékenységéről számtalan könyv, tanulmány és cikk született az utóbbi években, de életének és karrierjének egy kevéssé feldolgozott szakaszát az utókor eddig csak nagy vonalakban ismerhette. Turbucz Dávid vállalkozott elsőként arra, hogy Horthy 1882 és 1918 közötti haditengerészeti karrierjét a magyar és osztrák közgyűjteményekben fellelhető anyagokra támaszkodva, tudományos alapossággal és részletességgel, de egyúttal olvasmányos stílusban mutassa be. A dokumentumokból megtudjuk többek közt azt, hogy miért választotta a fiatal Horthy családja ellenkezése dacára a haditengerésztiszti pályát, és hogyan sikerült a társasági életet kedvelő fiatalembernek A szerző végigkalauzolja olvasóit Horthy Miklós nagy, világ körüli útján a ,,kannibálók földjétől\" Konstantinápolyon át egészen a bécsi udvarig. Nyomon követhetjük Horthy tengeri és szárazföldi beosztásait: megismerjük Ferenc József szárnysegédjeként, a Novara gyorscirkáló, majd a flotta parancsnokaként, és megtudhatjuk, miként jöhetett létre az ,,otrantói hős\" mítosza, amely megelőlegezte a Horthy alakját övező kultusz születését. TURBUCZ DÁVID 1984-ben született Budapesten. Az Eötvös Loránd Tudományegyetemen végzett történelem (2009) és politológia (2010) szakon. Doktori fokozatát - Romsics Ignác témavezetése mellett - 2015-ben szerezte meg az egri Eszterházy Károly Főiskolán. 2012 szeptemberétől az MTA, majd 2019-től az ELKH BTK Történettudományi Intézet munkatársa. Kutatási területe Horthy Miklós élete és megítélésének története.', 2999.00, 'Magyar történelem'),
(77, 'Nemzet és hegemónia, 1945-1989', 45, 'https://s01.static.libri.hu/cover/f6/4/10157944_4.jpg', '2021-03-04', 'Jelen munka - a nemzetmeghatározásokat nem szem elől tévesztve - a nemzetet a társadalmi, politikai, gazdasági és kulturális hegemóniáért folytatott harc tárgyának, céljának, közegének, folyamatosan változó, sokszínű, belső ellentétekkel terhelt közösségnek és nem önnön lényegét megvalósító cselekvő alanynak tekinti. A modern nemzetet a hegemóniaharcok segítették létrejönni, és a megvalósult hegemónia tartja össze. A kötet azt igyekszik megmutatni, hogy miként formálódott a nemzet mint virtuális közösség, milyen kölcsönhatásban volt azzal a valósággal, amelyet formált, és milyen társadalom volt az, amely 1945, illetve 1956 után nemzeti alakot öltött. Ezért elemzésem diszkurzív, amennyiben szövegeken keresztül közelít valóságos tárgyához, ideológiakritikai, amennyiben az eszmék társadalmi és politikai tartalmát igyekszik feltárni, strukturális és történeti, amennyiben a nemzetet társadalmi valóságként próbálja ábrázolni. A hegemónia a nemzetet az éteri magasságokból a földre hozza, és valóságos kapcsolatot teremt az illuzórikus és a valóságos közösség, a virtuális és valóságos nemzet között.', 3000.00, 'Magyar történelem'),
(78, 'Oldalvonal', 46, 'https://s01.static.libri.hu/cover/9e/a/8908472_4.jpg', '2021-01-03', 'A 19. század utolsó éveiben meghonosodott futball néhány évtized leforgása alatt Magyarországon is több lett, mint egyszerű játék: átitatta a mindennapok szövetét, beszüremkedett a társadalmi kapcsolatokba, a politikába, éreztette hatását a kulturális életben és a kisebb-nagyobb történelmi viharok idején is. A magyar futballtörténet legendás, nagy alakjait ma már aligha kell bemutatni valakinek. De mi a helyzet azokkal, akiket méltatlanul elfeledett az utókor, akik csendes háttéremberként, edzőként, sportmecénásként, vagy csak futballszerető polgárként dolgoztak a magyar labdarúgásért? Ki emlékszik Hirzer Ferencre, a Juventus egykori ünnepelt gólkirályára, Gierling Györgyre, a szovjet lágereket megjárt marosvásárhelyi csapatkapitányra, vagy Perényi-Pecsovszky Józsefre, aki egy újpesti gyárkéménybe bújva vészelte át Budapest ostromát? Mit tudott a labdarúgás, hogy a két háború között grófok és bárók, dúsgazdag iparmágnások és jeles egyházi személyiségek egyaránt fontosnak tartották, hogy egy-egy csapat mögé álljanak? Mit gondoltak a futballról a budapesti kávéházakban kártyázó sportvezetők, és mit a távoli végek olykor tragikus sorsú falvainak lakói? Hogyan igézett meg a játék jezsuita szerzeteseket, tehetséges ifjú szobrászokat, polgármestereket és cigányprímásokat egyaránt? Csillag Péter két nagy sikerű kötete - a klasszikus magyar irodalom és a futball kapcsolatát bemutató Ady stoplisban, illetve a labdarúgás és a történelem viszonyát megrajzoló Kapufák és kényszerítők - után ezúttal nem a ,,nagypályás\" történetekre fókuszál: elfeledett futballhősök, titokzatos figurák, múltba veszett történetek elevenednek meg írásaiban, felvillantva egy-egy személy, csapat vagy pálya felemelő vagy éppen tragikus sorsát, és azon keresztül a háttérben zajló nagyobb folyamatokat. CSILLAG PÉTER (1983) Junior Prima-, Németh Gyula- és MSÚSZ-nívódíjas újságíró, történész, a Nemzeti Sport főmunkatársa. A magyar futball hátországát bemutató Hátsó füves című országjáró sorozat készítője, három világbajnokság, három Európa-bajnokság és öt Bajnokok Ligája-döntő helyszíni tudósítója. Elsődleges érdeklődési területe a futball történelmi, társadalmi és kulturális vetülete.', 2999.00, 'Magyar történelem'),
(79, '1921- A Horthy-rendszer megszilárdulásának története', 47, 'https://s01.static.libri.hu/cover/bc/9/8908471_4.jpg', '2021-09-20', 'Kereken száz esztendővel ezelőtt, az elveszített világháború, a forradalmak, a megszállás, a terror és a trianoni békekötés traumái után a Horthy-rendszer lázasan igyekezett meghatározni önmagát. A kísérletet nem csupán a nacionalista-irredenta retorika és az antiszemitizmus fellángolása jellemezte, de keresztény belső feszültségek is felszínre törtek, elsősorban a két nagy protestáns, illetve a római katolikus egyház között. 1921-ben Pécs, Baja és a köztük lévő területek visszakerültek az anyaországhoz, Nyugat-Magyarországon pedig felkelés robbant ki az Ausztriához csatolandó területek visszaszerzésére. Az eseményeket az év végi soproni népszavazás zárta le, amellyel - kisebb eltérésektől eltekintve - kialakultak Magyarország mai államhatárai. Még mindig ugyanebben az évben az utolsó magyar király, IV. Károly kétszer is megpróbált visszatérni a trónra, komoly kihívások elé állítva a kormányzót és a hozzá hű politikai elitet. A királykérdés körüli vita és belharc végül egyértelműen a korszak legélesebb belpolitikai konfliktusává változott. Veszprémy László Bernát kötete olyan sorsfordító időszakként mutatja be az 1921-es esztendőt, amelynek jelentőségéhez a Horthy-korban talán csak az 1944-es év fogható. Ám míg ez utóbbiról számtalan kisebb-nagyobb monográfia született már, 1921-nek eddig jóval kevesebb figyelmet szenteltek a kutatók, noha eseményei az egész rendszer későbbi sorsát meghatározták. A könyv társadalomtörténeti, politikatörténeti és emlékezettörténeti szempontok figyelembevételével alapos és érdekfeszítő összefoglalóját adja a korai Horthy-rendszernek, miközben fontos kérdéseket vet föl Horthy kormányzói tehetségével vagy épp Teleki Pál és Bethlen István politikájával kapcsolatban is. Veszprémy László Bernát 2016-ban végzett a Károli Gáspár Református Egyetemen, majd az Amszterdami Egyetem holokauszt- és népirtáskutatás szakán szerzett mesterfokozatot. Jelenleg doktorjelölt az ELTE BTK Művelődéstörténet Doktori Iskoláján. Kutatási területe a politikai eszmetörténet és a zsidóság története. 2016 és 2018 között a Szombat című zsidó folyóirat munkatársa, 2017 és 2018 között a Veritas Történetkutató Intézet kutatója, 2019-ben a Milton Friedman Egyetem Magyar Zsidó Történeti Intézetének kutatója volt. Jelenleg a neokohn.hu nevű zsidó hírportál főszerkesztő-helyettese', 2999.00, 'Magyar történelem'),
(80, 'Nem kell annyi pábijubi', 48, 'https://s01.static.libri.hu/cover/3b/8/12997277_4.jpg', '2026-03-23', '\"Szombathy Gyula Kossuth- és Jászai Mari-díjas magyar színművész, érdemes és kiváló művész leplezetlen őszinteséggel tekint vissza a pályájára a könyvben. A színész különleges humorral és önkritikával mesél életéről, munkájáról, a színészi pálya szépségeiről és mélységeiről. A szöveget lejegyezte Gellért Gábor.,,Az ötvenes évek közepén intézetben éltem a hétköznapjaim, de hétvégenként hazajöhettem. A Bernáth Géza utcában laktunk, a Tiktak presszó közelében. A presszóval szemben volt egy önkiszolgáló étterem, ahol szombatonként élő zene várta a szórakozni vágyó munkásokat, és ha a szüleimnek jókedve volt, lementünk és az anyukámmal táncolhattam.De az intézetben is voltak táncestek. Eljöttek a leányintézetekből a partnerek és elérhetővé váltak a női derekak. Aki nem tudott táncolni, hoppon maradt. Esténként a hálóteremben egymással gyakoroltunk. Páronként összekapaszkodtunk, a rádióból pedig hallgattuk Glenn Millert, meg a magyar slágereket. Három aranyásó ment a hegyek között...Táncoltunk... egyet-kettőt, mellette kiabáltuk az ütemeket. Pá, pá, jubi, jubi, jubi, jubi... Amikor eljött a takarodó ideje, bejött a nevelő és elordította magát: ,,na hülye gyerekek, a pábijubinak vége\"! De nem volt igaza. A pábijubinak soha nincs vége.\" Szombathy Gyula ,,Amikor 17 éves voltam, leírtam egy papírra, milyen férfival képzelem el az életem. 17 pontban foglaltam össze a vágyaim. Legyen intelligens, fel tudjak nézni rá. Romantikus, figyelmes és megértő. Racionális és gyakorlatias. Legyen anyagi háttere és egzisztenciája, mindehhez legyen gavallér ember. Férfias, kulturált megjelenésű. Néhol pontosabban fogalmaztam. Legyen tiszta, ápolt és stílusos a cipője - cipőmániás vagyok. Tudjon úszni - én nem tudok, legyen, aki kimentsen, ha baj van. Tudjon táncolni, izzadságcseppek nélkül emeljen meg és pörgessen, ha megköveteli a ritmus.Ezek persze egy 17 éves lány gondolatai voltak. Megnőttem, férjhez mentem, elváltam, egyedül éltem, megtanultam kompromisszumokat kötni. Akkor találkoztam Gyuszival és rájöttem, hogy 17 évesen volt igazam. Van hozzám illő férfi. Bizony megtörténhet, hogy nem kell kompromisszumokat kötni.Ezúttal a róla szóló könyvet ajánlom Önöknek. Ez egy őszinte könyv, nem a szokványos ,,színészi\" mesélés. Minden van benne: egy élet élményei, örömei, bánatai, csalódásai. Önkritika és kritika, vélemény, harag és tapintatos bírálat, de ami a legfontosabb, minden mondatban fellelhető az ő sajátságos humora.\" Böbi, a felesége', 3890.00, 'Film'),
(81, 'Jól csináltuk, kölyök! - Memoár', 49, 'https://s01.static.libri.hu/cover/d6/2/12732605_4.jpg', '2025-01-14', 'Ebben a régóta várt, megindítóan őszinte önéletírásban megelevenedik a világhírű, kétszeres Oscar-díjas színész, Sir Anthony Hopkins gyerekkora, színészi pályája, az eszméléstől a bölcsességig ívelő életútja. Sir Anthony Hopkins egy kis walesi iparvárosban, Port Talbotban született. Gyerekkorát beárnyékolta a háború és megkeserítette az a társadalmi közeg, melyben a férfias keménység, az alkohol és a nyers brutalitás vitte a prímet, kíméletlenül elnyomva a lelki érzékenység, a szépség iránti vonzalom minden formáját. Gyenge tanulmányi előmenetele miatt diáktársai, tanárai és szülei egyaránt leírták mint tehetségtelen fajankót, aki semmire sem fogja vinni az életben. A sorsdöntő fordulat akkor következett be a semmibe vett walesi fiú életében, amikor egy szombat este megnézte Shakespeare Hamletjének 1948-as filmváltozatát. Ez az élmény volt a szikra, amely lángra lobbantotta lelkében a vágyat, hogy színész legyen; ekkor határozta el, hogy rálép az útra, amelyen eljutott a világhírig. Hopkins megnyerő őszinteséggel, lebilincselő stílusban idézi fel könyvében pályájának legfontosabb állomásait és enged bepillantást az olvasónak abba a műhelymunkába, amelynek során megszülettek zseniális alakításai. Jago szerepének megformálásáért vették fel a rangos Royal Academy of Dramatic Art drámaiskolába, ahol Laurence Olivier volt a mestere. Richard Burtonnel még fiatal fiúként találkozott rajztanárának a lakásán, hogy néhány év múlva már befutott pályatársként üdvözölhesse rajongásig szeretett példaképét, a kulisszák mögött, az Equus egyik előadásán. Egyik ikonikus szerepének, Hannibal Lecternek a megformálásában, saját bevallása szerint, döntő szerepe volt kiváló színészmesterség-tanára útmutatásának és Lugosi Béla Drakulájának, amelyből ihletet merített. A Lear király címszerepének felejthetetlen alakításához apja és nagyapja rendíthetetlen higgadtsága, szenvedélymentessége szolgált számára mintaképül. Hopkins kíméletlen őszinteséggel tárja fel az olvasó előtt magénéleti válságait is. Súlyos alkoholfüggősége tönkretette nemcsak az első házasságát, de egyetlen gyerekével való kapcsolatát is, és kis híján az életével fizetett érte. Amikor erre rádöbbent, elhatározta, hogy nem nyúl többé a pohárhoz, és ezt a fogadalmát immár lassan fél évszázada tartja. Minden erejével megpróbálja elnyomni magában a vágyat, hogy magányosan élje le az életét, és mindent megtesz az ellen, hogy a kiszolgáltatottságtól való félelmében - családja férfitagjaihoz hasonlóan - kerülje az emberi kapcsolatokat. Az évek előrehaladtával egyre jobban foglalkoztatja a múlandóság, apja szavait idézve ,,a nagy titok\", hogy mi jön a halál után. A Jól csináltuk, kölyök! egy különleges, összetett, ikonikus ember nyers és szenvedélyes, személyes fotókat is tartalmazó emlékirata, aki több mint hatvan éven át figyelemre méltó alakításokkal inspirálja közönségét.', 6299.00, 'Film'),
(82, 'Kulka', 50, 'https://s01.static.libri.hu/cover/2c/1/11451039_4.jpg', '2024-08-19', ',,Nem szokványos színész-könyv ez: inkább egy ember portréja. Egy olyan emberé, aki megjárta a halált, visszajött onnan, de sok mindent elveszített. Nem tud többé sportolni, főzni, monológokat vagy verseket mondani, nem beszél már angolul vagy franciául (bár a kiejtése egy-egy mondatra is tökéletes), nehezen jár és állandó fájdalom gyötri. Számos olyan dolgot hagyott hátra, ami a korábbi életének fontos része és örömforrása volt. Hiányokkal él, de nem sír vissza semmit. Most mégis elindulunk vele hátrafelé. Felkeressük az élete fontos helyszíneit, elvisszük magunkkal a barátait, és ránézünk az egészre. Megvizsgáljuk, mi formálta, mi marad belőle, mi az, ami igazán fontos\" - írja Gyárfás Dorka, aki elkísérte Kulka Jánost ezen az úton.Szívbemarkolóan őszinte vallomások, abszurd humor és csodálatos fotók az év várva várt portrékönyvében.', 6999.00, 'Film'),
(83, 'Maffiózók, a Soprano család kulisszatitkai', 51, 'https://s01.static.libri.hu/cover/ab/5/11036646_4.jpg', '2024-03-01', 'A korszakalkotó tévésorozat, a Maffiózók hiteles története , tele soha nem hallott, a kulisszák mögött és a forgatási helyszíneken megesett históriákkal. A hihetetlenül népszerű Talking Sopranos podcast ösztönzésére a Maffiózók sztárjai, Michael Imperioli (Chris Moltisanti) és Steve Schirripa (Bobby Baccala) végre lerántják a leplet a Soprano család titkairól ebben a meglepő, mulatságos és őszinte könyvben. A Woke up this morning a kultikus HBO sorozat kulisszák mögötti hiteles történetét meséli el, a sorozatét, ami világszerte ismert kulturális jelenséggé nőtte ki magát, és ami a televíziózás aranykorának előhírnöke lett, és mind a mai napig minden idők egyik legtöbbet nézett műsora marad. Mi a sok tojás jelentősége? Mi a fene történt az orosszal? És mit is jelent a végén az a híres utolsó jelenet? Ha valaki, akkor Michael Imperioli, Steve Schirripa , Chris és Bobby , és a Maffiózók teljes szereplőgárdája és stábja tudja a választ, és el is árulják, hol vannak a hullák eltemetve! A szereplőkkel, stábbal, producerekkel, írókkal, rendezőkkel és természetesen a sorozat kitalálójával, David Chase-zel a podcast alapján folytatott beszélgetéseikben Michael és Steve elmesélik a történeteket, amikre a Maffiózók rajongói húsz éve várnak. A könyv felöleli a Maffiózók-sorozat teljes történetét az eredeti ötlet megszületésétől a hírhedt elsötétült képernyőig, és a podcastnak beküldött, többezer rajongói kérdés közül sokra válaszol, valamint eloszlat számos széles körben terjesztett kitalációt, és olyasmiket vet fel, amiket a műsoron kívül senkinek még csak eszébe sem jutna megkérdezni.', 4999.00, 'Film'),
(84, 'Koltai 80 - Filmeskönyv', 52, 'https://s01.static.libri.hu/cover/ee/1/10449323_4.jpg', '2023-08-17', 'Még a Színművészeti Egyetem elsőéves dokumentumfilm-rendező hallgatója voltam, amikor az egyik tanárunk behozott az órára egy vadonatúj, frissen készült filmet. Azt mondta, nézzük meg, aztán beszélgessünk róla. Ez volt a Sose halunk meg, Koltai Róbert első rendezése. Egyetlen gondolat motoszkált akkor bennem, aminek aztán parázs vitát provokálva hangot is adtam az egyetemen: ennek a filmnek minden kockájából árad a szeretet.A filmet is, bennünket is megérlelt azóta az idő.Nem sejthettem, hogy pontosan 30 év múlva olyan könyvön fogok dolgozni, amely Koltai Róbert filmjeivel foglalkozik, és őt nem csak mint filmrendezőt, filmszínészt, hanem mint életem párját is kérdezem majd.A szubjektív kifejezés ily módon talán adja magát, a monográfiát pedig az magyarázza, hogy a könyv Koltai Róbert mintegy 15 filmjét és az elmúlt közel 30 évet öleli át.A könyvben mesélnek többek között:Bunyik Béla producer,Darvas Ferenc zeneszerző,Dés László zeneszerző, zenész,Grecsó Krisztián író,Kern András színművész,Miklós Mari vágó,Vámos Miklós író,Nógrádi Gábor író.A szerzőről:Gaál Ildikó vagyok, színházi rendező, rádiós műsorvezető, de legfőképpen kíváncsi ember. Érdeklődésem tárgya pedig a másik ember. Filmen, színházban, rádióban és a magánéletben is. Kapcsolódni szeretek. Érteni, érezni, létrehozni.', 4199.00, 'Film'),
(85, 'Cinema speculation', 53, 'https://s01.static.libri.hu/cover/7b/b/10365819_4.jpg', '2023-03-21', ',,Napközben megengedték, hogy normális (idegesítő) gyerekként viselkedjek. Hülye kérdéseket tegyek fel, gyerekes és önző legyek, mint a legtöbb kölyök. De ha elvittek egy kellemes étterembe vagy bárba (ami előfordult, mert Curt bárzongoristaként dolgozott), vagy egy éjszakai lokálba (amit időről időre szintén megtettek), vagy moziba, vagy dupla randira egy másik párral, tudtam, hogy ez a felnőttek ideje. Ha azt akartam, hogy körülöttük legyeskedhessek a felnőttek ideje alatt, akkor kurvára csihadnom kellett.\" Quentin Tarantino régóta várt könyve ékes bizonyítéka annak, amit a világszerte elismert rendező nyilatkozatai és a vele készült interjúk alapján már eddig is sejthettünk: Hollywood örökifjú fenegyereke nem csupán napjaink amerikai filmművészetének zseniális alkotója, de a filmek egyik legélesebb szemű nézője, kritikusa és csodálója is. Ebben a hatalmas filmtörténeti ismeretanyagot megmozgató, mégis mindvégig olvasmányos könyvben Tarantino meghatározó gyerekkori moziélményeiből kiindulva vizsgálja a \'70-es évek amerikai filmtermésének számára legérdekesebb darabjait, megkerülhetetlen klasszikusokat és már-már elfeledett B kategóriás gyöngyszemeket egyaránt. Magával ragadóan laza stílus és irigylésre méltó profizmus - Tarantino sajátos kor- és életrajzzá összeálló elmélkedéseinek ugyanazok az ismérvei, mint utánozhatatlan filmjeinek. A Cinema Speculation mélyen személyes vallomás a mozi szenvedélyes szeretetéről - kihagyhatatlan olvasmány nemcsak Tarantino rajongóinak, de általában a filmek szerelmeseinek. QUENTIN TARANTINO: Lehengerlő fantáziájának és összetett forgatókönyveinek köszönhetően Quentin Tarantinót generációjának egyik leghíresebb filmeseként tartják számon. Első nagyjátékfilmjét rendezőként az 1992-es Kutyaszorítóban jelentette, ezt pedig egyik legnépszerűbb filmje, a Ponyvaregény követte, amelynek elkészítésében rendezőként, társszerzőként és színészként is közreműködött, és amelyért elnyerte első Oscar-díját a legjobb eredeti forgatókönyv kategóriában. További filmjei, a Jackie Brown, a Kill Bill 1 & 2 és a Halálbiztos sikersorozatát a Becstelen brigantyk című második világháborús eposz, a Django elszabadul (amelyért ismételten elnyerte a legjobb eredeti forgatókönyvért járó Oscart), valamint az Aljas nyolcas folytatta. Tarantino legutóbbi filmje, a Volt egyszer egy... Hollywood öt Golden Globe-, tíz BAFTA-, valamint tíz Oscar-jelölést kapott. A szerzőtől a Helikon Kiadónál megjelent: Volt egyszer egy Hollywood', 3299.00, 'Film'),
(86, 'Álmodozók és megszállottak', 54, 'https://s01.static.libri.hu/cover/88/8/10036807_4.jpg', '2023-12-06', 'Kik az álmodozók? S kik a megszállottak? Két rendező, két immár kultikus magyar film. Szabó István és Makk Károly. Makk-kal kezdődött az új hullámunk, s Szabó és társai vitték tovább a lendületet. Persze nemcsak róluk van szó ebben az eredetileg tankönyvnek íródott összefoglalásban. Van itt Jávor és Karády. Van itt Hyppolit és Emberek a havason. Jancsó és Tarr. Meg mindenki, aki letett valamit a közös szellemi asztalra. Aki ezt a kötetet olvasva nem szereti meg a magyar filmet, az lemarad 20. századi kultúránk fontos fejezetéről.', 1290.00, 'Film');
INSERT INTO `books` (`id`, `title`, `author_id`, `image`, `release_date`, `content`, `price`, `category`) VALUES
(87, 'A kamera leáll', 55, 'https://s01.static.libri.hu/cover/fc/6/8162954_4.jpg', '2021-06-16', 'Homoki-Nagy István (1914-1979) mostanáig kéziratban őrzött, utolsó írásainak gyűjteménye ,,A kamera leáll\". A Kossuth-díjas filmrendező, operatőr - amellett, hogy bepillantást enged műhelytitkaiba, máig etalont jelentő természetfilmjeinek és végtelen türelemmel, precizitással készült fotóinak alkotási folyamatába -, igazi irodalmi élménnyel ajándékozza meg olvasóját. Stílusa gördülékeny, arányérzéke kifogástalan, egyszerre jellemzi játékos könnyedség és elegancia, kifinomult humor és költői megoldások. Mestere az izgalmak fokozásának, a remek csattanóknak, csakúgy, mint a katarzisig vitt befejezésnek. S miközben minden sorából árad az élet szeretete, maga is tudja, érzi: egy tűnő világról készülnek utolsó felvételei, hiszen a nem is oly távoli jövőben ,,eljő az idő, mikor elhal minden madárdal, és az őslápok, vad rétek helyén: a gumikövezetű nagyvárosok útburkolatán már csak a veréb szedegeti a gépolajos morzsákat... [...] ahol ma még bíbic költ - holnap már szántás, és csak a barázdabillegető járja kötéltáncát... holnapután pedig ugyanott: kultúrsivatagban áldozik le a nap...\" - E bő félévszázados vízió immár valódi jelenünk. Ám Homoki-Nagy István egyszerre szívmelengető és szívfacsaró történetei még e mindinkább terjeszkedő ,,kultúrsivatagban\" is arra tanítanak, hogy csakis úgy lelhetjük meg a békét önmagunkkal, ha visszatérünk oda, ahonnan réges-régen elindultunk: a természettel harmóniában élő emberhez.', 800.00, 'Film'),
(88, '80 év alatt a föld körül - Önéletrajzom második része', 56, 'https://s01.static.libri.hu/cover/f5/0/8134791_4.jpg', '2021-03-05', 'A 80 év alatt a Föld körül izgalmas utazás a világhírű színész, Carlo Pedersoli, alias Bud Spencer életébe. Az életrajz második része fordulatokban gazdag kalandra csábítja olvasóit földön, vízen és levegőben. Számos új anekdotát mesél a forgatások hétköznapjairól és régi kollégáiról. Őszinte betekintést enged magánéletébe is, megtudhatjuk, milyen férj, apa, illetve nagypapa. Beszámol arról, hogy színészi karrierje mellett miként próbálta megvetni a lábát az üzleti világban. Sikerei mellett nem hallgatja el kudarcait sem. Ám Carlót, a nagy kalandort egyetlen bukás sem kényszeríthette térdre, mindig újult lelkesedéssel vetette bele magát a következő vállalkozásába. Mivel Bud Spencer tudja, hogy Terence Hillnél nincs számára jobb filmes partner, így nyílt levelet intéz \"jobbik feléhez\", akivel rendszeresen találkozik egy-egy spagettivacsora erejéig. A könyvben köszönetet kíván mondani rajongóinak is, ezért a könyv végén választ ad harminchárom kérdésükre.', 3299.00, 'Film'),
(89, 'Különben dühbe jövök', 56, 'https://s01.static.libri.hu/cover/9c/e/8134790_4.jpg', '2021-06-11', 'Meghökkentően őszinte önéletrajz a hagymás bab és a pofonok nagymesterétől. Bár westernfilmek hőseként ismerte meg a nagyvilág, Carlo Pedersoli sokkal több ennél: forgatókönyvíró, dalszövegíró, úszóbajnok, olimpikon. Mielőtt aláírta első filmes szerződését, utolsó vízilabda-mérkőzését a magyar válogatott ellen vívta. Bud Spencer, akit 1991-ben a Time a leghíresebb olasznak nevezett, könyvében megható öniróniával mesél gyermekkoráról, a sportolóként töltött évekről, arról, hogy hogyan került bele szinte véletlenül a filmek világába, barátságáról Terence Hill-lel, a tengerentúli élményeiről és végül a visszatéréséről Rómába.', 3299.00, 'Film'),
(90, 'Nádi szélben', 55, 'https://s01.static.libri.hu/cover/dd/e/7487475_4.jpg', '2021-03-01', 'Homoki-Nagy István (1914-1979) Kossuth-díjas filmrendező, operatőr kötetét tartja kezében az Olvasó, akinek neve összeforrt a magyar természetfilmezéssel; munkáit nemcsak itthon, de nemzetközileg is elismerték: számos rangos szakmai díjat begyűjtő filmjeit negyven országban vetítették. Könyvünk címadója, a Cimborák - Nádi szélben 1958-ban, míg folytatása, a Hegyen-völgyön 1960-ban került először bemutatásra. S habár több mint fél évszázad telt el az említett filmek első vetítése óta, Homoki-Nagy István - a fentieken túl olyan alkotások nyomán, mint a Vadvízország, a Gyöngyvirágtól lombhullásig, a Kékvércsék erdejében és még sorolhatnánk - mindmáig emblematikus, meghatározó alakja a természetfilmezésnek. Korántsem kézenfekvő azonban, hogy egy filmrendező (aki eredeti szakmáját tekintve egyébiránt jogász), ugyanolyan természetességgel, mi több, kifinomult művészi érzékkel vesse papírra sorait, ahogy a kamerát kezeli: a szakmai precizitás és az alkotói érzékenység tekintetében egyaránt kifogástalanul. Márpedig a Nádi szélben fejezetei, melyek az azonos című film kalandos forgatását beszélik el annak minden megpróbáltatásával és gyönyörűségével, kifejezetten szépirodalmi igényességgel íródtak. E helyenként költői szépségű sorok nyomán szemünk előtt bontakozik ki nemcsak az élvezetes, már-már regényes forgatástörténet, de a természetet, az állatok világát rajongásig szerető és tisztelő művész portréja is. Aki valaha megtapasztalta, milyen érzés kötődni egy állathoz, minden mondatát élvezni fogja. Akinek még nem volt efféle élménye, az előtt új világot tár majd fel Homoki-Nagy István bájjal, kedvességgel, humorral és olykor drámai pillanatokkal átszőtt története. Fickó, a magyar vizsla, Pletyka, a tacskó, Nimród, a héja, no meg a szeretnivaló forgatócsoport garantáltan be fogja lopni magát az Olvasó szívébe.', 800.00, 'Film'),
(91, 'Angyalok kenyere', 57, 'https://s01.static.libri.hu/cover/48/1/12732600_4.jpg', '2025-05-17', 'Patti Smith, a nagy sikerű Kölykök szerzője új memoárjában mesél a munkásosztálybeli Philadelphiában és Dél-Jersey-ben töltött gyerekkoráról, amely tele volt eltűnő szomszédokkal, véget nem érő betegségekkel, és könyvekkel, amelyek megnyitották előtte egy fantáziavilág kapuját. Felidézi kamaszéveit, amikor legnagyobb hősei Arthur Rimbaud és Bob Dylan voltak. Beszél házasságáról ,,élete szerelmével\", Fred \'Sonic\' Smithszel, akivel két gyerekük született, közös életükről Michiganben és a gyászról férje halála után. Az első lemeze, az 1975-ös Horses megjelenését megelőző időkről, majd a stúdiózásokról, az úton levés élményéről, a művészi szabadságról és a képzelet erejéről, amely segít a hétköznapit csodálatossá, a fájdalmat pedig reménnyé alakítani. Az Angyalok kenyere Patti Smith eddigi legszemélyesebb könyve. ', 5299.00, 'Zene'),
(92, 'ABBA - Waterlootól a csillagokig', 58, 'https://s01.static.libri.hu/cover/d0/8/12717030_4.jpg', '2025-03-30', '1974. április 6-án, szombaton Brightonban egy svéd együttes nyerte a 19. Eurovíziós Dalfesztivált. Az ABBA népszerűsége ma, jó fél évszázad elteltével nagyobb, mint valaha. Milliók hallgatják minden korosztályból, és a zenekar mítoszát filmek, musical-előadások és hologramkoncertek gazdagítják tovább, miközben negyven év után teljesen új albummal jelentkeztek. Az újságíró és zenei szakíró Giles Smith ennek a mítosznak szegődik a nyomába. Nemcsak első, kiskamasz kori találkozását idézi fel az ABBA-val, hanem azt a korszakot is, amelybe a svéd együttes berobbant. Fanyar humora, éles meglátásai nem csupán az ABBA rajongói számára teszik élvezetes olvasmánnyá ezt az izgalmas zenetörténeti áttekintést. ,,Mert ma, amikor az ABBA világszerte a nemzetközi kincs státuszába emelkedett, többnyire már magunk mögött hagytuk azokat az időket, amikor a zenéjük \"bűnös élvezetnek\" számított. Átverekedtük magunkat azon a sötét korszakon, és most már bátran, büszkén, szabadon vállalhatjuk: igen, szeretjük az ABBA-t, és ezt senki sem torolja meg rajtunk.\"', 6749.00, 'Zene'),
(93, 'Down With The System - Memoár (vagy valami olyasmi)', 59, 'https://s01.static.libri.hu/cover/d7/5/12626388_4.jpg', '2025-03-20', ',,Mi voltunk a modern zenetörténelem legvalószínűtlenebb listavezetői. Örmény-amerikai zenekar. Vad és agresszív metálriffek, mindenféle konvencióra fittyet hányó, tempóváltogatós ritmusok és örmény népi dallamok elegyéből álló, gyakorlatilag beskatulyázhatatlan zene, az egésznek a tetejébe pedig én, amint hol hörgök, hol üvöltök, hol lágyan énekelek. Meg persze a szövegek, ahol avantgárd bolondságoktól habzó szájú társadalompolitikai kirohanásokig terjedt a skála, akár egyetlen soron belül is. Nem volt könnyű hallgatnivaló.\" Ennek ellenére a System zenéje világszerte hallgatók millióinak szívébe lopta be magát, mióta a kilencvenes évek közepén berobbantak a zenei életbe. Közel 40 millió eladott albummal, három Billboard-listát vezető lemezzel és hűséges rajongók hatalmas táborával a zenekar uralta az alt-rock és a metalszínteret, és újrafogalmazta, hogy a rocksztárok miről beszélhetnek és miről nem, mit tehetnek és mit nem, mit képviselhetnek és mit nem. Serj története sokkal több, mint rock \'n\' roll mese: egy bevándorló története és egy aktivista ébredése is benne van. A Down With The System nyomon követi a főhőst Bejrúttól Los Angelesig, Örményországtól Új-Zélandig, és feltárja, hogy mindeközben mit tanult a zenéről, a művészetről, az aktivizmusról és önmagáról.', 4590.00, 'Zene'),
(94, '100 vers', 60, 'https://s01.static.libri.hu/cover/43/4/10036818_4.jpg', '2023-03-23', 'Till Lindemann a Rammstein zenekar énekeseként és dalszövegírójaként került reflektorfénybe, de kevesen tudják, hogy több mint két évtizede költőként is sikeres. Rövid, éles versei hirtelen és meglepően érik el az olvasókat, gyakran felkavaró érzéseket okoznak. Verseiben Lindemann folyamatosan játszik különböző témákkal, mindig új és friss perspektívákból közelítve meg őket. Költészetében a természet, a test, a magány, az erőszak, a szerelem, a gonoszság, az állatok, a fájdalom, a szépség, a nyelv, a halál és a szex témái kerülnek terítékre, sokszor a romantika óta hagyományos német költői eszközök felhasználásával. Lindemann költészete játékosan keveri a versek, népdalok, számoló rímek és balladák klasszikus formáit, közben mindig megtartja saját, különleges hangvételét, melyben a humor és az irónia is helyet kap. A \"Messer\" és az \"On Quiet Nights\" című gyűjteményei után itt van egy új, figyelemre méltó versgyűjtemény, mely nem csak a Rammstein-rajongóknak szól, hanem minden olyan olvasónak, aki nyitott az új gondolatokra.', 3490.00, 'Zene'),
(95, 'Egy ismerős arc', 61, 'https://s01.static.libri.hu/cover/45/3/9179822_4.jpg', '2022-03-10', '\"Mindaz, amit e könyvben elmesélek, nem más, mint visszatekintés az elmúlt fél évszázadra annak reményében, hogy azt a bizonyos hidat - tiszta szavakból - tovább építhetem.\" Egyenes gerinccel - talán legjobban ezzel a hitvallással lehetne jellemezni Nyerges Attilát, az Ismerős Arcok frontemberét, aki elvei mellett mindig kitartva, hosszú évtizedek munkájával jutott a csúcsra zenekarával, és alkotta meg a határon inneni és a határon túli magyarság összetartozását hirdető Nélküledet. Az énekes-dalszerző életútja egészen rendkívüli. A kommunizmusban sokat szenvedett családja örökítette rá az életében meghatározó szerepet játszó polgári-konzervatív szemléletet, és már egészen kis korától fogva ennek megfelelően éli életét. A gyermekkorában belé ivódott vidéki tisztesség és a fővárosi lehetőségek gazdagsága egészen kivételes elegyet hozott létre. Ennek köszönheti sikereit, és a szüleitől, nagyszüleitől örökölt tartás nem hagyta elsüllyedni a rendszerváltozás után ölünkbe hullott nagy szabadságban. Az Egy ismerős arc oldalain Nyerges Attila nyíltan mesél élete tragikus eseményeiről, sorsfordító erdélyi útjáról és súlyos motorbalesetéről. A könyvben nem csupán Nyerges Attila vall magáról, hanem zenésztársai is megszólalnak. Az ő történeteikből rajzolódik ki a hiteles kép az összmagyarságot megszólító dalok szerzőjéről: meglehetősen zárkózott személyiség, viszont akit egyszer közel enged magához, amellett tűzön-vízen át kitart. A marcona külső mélyen érző szívet takar. Az Egy ismerős arc az első életrajzi könyv az elmúlt két évtized egyik legmeghatározóbb magyar zenészéről. ', 3749.00, 'Zene'),
(96, 'Hogyan születtek?', 62, 'https://s01.static.libri.hu/cover/da/9/9044650_4.jpg', '2022-03-22', 'Szállj fel magasra, Apám hitte, Bábu vagy, Homok a szélben, Közeli helyeken, Jég dupla whiskyvel, Nélküled - mind ismerjük a legnagyobb magyar slágereket, ám keletkezésüket, a mögöttük lévő személyes történeteket, vicces epizódokat vagy akár tragédiákat annál kevesebben. Ez a könyv azoknak szól, akik szeretnének kicsit többet megtudni kedvenc dalaikról, azok eredetéről. A kötet interjúiban az alkotók mesélnek kendőzetlenül az adott dal születéséről, és az interjúkat összeolvasva nem csupán a szóban forgó sláger történetét ismerjük meg, hanem kirajzolódik a magyar könnyűzene elmúlt hat évtizede is, visszatérő szereplőkkel, ismert és ismeretlen hősökkel. Az interjúkat rövid zenei elemzések egészítik ki.A Hogyan születtek? kötelező olvasmány mindazoknak, akiket nem csak a legfrissebb popslágerek érdekelnek. ,,Amikor a papa már nagyon betegen kórházban volt, sokszor az járt a fejemben, vajon hogyan fogom elénekelni az Apám hittét, ha ő már nem lesz. Ha éppen akkor hagy itt minket, amikor játszunk. De végül nem is az Apám hitte verte ki nálam a biztosítékot, hanem a Volt egy tánc. Mert ez is róla szól, pontosabban róluk, a szüleimről. A papa tényleg börtönben volt, és a mama tényleg az ablakban állva évekig azt várta, hogy hazajöjjön.\"(Zorán: Apám hitte) ,,Ahogy énekelgettem, előugrott a próbálkozásokból, hogy: Magyarország. Azonnal éreztem, hogy fontos lehet ez a dal. Jókor talált szíven, ha úgy tetszik. El is kezdtem rögtön írni rá egy dalszöveget. Ahogy írtam, egyre jobban belemélyedtem abba az érzésbe, hogy szeretnék egy olyan dalt megalkotni, ami mindenkié. Ami ebben a saját gyűlöletében és irigységében fuldokló országban valahogy mégis egy közös dal tudna lenni.\"(Geszti Péter: Magyarország)', 3449.00, 'Zene'),
(97, 'Tükörkép reflektorfénybe zárva', 63, NULL, '2022-03-23', 'A Tükörkép reflektorfénybe zárva oldalain Paul Stanley - művésznevén Starchild, a KISS társalapítója és frontembere - első ízben vall zenekari karrierje és magánélete hihetetlen csúcs- és mélypontjairól. Önéletrajza sokkoló, szórakoztató, intelligens és inspiráló történet, amelyben a részben általa teremtett és halhatatlanná tett zenekarról is fellebben a fátyol. A sosem látott fotókkal illusztrált visszaemlékezés egy rocksztár minden részletre kiterjedő, kendőzetlen portréja. Paul Stanley őszintén mesél személyes kapcsolatairól, a KISS viharos belső viszonyairól, miközben senki sem marad sértetlenül, beleértve ebbe őt magát is.', 3890.00, 'Zene'),
(98, 'Saját hangon', 64, 'https://s01.static.libri.hu/cover/14/4/7837709_4.jpg', '2021-03-05', 'Bródy János 2021-ben töltötte be 75. életévét. Ebből az alkalomból bocsátjuk közre ezt a válogatást, amely a sokszínű és kiterjedt életmű 75 dalszövegét tartalmazza (plusz egy ráadást). Amikor azt a 75 dalszöveget kerestük, amelyekkel leginkább jellemezni tudjuk a még mindig aktívan alkotó művészt, abból indultunk ki, hogy Bródy János nemcsak kivételes tehetségű zeneszerző és szövegíró, hanem egyben saját dalait előadó művész, és nem kis meglepetéssel állapítottuk meg, hogy ha összeszedjük az önálló lemezeken szereplő dalokat és kihagyunk néhányat, amelyeket a szerző eredetileg másoknak írt, éppen kijön a számmisztikában hívők számára kedves 75 dalszöveg.', 2099.00, 'Zene'),
(99, 'Énekelsz Csehtamást?', 65, 'https://s01.static.libri.hu/cover/78/5/7690744_4.jpg', '2021-03-31', ',,Királyok voltunk! (Postakürt, Kis Olimpia) Pár évvel később hozzánk vágták a ,,koszos\" gitárjainkat ezeken a helyeken. Ragyogó idő!!! Mirtusz és unikum, a bokrok alján, ha betépve elheversz. És nagy-nagy felelősség, hogy te vagy az örököse valaminek, ami úgyis te magad vagy.\" Másik János ,,Így ezúton a róla szóló életrajzi könyvön keresztül kérnék tőle valamit. Háló?! Tamás Hallasz? Kérlek, írj nekem, s hívjál meg egy hétre. Sokszor!\" Baksa-Soós János ,,Szeretném leszögezni, hogy én egyáltalán nem büszkélkedhetem azzal, hogy nagyon közeli barátja lettem volna Tamásnak. ,,Öcsi\" voltam. Egy ismerős. Mégis tudta a nevemet, és azt hiszem, nem voltam neki ellenszenves, ami elég nagy szónak számított, hiszen, bár sok barátja volt, nem barátkozott bárkivel. Én felnéztem rá. Járt ide meg oda, és amikor történetesen én is ott voltam, akkor mondtuk, hogy szevasz, szevasz. Például többször volt látható a Városkapuban, ki emlékszik már rá, hogy hol volt az hely egyáltalán? A Fiatal Művészek Klubja mondjuk közös törzshelynek számított.\" Víg Mihály ,,Az egészen világos, hogy a Cseh Tamás-i életmű jelentősen túlmutat a tényleges dalokon, előadásokon, elég, ha arra gondolsz, hogy az emberek nem azt mondják: ,,Énekelsz valami Cseh Tamás-dalt?\", hanem csak annyit, hogy ,,Énekelsz Csehtamást?\" Mindenesetre szeretek hinni egyfajta folytonosságban, hogy viszonyban vannak az alkotói világok, hatnak és reflektálnak egymásra.\" Beck Zoltán (30Y)', 3290.00, 'Zene'),
(100, 'Vallomás', 66, 'https://s01.static.libri.hu/cover/d1/9/7541438_4.jpg', '2021-03-28', 'A Judas Priest kétségkívül a heavy metal egyik legismertebb és legmeghatározóbb együttese: lemezeikből jelen állás szerint több mint 50 millió példányt adtak el világszerte. A legendás brit zenekar összetéveszthetetlen énekstílusáról és extravagáns színpadi megjelenéséről egyaránt elhíresült frontembere, Rob Halford ezúttal saját szavaival eleveníti fel kalandos életútját Walsall füstös iparvárosából a toplisták és a világhír csúcsaira, és vet számot a Judas Priest hullámvölgyektől sem mentes, immáron fél évszázados pályafutásával. Rob Halford memoárja több őrült sztorik és izgalmas műhelytitkok szórakoztató gyűjteményénél. A könyv legfőbb vonzereje abban a tabukat nem ismerő nyíltságban rejlik, mellyel a szerző feltárja egyedülálló karrierjének árnyoldalát: egykori alkohol- és drogfüggőségét, rendőrségi ügyeit, depresszióját, a zenekarból való kilépését a kilencvenes évek elején, és annak több évtizedes vívódását, hogy a nyilvánosság előtt sokáig titkolni kényszerült homoszexualitását. És mint minden őszinte gyónásban, úgy a Vallomásban is megtalálható a feloldozás lehetősége - annak magával ragadó története, hogy a ,,Metal God\" miképp tért vissza az ezredfordulót követően méltó helyére, a Judas Priest élére, és hogyan találta meg végül magánéletében is a sokáig hiába keresett boldogságot.', 2599.00, 'Zene'),
(101, 'Beatles vágatlanul', 67, 'https://s01.static.libri.hu/cover/f0/7/3825161_4.jpg', '2017-03-28', 'Ez a könyv nem azzal kezdődik, hogy a zenekar alapítója, John Lennon 1940.október 9-én született, miközben Liverpoolt több hullámban támadta a német légierő. És nem is azzal ér véget, hogy bár a Mesés Négy (Fab Four) hosszas, több mint egy esztendőn át tartó vergődést követően 1970. április 10-én, Paul McCartney-nak a kilépéséről szóló nyilatkozatával hivatalosan is föloszlott, a banda hatása máig tart, mi több, a Beatlesnek mostanra reneszánsza lett, és a legnagyobb klasszikusok, az emberiség kultúrtörténetének 20. századi mérföldkövei között emlegetik. Ebben a könyvben sztorik olvashatók a popzene legnagyobb hatású együtteséről. Időnként furcsa, sőt akár egyenesen bizarr történetek, amelyek egyeseket talán fejcsóválásra késztetnek, hiszen nem ezt várták, nem ezt hallották, nem ezt olvasták korábban mindig bájosan mosolygó kedvenceikről. Ez a könyv egyfajta lázadás a köztünk élő Beatles-imázs ellen.', 2190.00, 'Zene'),
(102, 'Így védd meg a gyermeked - Tanácsok aggódó szülőknek', 68, 'https://s01.static.libri.hu/cover/4e/4/13034911_4.jpg', '2026-02-10', 'A szerző az elmúlt 15 évben számtalan előadás, foglalkozás, tanóra és workshop keretében találkozott gyermekkel és szülővel egyaránt, az ott szerzett tapasztalatokat és az elméletet ötvözve írta meg könyvét. Az Így védd meg a gyermeked! könnyed érthetőség, de tudományos megalapozottság mellett nyújt gyakorlatias bűnmegelőzési útmutatót a szülőknek, akik szeretnék jobban megismerni gyermekeik viselkedését, megérteni a rájuk leselkedő veszélyeket, és hatékonyan segíteni fejlődésüket. Nem csupán nevelési kézikönyv, hanem elgondolkodtató, lendületes, és valós problémákat feltáró mű, amely minden szülő számára gondolatébresztő lehet, és megadja a kulcsot ahhoz, hogy a gyermeknevelés ne feszültséggel teli kihívás, hanem életre szóló közös tanulás legyen. Szülőként sokszor rettegünk, mert nem értjük, ha körülöttünk bullyingról, sextingről, groomingról, ghostingolásról, pornóról, dizájnerdrogokról beszélnek. Dilemmákkal, hibákkal és kihívásokkal szembesülünk nap mint nap. Ezek tudatos kezeléséhez nyújt segítséget a könyv és ahhoz, hogy a lehető legjobban támogassuk gyermekünk fejlődését. Ahogy a szerző fogalmaz: légy partner, bízz a gyermekedben, és beszélgess vele sokat!', 3890.00, 'Gyermeknevelés'),
(103, 'Amit az ADHD-s gyereked szeretne, ha tudnál', 69, 'https://s01.static.libri.hu/cover/13/e/13011659_4.jpg', '2026-03-02', 'A gyermeknevelés mindenkit komoly kihívás elé állít - ám egy ADHD-s gyermek nevelése néha már olyan kérdéseket vet fel, amelyekre magunktól nem feltétlenül találjuk meg a jó választ.Akkor sem lesz könnyebb, amikor a gyerek kamaszkorba lép. Sőt, ekkor már nem állhatunk mindig ott mellette, hogy ellenőrizzük, emlékszik-e a beadandó házi feladatra, beér-e időben az órájára, és megtalálja-e a helyét a társas kapcsolatok bonyolult útvesztőjében. Az ADHD-s agy eltérő ütemben fejlődik, miközben az iskola napról napra fokozódó nyomást helyez a fiatalokra.Ha szeretnéd megtanítani a gyerekednek vagy kamaszodnak azokat a fontos készségeket, amelyek segítségével nagyobb önállóságra tehet szert, akkor ez a támogató, gyakorlatias könyv neked szól. Dr. Sharon Saline megmutatja, hogyan építhetsz ki együttműködést a gyermekeddel, hogyan motiválhatod és vonhatod be őt is a folyamatba, hogy tartós pozitív változást érjetek el. A könyv valós példái, hasznos gyakorlatai és könnyen megjegyezhető technikái révén megtanulhatod, hogyan segítheted a gyerekedet közös célok kitűzésével, a tanulmányi nehézségek enyhítésével és a mindennapi kihívások kezelésével, a hisztitől és a visszabeszéléstől kezdve a szervezettség megőrzésén át a barátságok építéséig és tovább, hogy jól boldoguljon az iskolában és az életben egyaránt.DR. SHARON SALINE klinikai pszichológus, az ADHD, a tanulási nehézségek és a mentális egészségügyi problémák gyermekekre, tinédzserekre és családokra gyakorolt hatásának egyik legkiválóbb szakértője.', 4499.00, 'Gyermeknevelés'),
(104, 'Beszélj úgy, hogy tanuljon', 70, 'https://s01.static.libri.hu/cover/68/8/12536088_4.jpg', '2025-03-12', 'Léteznek olyan szavak, kifejezések, mondatok, amelyek tanulásra ösztönöznek, bátorítóak, és erőt adnak. Ha ezeket szülőként és pedagógusként jól használjuk, segíthetjük a gyerekeket abban, hogy nyitottan forduljanak a világ felé, és örömmel fogadjanak be új ismereteket. Adele Faber és Elaine Mazlish, a szülő-gyerek kommunikáció nemzetközileg elismert szakértői bemutatják, hogyan ébreszthetjük fel a gyerekben a tanulás természetes vágyát, és miként vezethetjük őt úgy, hogy kíváncsian, együttműködően és felelősségteljesen vegyen részt a tanulási folyamatban. Ez az átfogó, ugyanakkor rendkívül szórakoztató és praktikus útmutató konkrét példákon és valós tantermi és otthoni helyzeteken keresztül szemlélteti, milyen hozzáállással és kommunikációs technikákkal hozhatjuk ki a legtöbbet a gyerekből, és segíthetünk neki önálló, motivált és fogékony személyiséggé válni, aki számára a tanulás nem teher, hanem felszabadító élmény és izgalmas kaland. A kötetet Kimberly Ann Coe illusztrációi teszik még szemléletesebbé. A könyv két tanár közreműködésével született, akik jelentős oktatási tapasztalattal rendelkeznek: Lisa Nyberg a természettudományok és matematika kiemelkedő oktatásáért elnyerte az Egyesült Államok elnöki díját. Kisgyermekeket tanít a Brattain Általános Iskolában Springfieldben, Oregon államban, valamint posztgraduális hallgatókat az Oregoni Állami Egyetemen. Eugene-ben, Oregon államban él. Rosalyn Anstine Templeton több országos tanári díjra jelölt oktató és a Bradley Egyetem tanárképzés szakának adjunktusa Illinois államban, ahol férjével él.', 4799.00, 'Gyermeknevelés'),
(105, 'A játék mindenkié', 71, 'https://s01.static.libri.hu/cover/cf/b/12318450_4.jpg', '2025-06-14', 'Nelli és Kata könyve abszolút hiánypótló a magyar könyvpiacon. Ajánlom mindenkinek - felnőttnek és gyereknek egyaránt -, aki tud és szeret játszani, de azoknak is, akik tanulják/tanítják a közös játék művészetét. A legtöbb tevékenységhez semmilyen különleges kellékre nincs szükség, mégis életre szóló élményeket szerezhetünk, adhatunk általa. 10-15 évvel ezelőtt, amikor a fiaim kisebbek voltak, nagyon örültem volna, ha létezett volna ez a könyv... :) Tittel Kinga, a Mesélő Budapest szerzője', 4990.00, 'Gyermeknevelés'),
(106, 'Mély kapcsolódás gyermekeddel', 72, 'https://s01.static.libri.hu/cover/b6/c/12227266_4.jpg', '2025-08-13', 'A mindennapi rohanásban könnyen beleragadunk a megszokásokba, és hajlamosak vagyunk elszalasztani azokat az alkalmakat, amelyek elősegíthetnék a gyermekeinkhez való mély kapcsolódást. Ez a könyv egy gondosan összeállított, érdekes kérdésekből álló gyűjteményt kínál, amelynek célja, hogy értékes pillanatokat teremtsen, erősítse a szülő-gyermek kapcsolatot, és maradandó emlékeket hozzon létre. Legyen szó lefekvés előtti beszélgetésről, autózás közbeni eszmecseréről vagy vacsora melletti társalgásról, ezek a kérdések ösztönzik az őszinte kommunikációt, az önkifejezést és a mélyebb megértést közted és gyermeked között. A kérdések egyszerűek, mégis lényegre törőek - egyben segítenek a hétköznapi pillanatokat a kapcsolódás, a nevetés és a szeretet kinyilvánításának emlékezetes pillanataivá varázsolni. Fedezd fel az értő figyelem és az együtt fejlődés örömét - kérdésről kérdésre!', 1465.00, 'Gyermeknevelés'),
(107, 'Kérdések Szüleinkhez', 72, 'https://s01.static.libri.hu/cover/df/c/12029063_4.jpg', '2025-03-07', 'Vannak történetek, amiket csak ők tudnak elmesélni. Honnan jöttünk? Mit éltek át a szüleink, mielőtt még mi megszülettünk? Hogyan lettek azok, akik ma nekünk? Ez a könyv egy meghívás mély, őszinte, néha megható, máskor derűs beszélgetésekre szüleinkkel. Kérdéseken keresztül segít visszautazni a múltba, megérteni az ő világukat - és talán egy kicsit a sajátunkat is. Témák, amelyekről ritkán beszélünk, mégis formálnak minket: gyermekkor, család, barátság, szerelem, döntések, örömök, veszteségek, szülővé válás, és az, amit tovább szeretnének adni. Ez a könyv lehet egy közös emlékkönyv, egy ajándék, vagy éppen egy újrakezdett párbeszéd első oldala. ,,Kérdezni nem tolakodás, hanem szeretet.\" A könyv a kapcsolódásról szól. A beszélgetésről. A szívből jövő figyelemről.', 3490.00, 'Gyermeknevelés'),
(108, 'Kapcsolódás - Gyógyító erő a nevelésben', 73, 'https://s01.static.libri.hu/cover/7f/5/10505454_4.jpg', '2023-09-10', 'Talán mindannyiunkkal előfordult, hogy váratlan vagy intenzív érzéseket kiváltó helyzetekben nem úgy reagáltunk, ahogyan azt más körülmények között gondolnánk magunkról. Különösen igaz ez akkor, ha az adott szituációban gyermekünk viselkedése váltja ki, hogy reakciónkban magunkra sem ismerünk, vagy egy már majdnem elfeledett énünk néz vissza ránk, talán a saját gyerekkorunkból, avagy egyenesen valamelyik szülőnket fedezzük fel magunkban, pedig hányszor megfogadtuk, hogy mi nem ilyen szülők leszünk. A jó hír, hogy ezen lehet változtatni. A kötet szerzői, dr. Daniel J. Siegel, orvos, a kötődéselmélet kutatója és dr. Mary Hartzell, a szülő-gyermek kapcsolatok szakértője segítenek megérteni, hogyan hat ki szülői magatartásunkra saját gyerekkorunk, valamint felhívják a figyelmet az ismétlődő viselkedési mintákra, és megmutatják, hogyan szabadulhatunk tőlük. Ismertetik a kötődési típusokat és a különböző kommunikációs formákat, továbbá a szülő-gyerek kapcsolat dinamikáját. A kötetből megtudhatjuk, szülői szerepünk hogyan segíti önmagunk megértését és kínál lehetőséget személyiségünk fejlődésére, hogy ezáltal hatékonyabb és jobb kapcsolatot alakíthassunk ki gyermekünkkel. Ahhoz, hogy a gyereknevelésben teljes valónkkal jelen legyünk, önmagunkon keresztül vezet az út.', 3149.00, 'Gyermeknevelés'),
(109, 'Agymenés', 74, 'https://s01.static.libri.hu/cover/58/0/9865157_4.jpg', '2023-03-04', ',,Csak legyünk túl a kamaszkoron!\" ,,A kamaszok megőrülnek a hormonjaik miatt... És megőrjítenek minket, szülőket, tanárokat!\" Ugye mindenkinek ismerős mondatok? Hát persze, hiszen sokszor beszélnek így a felnőttek az ,,elviselhetetlen\" kamaszokról. De mi van, ha tévedünk, és a kamaszkor valójában gyermekeink nagy lehetősége? A tinédzserek nem felmenőiket akarják bosszantani örökös ellenkezésükkel, pimaszságukkal, okoskodásukkal. Ezekért az állítólagos rossz tulajdonságokért, a szélsőséges viselkedésért, az egész tünetegyüttesért ugyanis az agyban lejátszódó hormonális változások a felelősek. Daniel J. Siegel szerint ha a kamaszok és a felnőttek megértik ezek természetét, akkor jó esély van rá, hogy az állandó konfliktusokat együttműködés váltsa fel, és valódi, mély kapcsolatok szövődjenek közöttük. A szerző tudományos alapossággal, mégis közérthetően, konkrét és érzékletes példákon át úgy mutatja be a kamaszkort, mint a bátorságot, kreativitást fejlesztő, rendkívül fontos életszakaszt. Hiszen ekkor teszünk szert jó néhány fontos képességre, ismerjük meg a világot, alakítunk ki szoros kapcsolatokat másokkal - és ekkor alakítjuk ki viselkedésmódozatainkat a világ egyre bonyolultabb problémáinak leküzdésére, ekkor fedezzük fel, kivé is válunk majd felnőttként. A könyv legfőbb üzenete, hogy a kamaszkort nem összeszorított foggal túlélni, hanem inkább tudatosan megélni kell, kihasználva a benne rejlő intellektuális és emocionális értékeket. DANIEL J. SIEGEL klinikai pszichiáter és agykutató, a Los Angeles-i Kaliforniai Egyetem oktatója, gyakorló terapeuta, számos elismert gyermeknevelési könyv szerzője, amelyek közül több magyar nyelven is megjelent.', 2999.00, 'Gyermeknevelés'),
(110, 'Baromi jó anya vagy!', 75, 'https://s01.static.libri.hu/cover/8d/1/9718352_4.jpg', '2022-03-06', 'Szemtelen, bölcs és őszinte - ilyen bátorításra van szükséged, ha gyereked születése után teljesen szétestél, és kétségbeesetten szeretnél újra magadra találni! Utólag úgy tűnhet, a csecsemőkor nem más, mint egy villanás az élet radarjának képernyőjén. Ha azonban mostanában váltál anyává, ugyanez az időszak soha véget nem érőnek látszik. Megszületett a gyereked, és a fejed fölött azonnal összecsapnak a hullámok, az a benyomásod, hogy mostantól az élet nem áll majd másból, mint gondoskodásból. De hogy fogsz megbirkózni ezzel a feladattal? Soha nem volt jogosabb ez a kérdés, mint manapság, amikor nőként nemcsak anya akarsz lenni, hanem önmagad is, és a munkádban is ki akarsz teljesedni. A gyerek születése azonban alapvetően alakítja át a kereteket, és miközben maguk alá temetnek a használt pelenkák, a szoptatós melltartók és a bébiételes üvegek, a régi életednek örökre búcsút mondhatsz... Ki más is segíthetne rajtad, mint egy másik anya, aki maga is megtapasztalta, min mész keresztül? Ezt a támogatást kapod meg a szerzőtől, Leslie Anne Bruce díjnyertes újságírótól és Instagram-sztártól, aki végre kimondja: anyának lenni őrjítő feladat! A nők többet érdemelnek annál, mint hogy egy legyintéssel elintézzék a problémáikat, és arról győzködjék őket, milyen csodálatos dolog gyereket nevelni. Szókimondó stílusához, ellenállhatatlan humorához, lefegyverző őszinteségéhez és éles szemű megfigyeléseihez szakértőktől származó tanácsok társulnak, hogy mentőövet dobjanak neked, ha fuldokolnál a tennivalók tengerében! Ez a könyv nem úgy általában a szülőknek szól. Ez a könyv az anyukáknak szól. Ez a könyv neked szól! ,,Végre egy anya, aki kimondja, az anyaság nem arról szól, hogy körülötted unikornisok fújnak szivárványszínű lufikat! Erre a könyvre minden anyának szüksége van.\" - The New York Times', 2999.00, 'Gyermeknevelés'),
(111, 'Érezni szabad!', 76, 'https://s01.static.libri.hu/cover/5c/f/9340920_4.jpg', '2022-03-19', ',,Napjainkban túl sok gyerek és felnőtt szenvedi meg a mindennapokban, hogy szégyelli megélni az érzelmeit, és nem rendelkezik a szükséges érzelmi kompetenciákkal. Pedig nem szükségszerű, hogy így legyen. Marc Brackett élethivatásának tekinti, hogy megfordítsa ezt a folyamatot, és ebben a könyvben megmutatja, hogyan lehetséges ez. Az érzelmek kutatásával eltöltött huszonöt éve alatt Brackett kidolgozott egy hatékony módszert gyerekek és felnőttek életminőségének javítására: egy tudományos alapokon nyugvó programot, amelynek célja, hogy érzelmeink ne terhet jelentsenek, hanem a megértésük révén megszerzett információkat felhasználhassuk, elősegítve boldogulásunkat, jóllétünket. Megközelítésének ihletője egy gyerekkori élmény, pontosabban egy éleslátó nagybácsi volt, aki arra bátorította, hogy merjen érezni. Ő volt az első felnőtt, aki képes volt valóban megérteni őt, és felismerni a viselkedése mögött megbúvó elfojtott szenvedést és megaláztatást. Brackett ekkor ébredt tudatára, hogy amin keresztülmegy, az valójában múló állapot; hogy nincs egyedül; hogy a helyzete nem kilátástalan; és hogy nem ő a hibás mindazért a félelemért, elszigeteltségért és dühért, amit érez. És ami a legfontosabb: hogy tud valamit tenni ez ellen! Az érzelmi intelligencia fejlesztésére fókuszáló RULER program mélyreható változásokat hozott abban a több ezer iskolában, ahol bevezették. A tapasztalatok igazolták, hogy eredményes a stressz és a kiégés csökkentésében, az iskolák légkörének és a diákok teljesítményének javításában. A könyv betekintést ad a program alapjaiba, és megismertet azokkal a stratégiákkal, amelyek birtokában sikerrel küzdhetünk meg a mindennapi élet kihívásaival, boldogulhatunk társas kapcsolatainkban, és hatékonyabban oldhatjuk meg az ezekből fakadó problémákat.\"', 2999.00, 'Gyermeknevelés'),
(112, 'Miskolci Elmebeteg', 1, 'https://cdn.borsod24.hu/uploads/2024/10/istiubi.png', '2026-03-02', 'Röfi Pista', 99999999.00, 'SSD'),
(113, 'A Fül eltüntető bűvész', 1, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_FPqy33FwywVWuP4ZRLx9WJzY4gKGK5rwZw&s', '2026-03-02', 'A fülek eltüntető mestere', 500000.00, 'SSD'),
(114, 'Egy munkakerülő élete', 1, 'https://i.ytimg.com/vi/dVe6Tn4kV9s/hqdefault.jpg', '2026-03-02', 'Hogyan élj meg abból hogy hülye vagy \nMC ISTI teljes élettörténete', 7000000.00, 'SSD'),
(115, 'Fenyegetőzök az interneten', 1, 'https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da84aca0f267243397e6c872f8f4', '2026-03-02', 'Ebben a könyvben megtanulhatod hogy hogyan kell az interneten fenyegetőzni és magadra haragítani egy egész országot!', 3000000.00, 'SSD');

-- --------------------------------------------------------

--
-- Table structure for table `carts`
--

CREATE TABLE `carts` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `creation_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `update_time` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  `status` varchar(20) NOT NULL DEFAULT 'active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- Dumping data for table `carts`
--

INSERT INTO `carts` (`id`, `user_id`, `creation_date`, `update_time`, `status`) VALUES
(27, 6, '2026-03-03 08:14:07', '2026-03-03 08:14:26', 'checked_out'),
(28, 6, '2026-03-03 08:14:26', '2026-03-03 08:15:29', 'checked_out'),
(29, 6, '2026-03-03 08:15:29', '2026-03-03 08:21:07', 'checked_out'),
(30, 6, '2026-03-03 08:21:07', '2026-03-03 08:21:34', 'checked_out'),
(31, 6, '2026-03-03 08:21:34', '2026-03-03 08:26:59', 'checked_out'),
(32, 6, '2026-03-03 08:26:59', '2026-03-03 08:33:25', 'checked_out'),
(33, 6, '2026-03-03 08:33:25', '2026-03-03 08:35:17', 'checked_out'),
(34, 6, '2026-03-03 08:35:17', '2026-03-04 12:13:02', 'active'),
(35, 21, '2026-03-10 12:48:50', NULL, 'active'),
(36, 18, '2026-03-10 12:58:46', '2026-03-10 12:59:07', 'checked_out'),
(37, 18, '2026-03-10 12:59:07', NULL, 'active');

-- --------------------------------------------------------

--
-- Table structure for table `cart_items`
--

CREATE TABLE `cart_items` (
  `id` int(11) NOT NULL,
  `cart_id` int(11) NOT NULL,
  `copy_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL DEFAULT 1,
  `price` decimal(10,2) NOT NULL,
  `added_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `order_type` varchar(20) NOT NULL DEFAULT 'rental'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- Dumping data for table `cart_items`
--

INSERT INTO `cart_items` (`id`, `cart_id`, `copy_id`, `quantity`, `price`, `added_at`, `order_type`) VALUES
(60, 27, 24, 1, 2290.00, '2026-03-03 08:14:07', 'purchase'),
(61, 27, 31, 1, 7199.00, '2026-03-03 08:14:09', 'purchase'),
(62, 27, 8, 1, 284.00, '2026-03-03 08:14:10', 'rental'),
(63, 28, 7, 1, 4799.00, '2026-03-03 08:15:24', 'purchase'),
(64, 29, 40, 1, 1990.00, '2026-03-03 08:20:55', 'purchase'),
(65, 29, 12, 1, 280.00, '2026-03-03 08:20:59', 'rental'),
(66, 30, 28, 1, 150.00, '2026-03-03 08:21:24', 'rental'),
(67, 30, 29, 1, 2999.00, '2026-03-03 08:21:26', 'purchase'),
(68, 31, 14, 1, 3465.00, '2026-03-03 08:26:47', 'purchase'),
(69, 31, 22, 1, 110.00, '2026-03-03 08:26:48', 'rental'),
(70, 32, 10, 1, 8990.00, '2026-03-03 08:33:11', 'purchase'),
(71, 32, 11, 1, 100.00, '2026-03-03 08:33:12', 'rental'),
(72, 33, 103, 1, 7000000.00, '2026-03-03 08:35:10', 'purchase'),
(75, 36, 1, 1, 4990.00, '2026-03-10 12:58:54', 'purchase'),
(76, 36, 20, 1, 244.00, '2026-03-10 12:58:56', 'rental'),
(77, 36, 19, 1, 60.00, '2026-03-10 12:58:57', 'rental');

-- --------------------------------------------------------

--
-- Table structure for table `copies`
--

CREATE TABLE `copies` (
  `id` int(11) NOT NULL,
  `book_id` int(11) NOT NULL,
  `inventory_number` varchar(50) NOT NULL,
  `available` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- Dumping data for table `copies`
--

INSERT INTO `copies` (`id`, `book_id`, `inventory_number`, `available`) VALUES
(1, 1, 'HP1-0001', 0),
(2, 1, 'HP1-0002', 1),
(3, 2, 'LOTR1-0001', 1),
(4, 3, '1984-0001', 1),
(5, 4, 'GATSBY-0001', 1),
(6, 5, 'BOOK-00005-001', 1),
(7, 7, 'BOOK-00007-001', 0),
(8, 8, 'BOOK-00008-001', 0),
(9, 9, 'BOOK-00009-001', 1),
(10, 10, 'BOOK-00010-001', 0),
(11, 11, 'BOOK-00011-001', 0),
(12, 12, 'BOOK-00012-001', 0),
(13, 13, 'BOOK-00013-001', 1),
(14, 14, 'BOOK-00014-001', 0),
(15, 17, 'BOOK-00017-001', 1),
(16, 18, 'BOOK-00018-001', 1),
(17, 16, 'BOOK-00016-001', 1),
(18, 19, 'BOOK-00019-001', 1),
(19, 39, 'BOOK-00039-001', 0),
(20, 20, 'BOOK-00020-001', 0),
(21, 21, 'BOOK-00021-001', 1),
(22, 22, 'BOOK-00022-001', 0),
(23, 23, 'BOOK-00023-001', 1),
(24, 24, 'BOOK-00024-001', 0),
(25, 25, 'BOOK-00025-001', 1),
(26, 26, 'BOOK-00026-001', 1),
(27, 27, 'BOOK-00027-001', 1),
(28, 28, 'BOOK-00028-001', 0),
(29, 29, 'BOOK-00029-001', 0),
(30, 30, 'BOOK-00030-001', 1),
(31, 31, 'BOOK-00031-001', 0),
(32, 32, 'BOOK-00032-001', 1),
(33, 33, 'BOOK-00033-001', 1),
(34, 34, 'BOOK-00034-001', 1),
(35, 35, 'BOOK-00035-001', 1),
(36, 36, 'BOOK-00036-001', 1),
(37, 6, 'BOOK-00006-001', 1),
(38, 15, 'BOOK-00015-001', 1),
(39, 37, 'BOOK-00037-001', 1),
(40, 38, 'BOOK-00038-001', 0),
(41, 46, 'BOOK-00046-001', 1),
(42, 52, 'BK52-0001', 1),
(43, 52, 'BK52-0002', 1),
(44, 52, 'BK52-0003', 1),
(45, 52, 'BK52-0004', 1),
(46, 52, 'BK52-0005', 1),
(47, 52, 'BK52-0006', 1),
(48, 8, 'BK8-1771930120941-0002', 1),
(49, 8, 'BK8-1771930121188-0003', 1),
(50, 8, 'BK8-1771930121358-0004', 1),
(51, 8, 'BK8-1771930121516-0005', 1),
(52, 8, 'BK8-1771930121683-0006', 1),
(53, 8, 'BK8-1771930121844-0007', 1),
(54, 8, 'BK8-1771930122018-0008', 1),
(55, 8, 'BK8-1771930122369-0009', 1),
(56, 8, 'BK8-1771930122543-0010', 1),
(57, 8, 'BK8-1771930122713-0011', 1),
(58, 8, 'BK8-1771930122863-0012', 1),
(59, 8, 'BK8-1771930123026-0013', 1),
(60, 8, 'BK8-1771930123182-0014', 1),
(61, 8, 'BK8-1771930123340-0015', 1),
(62, 8, 'BK8-1772096917550-0016', 1),
(63, 8, 'BK8-1772096917812-0017', 1),
(64, 8, 'BK8-1772096917987-0018', 1),
(65, 8, 'BK8-1772096918146-0019', 1),
(66, 8, 'BK8-1772096918323-0020', 1),
(67, 8, 'BK8-1772096918498-0021', 1),
(68, 8, 'BK8-1772096918678-0022', 1),
(69, 8, 'BK8-1772096918817-0023', 1),
(70, 8, 'BK8-1772096918957-0024', 1),
(71, 8, 'BK8-1772096919105-0025', 1),
(72, 8, 'BK8-1772096919218-0016', 1),
(73, 8, 'BK8-1772096919356-0017', 1),
(74, 8, 'BK8-1772096919509-0018', 1),
(75, 8, 'BK8-1772096919657-0019', 1),
(76, 8, 'BK8-1772096919795-0020', 1),
(77, 8, 'BK8-1772096919931-0021', 1),
(78, 8, 'BK8-1772096920062-0022', 1),
(79, 8, 'BK8-1772096920230-0023', 1),
(80, 8, 'BK8-1772096920355-0024', 1),
(81, 8, 'BK8-1772096920491-0025', 1),
(82, 112, 'BK112-0001', 1),
(83, 113, 'BK113-0001', 1),
(84, 113, 'BK113-0002', 1),
(85, 113, 'BK113-0003', 1),
(86, 113, 'BK113-0004', 1),
(87, 113, 'BK113-0005', 1),
(88, 113, 'BK113-0006', 1),
(89, 113, 'BK113-0007', 1),
(90, 113, 'BK113-0008', 1),
(91, 113, 'BK113-0009', 1),
(92, 113, 'BK113-0010', 1),
(93, 113, 'BK113-0011', 1),
(94, 113, 'BK113-0012', 1),
(95, 113, 'BK113-0013', 1),
(96, 113, 'BK113-0014', 1),
(97, 113, 'BK113-0015', 1),
(98, 113, 'BK113-0016', 1),
(99, 113, 'BK113-0017', 1),
(100, 113, 'BK113-0018', 1),
(101, 113, 'BK113-0019', 1),
(102, 113, 'BK113-0020', 1),
(103, 114, 'BK114-0001', 0),
(104, 114, 'BK114-0002', 1),
(105, 114, 'BK114-0003', 1),
(106, 114, 'BK114-0004', 1),
(107, 114, 'BK114-0005', 1),
(108, 114, 'BK114-0006', 1),
(109, 114, 'BK114-0007', 1),
(110, 114, 'BK114-0008', 1),
(111, 114, 'BK114-0009', 1),
(112, 114, 'BK114-0010', 1),
(113, 115, 'BK115-0001', 1),
(114, 80, 'BK80-1772524191364-0001', 1),
(115, 80, 'BK80-1772524191567-0002', 1),
(116, 80, 'BK80-1772524191704-0003', 1),
(117, 80, 'BK80-1772524191839-0004', 1),
(118, 88, 'BK88-1772524197218-0001', 1),
(119, 88, 'BK88-1772524197366-0002', 1),
(120, 88, 'BK88-1772524197493-0003', 1),
(121, 88, 'BK88-1772524197632-0004', 1),
(122, 88, 'BK88-1772524197761-0005', 1);

-- --------------------------------------------------------

--
-- Table structure for table `payments`
--

CREATE TABLE `payments` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `order_type` enum('purchase','rental') NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `payment_method` enum('card','cash','transfer') NOT NULL DEFAULT 'card',
  `payment_date` datetime NOT NULL DEFAULT current_timestamp(),
  `status` enum('pending','completed','failed','refunded') NOT NULL DEFAULT 'completed'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- Dumping data for table `payments`
--

INSERT INTO `payments` (`id`, `user_id`, `order_type`, `amount`, `payment_method`, `payment_date`, `status`) VALUES
(22, 6, '', 9773.00, 'card', '2026-03-03 09:14:26', 'completed'),
(23, 6, 'purchase', 4799.00, 'card', '2026-03-03 09:15:29', 'completed'),
(24, 6, '', 2270.00, 'card', '2026-03-03 09:21:07', 'completed'),
(25, 6, '', 3149.00, 'card', '2026-03-03 09:21:34', 'completed'),
(26, 6, '', 3575.00, 'card', '2026-03-03 09:26:58', 'completed'),
(27, 6, '', 9090.00, 'card', '2026-03-03 09:33:24', 'completed'),
(28, 6, 'purchase', 7000000.00, 'card', '2026-03-03 09:35:17', 'completed'),
(29, 18, '', 5294.00, 'card', '2026-03-10 13:59:06', 'completed');

-- --------------------------------------------------------

--
-- Table structure for table `purchase_items`
--

CREATE TABLE `purchase_items` (
  `id` int(11) NOT NULL,
  `payment_id` int(11) NOT NULL,
  `book_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL DEFAULT 1,
  `unit_price` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- Dumping data for table `purchase_items`
--

INSERT INTO `purchase_items` (`id`, `payment_id`, `book_id`, `quantity`, `unit_price`) VALUES
(1, 27, 10, 1, 8990.00),
(2, 28, 114, 1, 7000000.00),
(3, 29, 1, 1, 4990.00);

-- --------------------------------------------------------

--
-- Table structure for table `rentals`
--

CREATE TABLE `rentals` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `copy_id` int(11) NOT NULL,
  `rental_date` date NOT NULL,
  `return_date` date DEFAULT NULL,
  `due_date` date DEFAULT NULL,
  `payment_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- Dumping data for table `rentals`
--

INSERT INTO `rentals` (`id`, `user_id`, `copy_id`, `rental_date`, `return_date`, `due_date`, `payment_id`) VALUES
(32, 6, 8, '2026-03-03', NULL, '2026-03-17', 22),
(33, 6, 12, '2026-03-03', NULL, '2026-03-17', 24),
(34, 6, 28, '2026-03-03', NULL, '2026-03-17', 25),
(35, 6, 22, '2026-03-03', NULL, '2026-03-17', 26),
(36, 6, 11, '2026-03-03', NULL, '2026-03-17', 27),
(37, 18, 20, '2026-03-10', NULL, '2026-03-24', 29),
(38, 18, 19, '2026-03-10', NULL, '2026-03-24', 29);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `created` timestamp NULL DEFAULT current_timestamp(),
  `is_verified` tinyint(1) DEFAULT 0,
  `verification_token` varchar(255) DEFAULT NULL,
  `token_expires` datetime DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `default_address` varchar(500) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password_hash`, `created`, `is_verified`, `verification_token`, `token_expires`, `last_name`, `first_name`, `default_address`) VALUES
(1, 'Kiss Péter', 'peter.kiss@example.com', 'hash1', '2024-01-10 09:00:00', 1, NULL, NULL, NULL, NULL, NULL),
(2, 'Nagy Anna', 'anna.nagy@example.com', 'hash2', '2024-02-05 08:30:00', 1, NULL, NULL, NULL, NULL, NULL),
(3, 'Szabó Márton', 'marton.szabo@example.com', 'hash3', '2024-03-12 13:15:00', 1, NULL, NULL, NULL, NULL, NULL),
(4, 'Tóth Eszter', 'eszter.toth@example.com', 'hash4', '2024-03-20 15:45:00', 1, NULL, NULL, NULL, NULL, NULL),
(5, 'Varga Dániel', 'daniel.varga@example.com', 'hash5', '2024-04-01 06:20:00', 1, NULL, NULL, NULL, NULL, NULL),
(6, 'Majom Majom', 'admin@bookstore.hu', '$2a$11$ztZ5/TTEZWoR5RGlP3vCTOnBDDxuOmEkHZIaJWwtqX8OMKqGU7kGq', '2025-12-10 21:09:35', 1, NULL, NULL, 'Majom', 'Majom', '1001. majom 52'),
(8, 'Teszt Felhasználó', 'teszt01@gamil.com', '$2a$11$V0uHDXCdl4pP5dckgSXxUeL.69MsZ9mDcdP2JcuyWMwiIXKn5VlTW', '2026-02-10 22:03:34', 0, 'eddd9ac4-70cc-4177-b312-71f8e05bfc38', '2026-02-11 23:03:34', NULL, NULL, NULL),
(9, 'Teszt Felhasználó', 'teszt02@gamil.com', '$2a$11$/bkGrX1mOReq9IBoMA9zdegDzOHDHGmBrpNCM3owdGdByC3WOfQz6', '2026-02-10 22:06:33', 1, NULL, NULL, NULL, NULL, NULL),
(10, 'Kende Tóth', 'majom@mjaom.com', '$2a$11$hop331C3nsOdiyHl2v/.xePzDmbSmkKSrAGt.ElYWu8B/hjRvwD.W', '2026-02-10 22:11:31', 1, NULL, NULL, NULL, NULL, NULL),
(11, 'Busák Ali Jozsef', 'FAszos@asas.com', '$2a$11$uF1PAZYYzZEwAh86q.edVOzPC52AsAoEGFL6MPMp0/8CTTjSS4I52', '2026-02-11 11:01:58', 1, NULL, NULL, NULL, NULL, NULL),
(12, 'Ifjabb Busák Ali Jozsef', 'majom@teszt.com', '$2a$11$njq.1DRwx5.xw03AS8JJo..gPl0hyJvr3IdZKKYfxA2dWF/w0Hjwy', '2026-02-11 11:09:07', 1, NULL, NULL, NULL, NULL, NULL),
(13, 'Majom', 'karoly@szigma.com', '$2a$11$ElK.JD5F6UI2ryhdNqyY.eeJvlkIS7pqvQUeU/kpWxcg1GjZZKUGi', '2026-02-12 10:26:47', 1, NULL, NULL, NULL, NULL, NULL),
(14, 'Busáék Ali Abdul', 'BuziAli@gmail.com', '$2a$11$iEZ85k7qZfEFUKXK5jJRiOG6LvOkhjypJ76B6i2J1zrUBEbxE6UBy', '2026-02-16 14:01:46', 1, NULL, NULL, NULL, NULL, NULL),
(15, 'Tyrone Squire', 'feka@majom.com', '$2a$11$VKQ0Hpon6Wc7OQhRYA.y7OqTbXtvw790/5r2xajkuDv3.yd5LF/32', '2026-02-16 17:45:27', 1, NULL, NULL, NULL, NULL, NULL),
(16, 'Busák Ali', 'busaka@ali.com', '$2a$11$ffifC9bbZ1nkLxF.5FKgWe2MODt7SSM3o6M3fTGlFi6y1SCVvfTVO', '2026-02-17 10:44:23', 1, NULL, NULL, NULL, NULL, NULL),
(17, 'Tyrone Squire', 'busakaziza@ali.com', '$2a$11$iBWBdS7z3pAoapVDbdiKgOK8hD58cfq6bQKRUnr57KSBPeVe.x1xW', '2026-02-17 10:49:51', 1, NULL, NULL, NULL, NULL, NULL),
(18, 'Majom Ali', 'ali@ali.com', '$2a$11$JkDcNuGA6lIly9qrJMfFVuwJ65/7w9bcLvb7KYGsOZOEKVsxp.zB.', '2026-02-17 10:57:02', 1, NULL, NULL, NULL, NULL, NULL),
(19, 'Kende Tóth', 'kende@toth.com', '$2a$11$R4BRRoyxBmq/YbJzxeA9v.uQ0C/CmHDAPwORdTdA3VtYZc7TXKE7i', '2026-02-26 07:21:48', 1, NULL, NULL, NULL, NULL, NULL),
(20, 'Martin', 'lapostyanm@kkszki.hu', '$2a$11$9jF0ik.TJZRphdSmudxv5uFoHWylxKjDoaM4pQorFoBuXTsC1kbC.', '2026-02-26 08:32:39', 1, NULL, NULL, NULL, NULL, NULL),
(21, 'Kovács János', 'nissifer@0.com', '$2a$11$dxaVmfxkvj.giILg/eBySOigltERunGzO4YnZz2sJ/TABmH9xpk8C', '2026-03-10 12:46:26', 1, NULL, NULL, 'Kovács', 'János', 'Janos utca sigma 45');

-- --------------------------------------------------------

--
-- Table structure for table `__EFMigrationsHistory`
--

CREATE TABLE `__EFMigrationsHistory` (
  `MigrationId` varchar(150) NOT NULL,
  `ProductVersion` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `__EFMigrationsHistory`
--

INSERT INTO `__EFMigrationsHistory` (`MigrationId`, `ProductVersion`) VALUES
('20251202181610_AddBookCoverField', '8.0.22');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `authors`
--
ALTER TABLE `authors`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `books`
--
ALTER TABLE `books`
  ADD PRIMARY KEY (`id`),
  ADD KEY `author_id` (`author_id`);

--
-- Indexes for table `carts`
--
ALTER TABLE `carts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `cart_items`
--
ALTER TABLE `cart_items`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_cart_copy` (`cart_id`,`copy_id`),
  ADD KEY `cart_id` (`cart_id`),
  ADD KEY `copy_id` (`copy_id`);

--
-- Indexes for table `copies`
--
ALTER TABLE `copies`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `leltari_szam` (`inventory_number`),
  ADD KEY `book_id` (`book_id`,`available`);

--
-- Indexes for table `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_payment_date` (`payment_date`),
  ADD KEY `idx_user_id` (`user_id`),
  ADD KEY `idx_status` (`status`);

--
-- Indexes for table `purchase_items`
--
ALTER TABLE `purchase_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_purchase_items_payment` (`payment_id`),
  ADD KEY `idx_purchase_items_book` (`book_id`);

--
-- Indexes for table `rentals`
--
ALTER TABLE `rentals`
  ADD PRIMARY KEY (`id`),
  ADD KEY `copy_id` (`copy_id`,`return_date`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `payment_id` (`payment_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `idx_verification_token` (`verification_token`);

--
-- Indexes for table `__EFMigrationsHistory`
--
ALTER TABLE `__EFMigrationsHistory`
  ADD PRIMARY KEY (`MigrationId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `authors`
--
ALTER TABLE `authors`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=77;

--
-- AUTO_INCREMENT for table `books`
--
ALTER TABLE `books`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=116;

--
-- AUTO_INCREMENT for table `carts`
--
ALTER TABLE `carts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT for table `cart_items`
--
ALTER TABLE `cart_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=78;

--
-- AUTO_INCREMENT for table `copies`
--
ALTER TABLE `copies`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=123;

--
-- AUTO_INCREMENT for table `payments`
--
ALTER TABLE `payments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `purchase_items`
--
ALTER TABLE `purchase_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `rentals`
--
ALTER TABLE `rentals`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `books`
--
ALTER TABLE `books`
  ADD CONSTRAINT `fk_books_author` FOREIGN KEY (`author_id`) REFERENCES `authors` (`id`);

--
-- Constraints for table `carts`
--
ALTER TABLE `carts`
  ADD CONSTRAINT `fk_carts_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `cart_items`
--
ALTER TABLE `cart_items`
  ADD CONSTRAINT `fk_cart_items_cart` FOREIGN KEY (`cart_id`) REFERENCES `carts` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_cart_items_copy` FOREIGN KEY (`copy_id`) REFERENCES `copies` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `copies`
--
ALTER TABLE `copies`
  ADD CONSTRAINT `fk_copies_book` FOREIGN KEY (`book_id`) REFERENCES `books` (`id`);

--
-- Constraints for table `payments`
--
ALTER TABLE `payments`
  ADD CONSTRAINT `payments_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `purchase_items`
--
ALTER TABLE `purchase_items`
  ADD CONSTRAINT `fk_purchase_items_book` FOREIGN KEY (`book_id`) REFERENCES `books` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_purchase_items_payment` FOREIGN KEY (`payment_id`) REFERENCES `payments` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `rentals`
--
ALTER TABLE `rentals`
  ADD CONSTRAINT `fk_rentals_copy` FOREIGN KEY (`copy_id`) REFERENCES `copies` (`id`),
  ADD CONSTRAINT `fk_rentals_payment` FOREIGN KEY (`payment_id`) REFERENCES `payments` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `fk_rentals_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
