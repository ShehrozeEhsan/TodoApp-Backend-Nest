import { MigrationInterface, QueryRunner } from "typeorm";

export class NewMigrations1707888474167 implements MigrationInterface {
    name = 'NewMigrations1707888474167'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`todo\` DROP FOREIGN KEY \`todo_ibfk_1\``);
        await queryRunner.query(`DROP INDEX \`userId\` ON \`todo\``);
        await queryRunner.query(`ALTER TABLE \`todo\` DROP COLUMN \`userId\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`full_name\``);
        await queryRunner.query(`ALTER TABLE \`todo\` ADD \`userUserId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`fullName\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`todo\` DROP COLUMN \`content\``);
        await queryRunner.query(`ALTER TABLE \`todo\` ADD \`content\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`todo\` DROP COLUMN \`createdAt\``);
        await queryRunner.query(`ALTER TABLE \`todo\` ADD \`createdAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`todo\` CHANGE \`completionStatus\` \`completionStatus\` tinyint NOT NULL DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`username\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`username\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD UNIQUE INDEX \`IDX_78a916df40e02a9deb1c4b75ed\` (\`username\`)`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`password\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`password\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`todo\` ADD CONSTRAINT \`FK_5748feca24ec2432fc99f68b9dd\` FOREIGN KEY (\`userUserId\`) REFERENCES \`user\`(\`userId\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`todo\` DROP FOREIGN KEY \`FK_5748feca24ec2432fc99f68b9dd\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`password\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`password\` varchar(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP INDEX \`IDX_78a916df40e02a9deb1c4b75ed\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`username\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`username\` varchar(50) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`todo\` CHANGE \`completionStatus\` \`completionStatus\` tinyint(1) NULL`);
        await queryRunner.query(`ALTER TABLE \`todo\` DROP COLUMN \`createdAt\``);
        await queryRunner.query(`ALTER TABLE \`todo\` ADD \`createdAt\` timestamp NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`todo\` DROP COLUMN \`content\``);
        await queryRunner.query(`ALTER TABLE \`todo\` ADD \`content\` text NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`fullName\``);
        await queryRunner.query(`ALTER TABLE \`todo\` DROP COLUMN \`userUserId\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`full_name\` varchar(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`todo\` ADD \`userId\` int NULL`);
        await queryRunner.query(`CREATE INDEX \`userId\` ON \`todo\` (\`userId\`)`);
        await queryRunner.query(`ALTER TABLE \`todo\` ADD CONSTRAINT \`todo_ibfk_1\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`userId\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
