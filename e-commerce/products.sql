CREATE TABLE `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `image_url` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `products` (`name`, `price`, `image_url`) VALUES
('Cyber Helmet', 12000.00, 'images/helmet.jpg'),
('Laser Sword', 8500.00, 'images/sword.jpg'),
('Floating Drone', 15000.00, 'images/drone.jpg'),
('Robotic Arm', 25000.00, 'images/arm.jpg'),
('Holographic Projector', 18000.00, 'images/projector.jpg'),
('Fusion Core', 35000.00, 'images/core.jpg');