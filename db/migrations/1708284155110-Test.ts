import { MigrationInterface, QueryRunner } from "typeorm";

export class Test1708284155110 implements MigrationInterface {
    name = 'Test1708284155110'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`todo\` CHANGE \`updatedBy\` \`updatedBy\` int NOT NULL DEFAULT '-1'`);
        await queryRunner.query(`ALTER TABLE \`todo\` CHANGE \`deletedBy\` \`deletedBy\` int NOT NULL DEFAULT '-1'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`todo\` CHANGE \`deletedBy\` \`deletedBy\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`todo\` CHANGE \`updatedBy\` \`updatedBy\` int NOT NULL`);
    }

}
