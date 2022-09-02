import { Knex } from 'knex';

// Executamos a migration criando tabela
export async function up(knex: Knex) {

    return knex.schema.createTable('class_schedule', (table) => {
      
    table.increments('id').primary();
    table.integer('week_day').notNullable();
    table.integer('from').notNullable();
    table.integer('to').notNullable();

    table
      .integer('class_id')
      .notNullable()
      .references('id')
      .inTable('classes')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
  });
}

// Desfazemos a migration, deletamos a tabela
export async function down(knex: Knex) {
  return knex.schema.dropTable('class_schedule');
}
