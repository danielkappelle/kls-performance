CREATE TABLE `aerodrome` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`icao_code` varchar(4) NOT NULL,
	`name` varchar(100),
	`elevation` float,
	CONSTRAINT `aerodrome_id` PRIMARY KEY(`id`),
	CONSTRAINT `aerodrome_icao_code_unique` UNIQUE(`icao_code`)
);
--> statement-breakpoint
CREATE TABLE `airframe` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`registration` varchar(10) NOT NULL,
	`type` varchar(10),
	`perf_take_off` varchar(1000),
	CONSTRAINT `airframe_id` PRIMARY KEY(`id`),
	CONSTRAINT `airframe_registration_unique` UNIQUE(`registration`)
);
--> statement-breakpoint
CREATE TABLE `runway` (
	`id` bigint unsigned AUTO_INCREMENT NOT NULL,
	`code` varchar(3),
	`airportId` bigint unsigned,
	`direction` float,
	`surface_type` enum('asphalt','grass'),
	`slope` float,
	`tora` float,
	`toda` float,
	`lda` float,
	CONSTRAINT `runway_id` PRIMARY KEY(`id`)
);
