CREATE TABLE `access_token` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`email` varchar(255) NOT NULL,
	`token` varchar(255) NOT NULL,
	`used` boolean DEFAULT false,
	`created` timestamp DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT `access_token_id` PRIMARY KEY(`id`),
	CONSTRAINT `access_token_token_unique` UNIQUE(`token`)
);
