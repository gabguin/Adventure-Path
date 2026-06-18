-- MySQL dump 10.13  Distrib 8.0.46, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: mydb
-- ------------------------------------------------------
-- Server version	8.0.46

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
-- Table structure for table `pokemon`
--

DROP TABLE IF EXISTS `pokemon`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pokemon` (
  `pokemon_id` int NOT NULL,
  `species_name` varchar(45) NOT NULL,
  `base_hp` int NOT NULL,
  `base_attack` int NOT NULL,
  `base_defense` int NOT NULL,
  `base_speed` int NOT NULL,
  `primary_type_id` int NOT NULL,
  `secondary_type_id` int DEFAULT NULL,
  PRIMARY KEY (`pokemon_id`),
  KEY `primary_type_id_idx` (`primary_type_id`),
  KEY `secondary_type_id_idx` (`secondary_type_id`),
  CONSTRAINT `primary_type_id` FOREIGN KEY (`primary_type_id`) REFERENCES `type` (`type_id`),
  CONSTRAINT `secondary_type_id` FOREIGN KEY (`secondary_type_id`) REFERENCES `type` (`type_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pokemon`
--

LOCK TABLES `pokemon` WRITE;
/*!40000 ALTER TABLE `pokemon` DISABLE KEYS */;
INSERT INTO `pokemon` VALUES (1,'Bulbasaur',45,49,49,45,4,8),(2,'Ivysaur',60,62,63,60,4,8),(3,'Venusaur',80,82,83,80,4,8),(4,'Charmander',39,52,43,65,2,NULL),(5,'Charmeleon',58,64,58,80,2,NULL),(6,'Charizard',78,84,78,100,2,10),(7,'Squirtle',44,48,65,43,3,NULL),(8,'Wartortle',59,63,80,58,3,NULL),(9,'Blastoise',79,83,100,78,3,NULL),(10,'Caterpie',45,30,35,45,12,NULL),(11,'Metapod',50,20,55,30,12,NULL),(12,'Butterfree',60,45,50,70,12,10),(13,'Weedle',40,35,30,50,12,8),(14,'Kakuna',45,25,50,35,12,8),(15,'Beedrill',65,90,40,75,12,8),(16,'Pidgey',40,45,40,56,1,10),(17,'Pidgeotto',63,60,55,71,1,10),(18,'Pidgeot',83,80,75,101,1,10),(19,'Rattata',30,56,35,72,1,NULL),(20,'Raticate',55,81,60,97,1,NULL),(21,'Spearow',40,60,30,70,1,10),(22,'Fearow',65,90,65,100,1,10),(23,'Ekans',35,60,44,55,8,NULL),(24,'Arbok',60,95,69,80,8,NULL),(25,'Pikachu',35,55,40,90,5,NULL),(26,'Raichu',60,90,55,110,5,NULL),(27,'Sandshrew',50,75,85,40,9,NULL),(28,'Sandslash',75,100,110,65,9,NULL),(29,'Nidoran♀',55,47,52,41,8,NULL),(30,'Nidorina',70,62,67,56,8,NULL),(31,'Nidoqueen',90,92,87,76,8,9),(32,'Nidoran♂',46,57,40,50,8,NULL),(33,'Nidorino',61,72,57,65,8,NULL),(34,'Nidoking',81,102,77,85,8,9),(35,'Clefairy',70,45,48,35,1,NULL),(36,'Clefable',95,70,73,60,1,NULL),(37,'Vulpix',38,41,40,65,2,NULL),(38,'Ninetales',73,76,75,100,2,NULL),(39,'Jigglypuff',115,45,20,20,1,NULL),(40,'Wigglytuff',140,70,45,45,1,NULL),(41,'Zubat',40,45,35,55,8,10),(42,'Golbat',75,80,70,90,8,10),(43,'Oddish',45,50,55,30,4,8),(44,'Gloom',60,65,70,40,4,8),(45,'Vileplume',75,80,85,50,4,8),(46,'Paras',35,70,55,25,12,4),(47,'Parasect',60,95,80,30,12,4),(48,'Venonat',60,55,50,45,12,8),(49,'Venomoth',70,65,60,90,12,8),(50,'Diglett',10,55,25,95,9,NULL),(51,'Dugtrio',35,100,50,120,9,NULL),(52,'Meowth',40,45,35,90,1,NULL),(53,'Persian',65,70,60,115,1,NULL),(54,'Psyduck',50,52,48,55,3,NULL),(55,'Golduck',80,82,78,85,3,NULL),(56,'Mankey',40,80,35,70,7,NULL),(57,'Primeape',65,105,60,95,7,NULL),(58,'Growlithe',55,70,45,60,2,NULL),(59,'Arcanine',90,110,80,95,2,NULL),(60,'Poliwag',40,50,40,90,3,NULL),(61,'Poliwhirl',65,65,65,90,3,NULL),(62,'Poliwrath',90,95,95,70,3,7),(63,'Abra',25,20,15,90,11,NULL),(64,'Kadabra',40,35,30,105,11,NULL),(65,'Alakazam',55,50,45,120,11,NULL),(66,'Machop',70,80,50,35,7,NULL),(67,'Machoke',80,100,70,45,7,NULL),(68,'Machamp',90,130,80,55,7,NULL),(69,'Bellsprout',50,75,35,40,4,8),(70,'Weepinbell',65,90,50,55,4,8),(71,'Victreebel',80,105,65,70,4,8),(72,'Tentacool',40,40,35,70,3,8),(73,'Tentacruel',80,70,65,100,3,8),(74,'Geodude',40,80,100,20,13,9),(75,'Graveler',55,95,115,35,13,9),(76,'Golem',80,120,130,45,13,9),(77,'Ponyta',50,85,55,90,2,NULL),(78,'Rapidash',65,100,70,105,2,NULL),(79,'Slowpoke',90,65,65,15,3,11),(80,'Slowbro',95,75,110,30,3,11),(81,'Magnemite',25,35,70,45,5,NULL),(82,'Magneton',50,60,95,70,5,NULL),(83,'Farfetch\'d',52,90,55,60,1,10),(84,'Doduo',35,85,45,75,1,10),(85,'Dodrio',60,110,70,110,1,10),(86,'Seel',65,45,55,45,3,NULL),(87,'Dewgong',90,70,80,70,3,6),(88,'Grimer',80,80,50,25,8,NULL),(89,'Muk',105,105,75,50,8,NULL),(90,'Shellder',30,65,100,40,3,NULL),(91,'Cloyster',50,95,180,70,3,6),(92,'Gastly',30,35,30,80,14,8),(93,'Haunter',45,50,45,95,14,8),(94,'Gengar',60,65,60,110,14,8),(95,'Onix',35,45,160,70,13,9),(96,'Drowzee',60,48,45,42,11,NULL),(97,'Hypno',85,73,70,67,11,NULL),(98,'Krabby',30,105,90,50,3,NULL),(99,'Kingler',55,130,115,75,3,NULL),(100,'Voltorb',40,30,50,100,5,NULL),(101,'Electrode',60,50,70,150,5,NULL),(102,'Exeggcute',60,40,80,40,4,11),(103,'Exeggutor',95,95,85,55,4,11),(104,'Cubone',50,50,95,35,9,NULL),(105,'Marowak',60,80,110,45,9,NULL),(106,'Hitmonlee',50,120,53,87,7,NULL),(107,'Hitmonchan',50,105,79,76,7,NULL),(108,'Lickitung',90,55,75,30,1,NULL),(109,'Koffing',40,65,95,35,8,NULL),(110,'Weezing',65,90,120,60,8,NULL),(111,'Rhyhorn',80,85,95,25,9,13),(112,'Rhydon',105,130,120,40,9,13),(113,'Chansey',250,5,5,50,1,NULL),(114,'Tangela',65,55,115,60,4,NULL),(115,'Kangaskhan',105,95,80,90,1,NULL),(116,'Horsea',30,40,70,60,3,NULL),(117,'Seadra',55,65,95,85,3,NULL),(118,'Goldeen',45,67,60,63,3,NULL),(119,'Seaking',80,92,65,68,3,NULL),(120,'Staryu',30,45,55,85,3,NULL),(121,'Starmie',60,75,85,115,3,11),(122,'Mr. Mime',40,45,65,90,11,NULL),(123,'Scyther',70,110,80,105,12,10),(124,'Jynx',65,50,35,95,6,11),(125,'Electabuzz',65,83,57,105,5,NULL),(126,'Magmar',65,95,57,93,2,NULL),(127,'Pinsir',65,125,100,85,12,NULL),(128,'Tauros',75,100,95,110,1,NULL),(129,'Magikarp',20,10,55,80,3,NULL),(130,'Gyarados',95,125,79,81,3,10),(131,'Lapras',130,85,80,60,3,6),(132,'Ditto',48,48,48,48,1,NULL),(133,'Eevee',55,55,50,55,1,NULL),(134,'Vaporeon',130,65,60,65,3,NULL),(135,'Jolteon',65,65,60,130,5,NULL),(136,'Flareon',65,130,60,65,2,NULL),(137,'Porygon',65,60,70,40,1,NULL),(138,'Omanyte',35,40,100,35,3,13),(139,'Omastar',70,60,125,55,3,13),(140,'Kabuto',30,80,90,55,3,13),(141,'Kabutops',60,115,105,80,3,13),(142,'Aerodactyl',80,105,65,130,13,10),(143,'Snorlax',160,110,65,30,1,NULL),(144,'Articuno',90,85,100,85,6,10),(145,'Zapdos',90,90,85,100,5,10),(146,'Moltres',90,100,90,90,2,10),(147,'Dratini',41,64,45,50,15,NULL),(148,'Dragonair',61,84,65,70,15,NULL),(149,'Dragonite',91,134,95,80,15,10),(150,'Mewtwo',106,110,90,130,11,NULL),(151,'Mew',100,100,100,100,11,NULL);
/*!40000 ALTER TABLE `pokemon` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `team`
--

DROP TABLE IF EXISTS `team`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `team` (
  `team_id` int NOT NULL,
  `trainer_id` int DEFAULT NULL,
  `team_name` varchar(45) NOT NULL,
  PRIMARY KEY (`team_id`),
  KEY `trainer_idx` (`trainer_id`),
  CONSTRAINT `trainer_id` FOREIGN KEY (`trainer_id`) REFERENCES `trainer` (`trainer_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `team`
