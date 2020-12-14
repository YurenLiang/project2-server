DROP DATABASE IF EXISTS tracker;
DROP USER IF EXISTS tracker_user@localhost;

CREATE DATABASE tracker CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER tracker_user@localhost IDENTIFIED WITH mysql_native_password BY '@HOPE9les2LEE5slim$CHANCE';
GRANT ALL PRIVILEGES ON tracker.* TO tracker_user@localhost;

