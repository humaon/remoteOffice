-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jun 25, 2022 at 09:55 AM
-- Server version: 10.6.7-MariaDB-2ubuntu1
-- PHP Version: 8.1.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `remoteOffice`
--

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `profileImage` varchar(255) NOT NULL,
  `dateOfBirth` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `attachment` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp(),
  `role` varchar(100) NOT NULL DEFAULT 'user'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `profileImage`, `dateOfBirth`, `email`, `attachment`, `password`, `createdAt`, `updatedAt`, `role`) VALUES
(1, 'emon 6', 'uploads/profileImage-1655983663087.jpg', '2020-05-02', 'ehumaonkabir39@gmail.com', 'uploads/attachment-1655983663088.pdf', '$2a$12$pAQtjWnB6EVzeDZmfeiMvOAqtn7kVOW3izeRE5Y4I8LNbtm5x.bUK', '2022-06-23 17:27:43', '2022-06-23 17:27:43', 'admin'),
(2, 'emon 9', 'uploads/profileImage-1655983663087.jpg', '2020-05-02', 'ehumaonkabir39@gmail.comjk', 'uploads/attachment-1655983663088.pdf', '$2a$12$pAQtjWnB6EVzeDZmfeiMvOAqtn7kVOW3izeRE5Y4I8LNbtm5x.bUK', '2022-06-23 17:27:43', '2022-06-23 17:27:43', 'user'),
(3, 'Humaon', 'uploads/profileImage-1656147990152.png', 'Wed Jun 15 2022 00:00:00 GMT+0600 (Bangladesh Standard Time)', 'abcd@gmail.com', 'uploads/attachment-1656147990159.jpg', '$2a$12$LcNNO.3220yqkxppRP8Us.jlcFZaCUxItMH9NBLu7QbQYi/waaRwm', '2022-06-25 15:06:30', '2022-06-25 15:06:30', 'admin');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
