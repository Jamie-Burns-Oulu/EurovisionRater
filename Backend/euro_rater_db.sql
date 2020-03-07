-- MySQL Script generated by MySQL Workbench
-- Sat Mar  7 03:50:34 2020
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema eurorater
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema eurorater
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `eurorater` DEFAULT CHARACTER SET utf8 ;
USE `eurorater` ;

-- -----------------------------------------------------
-- Table `eurorater`.`countries`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `eurorater`.`countries` (
  `idCountries` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NULL DEFAULT NULL,
  `flag` VARCHAR(255) NULL DEFAULT NULL,
  `runningOrder` INT(11) NULL DEFAULT NULL,
  PRIMARY KEY (`idCountries`))
ENGINE = InnoDB
AUTO_INCREMENT = 4
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `eurorater`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `eurorater`.`users` (
  `idUsers` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`idUsers`),
  UNIQUE INDEX `idUsers_UNIQUE` (`idUsers` ASC) VISIBLE,
  UNIQUE INDEX `nameUsers_UNIQUE` (`name` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 21
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `eurorater`.`ratings`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `eurorater`.`ratings` (
  `idratings` INT(11) NOT NULL AUTO_INCREMENT,
  `overall` INT(11) NULL DEFAULT NULL,
  `song` INT(11) NULL DEFAULT NULL,
  `performance` INT(11) NULL DEFAULT NULL,
  `comment` VARCHAR(255) NULL DEFAULT NULL,
  `user_id` INT(11) NULL DEFAULT NULL,
  `country_id` INT(11) NULL DEFAULT NULL,
  PRIMARY KEY (`idratings`),
  INDEX `ratings_users_fk_idx` (`user_id` ASC) VISIBLE,
  INDEX `ratings_countries_idx` (`country_id` ASC) VISIBLE,
  CONSTRAINT `ratings_countries`
    FOREIGN KEY (`country_id`)
    REFERENCES `eurorater`.`countries` (`idCountries`)
    ON UPDATE CASCADE,
  CONSTRAINT `ratings_users_fk`
    FOREIGN KEY (`user_id`)
    REFERENCES `eurorater`.`users` (`idUsers`)
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 90
DEFAULT CHARACTER SET = utf8;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
