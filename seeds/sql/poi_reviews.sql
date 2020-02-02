-- phpMyAdmin SQL Dump
-- version 3.5.6
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Feb 02, 2017 at 09:46 PM
-- Server version: 5.0.96
-- PHP Version: 5.2.14

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `jdordoy`
--

-- --------------------------------------------------------

--
-- Table structure for table `poi_reviews`
--

CREATE TABLE IF NOT EXISTS `poi_reviews` (
  `id` int(11) NOT NULL auto_increment,
  `poi_id` int(11) default NULL,
  `review` text,
  PRIMARY KEY  (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=104 ;

--
-- Dumping data for table `poi_reviews`
--

INSERT INTO `poi_reviews` (`id`, `poi_id`, `review`) VALUES
(87, 740, 'a review\r\n'),
(88, 740, 'review\r\n'),
(89, 739, 'a nice pub '),
(90, 739, 'a great pub infact'),
(91, 742, 'a nice pub'),
(92, 742, 'One More'),
(93, 739, 'a nice nice place'),
(94, 739, 'boi'),
(95, 739, 'a review'),
(96, 1084, 'nice village. not really a city'),
(97, 739, 'a nice place'),
(98, 739, 'a nice place'),
(99, 2, 'boi'),
(100, 740, 'a nice pub to be fair'),
(101, 739, 'a nice pub'),
(102, 739, 'a nice place to have a few'),
(103, 121212, 'nice');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;