-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Gép: localhost
-- Létrehozás ideje: 2025. Aug 10. 00:52
-- Kiszolgáló verziója: 11.4.7-MariaDB
-- PHP verzió: 8.3.23

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `v2labgwj_12b_majorosm`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `Books`
--

CREATE TABLE `Books` (
  `id` int(11) NOT NULL,
  `cim` varchar(255) NOT NULL,
  `szerzo` varchar(255) NOT NULL,
  `kiadasi_datum` date DEFAULT NULL,
  `tartalom` text DEFAULT NULL,
  `kolcsonzes_alatt` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- A tábla adatainak kiíratása `Books`
--

INSERT INTO `Books` (`id`, `cim`, `szerzo`, `kiadasi_datum`, `tartalom`, `kolcsonzes_alatt`) VALUES
(1, 'Around the World in Eighty Days', 'Jules Verne', '1872-01-01', '', 0),
(2, 'The Three Musketeers', 'Alexandre Dumas', '1844-01-01', '', 0),
(3, 'Treasure Island', 'Robert Louis Stevenson', '1883-01-01', '', 0),
(4, 'The Hound of the Baskervilles', 'Arthur Conan Doyle', '1902-01-01', '', 0),
(5, 'A Study in Scarlet', 'Arthur Conan Doyle', '1887-01-01', '', 0),
(6, 'The Sign of the Four', 'Arthur Conan Doyle', '1890-01-01', '', 0),
(7, 'The Time Machine', 'H. G. Wells', '1895-01-01', '', 0),
(8, 'The War of the Worlds', 'H. G. Wells', '1898-01-01', '', 0),
(9, 'The Invisible Man', 'H. G. Wells', '1897-01-01', '', 0),
(10, 'Dracula', 'Bram Stoker', '1897-01-01', '', 0),
(11, 'Frankenstein', 'Mary Shelley', '1818-01-01', '', 0),
(12, 'Strange Case of Dr Jekyll and Mr Hyde', 'Robert Louis Stevenson', '1886-01-01', '', 0),
(13, 'Pride and Prejudice', 'Jane Austen', '1813-01-01', '', 0),
(14, 'Jane Eyre', 'Charlotte Brontë', '1847-01-01', '', 0),
(15, 'Little Women', 'Louisa May Alcott', '1868-01-01', '', 0);

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `Books`
--
ALTER TABLE `Books`
  ADD PRIMARY KEY (`id`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `Books`
--
ALTER TABLE `Books`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
