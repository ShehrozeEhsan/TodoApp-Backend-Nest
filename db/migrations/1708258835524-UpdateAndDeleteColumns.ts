import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateAndDeleteColumns1708258835524 implements MigrationInterface {
    name = 'UpdateAndDeleteColumns1708258835524'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`FK_5748feca24ec2432fc99f68b9dd\` ON \`todo\``);
        await queryRunner.query(`ALTER TABLE \`todo\` ADD \`updatedDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`todo\` ADD \`updatedBy\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`todo\` ADD \`deletedDate\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`todo\` ADD \`deletedBy\` int NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`todo\` DROP COLUMN \`deletedBy\``);
        await queryRunner.query(`ALTER TABLE \`todo\` DROP COLUMN \`deletedDate\``);
        await queryRunner.query(`ALTER TABLE \`todo\` DROP COLUMN \`updatedBy\``);
        await queryRunner.query(`ALTER TABLE \`todo\` DROP COLUMN \`updatedDate\``);
        await queryRunner.query(`CREATE INDEX \`FK_5748feca24ec2432fc99f68b9dd\` ON \`todo\` (\`userId\`)`);
    }

}
