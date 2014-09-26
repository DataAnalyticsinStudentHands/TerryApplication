# ************************************************************
# Sequel Pro SQL dump
# Version 4096
#
# http://www.sequelpro.com/
# http://code.google.com/p/sequel-pro/
#
# Host: 127.0.0.1 (MySQL 5.6.19)
# Database: terry2015
# Generation Time: 2014-09-26 21:33:59 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table acl_class
# ------------------------------------------------------------

CREATE TABLE `acl_class` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `class` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_uk_2` (`class`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table acl_entry
# ------------------------------------------------------------

CREATE TABLE `acl_entry` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `acl_object_identity` bigint(20) NOT NULL,
  `ace_order` int(11) NOT NULL,
  `sid` bigint(20) NOT NULL,
  `mask` int(11) NOT NULL,
  `granting` tinyint(1) NOT NULL,
  `audit_success` tinyint(1) NOT NULL,
  `audit_failure` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_uk_4` (`acl_object_identity`,`ace_order`),
  KEY `foreign_fk_5` (`sid`),
  CONSTRAINT `foreign_fk_4` FOREIGN KEY (`acl_object_identity`) REFERENCES `acl_object_identity` (`id`) ON DELETE CASCADE,
  CONSTRAINT `foreign_fk_5` FOREIGN KEY (`sid`) REFERENCES `acl_sid` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table acl_object_identity
# ------------------------------------------------------------

