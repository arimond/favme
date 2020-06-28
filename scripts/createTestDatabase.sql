CREATE DATABASE  IF NOT EXISTS `favmetest` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `favmetest`;
-- MySQL dump 10.13  Distrib 8.0.20, for macos10.15 (x86_64)
--
-- Host: localhost    Database: favmetest
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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Bankaccounts`
--

LOCK TABLES `Bankaccounts` WRITE;
/*!40000 ALTER TABLE `Bankaccounts` DISABLE KEYS */;
INSERT INTO `Bankaccounts` (`bankaccountId`, `userId`, `country`, `beneficiary`, `iban`, `bic`, `isActive`) VALUES (1,1,'Deutschland','Peer Hofreiter','DE41500105170123456789','12030000',1),(2,1,'Deutschland','Sinah Kolumba','DE41500105170123123789','120301234',0),(3,2,'Deutschland','Sinah Kolumba','DE41500105170123123789','120301234',1),(4,2,'Deutschland','Sinah Kolumba','DE41500105170123123789','120301234',1);
/*!40000 ALTER TABLE `Bankaccounts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Customers`
--

DROP TABLE IF EXISTS `Customers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Customers` (
  `customerId` int unsigned NOT NULL AUTO_INCREMENT,
  `email` varchar(45) NOT NULL,
  PRIMARY KEY (`customerId`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Customers`
--

LOCK TABLES `Customers` WRITE;
/*!40000 ALTER TABLE `Customers` DISABLE KEYS */;
INSERT INTO `Customers` (`customerId`, `email`) VALUES (1,'customneruno@gmail.com'),(2,'customerouasdhaioshd@yahoooo.com'),(3,'ichbineinkaufer@einlangeremailprovider.com'),(4,'test@mymail.com'),(5,'test@mymail.com'),(6,'test@mymail.com'),(7,'test@mymail.com');
/*!40000 ALTER TABLE `Customers` ENABLE KEYS */;
UNLOCK TABLES;

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
  `image` varchar(45) NOT NULL,
  `isActive` tinyint unsigned NOT NULL DEFAULT '1',
  PRIMARY KEY (`documentId`),
  KEY `fk_Documents_Users1_idx` (`userId`),
  CONSTRAINT `fk_Documents_Users1` FOREIGN KEY (`userId`) REFERENCES `Users` (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Documents`
--

LOCK TABLES `Documents` WRITE;
/*!40000 ALTER TABLE `Documents` DISABLE KEYS */;
INSERT INTO `Documents` (`documentId`, `userId`, `subject`, `image`, `isActive`) VALUES (1,1,'Bankkarte','path/to//my/image/myimage.com',1),(2,1,'Personalausweis','path/to/image/image81723618273621873612.png',1);
/*!40000 ALTER TABLE `Documents` ENABLE KEYS */;
UNLOCK TABLES;

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
  `status` varchar(20) NOT NULL DEFAULT 'requested',
  `requestDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `approveDate` datetime DEFAULT NULL,
  PRIMARY KEY (`payoutId`),
  KEY `fk_Payouts_Bankaccounts1_idx` (`bankaccountId`),
  CONSTRAINT `fk_Payouts_Bankaccounts1` FOREIGN KEY (`bankaccountId`) REFERENCES `Bankaccounts` (`bankaccountId`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Payouts`
--

LOCK TABLES `Payouts` WRITE;
/*!40000 ALTER TABLE `Payouts` DISABLE KEYS */;
INSERT INTO `Payouts` (`payoutId`, `bankaccountId`, `amount`, `status`, `requestDate`, `approveDate`) VALUES (1,1,3000,'requested','2020-06-25 13:49:09',NULL),(2,1,40000,'proccessed','2020-06-25 13:49:09','2020-06-27 12:49:09');
/*!40000 ALTER TABLE `Payouts` ENABLE KEYS */;
UNLOCK TABLES;

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
  `image` varchar(45) DEFAULT NULL,
  `currency` varchar(10) NOT NULL,
  `price` int unsigned NOT NULL,
  `isActive` tinyint unsigned NOT NULL DEFAULT '1',
  `income` int unsigned NOT NULL,
  `fee` int unsigned NOT NULL,
  PRIMARY KEY (`productId`),
  KEY `fk_Products_Users1_idx` (`userId`),
  CONSTRAINT `fk_Products_Users1` FOREIGN KEY (`userId`) REFERENCES `Users` (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Products`
--

LOCK TABLES `Products` WRITE;
/*!40000 ALTER TABLE `Products` DISABLE KEYS */;
INSERT INTO `Products` (`productId`, `userId`, `name`, `description`, `image`, `currency`, `price`, `isActive`, `income`, `fee`) VALUES (4,1,'Nachhilfe Englisch','Ich gebe Nachhilfe in Englisch mit Schwerpunkt auf Grammatik','path/to/productimage.png','eur',2000,0,0,0),(5,1,'Nachhilfe Deutsch','Ich gebe Nachhilfe in deutsch und bin bereits im 12. Semester. Sicher kann ich dir weiter helfen','path/to/theImage','eur',2000,1,0,0),(6,1,'Produktname','Dies ist eine kurze Produktbeschreibung','path/to/my/imageojojojo.png','eur',40000,1,0,0),(7,2,'Klavierunterricht Online','Klavierunterricht online mit Schwerpunkt auf Theorie insbesondere Jazz Theorie','pathtoothe/image.png','eur',30000,1,0,0);
/*!40000 ALTER TABLE `Products` ENABLE KEYS */;
UNLOCK TABLES;

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
  CONSTRAINT `fk_Sells_Customer1` FOREIGN KEY (`productId`) REFERENCES `Customers` (`customerId`),
  CONSTRAINT `fk_Sells_Products1` FOREIGN KEY (`productId`) REFERENCES `Products` (`productId`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Sells`
--

LOCK TABLES `Sells` WRITE;
/*!40000 ALTER TABLE `Sells` DISABLE KEYS */;
INSERT INTO `Sells` (`sellId`, `productId`, `customerId`, `date`) VALUES (2,4,2,'2020-06-25 13:52:45'),(3,4,1,'2020-06-27 11:45:28');
/*!40000 ALTER TABLE `Sells` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Users` (
  `userId` int unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `password` char(128) NOT NULL,
  `salt` char(32) NOT NULL,
  `email` varchar(320) NOT NULL,
  `profileEmail` varchar(320) DEFAULT NULL,
  `profileProfession` varchar(300) DEFAULT NULL,
  `profilePhone` varchar(20) DEFAULT NULL,
  `profileDescription` mediumtext,
  `profileImage` varchar(300) DEFAULT NULL,
  `balance` int unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`userId`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  UNIQUE KEY `email_UNIQUE` (`email`(255))
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
INSERT INTO `Users` (`userId`, `username`, `password`, `salt`, `email`, `profileEmail`, `profileProfession`, `profilePhone`, `profileDescription`, `profileImage`, `balance`) VALUES (1,'Peer','sahdkasdjhgisdga','isadguiadg87t31gu','peer@mymail.com','peer@publicmail.com','Nachhilfelehrer','017561874625','Ich bin einer, wenn nicht der beste Nachhilfelehrer, den die Welt je gesehen hat. Dies ist ein Beispielfließtext, der beschreibt was mich beschreibt','path/to/the/image/myimage.png',0),(2,'Sinah','sdafwafqegrtwerwfgewfwe','waefrewaaewfaewf','sinje@nextmail.com','sinje@nextmail.com','Musikstudent','01571672173','Mir fällt leider auf anhieb nichts ein','üath/to/image.png',0);
/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-06-28 17:41:26
