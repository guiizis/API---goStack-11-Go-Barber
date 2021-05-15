import { MigrationInterface, QueryRunner, Table } from "typeorm";

export default class CreateUsers1620861640632 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table(
        {
          name: "users",
          columns: [
            {
              name: "id",
              type: "uuid",
              isPrimary: true,
              generationStrategy: "uuid",
              default: 'gen_random_uuid()'
            },
            {
              name: "password",
              type: "varchar",
            },
            {
              name: "email",
              type: "varchar",
              isUnique: true
            },
            {
              name: "name",
              type: "varchar",
            },
            {
              name: "created_at",
              type: "timestamp",
              default: "now()"
            },
            {
              name: "updated_at",
              type: "timestamp",
              default: "now()"
            },
          ]
        }
      )

    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("users")
  }

}
