-- phpMyAdmin SQL Dump
-- version 3.3.9
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Apr 30, 2012 at 12:40 PM
-- Server version: 5.5.8
-- PHP Version: 5.3.5

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `yii_quizz`
--

-- --------------------------------------------------------

--
-- Table structure for table `answers`
--

CREATE TABLE IF NOT EXISTS `answers` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `SessionID` int(11) DEFAULT '0',
  `TestID` int(11) DEFAULT '0',
  `QuesID` int(11) DEFAULT '0',
  `A1` tinyint(1) NOT NULL DEFAULT '0',
  `A2` tinyint(1) NOT NULL DEFAULT '0',
  `A3` tinyint(1) NOT NULL DEFAULT '0',
  `A4` tinyint(1) NOT NULL DEFAULT '0',
  `A5` tinyint(1) NOT NULL DEFAULT '0',
  `A6` tinyint(1) NOT NULL DEFAULT '0',
  `AnswerText` text,
  `SortOrder` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`ID`),
  KEY `QuesID` (`QuesID`),
  KEY `SessionID` (`SessionID`),
  KEY `TestID` (`TestID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

--
-- Dumping data for table `answers`
--


-- --------------------------------------------------------

--
-- Table structure for table `custommessages`
--

CREATE TABLE IF NOT EXISTS `custommessages` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `ReportID` int(11) NOT NULL DEFAULT '0',
  `Description` varchar(255) NOT NULL DEFAULT '',
  `MinPoints` int(11) NOT NULL DEFAULT '0',
  `MaxPoints` int(11) NOT NULL DEFAULT '0',
  `Message` text NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `ReportID` (`ReportID`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `custommessages`
--

INSERT INTO `custommessages` (`ID`, `ReportID`, `Description`, `MinPoints`, `MaxPoints`, `Message`) VALUES
(1, 1, '[Default 1]', 0, 3, 'You scored between 0 and 3 points'),
(2, 1, '[Default 2]', 4, 5, 'You scored between 4 and 5 points');

-- --------------------------------------------------------

--
-- Table structure for table `emailtemplates`
--

CREATE TABLE IF NOT EXISTS `emailtemplates` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(255) NOT NULL DEFAULT '',
  `Description` text NOT NULL,
  `FromEmail` varchar(255) NOT NULL DEFAULT '',
  `Subject` varchar(255) NOT NULL DEFAULT '',
  `Text` text NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `emailtemplates`
--

INSERT INTO `emailtemplates` (`ID`, `Name`, `Description`, `FromEmail`, `Subject`, `Text`) VALUES
(1, '[Default]', 'Default Template', 'results@webtester.us', '%TEST_NAME% results for %FIRST_NAME% %LAST_NAME%', 'Results for %FIRST_NAME% %LAST_NAME%\r\n\r\nTest: %TEST_NAME%\r\nDate: %TEST_DATE%\r\nTotal Correct: %NUMBER_CORRECT%\r\nTotal Possible: %NUMBER_POSSIBLE%\r\nScore:  %PERCENTAGE%\r\n\r\nYou have %PASSFAIL% this test.\r\n\r\nThank you,\r\nThe WebTester Team\r\nhttp://www.webtester.us');

-- --------------------------------------------------------

--
-- Table structure for table `preferences`
--

CREATE TABLE IF NOT EXISTS `preferences` (
  `AllowBrowse` tinyint(1) NOT NULL DEFAULT '0',
  `WelcomeMessage` text NOT NULL,
  `mimetex` varchar(255) NOT NULL DEFAULT '',
  `notes` varchar(255) NOT NULL DEFAULT ''
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `preferences`
--

INSERT INTO `preferences` (`AllowBrowse`, `WelcomeMessage`, `mimetex`, `notes`) VALUES
(1, '<p><span style="font-size: 14pt; font-family: arial;">Welcome to WebTester.  Select a test to begin.</span></p>\r\n', '/mimetex.cgi', 'Notes');

-- --------------------------------------------------------

--
-- Table structure for table `questions`
--

CREATE TABLE IF NOT EXISTS `questions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `test_id` varchar(50) DEFAULT NULL,
  `question_text` text,
  `question_pic` varchar(255) DEFAULT NULL,
  `pic_mov` varchar(255) DEFAULT NULL,
  `pic_mov_width` varchar(50) DEFAULT NULL,
  `pic_mov_height` varchar(50) DEFAULT NULL,
  `answer1` text,
  `answer_pic1` varchar(255) DEFAULT NULL,
  `a1` tinyint(4) DEFAULT '0',
  `a1_clicks` int(11) NOT NULL DEFAULT '0',
  `answer2` text,
  `answer_ic2` varchar(255) DEFAULT NULL,
  `a2` tinyint(4) DEFAULT '0',
  `a2_clicks` int(11) NOT NULL DEFAULT '0',
  `answer3` text,
  `answer_pic3` varchar(255) DEFAULT NULL,
  `a3` tinyint(4) DEFAULT '0',
  `a3_clicks` int(11) NOT NULL DEFAULT '0',
  `answer4` text,
  `answerPic4` varchar(255) DEFAULT NULL,
  `a4` tinyint(4) DEFAULT '0',
  `a4_clicks` int(11) NOT NULL DEFAULT '0',
  `answer5` text,
  `answer_pic5` varchar(255) DEFAULT NULL,
  `A5` tinyint(4) DEFAULT '0',
  `A5Clicks` int(11) NOT NULL DEFAULT '0',
  `Answer6` text,
  `AnswerPic6` varchar(255) DEFAULT NULL,
  `a6` tinyint(4) DEFAULT '0',
  `a6_clicks` int(11) NOT NULL DEFAULT '0',
  `answer_text` text,
  `sort_order` smallint(6) NOT NULL DEFAULT '100',
  `points` int(11) NOT NULL DEFAULT '1',
  `correct` int(11) NOT NULL DEFAULT '0',
  `incorrect` int(11) NOT NULL DEFAULT '0',
  `explanation` text,
  `subject_id` int(11) NOT NULL DEFAULT '1',
  `answer_aud1` varchar(255) DEFAULT NULL,
  `answer_aud2` varchar(255) DEFAULT NULL,
  `answer_ud3` varchar(255) DEFAULT NULL,
  `answer_aud4` varchar(255) DEFAULT NULL,
  `answer_ud5` varchar(255) DEFAULT NULL,
  `answer_aud6` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `TestID` (`test_id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=7 ;

--
-- Dumping data for table `questions`
--

INSERT INTO `questions` (`id`, `test_id`, `question_text`, `question_pic`, `pic_mov`, `pic_mov_width`, `pic_mov_height`, `answer1`, `answer_pic1`, `a1`, `a1_clicks`, `answer2`, `answer_ic2`, `a2`, `a2_clicks`, `answer3`, `answer_pic3`, `a3`, `a3_clicks`, `answer4`, `answerPic4`, `a4`, `a4_clicks`, `answer5`, `answer_pic5`, `A5`, `A5Clicks`, `Answer6`, `AnswerPic6`, `a6`, `a6_clicks`, `answer_text`, `sort_order`, `points`, `correct`, `incorrect`, `explanation`, `subject_id`, `answer_aud1`, `answer_aud2`, `answer_ud3`, `answer_aud4`, `answer_ud5`, `answer_aud6`) VALUES
(1, '1', 'What is 2+2?', NULL, NULL, NULL, NULL, '2', NULL, 0, 0, '3', NULL, 0, 0, '4', NULL, 1, 0, '5', NULL, 0, 0, '6', NULL, 0, 0, NULL, NULL, 0, 0, NULL, 2, 1, 0, 0, '', 1, NULL, NULL, NULL, NULL, NULL, NULL),
(3, '1', 'Solve:<br><br><img src="/mimetex.cgi?%5Csqrt%7B9%7D" align="middle" /><br>', NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, NULL, NULL, 0, 0, NULL, NULL, 0, 0, NULL, NULL, 0, 0, NULL, NULL, 0, 0, NULL, NULL, 0, 0, '3', 3, 1, 0, 0, '', 1, NULL, NULL, NULL, NULL, NULL, NULL),
(4, '1', 'What does this image say?', 'test.gif', 'picture', NULL, NULL, NULL, NULL, 0, 0, NULL, NULL, 0, 0, NULL, NULL, 0, 0, NULL, NULL, 0, 0, NULL, NULL, 0, 0, NULL, NULL, 0, 0, 'Test', 1, 1, 0, 0, '', 1, NULL, NULL, NULL, NULL, NULL, NULL),
(5, '1', 'What colors does a CRT use to make all the other colors?', NULL, NULL, NULL, NULL, 'Yellow', NULL, 0, 0, 'Red', NULL, 1, 0, 'Orange', NULL, 0, 0, 'Blue', NULL, 1, 0, 'Green', NULL, 1, 0, 'White', NULL, 0, 0, NULL, 4, 1, 0, 0, '', 1, NULL, NULL, NULL, NULL, NULL, NULL),
(6, '1', 'Which picture is a camera?', NULL, NULL, NULL, NULL, 'A', 'test.gif', 0, 0, 'B', 'test-fuj-s602-t.jpg', 1, 0, NULL, NULL, 0, 0, NULL, NULL, 0, 0, NULL, NULL, 0, 0, NULL, NULL, 0, 0, NULL, 5, 1, 0, 0, '', 1, NULL, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `reporttemplates`
--

CREATE TABLE IF NOT EXISTS `reporttemplates` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(255) NOT NULL DEFAULT '',
  `Description` text NOT NULL,
  `Text` text NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `reporttemplates`
--

INSERT INTO `reporttemplates` (`ID`, `Name`, `Description`, `Text`) VALUES
(1, '[Default]', 'Default Template', '<span style="font-family: arial;">Results for %FIRST_NAME% %LAST_NAME%</span><br style="font-family: arial;">\r\n<br style="font-family: arial;"><span style="font-family: arial;">\r\nTest: %TEST_NAME%</span><br style="font-family: arial;"><span style="font-family: arial;">\r\nDate: %TEST_DATE%</span><br style="font-family: arial;">\r\n<br style="font-family: arial;"><span style="font-family: arial;">\r\nTotal Correct: %NUMBER_CORRECT%</span><br style="font-family: arial;"><span style="font-family: arial;">\r\nTotal Possible: %NUMBER_POSSIBLE%</span><br style="font-family: arial;"><span style="font-family: arial;">\r\nScore:  %PERCENTAGE%</span><br style="font-family: arial;">\r\n<br style="font-family: arial;"><span style="font-family: arial;">\r\nYou have %PASSFAIL% this test.</span><br>\r\n');

-- --------------------------------------------------------

--
-- Table structure for table `results`
--

CREATE TABLE IF NOT EXISTS `results` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `LastName` varchar(255) DEFAULT NULL,
  `FirstName` varchar(255) DEFAULT NULL,
  `Notes` varchar(255) DEFAULT NULL,
  `TestID` varchar(255) DEFAULT NULL,
  `TestName` varchar(255) DEFAULT NULL,
  `NumCorrect` int(11) DEFAULT '0',
  `NumPossible` int(11) DEFAULT '0',
  `Score` int(11) DEFAULT '0',
  `Pass` tinyint(4) DEFAULT '0',
  `IPAddress` varchar(50) DEFAULT NULL,
  `StartTime` varchar(50) DEFAULT NULL,
  `EndTime` varchar(50) DEFAULT NULL,
  `TotalTime` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `NumCorrect` (`NumCorrect`),
  KEY `NumPossible` (`NumPossible`),
  KEY `TestID` (`TestID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

--
-- Dumping data for table `results`
--


-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE IF NOT EXISTS `sessions` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `IP` varchar(50) DEFAULT NULL,
  `SessionID` int(11) DEFAULT NULL,
  `TestID` int(11) DEFAULT NULL,
  `review` tinyint(4) DEFAULT '0',
  `finished` tinyint(4) DEFAULT '0',
  `takingTest` tinyint(4) DEFAULT '0',
  `currentQuestion` int(11) DEFAULT NULL,
  `questionNumber` int(11) DEFAULT NULL,
  `numQuestions` int(11) DEFAULT NULL,
  `firstQuestion` int(11) DEFAULT NULL,
  `lastQuestion` int(11) DEFAULT NULL,
  `LastName` varchar(255) DEFAULT NULL,
  `FirstName` varchar(255) DEFAULT NULL,
  `Email` varchar(255) NOT NULL DEFAULT '',
  `AltEmail` varchar(255) NOT NULL DEFAULT '',
  `Notes` varchar(255) DEFAULT NULL,
  `StartTime` varchar(50) DEFAULT NULL,
  `MaxTime` varchar(50) DEFAULT NULL,
  `TestName` varchar(255) DEFAULT NULL,
  `TestImage` varchar(255) DEFAULT NULL,
  `Stored` tinyint(4) DEFAULT '0',
  `QuestionOrder` text,
  `AllowQuit` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`ID`),
  KEY `numQuestions` (`numQuestions`),
  KEY `SessionID` (`SessionID`),
  KEY `TestID` (`TestID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

--
-- Dumping data for table `sessions`
--


-- --------------------------------------------------------

--
-- Table structure for table `subjects`
--

CREATE TABLE IF NOT EXISTS `subjects` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL DEFAULT '',
  `description` text NOT NULL,
  `correct` int(11) NOT NULL,
  `incorrect` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `subjects`
--

INSERT INTO `subjects` (`id`, `name`, `description`, `correct`, `incorrect`) VALUES
(1, '[Default]', 'This is the default subject', 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `tests`
--

CREATE TABLE IF NOT EXISTS `tests` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `test_name` varchar(255) NOT NULL DEFAULT 'No Name',
  `subject` int(255) NOT NULL DEFAULT '1',
  `enabled` tinyint(1) NOT NULL DEFAULT '0',
  `require_login` tinyint(1) NOT NULL DEFAULT '0',
  `passing_score` int(11) NOT NULL DEFAULT '60',
  `test_picture` varchar(255) DEFAULT NULL,
  `random` tinyint(1) NOT NULL DEFAULT '0',
  `creator` varchar(255) NOT NULL DEFAULT '',
  `directions` text,
  `limit_time` tinyint(1) NOT NULL DEFAULT '0',
  `time_limit_h` char(2) NOT NULL DEFAULT '00',
  `time_limit_m` char(2) NOT NULL DEFAULT '00',
  `email_instructor` int(11) NOT NULL DEFAULT '0',
  `email_users` int(11) NOT NULL DEFAULT '0',
  `email_template` int(11) NOT NULL DEFAULT '1',
  `report_template` int(11) NOT NULL DEFAULT '1',
  `auto_session` tinyint(1) NOT NULL DEFAULT '0',
  `question_limit` int(11) NOT NULL DEFAULT '0',
  `max_attempts` int(11) NOT NULL DEFAULT '0',
  `allow_quit` tinyint(1) NOT NULL DEFAULT '0',
  `browseable` tinyint(1) NOT NULL DEFAULT '1',
  `alt_email` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `tests`
--

INSERT INTO `tests` (`id`, `test_name`, `subject`, `enabled`, `require_login`, `passing_score`, `test_picture`, `random`, `creator`, `directions`, `limit_time`, `time_limit_h`, `time_limit_m`, `email_instructor`, `email_users`, `email_template`, `report_template`, `auto_session`, `question_limit`, `max_attempts`, `allow_quit`, `browseable`, `alt_email`) VALUES
(1, 'Sample Test', 1, 1, 0, 60, '', 1, 'admin', '<span style="font-family: Arial;">This is the sample test.</span><br style="font-family: Arial;"><br style="font-family: Arial;"><span style="font-family: Arial;">You can put your own instructions in this area.</span><br>', 1, '0', '1', 0, 0, 1, 1, 1, 0, 0, 0, 1, 0);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `salt` varchar(100) NOT NULL,
  `location` varchar(255) DEFAULT NULL,
  `firstname` varchar(255) NOT NULL DEFAULT '',
  `lastname` varchar(255) NOT NULL DEFAULT '',
  `email` varchar(255) NOT NULL DEFAULT '',
  `admin` tinyint(1) NOT NULL DEFAULT '0',
  `instructor` tinyint(1) NOT NULL DEFAULT '0',
  `limited` tinyint(1) NOT NULL DEFAULT '0',
  `limited_subjects` varchar(255) NOT NULL DEFAULT '',
  `attempts` varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `salt`, `location`, `firstname`, `lastname`, `email`, `admin`, `instructor`, `limited`, `limited_subjects`, `attempts`) VALUES
(1, 'admin', '21232f297a57a5a743894a0e4a801fc3', '', 'Default Admin', 'Admin', 'User', 'changeme@nowhere.com', 1, 1, 0, '', '');
