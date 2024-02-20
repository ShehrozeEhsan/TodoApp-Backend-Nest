import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedRolesToUser1708410871592 implements MigrationInterface {
    name = 'AddedRolesToUser1708410871592'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`roles\` text NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`roles\``);
    }

}
