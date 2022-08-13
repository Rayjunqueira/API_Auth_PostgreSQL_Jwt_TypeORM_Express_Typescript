import { MigrationInterface, QueryRunner } from "typeorm";

export class default1659907525530 implements MigrationInterface {
    name = 'default1659907525530'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "isActivate" boolean NOT NULL DEFAULT false, "username" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "tokenActivate" character varying NOT NULL DEFAULT '', "tokenResetPass" character varying NOT NULL DEFAULT '', CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
