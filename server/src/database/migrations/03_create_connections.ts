import { Knex } from 'knex';

// Executamos a migration criando tabela
export async function up(knex: Knex) {
  return knex.schema.createTable('connections', (table) => {
    table.increments('id').primary();

    table
      .integer('user_id')
      .notNullable()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');

    table.timestamp('created_at').defaultTo(knex.raw('CURRENT_TIMESTAMP')).notNullable();
  });
}

// Desfazemos a migration, deletamos a tabela
export async function down(knex: Knex) {
  return knex.schema.dropTable('connections');
}

