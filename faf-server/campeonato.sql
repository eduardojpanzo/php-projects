-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 07, 2024 at 03:53 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `campeonato`
--
CREATE DATABASE IF NOT EXISTS `campeonato` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `campeonato`;
-- --------------------------------------------------------

--
-- Table structure for table `campeonato`
--

CREATE TABLE `campeonato` (
  `id_campeonato` int(11) NOT NULL,
  `nome` varchar(50) NOT NULL,
  `data_inicio` date NOT NULL,
  `data_fim` date NOT NULL,
  `descricao` varchar(255) NOT NULL,
  `valor_pagar` decimal(10,2) NOT NULL,
  `id_foto` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `campeonato`
--

INSERT INTO `campeonato` (`id_campeonato`, `nome`, `data_inicio`, `data_fim`, `descricao`, `valor_pagar`, `id_foto`) VALUES
(1, 'Esperança', '2024-02-29', '2024-06-10', 'capeonato para dar esperança', 19500.50, NULL),
(2, 'Infantil', '2024-03-29', '2024-05-10', 'capeonato para crinças', 5000.50, NULL),
(3, 'Teste', '2024-02-29', '2024-02-29', 'alguma coisa', 20000.00, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `equipa`
--

CREATE TABLE `equipa` (
  `id_equipa` int(11) NOT NULL,
  `nome` varchar(50) NOT NULL,
  `descricao` text NOT NULL,
  `data_fundacao` date NOT NULL,
  `id_foto` int(11) DEFAULT NULL,
  `id_responsavel` int(11) DEFAULT NULL,
  `id_estadio` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `equipa`
--

INSERT INTO `equipa` (`id_equipa`, `nome`, `descricao`, `data_fundacao`, `id_foto`, `id_responsavel`, `id_estadio`) VALUES
(1, 'Ultimate X', 'equipa junior Masculina', '0000-00-00', NULL, NULL, NULL),
(2, 'Vencedor Ultra', 'equipa junior Masculina', '0000-00-00', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `estadio`
--

CREATE TABLE `estadio` (
  `id_estadio` int(11) NOT NULL,
  `nome` varchar(80) NOT NULL,
  `localizacao` varchar(30) NOT NULL,
  `capacidade` mediumint(8) UNSIGNED NOT NULL,
  `id_foto` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `fotos`
--

CREATE TABLE `fotos` (
  `id_foto` int(11) NOT NULL,
  `nome_arquivo` varchar(255) NOT NULL,
  `tipo` varchar(100) NOT NULL,
  `tamanho_arquivo` int(11) NOT NULL,
  `data_upload` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `inscricao`
--

CREATE TABLE `inscricao` (
  `id_inscricao` int(11) NOT NULL,
  `id_campeonato` int(11) DEFAULT NULL,
  `id_equipa` int(11) DEFAULT NULL,
  `estado` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `inscricao`
--

INSERT INTO `inscricao` (`id_inscricao`, `id_campeonato`, `id_equipa`, `estado`) VALUES
(1, 1, 1, 1),
(2, 1, 2, 1);

-- --------------------------------------------------------

--
-- Table structure for table `jogador`
--

CREATE TABLE `jogador` (
  `id_jogador` int(11) NOT NULL,
  `nome` varchar(60) NOT NULL,
  `numero` tinyint(3) UNSIGNED NOT NULL,
  `posicao` varchar(30) NOT NULL,
  `data_nascimento` date NOT NULL,
  `sexo` enum('M','F') NOT NULL,
  `id_equipa` int(11) DEFAULT NULL,
  `id_foto` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `jogador`
--

INSERT INTO `jogador` (`id_jogador`, `nome`, `numero`, `posicao`, `data_nascimento`, `sexo`, `id_equipa`, `id_foto`) VALUES
(4, 'Motinho', 4, 'defesa', '2001-10-01', 'M', NULL, NULL),
(5, 'J Pedro Segunda', 4, 'Defesa', '1998-05-25', 'M', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `partidas`
--

CREATE TABLE `partidas` (
  `id_partida` int(11) NOT NULL,
  `data` datetime NOT NULL,
  `hora_fim` int(11) NOT NULL,
  `hora_inicio` datetime NOT NULL,
  `estado` tinyint(1) NOT NULL,
  `id_campeonato` int(11) DEFAULT NULL,
  `id_equipa_casa` int(11) DEFAULT NULL,
  `id_equipa_fora` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `responsavel`
--

CREATE TABLE `responsavel` (
  `id_responsavel` int(11) NOT NULL,
  `nome` varchar(60) NOT NULL,
  `data_nascimento` date NOT NULL,
  `sexo` enum('M','F') NOT NULL,
  `id_foto` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `resultados`
--

CREATE TABLE `resultados` (
  `id_resultados` int(11) NOT NULL,
  `gol_casa` tinyint(3) UNSIGNED NOT NULL,
  `gol_fora` tinyint(3) UNSIGNED NOT NULL,
  `id_partida` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tecnico`
--

CREATE TABLE `tecnico` (
  `id_tecnico` int(11) NOT NULL,
  `nome` varchar(60) NOT NULL,
  `experiencia` tinyint(3) UNSIGNED NOT NULL,
  `tipo` varchar(25) NOT NULL,
  `data_nascimento` date NOT NULL,
  `sexo` enum('M','F') NOT NULL,
  `id_foto` int(11) DEFAULT NULL,
  `id_equipa` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `usuario`
--

CREATE TABLE `usuario` (
  `id_usuario` int(11) NOT NULL,
  `nome` varchar(30) NOT NULL,
  `tipo` enum('admin','user') NOT NULL DEFAULT 'user',
  `senha` varchar(255) NOT NULL,
  `id_foto` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `usuario`
--

INSERT INTO `usuario` (`id_usuario`, `nome`, `tipo`, `senha`, `id_foto`) VALUES
(1, 'Eduardo', 'admin', '$2y$10$B8Hdi7TordfRJP3embhPj.K66fe./Fjmo.FBzw7PLKh079GLNtX8.', NULL),
(6, 'Ernesto', 'admin', '$2y$10$kzlZkYf8ySK9QUXbNNqpqeEIQTDcZhloO0zTE3Gad1zRMjvCPaW/y', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `campeonato`
--
ALTER TABLE `campeonato`
  ADD PRIMARY KEY (`id_campeonato`),
  ADD KEY `fk_campeonato_foto` (`id_foto`);

--
-- Indexes for table `equipa`
--
ALTER TABLE `equipa`
  ADD PRIMARY KEY (`id_equipa`),
  ADD KEY `fk_equipa_foto` (`id_foto`),
  ADD KEY `fk_equipa_estadio` (`id_estadio`),
  ADD KEY `fk_equipa_responsavel` (`id_responsavel`);

--
-- Indexes for table `estadio`
--
ALTER TABLE `estadio`
  ADD PRIMARY KEY (`id_estadio`),
  ADD KEY `fk_estadio_foto` (`id_foto`);

--
-- Indexes for table `fotos`
--
ALTER TABLE `fotos`
  ADD PRIMARY KEY (`id_foto`);

--
-- Indexes for table `inscricao`
--
ALTER TABLE `inscricao`
  ADD PRIMARY KEY (`id_inscricao`),
  ADD KEY `fk_inscricao_campeonato` (`id_campeonato`),
  ADD KEY `fk_inscricao_equipa` (`id_equipa`);

--
-- Indexes for table `jogador`
--
ALTER TABLE `jogador`
  ADD PRIMARY KEY (`id_jogador`),
  ADD KEY `fk_jogador_equipa` (`id_equipa`),
  ADD KEY `fk_jodador_foto` (`id_foto`);

--
-- Indexes for table `partidas`
--
ALTER TABLE `partidas`
  ADD PRIMARY KEY (`id_partida`),
  ADD UNIQUE KEY `id_equipa_casa` (`id_equipa_casa`,`id_equipa_fora`),
  ADD KEY `fk_partidas_campeonato` (`id_campeonato`),
  ADD KEY `fk_partidas_equipa_fora` (`id_equipa_fora`);

--
-- Indexes for table `responsavel`
--
ALTER TABLE `responsavel`
  ADD PRIMARY KEY (`id_responsavel`),
  ADD KEY `fk_responsavel_foto` (`id_foto`);

--
-- Indexes for table `resultados`
--
ALTER TABLE `resultados`
  ADD PRIMARY KEY (`id_resultados`),
  ADD KEY `fk_resultado_partidas` (`id_partida`);

--
-- Indexes for table `tecnico`
--
ALTER TABLE `tecnico`
  ADD PRIMARY KEY (`id_tecnico`),
  ADD KEY `fk_tecnico_equipa` (`id_equipa`),
  ADD KEY `fk_tecnico_foto` (`id_foto`);

--
-- Indexes for table `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id_usuario`),
  ADD UNIQUE KEY `nome` (`nome`),
  ADD KEY `fr_user_foto` (`id_foto`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `campeonato`
--
ALTER TABLE `campeonato`
  MODIFY `id_campeonato` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `equipa`
--
ALTER TABLE `equipa`
  MODIFY `id_equipa` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `estadio`
--
ALTER TABLE `estadio`
  MODIFY `id_estadio` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `fotos`
--
ALTER TABLE `fotos`
  MODIFY `id_foto` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `inscricao`
--
ALTER TABLE `inscricao`
  MODIFY `id_inscricao` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `jogador`
--
ALTER TABLE `jogador`
  MODIFY `id_jogador` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `partidas`
--
ALTER TABLE `partidas`
  MODIFY `id_partida` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `responsavel`
--
ALTER TABLE `responsavel`
  MODIFY `id_responsavel` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `resultados`
--
ALTER TABLE `resultados`
  MODIFY `id_resultados` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tecnico`
--
ALTER TABLE `tecnico`
  MODIFY `id_tecnico` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `campeonato`
--
ALTER TABLE `campeonato`
  ADD CONSTRAINT `fk_campeonato_foto` FOREIGN KEY (`id_foto`) REFERENCES `fotos` (`id_foto`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `equipa`
--
ALTER TABLE `equipa`
  ADD CONSTRAINT `fk_equipa_estadio` FOREIGN KEY (`id_estadio`) REFERENCES `estadio` (`id_estadio`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_equipa_foto` FOREIGN KEY (`id_foto`) REFERENCES `fotos` (`id_foto`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_equipa_responsavel` FOREIGN KEY (`id_responsavel`) REFERENCES `responsavel` (`id_responsavel`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `estadio`
--
ALTER TABLE `estadio`
  ADD CONSTRAINT `fk_estadio_foto` FOREIGN KEY (`id_foto`) REFERENCES `fotos` (`id_foto`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `inscricao`
--
ALTER TABLE `inscricao`
  ADD CONSTRAINT `fk_inscricao_campeonato` FOREIGN KEY (`id_campeonato`) REFERENCES `campeonato` (`id_campeonato`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_inscricao_equipa` FOREIGN KEY (`id_equipa`) REFERENCES `equipa` (`id_equipa`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `jogador`
--
ALTER TABLE `jogador`
  ADD CONSTRAINT `fk_jodador_foto` FOREIGN KEY (`id_foto`) REFERENCES `fotos` (`id_foto`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_jogador_equipa` FOREIGN KEY (`id_equipa`) REFERENCES `equipa` (`id_equipa`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `partidas`
--
ALTER TABLE `partidas`
  ADD CONSTRAINT `fk_partidas_campeonato` FOREIGN KEY (`id_campeonato`) REFERENCES `campeonato` (`id_campeonato`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_partidas_equipa_casa` FOREIGN KEY (`id_equipa_casa`) REFERENCES `equipa` (`id_equipa`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_partidas_equipa_fora` FOREIGN KEY (`id_equipa_fora`) REFERENCES `equipa` (`id_equipa`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `responsavel`
--
ALTER TABLE `responsavel`
  ADD CONSTRAINT `fk_responsavel_foto` FOREIGN KEY (`id_foto`) REFERENCES `fotos` (`id_foto`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `resultados`
--
ALTER TABLE `resultados`
  ADD CONSTRAINT `fk_resultado_partidas` FOREIGN KEY (`id_partida`) REFERENCES `partidas` (`id_partida`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `tecnico`
--
ALTER TABLE `tecnico`
  ADD CONSTRAINT `fk_tecnico_equipa` FOREIGN KEY (`id_equipa`) REFERENCES `equipa` (`id_equipa`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_tecnico_foto` FOREIGN KEY (`id_foto`) REFERENCES `fotos` (`id_foto`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `usuario`
--
ALTER TABLE `usuario`
  ADD CONSTRAINT `fr_user_foto` FOREIGN KEY (`id_foto`) REFERENCES `fotos` (`id_foto`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
