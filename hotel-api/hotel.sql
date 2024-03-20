-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Tempo de geração: 26-Jun-2023 às 01:51
-- Versão do servidor: 10.4.27-MariaDB
-- versão do PHP: 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `hotel`
--
CREATE DATABASE IF NOT EXISTS `hotel` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `hotel`;

-- --------------------------------------------------------

--
-- Estrutura da tabela `booking`
--

CREATE TABLE `booking` (
  `id_booking` int(11) NOT NULL,
  `startDate` date NOT NULL,
  `endDate` date NOT NULL,
  `room` int(11) NOT NULL,
  `guest` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Extraindo dados da tabela `booking`
--

INSERT INTO `booking` (`id_booking`, `startDate`, `endDate`, `room`, `guest`) VALUES
(4, '2023-06-20', '2023-06-22', 2, 2),
(5, '2023-06-23', '2023-06-25', 2, 2),
(8, '2023-06-27', '2023-06-29', 8, 4);

-- --------------------------------------------------------

--
-- Estrutura da tabela `clients`
--

CREATE TABLE `clients` (
  `id` int(11) NOT NULL,
  `nome` varchar(30) NOT NULL,
  `email` varchar(35) NOT NULL,
  `cidade` varchar(30) NOT NULL,
  `telefone` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Extraindo dados da tabela `clients`
--

INSERT INTO `clients` (`id`, `nome`, `email`, `cidade`, `telefone`) VALUES
(2, 'Danis Man', 'miguel@hgamil.com', 'Chalalala', '945543221'),
(3, 'Eduardo Miguel', 'simples@gamil.com', 'Chicago', '945544589'),
(4, 'Eduardo Miguel', 'simples@gamil.com', 'Chicago', '945544589');

-- --------------------------------------------------------

--
-- Estrutura da tabela `hotelguest`
--

CREATE TABLE `hotelguest` (
  `id_guest` int(11) NOT NULL,
  `name` varchar(30) NOT NULL,
  `phone` varchar(15) NOT NULL,
  `bi_number` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Extraindo dados da tabela `hotelguest`
--

INSERT INTO `hotelguest` (`id_guest`, `name`, `phone`, `bi_number`) VALUES
(2, 'Fernando Brito', '945565423', '00434438LA042'),
(4, 'Eduardo', '993627743', '0045454UELA042');

-- --------------------------------------------------------

--
-- Estrutura da tabela `room`
--

CREATE TABLE `room` (
  `id` int(11) NOT NULL,
  `floor` int(3) NOT NULL,
  `number` int(4) NOT NULL,
  `bedsNumber` int(2) NOT NULL,
  `type` varchar(30) NOT NULL,
  `cost` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Extraindo dados da tabela `room`
--

INSERT INTO `room` (`id`, `floor`, `number`, `bedsNumber`, `type`, `cost`) VALUES
(1, 1, 1, 1, 'Quarto de solteiro', 10000),
(2, 1, 2, 1, 'Quarto de solteiro', 10000),
(3, 1, 3, 2, 'Quarto Twin', 20000),
(4, 2, 4, 2, 'Quarto Twin', 20000),
(5, 2, 5, 1, 'Quarto duplo', 15000),
(6, 2, 6, 1, 'Quarto de solteiro', 10000),
(7, 3, 7, 1, 'Quarto duplo', 15000),
(8, 3, 8, 2, 'Quarto Twin', 20000),
(9, 4, 9, 4, 'Quarto triplo', 30000),
(10, 4, 10, 3, 'quarto quadruplo', 25000);

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `booking`
--
ALTER TABLE `booking`
  ADD PRIMARY KEY (`id_booking`),
  ADD KEY `booking_room` (`room`),
  ADD KEY `booking_hotelguest` (`guest`);

--
-- Índices para tabela `clients`
--
ALTER TABLE `clients`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `hotelguest`
--
ALTER TABLE `hotelguest`
  ADD PRIMARY KEY (`id_guest`);

--
-- Índices para tabela `room`
--
ALTER TABLE `room`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `number` (`number`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `booking`
--
ALTER TABLE `booking`
  MODIFY `id_booking` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de tabela `clients`
--
ALTER TABLE `clients`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de tabela `hotelguest`
--
ALTER TABLE `hotelguest`
  MODIFY `id_guest` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de tabela `room`
--
ALTER TABLE `room`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Restrições para despejos de tabelas
--

--
-- Limitadores para a tabela `booking`
--
ALTER TABLE `booking`
  ADD CONSTRAINT `booking_hotelguest` FOREIGN KEY (`guest`) REFERENCES `hotelguest` (`id_guest`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `booking_room` FOREIGN KEY (`room`) REFERENCES `room` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
