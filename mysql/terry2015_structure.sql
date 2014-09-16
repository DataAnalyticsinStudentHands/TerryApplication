# ************************************************************
# Sequel Pro SQL dump
# Version 4096
#
# http://www.sequelpro.com/
# http://code.google.com/p/sequel-pro/
#
# Host: 127.0.0.1 (MySQL 5.6.19)
# Database: terry2015
# Generation Time: 2014-09-16 18:12:50 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table applications
# ------------------------------------------------------------

DROP TABLE IF EXISTS `applications`;

CREATE TABLE `applications` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(40) NOT NULL,
  `document_folder` varchar(200) DEFAULT NULL,
  `creation_timestamp` datetime DEFAULT CURRENT_TIMESTAMP,
  `first_name` varchar(40) NOT NULL DEFAULT '',
  `last_name` varchar(40) NOT NULL DEFAULT '',
  `uh_id` int(11) NOT NULL,
  `middle_name` varchar(40) DEFAULT '',
  `preferred_name` varchar(40) DEFAULT '',
  `ssn` varchar(40) DEFAULT '',
  `permanent_address` varchar(40) DEFAULT '',
  `city` varchar(40) DEFAULT '',
  `state` varchar(40) DEFAULT '',
  `dob` date DEFAULT NULL,
  `zip_code` int(11) DEFAULT NULL,
  `county` varchar(40) DEFAULT '',
  `home_phone` varchar(40) DEFAULT '',
  `alt_cell_phone` varchar(40) DEFAULT '',
  `gender` varchar(11) DEFAULT NULL,
  `email` varchar(40) DEFAULT NULL,
  `citizen` tinyint(11) DEFAULT NULL,
  `permanent_resident` tinyint(11) DEFAULT NULL,
  `permenent_resident_card` varchar(11) DEFAULT NULL,
  `texas_resident` varchar(40) DEFAULT NULL,
  `birthplace` varchar(40) DEFAULT NULL,
  `ethnic_background` varchar(40) DEFAULT NULL,
  `anticapted_major` varchar(40) DEFAULT NULL,
  `highschool_name` varchar(40) DEFAULT NULL,
  `highschool_city` varchar(40) DEFAULT NULL,
  `highschool_councelor` varchar(40) DEFAULT NULL,
  `highschool_phone` varchar(40) DEFAULT NULL,
  `highschool_councelor_email` varchar(40) DEFAULT NULL,
  `highschool_gpa` float DEFAULT NULL,
  `highschool_scale` float DEFAULT NULL,
  `highschool_graduation_date` date DEFAULT NULL,
  `highschool_rank` int(4) DEFAULT NULL,
  `highschool_rank_out` int(4) DEFAULT NULL,
  `highschool_rank_tied` int(4) DEFAULT NULL,
  `psat_verbal` float DEFAULT NULL,
  `psat_math` float DEFAULT NULL,
  `psat_writing` float DEFAULT NULL,
  `psat_selection` float DEFAULT NULL,
  `psat_date` date DEFAULT NULL,
  `sat_reading` float DEFAULT NULL,
  `sat_math` float DEFAULT NULL,
  `sat_writing` float DEFAULT NULL,
  `sat_composite` float DEFAULT NULL,
  `sat_date` date DEFAULT NULL,
  `act_composite` float DEFAULT NULL,
  `act_date` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;




/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
