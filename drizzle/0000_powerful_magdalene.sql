CREATE TABLE `brands` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`title` text NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updateAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `brands_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `techBrands` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`title` text NOT NULL,
	`image` text NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updateAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `techBrands_id` PRIMARY KEY(`id`)
);
