USE home_db;

SET
  PERSIST local_infile = 1;

-- Step 1: Create the `user` table
DROP TABLE IF EXISTS `user`;

CREATE TABLE
  `user` (
    `username` varchar(100) NOT NULL,
    `email` varchar(100) DEFAULT NULL,
    PRIMARY KEY (`username`)
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

-- Step 2: Create the `home` table
DROP TABLE IF EXISTS `home`;

CREATE TABLE
  `home` (
    `street_address` varchar(255) NOT NULL,
    `state` varchar(50) DEFAULT NULL,
    `zip` varchar(10) DEFAULT NULL,
    `sqft` float DEFAULT NULL,
    `beds` int DEFAULT NULL,
    `baths` int DEFAULT NULL,
    `list_price` float DEFAULT NULL,
    PRIMARY KEY (`street_address`)
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

-- Step 3: Create the `user_home` join table
DROP TABLE IF EXISTS `user_home_new`;

CREATE TABLE
  `user_home_new` (
    `username` varchar(100) NOT NULL,
    `street_address` varchar(255) NOT NULL,
    FOREIGN KEY (`username`) REFERENCES `user` (`username`),
    FOREIGN KEY (`street_address`) REFERENCES `home` (`street_address`),
    PRIMARY KEY (`username`, `street_address`)
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

-- Insert unique users into the `user` table
INSERT INTO
  `user` (`username`, `email`)
SELECT DISTINCT
  `username`,
  `email`
FROM
  `user_home`
WHERE
  `username` IS NOT NULL;

-- Insert unique homes into the `home` table
INSERT INTO
  `home` (
    `street_address`,
    `state`,
    `zip`,
    `sqft`,
    `beds`,
    `baths`,
    `list_price`
  )
SELECT DISTINCT
  `street_address`,
  `state`,
  `zip`,
  `sqft`,
  `beds`,
  `baths`,
  `list_price`
FROM
  `user_home`
WHERE
  `street_address` IS NOT NULL;

-- Insert relationships into the `user_home_new` table
INSERT INTO
  `user_home_new` (`username`, `street_address`)
SELECT
  `username`,
  `street_address`
FROM
  `user_home`
WHERE
  `username` IS NOT NULL
  AND `street_address` IS NOT NULL;

-- Drop the old `user_home` table if no longer needed
DROP TABLE IF EXISTS `user_home`;