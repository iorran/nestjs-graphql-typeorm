import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateMessage1586460513271 implements MigrationInterface {

    private fkUser = new TableForeignKey({
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
        referencedTableName: 'users'
    });

    private table = new Table({
        name: 'messages',
        columns: [
            {
                name: 'id',
                type: 'integer',
                isPrimary: true,
                isGenerated: true,
                generationStrategy: 'increment'
            },
            {
                name: 'user_id',
                type: 'integer',
                isNullable: false
            },
            {
                name: 'content',
                type: 'varchar',
                length: '255',
                isNullable: false
            },
            {
                name: 'created_at',
                type: 'timestampz',  
                isNullable: false,
                default: 'now()'
            },
            {
                name: 'updated_at',
                type: 'timestampz',  
                isNullable: false,
                default: 'now()'
            }
        ],
        foreignKeys: [this.fkUser]
    });

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(this.table);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable(this.table);
    }

}
