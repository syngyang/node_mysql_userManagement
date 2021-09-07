CREATE TABLE `usermanagement`.`user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(45) NULL,
  `last_name` VARCHAR(45) NULL,
  `email` VARCHAR(45) NULL,
  `phone` VARCHAR(45) NULL,
  `comment` LONGTEXT NULL,
  `status` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
COMMENT = 'User Management System – Nodejs, Express, MySQL & Express-Handlebars /RaddyTheBrand';

