import { MigrationInterface, QueryRunner } from "typeorm";

export class Chages1707893390625 implements MigrationInterface {
    name = 'Chages1707893390625'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`todo\` DROP FOREIGN KEY \`FK_5748feca24ec2432fc99f68b9dd\``);
        await queryRunner.query(`ALTER TABLE \`todo\` CHANGE \`userUserId\` \`userId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`todo\` CHANGE \`userId\` \`userId\` int NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`todo\` CHANGE \`userId\` \`userId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`todo\` CHANGE \`userId\` \`userUserId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`todo\` ADD CONSTRAINT \`FK_5748feca24ec2432fc99f68b9dd\` FOREIGN KEY (\`userUserId\`) REFERENCES \`user\`(\`userId\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
