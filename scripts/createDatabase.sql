CREATE DATABASE  IF NOT EXISTS `favme` /*!40100 DEFAULT CHARACTER SET utf8 */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `favme`;
-- MySQL dump 10.13  Distrib 8.0.20, for macos10.15 (x86_64)
--
-- Host: localhost    Database: favme
-- ------------------------------------------------------
-- Server version	8.0.19

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Bankaccounts`
--

DROP TABLE IF EXISTS `Bankaccounts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Bankaccounts` (
  `bankaccountId` int unsigned NOT NULL AUTO_INCREMENT,
  `userId` int unsigned NOT NULL,
  `country` varchar(56) NOT NULL,
  `beneficiary` varchar(70) NOT NULL,
  `iban` char(34) NOT NULL,
  `bic` char(45) NOT NULL,
  `isActive` tinyint unsigned NOT NULL DEFAULT '1',
  PRIMARY KEY (`bankaccountId`),
  KEY `fk_Bankaccounts_Users_idx` (`userId`),
  CONSTRAINT `fk_Bankaccounts_Users` FOREIGN KEY (`userId`) REFERENCES `Users` (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Customers`
--

DROP TABLE IF EXISTS `Customers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Customers` (
  `customerId` int unsigned NOT NULL AUTO_INCREMENT,
  `email` varchar(45) NOT NULL,
  PRIMARY KEY (`customerId`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Documents`
--

DROP TABLE IF EXISTS `Documents`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Documents` (
  `documentId` int unsigned NOT NULL AUTO_INCREMENT,
  `userId` int unsigned NOT NULL,
  `subject` varchar(45) NOT NULL,
  `image` varchar(200) NOT NULL,
  `isActive` tinyint unsigned NOT NULL DEFAULT '1',
  PRIMARY KEY (`documentId`),
  KEY `fk_Documents_Users1_idx` (`userId`),
  CONSTRAINT `fk_Documents_Users1` FOREIGN KEY (`userId`) REFERENCES `Users` (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Payouts`
--

DROP TABLE IF EXISTS `Payouts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Payouts` (
  `payoutId` int unsigned NOT NULL AUTO_INCREMENT,
  `bankaccountId` int unsigned NOT NULL,
  `amount` int unsigned NOT NULL,
  `status` varchar(20) DEFAULT NULL,
  `requestDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `approveDate` datetime DEFAULT NULL,
  PRIMARY KEY (`payoutId`),
  KEY `fk_Payouts_Bankaccounts1_idx` (`bankaccountId`),
  CONSTRAINT `fk_Payouts_Bankaccounts1` FOREIGN KEY (`bankaccountId`) REFERENCES `Bankaccounts` (`bankaccountId`)
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Products`
--

DROP TABLE IF EXISTS `Products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Products` (
  `productId` int unsigned NOT NULL AUTO_INCREMENT,
  `userId` int unsigned NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` mediumtext,
  `image` varchar(200) DEFAULT NULL,
  `currency` varchar(10) NOT NULL,
  `price` int unsigned NOT NULL,
  `isActive` tinyint unsigned NOT NULL DEFAULT '1',
  `income` int unsigned NOT NULL,
  `fee` int unsigned NOT NULL,
  PRIMARY KEY (`productId`),
  KEY `fk_Products_Users1_idx` (`userId`),
  CONSTRAINT `fk_Products_Users1` FOREIGN KEY (`userId`) REFERENCES `Users` (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Sells`
--

DROP TABLE IF EXISTS `Sells`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Sells` (
  `sellId` int unsigned NOT NULL AUTO_INCREMENT,
  `productId` int unsigned NOT NULL,
  `customerId` int unsigned NOT NULL,
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`sellId`),
  KEY `fk_Sells_Products1_idx` (`productId`),
  KEY `fk_Sells_Customer1_idx` (`customerId`),
  CONSTRAINT `fk_Sells_Customer1` FOREIGN KEY (`customerId`) REFERENCES `Customers` (`customerId`),
  CONSTRAINT `fk_Sells_Products1` FOREIGN KEY (`productId`) REFERENCES `Products` (`productId`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Users` (
  `userId` int unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `hash` char(128) NOT NULL,
  `salt` char(128) NOT NULL,
  `email` varchar(320) NOT NULL,
  `profileEmail` varchar(320) DEFAULT NULL,
  `profileProfession` varchar(300) DEFAULT NULL,
  `profilePhone` varchar(20) DEFAULT NULL,
  `profileDescription` mediumtext,
  `profileImage` varchar(300) DEFAULT NULL,
  `balance` int unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`userId`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  UNIQUE KEY `username_UNIQUE` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-08-30 20:04:25
