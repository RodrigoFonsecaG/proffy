import { Knex } from 'knex';

// Executamos a migration criando tabela
export async function up(knex: Knex) {
  return knex.schema.createTable('teachers', (table) => {
    table.increments('id').primary();
    table.string('avatar').notNullable();
    table.string('whatsapp').notNullable();
    table.string('bio').notNullable();

     table.integer('user_id')
      .notNullable()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');

  });
}

// Desfazemos a migration, deletamos a tabela
export async function down(knex: Knex) {
  return knex.schema.dropTable('teachers');
}
