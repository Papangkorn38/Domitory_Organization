-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: mydb
-- ------------------------------------------------------
-- Server version	8.0.41

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
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS admin;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin` (
  AID char(10) NOT NULL,
  AFname varchar(100) NOT NULL,
  ALname varchar(100) NOT NULL,
  AEmail varchar(100) NOT NULL,
  APhone char(10) NOT NULL,
  Username varchar(30) NOT NULL,
  `Password` varchar(30) NOT NULL,
  `Role` enum('admin') DEFAULT 'admin',
  PRIMARY KEY (AID),
  UNIQUE KEY AEmail_UNIQUE (AEmail)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES admin WRITE;
/*!40000 ALTER TABLE admin DISABLE KEYS */;
INSERT INTO admin VALUES ('A000000001','admin1','admin1','admin@gmail.com','0123456789','admin1','admin1password','admin'),('A000000002','admin2','admin2','admin2@gmail.com','0123456788','admin2','admin2password','admin');
/*!40000 ALTER TABLE admin ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bills`
--

DROP TABLE IF EXISTS bills;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE bills (
  BID int NOT NULL AUTO_INCREMENT,
  RoomID char(4) NOT NULL,
  AID char(10) NOT NULL,
  RoomCharge decimal(8,2) DEFAULT NULL,
  TotalCharge decimal(8,2) DEFAULT NULL,
  WaterBill decimal(6,2) DEFAULT NULL,
  ElectricBill decimal(6,2) DEFAULT NULL,
  BillDate datetime DEFAULT CURRENT_TIMESTAMP,
  WaterCurrent int DEFAULT NULL,
  WaterPrevious int DEFAULT NULL,
  WaterUsed int DEFAULT NULL,
  WaterPrice decimal(6,2) DEFAULT NULL,
  ElectricCurrent int DEFAULT NULL,
  ElectricPrevious int DEFAULT NULL,
  ElectricUsed int DEFAULT NULL,
  ElectricPriced decimal(6,2) DEFAULT NULL,
  BillingCycle varchar(20) DEFAULT NULL,
  PRIMARY KEY (BID),
  KEY fk_bills_room_idx (RoomID),
  KEY fk_bill_admin_idx (AID),
  CONSTRAINT fk_bill_admin FOREIGN KEY (AID) REFERENCES `admin` (AID) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_bills_room FOREIGN KEY (RoomID) REFERENCES room (RoomID) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bills`
--

LOCK TABLES bills WRITE;
/*!40000 ALTER TABLE bills DISABLE KEYS */;
INSERT INTO bills VALUES (26,'0009','A000000001',10000.00,10550.00,150.00,400.00,'2025-05-15 14:23:30',505,500,5,30.00,1500,1400,100,4.00,'เมษายน 2568'),(27,'0007','A000000001',10000.00,10890.00,90.00,800.00,'2025-05-15 17:31:42',505,502,3,30.00,1000,800,200,4.00,'เมษายน 2568'),(30,'0007','A000000001',10000.00,12950.00,150.00,2800.00,'2025-05-16 02:59:28',505,500,5,30.00,1700,1000,700,4.00,'มกราคม 2568'),(34,'0001','A000000001',10000.00,11350.00,150.00,1200.00,'2025-05-16 03:21:25',505,500,5,30.00,1700,1400,300,4.00,'พฤษภาคม 2568');
/*!40000 ALTER TABLE bills ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `client`
--

DROP TABLE IF EXISTS client;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `client` (
  CID char(10) NOT NULL,
  Fname varchar(100) NOT NULL,
  Lname varchar(100) NOT NULL,
  Username varchar(30) NOT NULL,
  `Password` varchar(30) NOT NULL,
  Cemail varchar(100) NOT NULL,
  Address varchar(300) DEFAULT NULL,
  BirthDate date NOT NULL,
  CitizenID char(13) NOT NULL,
  PhoneNum char(10) NOT NULL,
  RoomID char(4) NOT NULL,
  `Role` enum('client') DEFAULT 'client',
  PRIMARY KEY (CID),
  UNIQUE KEY Cemail_UNIQUE (Cemail),
  UNIQUE KEY CitizenID_UNIQUE (CitizenID),
  UNIQUE KEY RoomID_UNIQUE (RoomID),
  KEY fk_room_idx (RoomID),
  CONSTRAINT fk_room FOREIGN KEY (RoomID) REFERENCES room (RoomID) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `client`
--

LOCK TABLES client WRITE;
/*!40000 ALTER TABLE client DISABLE KEYS */;
INSERT INTO client VALUES ('0000000001','Example','Example','example','example','example2@gmail.com','exampleAddress','2019-07-20','1125478596541','0215486597','0001','client'),('0000000003','Papangkorn','Sahalimcharoen','chertamtam','chertam555','chertamtam@gmail.com','555/7 moo 2 Nakorn Si Thammarat','2006-06-24','1209702188656','0124755555','0003','client'),('0000000004','Duangkamol','Kaewsalapoom','Kaohomkae','kh123456','kaohom@gmail.com','69/5 moo 1 Meuang Thong Pathumthani','2005-07-04','1209702155828','0555555555','0004','client'),('0000000007','Natthanun','Jansomboon','NatthanunPK','plakaow123','plakaow@gmail.com','100/1 moo 6 Lat-Krabang Bankkok','2004-07-22','1209702188777','0123456789','0007','client'),('0000000009','Miser.E','Example','AAA','BBB','Example@gmail.com','100/1 moo 6 Example Bankkok','2003-11-22','1112547854620','0254784562','0009','client'),('0000000010','Suwaphat','Torpattananan','suwaphat888','oatty5678','suwaphat888@gmail.com','98/3 moo 6 Lak Si Bankkok','2002-12-06','1209702777555','0147123658','0010','client');
/*!40000 ALTER TABLE client ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `parcel`
--

DROP TABLE IF EXISTS parcel;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE parcel (
  PID char(10) NOT NULL,
  RoomID char(4) NOT NULL,
  AID char(10) NOT NULL,
  IMG varchar(500) DEFAULT NULL,
  ParcelDate datetime DEFAULT CURRENT_TIMESTAMP,
  `Status` enum('received','unreceived') DEFAULT 'unreceived',
  PRIMARY KEY (PID),
  KEY fk_room_idx (RoomID),
  CONSTRAINT fk_parcel_room FOREIGN KEY (RoomID) REFERENCES room (RoomID) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `parcel`
--

LOCK TABLES parcel WRITE;
/*!40000 ALTER TABLE parcel DISABLE KEYS */;
INSERT INTO parcel VALUES ('1245210215','0001','A000000001','1747340736820-parcel_test.jpg','2025-05-16 03:25:36','received'),('1452144892','0007','A000000001','1747304597450-parcel_test.jpg','2025-05-15 17:23:17','received'),('3215845620','0004','A000000001','1747305564903-parcel_2_test.jpg','2025-05-15 17:39:24','unreceived');
/*!40000 ALTER TABLE parcel ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `request`
--

DROP TABLE IF EXISTS request;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE request (
  requestID int NOT NULL AUTO_INCREMENT,
  RoomID char(4) NOT NULL,
  Topic varchar(100) NOT NULL,
  `Description` varchar(500) DEFAULT NULL,
  IMG varchar(500) DEFAULT NULL,
  R_date datetime DEFAULT CURRENT_TIMESTAMP,
  `Status` enum('do','doing','done') DEFAULT 'do',
  PRIMARY KEY (requestID),
  KEY fk_req_room_idx (RoomID),
  CONSTRAINT fk_request_room FOREIGN KEY (RoomID) REFERENCES room (RoomID) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `request`
--

LOCK TABLES request WRITE;
/*!40000 ALTER TABLE request DISABLE KEYS */;
INSERT INTO request VALUES (26,'0009','TV','เสีย','1747296013352-TV_test.jpg','2025-05-15 15:00:13','done'),(27,'0001','ทีวีเสีย','ขอช่างเข้ามาซ่อมหน่อย','1747340997726-TV_test.jpg','2025-05-16 03:29:57','done');
/*!40000 ALTER TABLE request ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `room`
--

DROP TABLE IF EXISTS room;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE room (
  RoomID char(4) NOT NULL,
  `Status` enum('Unpaid','Paid','Unoccupied') DEFAULT 'Unoccupied',
  PRIMARY KEY (RoomID)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `room`
--

LOCK TABLES room WRITE;
/*!40000 ALTER TABLE room DISABLE KEYS */;
INSERT INTO room VALUES ('0001','Paid'),('0002','Unoccupied'),('0003','Unpaid'),('0004','Unpaid'),('0005','Unoccupied'),('0006','Unoccupied'),('0007','Unpaid'),('0008','Unoccupied'),('0009','Paid'),('0010','Unpaid'),('0011','Unoccupied'),('0012','Unoccupied'),('0013','Unoccupied'),('0014','Unoccupied'),('0015','Unoccupied'),('0016','Unoccupied'),('0017','Unoccupied'),('0018','Unoccupied'),('0019','Unoccupied'),('0020','Unoccupied');
/*!40000 ALTER TABLE room ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `slip`
--

DROP TABLE IF EXISTS slip;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE slip (
  SID int NOT NULL AUTO_INCREMENT,
  RoomID char(4) NOT NULL,
  IMG varchar(500) NOT NULL,
  PRIMARY KEY (SID),
  KEY fk_slip_room_idx (RoomID)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `slip`
--

LOCK TABLES slip WRITE;
/*!40000 ALTER TABLE slip DISABLE KEYS */;
INSERT INTO slip VALUES (9,'0009','1747295218891-slip_test.jpg'),(12,'0001','1747340543530-slip_test.jpg');
/*!40000 ALTER TABLE slip ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-05-16  4:32:15
