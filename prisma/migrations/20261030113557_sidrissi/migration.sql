/*
  Warnings:

  - You are about to alter the column `senderId` on the `Connection` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(36)`.
  - You are about to alter the column `receiverId` on the `Connection` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(36)`.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Connection` DROP FOREIGN KEY `Connection_receiverId_fkey`;

-- DropForeignKey
ALTER TABLE `Connection` DROP FOREIGN KEY `Connection_senderId_fkey`;

-- DropForeignKey
ALTER TABLE `Notification` DROP FOREIGN KEY `Notification_userId_fkey`;

-- AlterTable
ALTER TABLE `Connection` MODIFY `id` VARCHAR(191) NOT NULL DEFAULT (uuid()),
    MODIFY `senderId` VARCHAR(36) NOT NULL,
    MODIFY `receiverId` VARCHAR(36) NOT NULL;

-- DropTable
DROP TABLE `User`;

-- CreateTable
CREATE TABLE `badges` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL,
    `tier` VARCHAR(20) NOT NULL,
    `required_sessions` INTEGER NOT NULL,

    UNIQUE INDEX `name`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `chat_messages` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `sender_id` VARCHAR(36) NOT NULL,
    `receiver_id` VARCHAR(36) NULL,
    `session_group_id` VARCHAR(36) NULL,
    `message_text` TEXT NOT NULL,
    `is_read` BOOLEAN NULL DEFAULT false,
    `created_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `idx_chat_messages_timestamp`(`created_at`),
    INDEX `receiver_id`(`receiver_id`),
    INDEX `sender_id`(`sender_id`),
    INDEX `session_group_id`(`session_group_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `friendships` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_one_id` VARCHAR(36) NOT NULL,
    `user_two_id` VARCHAR(36) NOT NULL,
    `status` ENUM('PENDING', 'ACCEPTED', 'BLOCKED') NOT NULL DEFAULT 'PENDING',
    `action_user_id` VARCHAR(36) NOT NULL,

    INDEX `action_user_id`(`action_user_id`),
    INDEX `friends_index`(`user_one_id`, `user_two_id`),
    INDEX `user_two_id`(`user_two_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `quiz_attempts` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `quiz_id` VARCHAR(36) NOT NULL DEFAULT (uuid()),
    `user_id` VARCHAR(36) NOT NULL DEFAULT (uuid()),
    `user_answers` LONGTEXT NOT NULL,
    `score` INTEGER NULL DEFAULT 0,
    `submitted_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `quiz_id`(`quiz_id`),
    INDEX `user_id`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `quizzes` (
    `id` VARCHAR(36) NOT NULL DEFAULT (uuid()),
    `creator_id` VARCHAR(36) NOT NULL DEFAULT (uuid()),
    `questions_payload` LONGTEXT NOT NULL,
    `QuizTitle` VARCHAR(255) NOT NULL DEFAULT 'Quiz',
    `right_answers` LONGTEXT NOT NULL,
    `moderation_status` ENUM('PENDING', 'APPROVED', 'REJECTED') NOT NULL DEFAULT 'PENDING',
    `ai_feedback` TEXT NULL,
    `created_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `creator_id`(`creator_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `session_attendees` (
    `session_id` VARCHAR(36) NOT NULL,
    `user_id` VARCHAR(36) NOT NULL,
    `status` ENUM('INVITED', 'ACCEPTED', 'REJECTED', 'ATTENDED') NOT NULL DEFAULT 'INVITED',
    `feedback_rating` INTEGER NULL,
    `feedback_text` TEXT NULL,

    INDEX `user_id`(`user_id`),
    PRIMARY KEY (`session_id`, `user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sessions` (
    `id` VARCHAR(36) NOT NULL DEFAULT (uuid()),
    `host_id` VARCHAR(36) NOT NULL,
    `title` VARCHAR(150) NOT NULL,
    `topic` TEXT NOT NULL,
    `type` ENUM('ONLINE', 'IN_PERSON') NOT NULL,
    `privacy` ENUM('PUBLIC', 'PRIVATE') NOT NULL DEFAULT 'PUBLIC',
    `google_meet_link` TEXT NULL,
    `location_room` VARCHAR(50) NULL,
    `scheduled_start` TIMESTAMP(0) NOT NULL,
    `scheduled_end` TIMESTAMP(0) NOT NULL,
    `status` ENUM('UPCOMING', 'ONGOING', 'COMPLETED', 'CANCELLED') NOT NULL DEFAULT 'UPCOMING',
    `ai_summary` TEXT NULL,
    `created_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `host_id`(`host_id`),
    INDEX `idx_sessions_room_time`(`location_room`, `scheduled_start`, `scheduled_end`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `skills` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL,
    `type` ENUM('TECHNICAL', 'SOFT') NOT NULL,

    UNIQUE INDEX `name`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_badges` (
    `user_id` VARCHAR(36) NOT NULL,
    `badge_id` INTEGER NOT NULL,
    `earned_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `badge_id`(`badge_id`),
    PRIMARY KEY (`user_id`, `badge_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_skills` (
    `user_id` VARCHAR(36) NOT NULL,
    `skill_id` INTEGER NOT NULL,
    `proficiency_stars` INTEGER NOT NULL,

    INDEX `skill_id`(`skill_id`),
    PRIMARY KEY (`user_id`, `skill_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id` VARCHAR(36) NOT NULL DEFAULT (uuid()),
    `first_name` VARCHAR(50) NOT NULL,
    `last_name` VARCHAR(50) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `password_hash` TEXT NULL,
    `phone_number` VARCHAR(20) NULL,
    `country` VARCHAR(50) NULL,
    `city` VARCHAR(50) NULL,
    `age` INTEGER NULL,
    `status` ENUM('STUDENT', 'EMPLOYEE') NOT NULL,
    `institution_or_job` VARCHAR(100) NULL,
    `avatar_url` VARCHAR(255) NULL DEFAULT 'https://assets.platform.com/default-avatar.png',
    `is_premium` BOOLEAN NULL DEFAULT false,
    `created_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `bio` VARCHAR(191) NULL,
    `lastSeenAt` DATETIME(3) NULL,
    `location` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `email`(`email`),
    INDEX `idx_users_city_status`(`city`, `status`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wallet_transactions` (
    `id` VARCHAR(36) NOT NULL DEFAULT (uuid()),
    `user_id` VARCHAR(36) NOT NULL,
    `amount` INTEGER NOT NULL,
    `type` ENUM('WELCOME_BONUS', 'SESSION_JOIN', 'SESSION_HOST_REWARD', 'STORE_PURCHASE', 'QUIZ_REWARD') NOT NULL,
    `description` TEXT NULL,
    `created_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `user_id`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `wallets` (
    `user_id` VARCHAR(36) NOT NULL,
    `balance` INTEGER NOT NULL DEFAULT 100,
    `updated_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `chat_messages` ADD CONSTRAINT `fk_chat_receiver` FOREIGN KEY (`receiver_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `chat_messages` ADD CONSTRAINT `fk_chat_sender` FOREIGN KEY (`sender_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `chat_messages` ADD CONSTRAINT `fk_chat_session` FOREIGN KEY (`session_group_id`) REFERENCES `sessions`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `friendships` ADD CONSTRAINT `fk_friend_action` FOREIGN KEY (`action_user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `friendships` ADD CONSTRAINT `fk_friend_user1` FOREIGN KEY (`user_one_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `friendships` ADD CONSTRAINT `fk_friend_user2` FOREIGN KEY (`user_two_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `quiz_attempts` ADD CONSTRAINT `fk_attempt_quiz` FOREIGN KEY (`quiz_id`) REFERENCES `quizzes`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `quiz_attempts` ADD CONSTRAINT `fk_attempt_user` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `quizzes` ADD CONSTRAINT `fk_quiz_creator` FOREIGN KEY (`creator_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `session_attendees` ADD CONSTRAINT `fk_attendee_session` FOREIGN KEY (`session_id`) REFERENCES `sessions`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `session_attendees` ADD CONSTRAINT `fk_attendee_user` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `sessions` ADD CONSTRAINT `fk_session_host` FOREIGN KEY (`host_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `user_badges` ADD CONSTRAINT `fk_userbadge_badge` FOREIGN KEY (`badge_id`) REFERENCES `badges`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `user_badges` ADD CONSTRAINT `fk_userbadge_user` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `user_skills` ADD CONSTRAINT `fk_userskill_skill` FOREIGN KEY (`skill_id`) REFERENCES `skills`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `user_skills` ADD CONSTRAINT `fk_userskill_user` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `wallet_transactions` ADD CONSTRAINT `fk_transaction_wallet` FOREIGN KEY (`user_id`) REFERENCES `wallets`(`user_id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `wallets` ADD CONSTRAINT `fk_wallet_user` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `Connection` ADD CONSTRAINT `fk_users_reciver_id` FOREIGN KEY (`receiverId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Connection` ADD CONSTRAINT `fk_users_sender_id` FOREIGN KEY (`senderId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Notification` ADD CONSTRAINT `Notification_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
