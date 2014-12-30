-- MySQL dump 10.13  Distrib 5.5.40, for Linux (x86_64)
--
-- Host: localhost    Database: lcs
-- ------------------------------------------------------
-- Server version	5.5.40

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `SequelizeMeta`
--

DROP TABLE IF EXISTS `SequelizeMeta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `SequelizeMeta` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `from` varchar(255) DEFAULT NULL,
  `to` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SequelizeMeta`
--

LOCK TABLES `SequelizeMeta` WRITE;
/*!40000 ALTER TABLE `SequelizeMeta` DISABLE KEYS */;
INSERT INTO `SequelizeMeta` VALUES (1,'20140906155612','20140906155612'),(2,'20140906155612','20140906160826'),(3,'20140906155612','20140913092712'),(4,'20140906155612','20140913095016'),(5,'20140906155612','20140913095838'),(6,'20140906155612','20140913101612'),(7,'20140906155612','20140930122323'),(8,'20140906155612','20140930122720');
/*!40000 ALTER TABLE `SequelizeMeta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_users`
--

DROP TABLE IF EXISTS `auth_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `auth_users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `mail` varchar(255) DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  UNIQUE KEY `id` (`id`),
  UNIQUE KEY `user` (`user`),
  UNIQUE KEY `mail` (`mail`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_users`
--

LOCK TABLES `auth_users` WRITE;
/*!40000 ALTER TABLE `auth_users` DISABLE KEYS */;
INSERT INTO `auth_users` VALUES (1,'blashadow','e406209f5bf72fdb4b95f4b08195bc08c491569af9caed1fa5c5efe77d8894ee7301289007d7475058fa37db9ff724b0263c3421d8128f82aae485dcbded42c5','blackzerogamer@gmail.com','2014-10-24 15:37:15','2014-10-24 15:37:15',NULL),(2,'black','e406209f5bf72fdb4b95f4b08195bc08c491569af9caed1fa5c5efe77d8894ee7301289007d7475058fa37db9ff724b0263c3421d8128f82aae485dcbded42c5','vlady_luis@hotmail.com','2014-12-18 19:34:34','2014-12-18 19:34:34',NULL);
/*!40000 ALTER TABLE `auth_users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `doctors`
--

DROP TABLE IF EXISTS `doctors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `doctors` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `last` varchar(255) DEFAULT NULL,
  `details` varchar(255) DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `doctors`
--

LOCK TABLES `doctors` WRITE;
/*!40000 ALTER TABLE `doctors` DISABLE KEYS */;
INSERT INTO `doctors` VALUES (1,'Juan','Perez','Detalles','2014-10-24 15:36:58','2014-10-24 15:36:58',NULL);
/*!40000 ALTER TABLE `doctors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hospital_doctors`
--

DROP TABLE IF EXISTS `hospital_doctors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hospital_doctors` (
  `hospital_id` int(11) DEFAULT NULL,
  `doctor_id` int(11) DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  KEY `hospital_id` (`hospital_id`),
  KEY `doctor_id` (`doctor_id`),
  CONSTRAINT `hospital_doctors_ibfk_1` FOREIGN KEY (`hospital_id`) REFERENCES `hospitals` (`id`),
  CONSTRAINT `hospital_doctors_ibfk_2` FOREIGN KEY (`doctor_id`) REFERENCES `doctors` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hospital_doctors`
--

LOCK TABLES `hospital_doctors` WRITE;
/*!40000 ALTER TABLE `hospital_doctors` DISABLE KEYS */;
/*!40000 ALTER TABLE `hospital_doctors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hospital_insurance`
--

DROP TABLE IF EXISTS `hospital_insurance`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hospital_insurance` (
  `hospital_id` int(11) DEFAULT NULL,
  `medical_secure_id` int(11) DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  KEY `hospital_id` (`hospital_id`),
  KEY `medical_secure_id` (`medical_secure_id`),
  CONSTRAINT `hospital_insurance_ibfk_1` FOREIGN KEY (`hospital_id`) REFERENCES `hospitals` (`id`),
  CONSTRAINT `hospital_insurance_ibfk_2` FOREIGN KEY (`medical_secure_id`) REFERENCES `medical_insurances` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hospital_insurance`
--

LOCK TABLES `hospital_insurance` WRITE;
/*!40000 ALTER TABLE `hospital_insurance` DISABLE KEYS */;
/*!40000 ALTER TABLE `hospital_insurance` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hospital_insurances`
--

DROP TABLE IF EXISTS `hospital_insurances`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hospital_insurances` (
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  `medical_insurance_id` int(11) NOT NULL DEFAULT '0',
  `hospital_id` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`medical_insurance_id`,`hospital_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hospital_insurances`
--

LOCK TABLES `hospital_insurances` WRITE;
/*!40000 ALTER TABLE `hospital_insurances` DISABLE KEYS */;
INSERT INTO `hospital_insurances` VALUES ('2014-12-29 19:47:13','2014-12-29 19:47:13',NULL,7,9);
/*!40000 ALTER TABLE `hospital_insurances` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hospital_secures`
--

DROP TABLE IF EXISTS `hospital_secures`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hospital_secures` (
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  `medical_insurance_id` int(11) NOT NULL DEFAULT '0',
  `hospital_id` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`medical_insurance_id`,`hospital_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hospital_secures`
--

LOCK TABLES `hospital_secures` WRITE;
/*!40000 ALTER TABLE `hospital_secures` DISABLE KEYS */;
/*!40000 ALTER TABLE `hospital_secures` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hospital_types`
--

DROP TABLE IF EXISTS `hospital_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hospital_types` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `details` varchar(255) DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  UNIQUE KEY `id` (`id`),
  UNIQUE KEY `name` (`name`),
  UNIQUE KEY `details` (`details`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hospital_types`
--

LOCK TABLES `hospital_types` WRITE;
/*!40000 ALTER TABLE `hospital_types` DISABLE KEYS */;
INSERT INTO `hospital_types` VALUES (1,'HOSPITAL','Hospital',NULL,NULL,NULL),(2,'CLINICA','Clinica',NULL,NULL,NULL),(3,'ATENCION_PRIMARIA','Unidad de atencion primaria',NULL,NULL,NULL);
/*!40000 ALTER TABLE `hospital_types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hospitals`
--

DROP TABLE IF EXISTS `hospitals`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hospitals` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `details` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `local_phone` varchar(255) DEFAULT NULL,
  `latitude` decimal(6,4) DEFAULT NULL,
  `longitude` decimal(6,4) DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  `hospital_type` int(11) NOT NULL,
  UNIQUE KEY `id` (`id`),
  KEY `HOSPITAL_TYPE_FK` (`hospital_type`),
  CONSTRAINT `HOSPITAL_TYPE_FK` FOREIGN KEY (`hospital_type`) REFERENCES `hospital_types` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=122 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hospitals`
--

LOCK TABLES `hospitals` WRITE;
/*!40000 ALTER TABLE `hospitals` DISABLE KEYS */;
INSERT INTO `hospitals` VALUES (1,'Hospital Moscoso puello (Updated)','Detalles','Direccion calle tal esquina tal','809-666-6666',18.5015,-69.9014,'2014-12-29 16:28:39','2014-10-24 15:30:17',NULL,1),(8,'Test name','Detalles Detalles Detalles Detalles','Direccion calle tal esquina tal','829-555-5555',19.0000,69.0000,'2014-11-14 19:18:18','2014-11-14 19:18:18','2014-12-29 14:42:37',2),(9,'Dario contreras','Hospital dario contreras!!','Direccion calle tal esquina tal','809-596-3686',18.4857,-69.8632,'2014-12-29 18:25:21','2014-11-14 19:22:43',NULL,1),(10,'nombre','detalles','Direccion calle tal esquina tal','809-555-5555',18.0000,-69.0000,'2014-11-14 19:30:57','2014-11-14 19:30:57','2014-12-29 14:43:02',1),(11,'Nombre Hospital','Detalles','Direccion calle tal esquina tal','809-380-5555',45.4545,34.3434,'2014-12-01 13:40:30','2014-12-01 13:40:30','2014-12-29 17:56:32',3),(12,'Hospital nice','details','Direccion calle tal esquina tal','809-456-3456',3.5656,23.2340,'2014-12-01 13:41:09','2014-12-01 13:41:09','2014-12-29 17:56:16',2),(13,'Hospital nice','details','Direccion calle tal esquina tal','809-456-3456',3.5656,23.2340,'2014-12-01 13:47:11','2014-12-01 13:47:11','2014-12-29 17:56:20',2),(14,'Hospital nice','details','Direccion calle tal esquina tal','809-456-3456',3.5656,23.2340,'2014-12-01 13:47:35','2014-12-01 13:47:35','2014-12-29 14:42:49',2),(15,'Plaza De La Salud','Details','Avenida Ortega Y Gasset,Santo Domingo Republic Dominicana','809-565-7477',NULL,NULL,'2014-12-18 15:01:30','2014-12-18 15:01:30',NULL,1),(16,'Policia Nacional (Hosgepol)','Details','Av,Independencia,Santo Domingo Republic Dominicana','809-533-1411',NULL,NULL,'2014-12-18 15:01:30','2014-12-18 15:01:30',NULL,1),(17,'Semma','Details','Calle Jose Joaquin Perez Esq. Santiago,Santo Domingo Republic Dominicana','809-686-1503',NULL,NULL,'2014-12-18 15:01:30','2014-12-18 15:01:30',NULL,1),(18,'Docente Padre Billini','Details','Calle Santome No. 39, Ciudad Colonial,Santo Domingo Republic Dominicana','809-333-5656',18.4711,-69.8890,'2014-12-29 17:41:33','2014-12-18 15:01:30',NULL,1),(19,'Dr. Luis Eduardo Aybar','Details','Calle Federico Velasquez No. 1, Maria Auxiliadora,Santo Domingo Republic Dominicana','809-681-2181',18.4949,-69.8880,'2014-12-18 15:01:31','2014-12-18 15:01:31',NULL,1),(20,'San Luis','Details','C/ Primera De Mayo #17 San Luis,Santo Domingo Republic Dominicana','809-222-0370',NULL,NULL,'2014-12-18 15:01:31','2014-12-18 15:01:31',NULL,1),(21,'Ramon de Lara','Details','Carretera Mella Km 16,Santo Domingo Republic Dominicana','809-688-3333',18.5304,-69.7868,'2014-12-18 15:01:31','2014-12-18 15:01:31',NULL,1),(22,'Villa Duarte','Details','Av. Ulises Heureaux Edif. 7 Apto1-1 Calero Villa Duarte,Santo Domingo Republic Dominicana','809-597-7384',NULL,NULL,'2014-12-18 15:01:31','2014-12-18 15:01:31',NULL,1),(23,'Dr Marcelino Velez Santana','Details','C/ Issabel Aguilar No. 141,Santo Domingo Republic Dominicana','809-560-6666',NULL,NULL,'2014-12-18 15:01:32','2014-12-18 15:01:32',NULL,1),(24,'Fuerza Armada','Details','Av.Ortega Y Gasete Casi Esquina Kennedy,Santo Domingo Republic Dominicana','809-541-9339',NULL,NULL,'2014-12-18 15:01:32','2014-12-18 15:01:32',NULL,1),(25,'Salvador B Gautier','Details','Alexander Fleming Esq. P Salcedo No. 10 Ensanche La Fe,Santo Domingo Republic Dominicana','809-565-3171',NULL,NULL,'2014-12-18 15:01:32','2014-12-18 15:01:32',NULL,1),(26,'Jacinto Ignacio Mañon','Details','Av. Republica De Colombia Esq Monumental, Los Peralejos,Santo Domingo Republic Dominicana','809-519-7844',NULL,NULL,'2014-12-18 15:01:32','2014-12-18 15:01:32',NULL,1),(27,'Plaza De La Salud','Details','Avenida Ortega Y Gasset,Santo Domingo Republic Dominicana','809-565-7477',NULL,NULL,'2014-12-18 15:02:13','2014-12-18 15:02:13',NULL,1),(28,'Policia Nacional (Hosgepol)','Details','Av,Independencia,Santo Domingo Republic Dominicana','809-533-1411',NULL,NULL,'2014-12-18 15:02:14','2014-12-18 15:02:14',NULL,1),(29,'Semma','Details','Calle Jose Joaquin Perez Esq. Santiago,Santo Domingo Republic Dominicana','809-686-1503',NULL,NULL,'2014-12-18 15:02:14','2014-12-18 15:02:14',NULL,1),(30,'Docente Padre Billini','Details','Calle Santome No. 39, Ciudad Colonial,Santo Domingo Republic Dominicana','809-333-5656',NULL,NULL,'2014-12-18 15:02:14','2014-12-18 15:02:14','2014-12-29 19:12:25',1),(31,'Dr. Luis Eduardo Aybar (Antiguo Morgan)','Details','Calle Federico Velasquez No. 1, Maria Auxiliadora,Santo Domingo Republic Dominicana','809-332-6666',18.4952,-69.8903,'2014-12-29 18:01:51','2014-12-18 15:02:14',NULL,1),(32,'San Luis','Details','C/ Primera De Mayo #17 San Luis,Santo Domingo Republic Dominicana','809-222-0370',NULL,NULL,'2014-12-18 15:02:14','2014-12-18 15:02:14',NULL,1),(33,'Ramon de Lara','Details','Carretera Mella Km 16,Santo Domingo Republic Dominicana','809-688-3333',18.5304,-69.7868,'2014-12-18 15:02:14','2014-12-18 15:02:14',NULL,1),(34,'Villa Duarte','Details','Av. Ulises Heureaux Edif. 7 Apto1-1 Calero Villa Duarte,Santo Domingo Republic Dominicana','809-597-7384',NULL,NULL,'2014-12-18 15:02:14','2014-12-18 15:02:14',NULL,1),(35,'Dr Marcelino Velez Santana','Details','C/ Issabel Aguilar No. 141,Santo Domingo Republic Dominicana','809-560-6666',NULL,NULL,'2014-12-18 15:02:14','2014-12-18 15:02:14',NULL,1),(36,'Fuerza Armada','Details','Av.Ortega Y Gasete Casi Esquina Kennedy,Santo Domingo Republic Dominicana','809-541-9339',NULL,NULL,'2014-12-18 15:02:14','2014-12-18 15:02:14',NULL,1),(37,'Salvador B Gautier','Details','Alexander Fleming Esq. P Salcedo No. 10 Ensanche La Fe,Santo Domingo Republic Dominicana','809-565-3171',NULL,NULL,'2014-12-18 15:02:15','2014-12-18 15:02:15',NULL,1),(38,'Jacinto Ignacio Mañon','Details','Av. Republica De Colombia Esq Monumental, Los Peralejos,Santo Domingo Republic Dominicana','809-519-7844',NULL,NULL,'2014-12-18 15:02:15','2014-12-18 15:02:15',NULL,1),(39,'Santo Socorro','Details','Calle 28, Ens. La Fe,,Santo Domingo Republic Dominicana','809-566-3322',18.4964,-69.9237,'2014-12-23 16:12:00','2014-12-18 15:02:15',NULL,1),(40,'Mata Hambre','Details','Calle Interior A # 13, Mata Hambre,Santo Domingo Republic Dominicana','809-533-3990',NULL,NULL,'2014-12-18 15:02:15','2014-12-18 15:02:15',NULL,1),(41,'Maternidad Nuestra Señora De La Altagracia','Details','Av. Pedro Enrrique Ureña No. 49,Santo Domingo Republic Dominicana','809-686-6376',NULL,NULL,'2014-12-18 15:02:15','2014-12-18 15:02:15',NULL,1),(42,'Dr Francisco E Moscoso Puello','Details','Av. Nicolas De Ovando Esq. Josefa Brea, Ens. Luperon,Santo Domingo Republic Dominicana','809-681-7828',NULL,NULL,'2014-12-18 15:02:15','2014-12-18 15:02:15',NULL,1),(43,'Instituto Contra La Ceguera Por Glaucoma','Details','Av. Nicolas De Ovando Esq. Ortega Y Gasset No. 7,Santo Domingo Republic Dominicana','809-333-4512',NULL,NULL,'2014-12-18 15:02:15','2014-12-18 15:02:15',NULL,1),(44,'Asociacion Dominicana De Rehabilitacion','Details','Calle San Francisco De Macoris Esq. Leopoldo Navarro,Santo Domingo Republic Dominicana','809-688-6444',NULL,NULL,'2014-12-18 15:02:15','2014-12-18 15:02:15',NULL,1),(45,'Instituto Ayuda Al Sordo','Details','Calle 2 No 25, El Millon.,Santo Domingo Republic Dominicana','809-537-0707',NULL,NULL,'2014-12-18 15:02:15','2014-12-18 15:02:15',NULL,1),(46,'Marcelino Velez Santana','Hospital Regional Doctor Marcelino Vélez Santana','Avenida Isabell Aguiar Nu.141 Herrera,Santo Domingo Republic Dominicana','809-560-6666',18.4731,-69.9712,'2014-12-29 18:29:51','2014-12-18 15:02:15',NULL,1),(47,'Engombe','Details','Calle Francisco Caamaño Deño, Entrando Por El Barrio Ivan Guzman,Santo Domingo Republic Dominicana','809-537-3666',NULL,NULL,'2014-12-18 15:02:16','2014-12-18 15:02:16',NULL,1),(48,'Los Alcarrizos Ii','Details','C/ Gaviota #5 Los Americanos I,Santo Domingo Republic Dominicana','809-548-1952',NULL,NULL,'2014-12-18 15:02:16','2014-12-18 15:02:16',NULL,1),(49,'Centro Cristiano De Servicios Medicos','Details','Prolongacion Duarte, Barrio Los Alcarrizos (Frente A La Zona Franca),Santo Domingo Republic Dominicana','809-545-3329',NULL,NULL,'2014-12-18 15:02:16','2014-12-18 15:02:16',NULL,1),(50,'Tenedora Xavilone, S A (Centro De Atencion Ambulatoria Alma Ata)','Details','Calle Aristides Garcia Gomez No. 10,Santo Domingo Republic Dominicana','809-338-0801',18.4753,-69.9562,'2014-12-18 15:02:16','2014-12-18 15:02:16',NULL,1),(51,'Hacienda Estrella','Details','Calle No. 13  Esq. Carretera Principal,Santo Domingo Republic Dominicana','809-240-3236',NULL,NULL,'2014-12-18 15:02:16','2014-12-18 15:02:16',NULL,1),(52,'Elvira Echavarria Vda Castillo (Guerra)','Details','Calle Carlos Manuel Pumarol,Santo Domingo Republic Dominicana','809-526-5442',NULL,NULL,'2014-12-18 15:02:16','2014-12-18 15:02:16',NULL,1),(53,'Rodolfo De La Cruz Lora','Details','Km 28 Autopista Duarte, Pedro Brand,Santo Domingo Republic Dominicana','809-559-8600',NULL,NULL,'2014-12-18 15:02:16','2014-12-18 15:02:16',NULL,1),(54,'La Victoria','Details','C/Altagracia # 1, La Victoria, Distrito Municipal,Santo Domingo Republic Dominicana','809-222-8188',NULL,NULL,'2014-12-18 15:02:16','2014-12-18 15:02:16',NULL,1),(55,'Boca Chica','Details','C/San Andres #100 Despues De La Marina,Santo Domingo Republic Dominicana','809-523-4334',NULL,NULL,'2014-12-18 15:02:16','2014-12-18 15:02:16',NULL,1),(56,'N/A','Details','REGION 0,Santo Domingo Republic Dominicana','',NULL,NULL,'2014-12-18 15:02:17','2014-12-18 15:02:17',NULL,1),(57,'N/A','Details','REGION 0,Santo Domingo Republic Dominicana','',NULL,NULL,'2014-12-18 15:02:17','2014-12-18 15:02:17',NULL,1),(58,'N/A','Details','REGION 0,Santo Domingo Republic Dominicana','',NULL,NULL,'2014-12-18 15:02:17','2014-12-18 15:02:17',NULL,1),(59,'N/A','Details','REGION 0,Santo Domingo Republic Dominicana','',NULL,NULL,'2014-12-18 15:02:17','2014-12-18 15:02:17',NULL,1),(60,'Clinica Dr. Abel González','Details','Av. Independencia  No. 101,Santo Domingo Republic Dominicana','809-682-6001',18.4685,-69.8948,'2014-12-23 16:24:50','2014-12-18 15:02:17',NULL,1),(61,'Centro De Obst. Y Ginecología','Details','Av. Independencia No.451,Santo Domingo Republic Dominicana','809-221-7100 ',18.4426,-69.9409,'2014-12-18 15:02:18','2014-12-18 15:02:18',NULL,1),(62,'Inst. Mat. San Rafael','Details','Av. Bolívar /García G,Santo Domingo Republic Dominicana','809-688-5511 ',NULL,NULL,'2014-12-18 15:02:18','2014-12-18 15:02:18',NULL,1),(63,'Gastro- Diagnóstico','Details','C/José J- Pérez - Bolivar,Santo Domingo Republic Dominicana','809-682-4825/809221-4190',NULL,NULL,'2014-12-18 15:02:18','2014-12-18 15:02:18',NULL,1),(64,'Centro Méd. Avanzada Dr. Gónzalez','Details','Abraham Lincoln No. 953,Santo Domingo Republic Dominicana','809-227-2235',18.4759,-69.9359,'2014-12-18 15:02:18','2014-12-18 15:02:18',NULL,1),(65,'Diagnóstica, S.A.','Details','C/ Lea De Castro No. 51,Santo Domingo Republic Dominicana','809-688-5260',18.4666,-69.9003,'2014-12-18 15:02:18','2014-12-18 15:02:18',NULL,1),(66,'Centro Oriental Ginec y Obst','Details','Sabana Larga No. 123,Santo Domingo Republic Dominicana','809-593-4386',18.4892,-69.8654,'2014-12-18 15:02:18','2014-12-18 15:02:18',NULL,1),(67,'Centro Méd. Dominicano','Details','Calle Luis F. Thomen 456, Santo Domingo 10149, Dominican Republic','809-531-2800',18.4558,-69.9559,'2014-12-29 17:52:36','2014-12-18 15:02:18',NULL,1),(68,'Clinica Altagracia ','Details','Sabana larga No. 96,Santo Domingo Republic Dominicana','809-699-3494',18.4892,-69.8654,'2014-12-18 15:02:19','2014-12-18 15:02:19',NULL,1),(69,'Centro Méd. Alcántara','Details','Av. Ortega Y Gassett ,Santo Domingo Republic Dominicana','809-566-2121 ',NULL,NULL,'2014-12-18 15:02:19','2014-12-18 15:02:19',NULL,1),(70,'Centro Médico Luperón','Details','C/Pedro L. Cedeño,Santo Domingo Republic Dominicana','809-684-3989',NULL,NULL,'2014-12-18 15:02:19','2014-12-18 15:02:19',NULL,1),(71,'Hospitén Santo Domingo','Details','Av. Boliva/ Tiradentes,Santo Domingo Republic Dominicana','809-541-3000',NULL,NULL,'2014-12-18 15:02:19','2014-12-18 15:02:19',NULL,1),(72,'Centro Médico Del Caribe','Details','Av. 27 Febrero,Santo Domingo Republic Dominicana','809-685-9403',18.4543,-69.9554,'2014-12-18 15:02:19','2014-12-18 15:02:19',NULL,1),(73,'Grupo Medico San Martin','Details','San Martín No. 232,Santo Domingo Republic Dominicana','809-565-1777',18.4742,-69.8978,'2014-12-18 15:02:19','2014-12-18 15:02:19',NULL,1),(74,'Clinica Dr. Rodriguez Santos','Details','C/ Bartolomé Colón ,Santo Domingo Republic Dominicana','809-333-6671',NULL,NULL,'2014-12-18 15:02:19','2014-12-18 15:02:19',NULL,1),(75,'Centro M.Universidad Central,UCE','Details','Av. Máximo Gómez No.66,Santo Domingo Republic Dominicana','809-221-0171',NULL,NULL,'2014-12-18 15:02:19','2014-12-18 15:02:19',NULL,1),(76,'C. De Otorrinolaringología y Esp','Details','Av. 27 Febrero,Santo Domingo Republic Dominicana','809-682-0151',18.4760,-69.9069,'2014-12-23 16:22:31','2014-12-18 15:02:19',NULL,1),(77,'Clinica Dr. Medrano','Details','Av. Las Plamas, Herrera,Santo Domingo Republic Dominicana','809-922-5944',NULL,NULL,'2014-12-18 15:02:19','2014-12-18 15:02:19',NULL,1),(78,'Inst. Cirugía Especializada','Details','Av. Bolivar No. 208,Santo Domingo Republic Dominicana','809-688-3155',18.4653,-69.9189,'2014-12-18 15:02:19','2014-12-18 15:02:19',NULL,1),(79,'Centro M. Corominas Pepín ','Details','C/ Alirio Paulino,Santo Domingo Republic Dominicana','809-541-1400',NULL,NULL,'2014-12-18 15:02:20','2014-12-18 15:02:20',NULL,1),(80,'Centro M. Antillano','Details','C/ Correa Y Cidrón No. 20,Santo Domingo Republic Dominicana','809-533-8445',NULL,NULL,'2014-12-18 15:02:20','2014-12-18 15:02:20',NULL,1),(81,'Centro Médico Real','Details','Av. Rómulo Betancourt,Santo Domingo Republic Dominicana','809-537-3940',18.4472,-69.9646,'2014-12-29 18:34:34','2014-12-18 15:02:20',NULL,1),(82,'Centro M. Escaño','Details','Dr. Delgado No.2,Santo Domingo Republic Dominicana','809-687-2090',18.4519,-69.9856,'2014-12-18 15:02:20','2014-12-18 15:02:20',NULL,1),(83,'Clinica Reno','Details','Santo Tomás De Aquino,Santo Domingo Republic Dominicana','809-686-7777',18.4634,-69.7312,'2014-12-18 15:02:20','2014-12-18 15:02:20',NULL,1),(84,'Centro M. Avanzada De Herrera','Details','Ant. Carretera Duarte,Santo Domingo Republic Dominicana','809-561-8005',NULL,NULL,'2014-12-18 15:02:20','2014-12-18 15:02:20',NULL,1),(85,'Centro Médico Haina','Details','C/ Sánchez No. 49, Haina,Santo Domingo Republic Dominicana','809-237-3000',NULL,NULL,'2014-12-18 15:02:20','2014-12-18 15:02:20',NULL,1),(86,'Centro Policlinico Nacional','Details','Guayubín Olivo No. 1,Santo Domingo Republic Dominicana','809-788-2323',NULL,NULL,'2014-12-18 15:02:20','2014-12-18 15:02:20',NULL,1),(87,'Centro Médico Moderno','Details','Charles Summer Esq. J. López,Santo Domingo Republic Dominicana','809-548-3131',18.4760,-69.9575,'2014-12-29 18:30:40','2014-12-18 15:02:20',NULL,1),(88,'Centro M. Vista del Jardin','Details','C/ Rep. de Colombia/ Los Rios,Santo Domingo Republic Dominicana','809-563-9923 ',18.5009,-69.9590,'2014-12-18 15:02:20','2014-12-18 15:02:20',NULL,1),(89,'Centro Quirurgíco Esculapio','Details','C/ Mnl. Castillo No. 20 / Ga.,Santo Domingo Republic Dominicana','809-686-7290',NULL,NULL,'2014-12-18 15:02:20','2014-12-18 15:02:20',NULL,1),(90,'Clinica Independencia','Details','Av Independencia No. 301,Santo Domingo Republic Dominicana','809-533-2775 ',18.4483,-69.9323,'2014-12-29 17:50:31','2014-12-18 15:02:20',NULL,1),(91,'Clinica Dra. Evangelina Rodguez (Pro-Familía)','Details','Av. Nicolás de Ovando No. 16,Santo Domingo Republic Dominicana','809-684-3389',18.5000,-69.9117,'2014-12-18 15:02:20','2014-12-18 15:02:20',NULL,1),(92,'C. M. Integral Santana Guzmán','Details','Av. Sabana Larga No. 30, ,Santo Domingo Republic Dominicana','809-788-1003',18.4892,-69.8654,'2014-12-18 15:02:21','2014-12-18 15:02:21',NULL,1),(93,'Und. Rehabilitación Funcional','Details','C/ Núñez Doguez No. 2 La Julia,Santo Domingo Republic Dominicana','809-535-2744',NULL,NULL,'2014-12-18 15:02:21','2014-12-18 15:02:21',NULL,1),(94,'clinica Abreu','Details','Av Independencia No. 301,Santo Domingo Republic Dominicana','809-688-4411',18.4671,-69.8951,'2014-12-23 16:28:08','2014-12-18 15:02:21',NULL,1),(95,'clinica integral 2','Centro Medico Integral II','Carretera Mella ,Santo Domingo Republic Dominicana','809-788-6336',18.4800,-69.8780,'2014-12-29 18:31:50','2014-12-18 15:02:21',NULL,1),(96,'Centro Medico Maria Dolores','Details','AV sabana Larga,Santo Domingo Republic Dominicana','809-547-8601',18.4892,-69.8654,'2014-12-18 15:02:22','2014-12-18 15:02:22',NULL,1),(97,'Centro Medco Universal','Details','Club rotarios no. 58 Ensanche Ozama,Santo Domingo Republic Dominicana','809-594-6161',NULL,NULL,'2014-12-18 15:02:22','2014-12-18 15:02:22',NULL,1),(98,'Centro Medico Juan Carlos','Details','Av. 25 de febrero no.144 las Americas,Santo Domingo Republic Dominicana','809-699-1111',18.4827,-69.8638,'2014-12-18 15:02:22','2014-12-18 15:02:22',NULL,1),(99,'Clinica Pappy Fernnadez','Details','AV.Pdrelivio Cedeño no.39 casi esq. Duarte,Santo Domingo Republic Dominicana','809-681-4877',NULL,NULL,'2014-12-18 15:02:22','2014-12-18 15:02:22',NULL,1),(103,'CEDIMAT','es el primer centro en República Dominicana de Diagnóstico y Medicina Avanzada, con tecnología de punta, médicos, enfermeras y técnicos.','Calle Pepillo Salcedo, Santo Domingo, Dominican Republic','809-565-9989',18.4888,-69.9229,'2014-12-29 16:36:25','2014-12-29 16:01:33',NULL,2),(104,'Centro de Otorinolaringologia y Especialidades','Centro de Otorinolaringologia y Especialidades','Expreso 27 de Febrero, Santo Domingo 10202, Dominican Republic','809-682-0151',18.4763,-69.9061,'2014-12-29 16:50:11','2014-12-29 16:50:11',NULL,1),(105,'Clinica Gomez Patiño','Clinica Gomez Patiño','Ens Independencia, Santo Domingo de Guzman, Dominican Republic','8095554444',18.4616,-69.9066,'2014-12-29 16:52:41','2014-12-29 16:52:41',NULL,2),(106,'Grupo de Salud Gazcue','Grupo de Salud Gazcue','Avenida Bolívar, Santo Domingo, Dominican Republic','809-687-7202',18.4670,-69.9116,'2014-12-29 17:43:43','2014-12-29 17:43:43',NULL,2),(107,'Clinica Dr. Betances','Clinica Dr. Betances','Avenida Bolívar, Santo Domingo, Dominican Republic','809-688-6641',18.4667,-69.9127,'2014-12-29 17:44:30','2014-12-29 17:44:30',NULL,2),(108,'Hospital Docente Semma','Hospital Docente Semma','J J Pérez 152 en la ciudad de Santo Domingo, República Dominicana','809-686-1705',18.4676,-69.9019,'2014-12-29 17:45:48','2014-12-29 17:45:48',NULL,1),(109,'Robert Read Cabral para niños','Robert Read Cabral para niños','Avenida Abraham Lincoln 2, Santo Domingo 10101, Dominican Republic','809-533-1111',18.4525,-69.9239,'2014-12-29 17:47:45','2014-12-29 17:47:45',NULL,1),(110,'Centro de Medicina Avanzada Dr. Abel Gonzalez','Centro de Medicina Avanzada Dr. Abel Gonzalez','Avenida Abraham Lincoln, Santo Domingo, Dominican Republic','809-540-2278',18.4744,-69.9347,'2014-12-29 17:51:43','2014-12-29 17:51:43',NULL,2),(111,'Hospital Traumatologico Dr. Ney Arias Lora','Hospital Traumatologico Dr. Ney Arias Lora','Avenida Charles de Gaulle, Dominican Republic','809-590-3838',18.5475,-69.8840,'2014-12-29 17:59:11','2014-12-29 17:59:11',NULL,1),(112,'Instituto Dermatologico','Instituto Dermatologico','San Antonio, Santo Domingo, Dominican Republic',NULL,18.4943,-69.8900,'2014-12-29 18:04:23','2014-12-29 18:04:23',NULL,1),(113,'Instituto Oncológico \"Dr. Heriberto Pieter\"','Instituto Oncológico \"Dr. Heriberto Pieter\"','Avenida Correa Y Cidron, Santo Domingo, Dominican Republic','829-462-2692',18.4605,-69.9142,'2014-12-29 18:15:24','2014-12-29 18:05:26',NULL,1),(114,'Instituto Nacional del Cáncer Rosa Emilia Tavarez','Instituto Nacional del Cáncer Rosa Emilia Tavarez','Av Doctor Bernardo Correa y Cidrón, Santo Domingo 10105, Dominican Republic',NULL,18.4584,-69.9196,'2014-12-29 18:21:00','2014-12-29 18:21:00',NULL,1),(115,'Centro Medico Dominico-Cubano','Centro Medico Dominico-Cubano','Calle Doctor Piñeyro, Santo Domingo, Dominican Republic','809-221-5501',18.4592,-69.9133,'2014-12-29 18:24:12','2014-12-29 18:24:12',NULL,1),(116,'Hospital Central de las Fuerzas Armadas','Hospital Central de las Fuerzas Armadas','Calle Dr. Heriberto Pieter, Santo Domingo, Dominican Republic',NULL,18.4806,-69.9211,'2014-12-29 18:26:07','2014-12-29 18:26:07',NULL,1),(117,'Clínica Rodriguez Santos','Clínica Rodriguez Santos','Calle Bartolomé Colón, Santo Domingo, Dominican Republic','809-333-6671',18.4806,-69.8997,'2014-12-29 18:26:53','2014-12-29 18:26:53',NULL,2),(118,'Centro Medico Alcantara & Gonzalez','Centro Medico Alcantara & Gonzalez','Avenida Ortega y Gasset, Santo Domingo, Dominican Republic','809-566-2121',18.4920,-69.9217,'2014-12-29 18:27:34','2014-12-29 18:27:34',NULL,1),(119,'Hospiten','Hospiten','Avenida Alma Mater, Santo Domingo, Dominican Republic','809-541-3000',18.4651,-69.9212,'2014-12-29 18:28:46','2014-12-29 18:28:46',NULL,2),(120,'Centro Medico Universal','Centro Medico Universal','Calle Club Rotario, Santo Domingo, Dominican Republic',NULL,18.4860,-69.8682,'2014-12-29 18:35:27','2014-12-29 18:35:27',NULL,1),(121,'Centro Policlínico Nacional','Centro Policlínico Nacional','Calle Guayubín Olivo 1, Santo Domingo Este 11517, Dominican Republic','809-788-2323',18.5116,-69.8499,'2014-12-29 18:36:17','2014-12-29 18:36:17',NULL,1);
/*!40000 ALTER TABLE `hospitals` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `medical_insurances`
--

DROP TABLE IF EXISTS `medical_insurances`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `medical_insurances` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `details` varchar(255) DEFAULT NULL,
  `local_phone` varchar(255) DEFAULT NULL,
  `logo_picture` varchar(255) DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `medical_insurances`
--

LOCK TABLES `medical_insurances` WRITE;
/*!40000 ALTER TABLE `medical_insurances` DISABLE KEYS */;
INSERT INTO `medical_insurances` VALUES (1,'ARS Humano','Detalles ars humano',NULL,NULL,'2014-10-24 14:56:03','2014-10-24 14:56:03',NULL),(2,'ARS Palic','Detalles',NULL,NULL,'2014-10-24 14:59:00','2014-10-24 14:59:00','2014-12-29 16:38:20'),(3,'ARS Palic','Detalles',NULL,NULL,'2014-10-24 15:01:46','2014-10-24 15:01:46','2014-12-29 16:38:26'),(4,'ARS Palic','Detalles','809-555-5555',NULL,'2014-10-24 15:02:29','2014-10-24 15:02:29',NULL),(5,'Seguro medico','Detalles','809-380-0000',NULL,'2014-12-12 15:11:53','2014-12-12 15:11:53',NULL),(6,'Universal','Seguro Universal','8095554444',NULL,'2014-12-29 16:38:45','2014-12-29 16:38:45',NULL),(7,'SeNaSa','Seguro Nacional de Salud, Avenida 27 de Febrero, Santo Domingo, Dominican Republic.','809-732-3821',NULL,'2014-12-29 19:13:32','2014-12-29 19:13:32',NULL);
/*!40000 ALTER TABLE `medical_insurances` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2014-12-30  8:35:32