CREATE TABLE `acl_object_identity` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `object_id_class` bigint(20) NOT NULL,
  `object_id_identity` bigint(20) NOT NULL,
  `parent_object` bigint(20) DEFAULT NULL,
  `owner_sid` bigint(20) DEFAULT NULL,
  `entries_inheriting` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_uk_3` (`object_id_class`,`object_id_identity`),
  KEY `foreign_fk_1` (`parent_object`),
  KEY `foreign_fk_3` (`owner_sid`),
  CONSTRAINT `foreign_fk_1` FOREIGN KEY (`parent_object`) REFERENCES `acl_object_identity` (`id`),
  CONSTRAINT `foreign_fk_2` FOREIGN KEY (`object_id_class`) REFERENCES `acl_class` (`id`),
  CONSTRAINT `foreign_fk_3` FOREIGN KEY (`owner_sid`) REFERENCES `acl_sid` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table acl_sid
# ------------------------------------------------------------

CREATE TABLE `acl_sid` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `principal` tinyint(1) NOT NULL,
  `sid` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_uk_1` (`sid`,`principal`),
  CONSTRAINT `acl_sid_ibfk_1` FOREIGN KEY (`sid`) REFERENCES `user_data` (`username`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table activity
# ------------------------------------------------------------

CREATE TABLE `activity` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `activity` char(40) DEFAULT NULL,
  `position` varchar(100) NOT NULL DEFAULT '',
  `description` varchar(100) NOT NULL DEFAULT '',
  `year` varchar(400) DEFAULT NULL,
  `application_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `application_id` (`application_id`),
  CONSTRAINT `activity_application` FOREIGN KEY (`application_id`) REFERENCES `applications` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table applications
# ------------------------------------------------------------

CREATE TABLE `applications` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(200) NOT NULL DEFAULT '',
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
  `citizen` varchar(11) DEFAULT NULL,
  `permanent_resident` varchar(11) DEFAULT NULL,
  `permanent_resident_card` varchar(11) DEFAULT NULL,
  `texas_resident` varchar(40) DEFAULT NULL,
  `birthplace` varchar(40) DEFAULT NULL,
  `ethnic_background` varchar(40) DEFAULT NULL,
  `anticipated_major` varchar(40) DEFAULT NULL,
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
  `national_merit` varchar(100) NOT NULL,
  `national_merit_date` date DEFAULT NULL,
  `national_achievement` varchar(100) NOT NULL,
  `national_achievement_date` date DEFAULT NULL,
  `national_hispanic` varchar(100) NOT NULL,
  `national_hispanic_date` date DEFAULT NULL,
  `first_graduate` tinyint(11) DEFAULT NULL,
  `why_apply` varchar(400) DEFAULT NULL,
  `why_major` varchar(400) DEFAULT NULL,
  `educational_plans` varchar(400) DEFAULT NULL,
  `life_goals` varchar(400) DEFAULT NULL,
  `marital_status` char(11) DEFAULT NULL,
  `marital_status_parents` char(11) DEFAULT NULL,
  `total_annual_income` int(11) DEFAULT NULL,
  `present_partner` varchar(100) DEFAULT NULL,
  `father_occupation` varchar(100) DEFAULT NULL,
  `stepparent_occupation` varchar(100) DEFAULT NULL,
  `father_employer` varchar(100) DEFAULT NULL,
  `stepparent_employer` varchar(100) DEFAULT NULL,
  `father_total_income` int(11) DEFAULT NULL,
  `stepparent_total_income` int(11) DEFAULT NULL,
  `father_age` int(11) DEFAULT NULL,
  `stepparent_age` int(11) DEFAULT NULL,
  `father_level_education` varchar(40) DEFAULT NULL,
  `stepparent_level_education` varchar(40) DEFAULT NULL,
  `mother_occupation` varchar(100) DEFAULT NULL,
  `guardian_occupation` varchar(100) DEFAULT NULL,
  `mother_employer` varchar(100) DEFAULT NULL,
  `guardian_employer` varchar(100) DEFAULT NULL,
  `mother_total_income` int(11) DEFAULT NULL,
  `guardian_total_income` int(11) DEFAULT NULL,
  `mother_age` int(11) DEFAULT NULL,
  `guardian_age` int(11) DEFAULT NULL,
  `mother_level_education` varchar(40) DEFAULT NULL,
  `guardian_level_education` varchar(40) DEFAULT NULL,
  `income_same` varchar(11) DEFAULT NULL,
  `increased` int(11) DEFAULT NULL,
  `decreased` int(11) DEFAULT NULL,
  `family_attending_college` int(11) DEFAULT NULL,
  `financial_assistance` varchar(11) DEFAULT NULL,
  `assistance_type` varchar(40) DEFAULT NULL,
  `assistance_amount` int(11) DEFAULT NULL,
  `funds_saved_you` int(11) DEFAULT NULL,
  `funds_saved_others` int(11) DEFAULT NULL,
  `total_savings` int(11) DEFAULT NULL,
  `total_investments` int(11) DEFAULT NULL,
  `net_value` int(11) DEFAULT NULL,
  `adjusted_cross_income` int(11) DEFAULT NULL,
  `projected_support` int(11) DEFAULT NULL,
  `description_special_circumstances` varchar(400) DEFAULT NULL,
  `texas_tomorrow_fund` varchar(400) DEFAULT NULL,
  `sibling_terry` varchar(400) DEFAULT NULL,
  `department_scholarship` varchar(400) DEFAULT NULL,
  `status` varchar(40) NOT NULL DEFAULT 'in progress',
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table authorities
# ------------------------------------------------------------

CREATE TABLE `authorities` (
  `username` varchar(50) NOT NULL,
  `authority` varchar(50) NOT NULL,
  UNIQUE KEY `ix_auth_username` (`username`,`authority`),
  CONSTRAINT `fk_authorities_users` FOREIGN KEY (`username`) REFERENCES `login` (`username`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table award
# ------------------------------------------------------------

CREATE TABLE `award` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `award` char(100) DEFAULT NULL,
  `description` varchar(100) NOT NULL DEFAULT '',
  `level` varchar(100) NOT NULL DEFAULT '',
  `year` varchar(400) DEFAULT NULL,
  `application_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `application_id` (`application_id`),
  CONSTRAINT `award_application` FOREIGN KEY (`application_id`) REFERENCES `applications` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table child
# ------------------------------------------------------------

CREATE TABLE `child` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` char(11) DEFAULT NULL,
  `age` int(2) NOT NULL,
  `relationship` varchar(100) NOT NULL DEFAULT '',
  `school` varchar(100) NOT NULL,
  `year` varchar(100) NOT NULL,
  `self_supporting` tinyint(11) DEFAULT NULL,
  `application_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `application_id` (`application_id`),
  CONSTRAINT `child_application` FOREIGN KEY (`application_id`) REFERENCES `applications` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table coursework
# ------------------------------------------------------------

CREATE TABLE `coursework` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `level` char(11) DEFAULT NULL,
  `name` varchar(100) NOT NULL DEFAULT '',
  `type` varchar(100) NOT NULL DEFAULT '',
  `credit_hours` int(11) NOT NULL,
  `final_grade` varchar(10) NOT NULL DEFAULT '',
  `application_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `application_id` (`application_id`),
  CONSTRAINT `coursework_application` FOREIGN KEY (`application_id`) REFERENCES `applications` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table employment
# ------------------------------------------------------------

CREATE TABLE `employment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `position` char(100) DEFAULT NULL,
  `employer` varchar(100) NOT NULL DEFAULT '',
  `hours` int(11) NOT NULL,
  `date_from` date DEFAULT NULL,
  `date_to` date DEFAULT NULL,
  `application_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `application_id` (`application_id`),
  CONSTRAINT `employment_application` FOREIGN KEY (`application_id`) REFERENCES `applications` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table group_data
# ------------------------------------------------------------

CREATE TABLE `group_data` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(40) NOT NULL,
  `description` varchar(200) DEFAULT NULL,
  `creation_timestamp` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table login
# ------------------------------------------------------------

CREATE TABLE `login` (
  `username` varchar(50) NOT NULL,
  `password` varchar(128) NOT NULL,
  `enabled` tinyint(1) NOT NULL DEFAULT '1',
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  CONSTRAINT `login->user_data (id)` FOREIGN KEY (`id`) REFERENCES `user_data` (`id`) ON DELETE CASCADE,
  CONSTRAINT `login->user_data (username)` FOREIGN KEY (`username`) REFERENCES `user_data` (`username`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table scholarship
# ------------------------------------------------------------

CREATE TABLE `scholarship` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `applied_received` tinyint(10) DEFAULT NULL,
  `name` char(11) DEFAULT NULL,
  `duration` varchar(100) NOT NULL DEFAULT '',
  `amount` int(10) DEFAULT NULL,
  `application_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `application_id` (`application_id`),
  CONSTRAINT `scholarship_application` FOREIGN KEY (`application_id`) REFERENCES `applications` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table university
# ------------------------------------------------------------

CREATE TABLE `university` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` char(50) DEFAULT NULL,
  `rank` int(2) NOT NULL,
  `application_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `application_id` (`application_id`),
  CONSTRAINT `university_application` FOREIGN KEY (`application_id`) REFERENCES `applications` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table user_data
# ------------------------------------------------------------

CREATE TABLE `user_data` (
  `username` varchar(50) NOT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `firstName` varchar(30) NOT NULL,
  `lastName` varchar(30) NOT NULL,
  `city` varchar(20) DEFAULT NULL,
  `homePhone` varchar(10) DEFAULT NULL,
  `cellPhone` varchar(10) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `picture` varchar(200) DEFAULT NULL,
  `insertion_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Dump of table volunteer
# ------------------------------------------------------------

CREATE TABLE `volunteer` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `place` varchar(100) DEFAULT NULL,
  `description` varchar(100) NOT NULL DEFAULT '',
  `hours_total` int(11) NOT NULL,
  `hours_week` int(11) NOT NULL,
  `date_from` date DEFAULT NULL,
  `date_to` date DEFAULT NULL,
  `application_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `application_id` (`application_id`),
  CONSTRAINT `volunteer_application` FOREIGN KEY (`application_id`) REFERENCES `applications` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;




/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
