import { Knex } from 'knex';

// Executamos a migration criando tabela
export async function up(knex: Knex) {
  return knex.schema.createTable('classes', (table) => {
    table.increments('id').primary();
    table.string('subject').notNullable();
    table.decimal('cost').notNullable();

    table.integer('teachers_id')
      .notNullable()
      .references('id')
      .inTable('teachers')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
  });
}

// Desfazemos a migration, deletamos a tabela
export async function down(knex: Knex) {
  return knex.schema.dropTable('classes');
}
