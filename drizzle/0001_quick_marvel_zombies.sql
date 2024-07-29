CREATE TABLE `articles` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` text NOT NULL,
	`category` text NOT NULL,
	`description` text NOT NULL,
	`latestDevice` text,
	`brands` text,
	`deviceName` text,
	`showInNews` text,
	`image` text NOT NULL,
	`content` json,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updateAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `articles_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `category` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` text NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updateAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `category_id` PRIMARY KEY(`id`),
	CONSTRAINT `category_title_unique` UNIQUE(`title`)
);
--> statement-breakpoint
CREATE TABLE `mobile_articles` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` text NOT NULL,
	`market_status` text NOT NULL,
	`release_date` text NOT NULL,
	`key_specifications` json NOT NULL,
	`brands` text NOT NULL,
	`image` json NOT NULL,
	`display_image` text NOT NULL,
	`physicalSpecification` json,
	`network` json,
	`display` json,
	`processor` json,
	`memory` json,
	`mainCamera` json,
	`selfieCamera` json,
	`os` json,
	`connectivity` json,
	`features` json,
	`battery` json,
	`details` json,
	`prices` json,
	`expert_view` json,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `mobile_articles_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `session` (
	`sessionToken` text NOT NULL,
	`userId` text NOT NULL,
	`expires` timestamp NOT NULL,
	CONSTRAINT `session_sessionToken` PRIMARY KEY(`sessionToken`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` text NOT NULL,
	`fullName` text NOT NULL,
	`email` text NOT NULL,
	`password` text NOT NULL,
	`role` text NOT NULL,
	`authProviderId` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `users_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `verificationToken` (
	`identifier` text NOT NULL,
	`token` text NOT NULL,
	`expires` timestamp NOT NULL,
	CONSTRAINT `verificationToken_identifier_token_pk` PRIMARY KEY(`identifier`,`token`)
);
--> statement-breakpoint
ALTER TABLE `brands` MODIFY COLUMN `id` int AUTO_INCREMENT NOT NULL;--> statement-breakpoint
ALTER TABLE `techBrands` MODIFY COLUMN `id` int AUTO_INCREMENT NOT NULL;--> statement-breakpoint
ALTER TABLE `session` ADD CONSTRAINT `session_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;