DROP DATABASE IF EXISTS FILMS;

CREATE DATABASE FILMS;
USE FILMS;

CREATE TABLE GENRE(
genID INT AUTO_INCREMENT,
genName varchar(40) NOT NULL,
PRIMARY KEY (genID)
);

CREATE TABLE FILM(
filmID int AUTO_INCREMENT,
filmName varchar(80) NOT NULL,
filmDirector varchar(60) NOT NULL,
genID int NOT NULL,
filmDescription varchar(200) NULL,
filmType int NOT NULL,
filmYear char(4) NOT NULL,
filmReview varchar(500) NULL,
filmScore int NULL,
PRIMARY KEY (filmID),
FOREIGN KEY (genID) REFERENCES GENRE(genID)
);

CREATE TABLE FAVORITES(
favID INT AUTO_INCREMENT,
filmID int NOT NULL,
PRIMARY KEY (favID),
FOREIGN KEY(filmID) REFERENCES FILM(filmID) 
);

