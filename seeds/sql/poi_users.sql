-- phpMyAdmin SQL Dump
-- version 3.5.6
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Feb 02, 2017 at 09:46 PM
-- Server version: 5.0.96
-- PHP Version: 5.2.14


--
-- Database: `jdordoy`
--

-- --------------------------------------------------------

--
-- Table structure for table `poi_users`
--

CREATE TABLE IF NOT EXISTS `poi_users` (
  `id` int(11) NOT NULL auto_increment,
  `username` varchar(255) default NULL,
  `password` varchar(255) default NULL,
  `isadmin` tinyint(4) default '0',
  PRIMARY KEY  (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=5 ;

--
-- Dumping data for table `poi_users`
--

INSERT INTO `poi_users` (`id`, `username`, `password`, `isadmin`) VALUES
(1, 'tim', 'tim123', 0),
(2, 'kate', 'kate123', 0),
(3, 'visithampshire', 'vh123', 0),
(4, 'admin', 'admin123', 1);