--

LOCK TABLES `team` WRITE;
/*!40000 ALTER TABLE `team` DISABLE KEYS */;
/*!40000 ALTER TABLE `team` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `teammember`
--

DROP TABLE IF EXISTS `teammember`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `teammember` (
  `team_member_id` int NOT NULL,
  `team_id` int DEFAULT NULL,
  `pokemon_id` int DEFAULT NULL,
  `member_nickname` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`team_member_id`),
  KEY `team_id_idx` (`team_id`),
  KEY `pokemon_id_idx` (`pokemon_id`),
  CONSTRAINT `pokemon_id` FOREIGN KEY (`pokemon_id`) REFERENCES `pokemon` (`pokemon_id`),
  CONSTRAINT `team_id` FOREIGN KEY (`team_id`) REFERENCES `team` (`team_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teammember`
--

LOCK TABLES `teammember` WRITE;
/*!40000 ALTER TABLE `teammember` DISABLE KEYS */;
/*!40000 ALTER TABLE `teammember` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `trainer`
--

DROP TABLE IF EXISTS `trainer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `trainer` (
  `trainer_id` int NOT NULL,
  `username` varchar(45) NOT NULL,
  PRIMARY KEY (`trainer_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trainer`
--

LOCK TABLES `trainer` WRITE;
/*!40000 ALTER TABLE `trainer` DISABLE KEYS */;
/*!40000 ALTER TABLE `trainer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `type`
--

DROP TABLE IF EXISTS `type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `type` (
  `type_id` int NOT NULL,
  `type_name` varchar(45) NOT NULL,
  PRIMARY KEY (`type_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `type`
--

LOCK TABLES `type` WRITE;
/*!40000 ALTER TABLE `type` DISABLE KEYS */;
INSERT INTO `type` VALUES (1,'Normal'),(2,'Fire'),(3,'Water'),(4,'Grass'),(5,'Electric'),(6,'Ice'),(7,'Fighting'),(8,'Poison'),(9,'Ground'),(10,'Flying'),(11,'Psychic'),(12,'Bug'),(13,'Rock'),(14,'Ghost'),(15,'Dragon');
/*!40000 ALTER TABLE `type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `typechart`
--

DROP TABLE IF EXISTS `typechart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `typechart` (
  `attacker_type_id` int NOT NULL,
  `defender_type_id` int NOT NULL,
  `damageMultiplier` float NOT NULL,
  PRIMARY KEY (`defender_type_id`,`attacker_type_id`),
  KEY `attacker_type_id_idx` (`attacker_type_id`),
  KEY `defender_type_id_idx` (`defender_type_id`),
  CONSTRAINT `attacker_type_id` FOREIGN KEY (`attacker_type_id`) REFERENCES `type` (`type_id`),
  CONSTRAINT `defender_type_id` FOREIGN KEY (`defender_type_id`) REFERENCES `type` (`type_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `typechart`
--

LOCK TABLES `typechart` WRITE;
/*!40000 ALTER TABLE `typechart` DISABLE KEYS */;
INSERT INTO `typechart` VALUES (1,1,1),(2,1,1),(3,1,1),(4,1,1),(5,1,1),(6,1,1),(7,1,2),(8,1,1),(9,1,1),(10,1,1),(11,1,1),(12,1,1),(13,1,1),(14,1,0),(15,1,1),(1,2,1),(2,2,0.5),(3,2,2),(4,2,0.5),(5,2,1),(6,2,0.5),(7,2,1),(8,2,1),(9,2,2),(10,2,1),(11,2,1),(12,2,0.5),(13,2,2),(14,2,1),(15,2,1),(1,3,1),(2,3,0.5),(3,3,0.5),(4,3,2),(5,3,2),(6,3,0.5),(7,3,1),(8,3,1),(9,3,1),(10,3,1),(11,3,1),(12,3,1),(13,3,1),(14,3,1),(15,3,1),(1,4,1),(2,4,2),(3,4,0.5),(4,4,0.5),(5,4,0.5),(6,4,2),(7,4,1),(8,4,2),(9,4,0.5),(10,4,2),(11,4,1),(12,4,2),(13,4,1),(14,4,1),(15,4,1),(1,5,1),(2,5,1),(3,5,1),(4,5,1),(5,5,0.5),(6,5,1),(7,5,1),(8,5,1),(9,5,2),(10,5,0.5),(11,5,1),(12,5,1),(13,5,1),(14,5,1),(15,5,1),(1,6,1),(2,6,2),(3,6,1),(4,6,1),(5,6,1),(6,6,0.5),(7,6,2),(8,6,1),(9,6,1),(10,6,1),(11,6,1),(12,6,1),(13,6,2),(14,6,1),(15,6,1),(1,7,1),(2,7,1),(3,7,1),(4,7,1),(5,7,1),(6,7,1),(7,7,1),(8,7,1),(9,7,1),(10,7,2),(11,7,2),(12,7,0.5),(13,7,0.5),(14,7,1),(15,7,1),(1,8,1),(2,8,1),(3,8,1),(4,8,0.5),(5,8,1),(6,8,1),(7,8,0.5),(8,8,0.5),(9,8,2),(10,8,1),(11,8,2),(12,8,2),(13,8,1),(14,8,1),(15,8,1),(1,9,1),(2,9,1),(3,9,2),(4,9,2),(5,9,0),(6,9,2),(7,9,1),(8,9,0.5),(9,9,1),(10,9,1),(11,9,1),(12,9,1),(13,9,0.5),(14,9,1),(15,9,1),(1,10,1),(2,10,1),(3,10,1),(4,10,0.5),(5,10,2),(6,10,2),(7,10,0.5),(8,10,1),(9,10,0),(10,10,1),(11,10,1),(12,10,0.5),(13,10,2),(14,10,1),(15,10,1),(1,11,1),(2,11,1),(3,11,1),(4,11,1),(5,11,1),(6,11,1),(7,11,0.5),(8,11,1),(9,11,1),(10,11,1),(11,11,0.5),(12,11,2),(13,11,1),(14,11,0),(15,11,1),(1,12,1),(2,12,2),(3,12,1),(4,12,0.5),(5,12,1),(6,12,1),(7,12,0.5),(8,12,2),(9,12,0.5),(10,12,2),(11,12,1),(12,12,1),(13,12,2),(14,12,1),(15,12,1),(1,13,0.5),(2,13,0.5),(3,13,2),(4,13,2),(5,13,1),(6,13,1),(7,13,2),(8,13,0.5),(9,13,2),(10,13,0.5),(11,13,1),(12,13,1),(13,13,1),(14,13,1),(15,13,1),(1,14,0),(2,14,1),(3,14,1),(4,14,1),(5,14,1),(6,14,1),(7,14,0),(8,14,0.5),(9,14,1),(10,14,1),(11,14,1),(12,14,0.5),(13,14,1),(14,14,2),(15,14,1),(1,15,1),(2,15,0.5),(3,15,0.5),(4,15,0.5),(5,15,0.5),(6,15,2),(7,15,1),(8,15,1),(9,15,1),(10,15,1),(11,15,1),(12,15,1),(13,15,1),(14,15,1),(15,15,2);
/*!40000 ALTER TABLE `typechart` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-05-30  3:17:27
