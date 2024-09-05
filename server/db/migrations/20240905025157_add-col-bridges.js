export async function up(knex) {
  return knex.schema.alterTable('bridges', (table) => {
    table.integer('longitude')
    table.integer('latitude')
  })
}

export async function down(knex) {
  return knex.schema.alterTable('bridges', (table) => {
    table.dropColumn('longitude')
    table.dropColumn('latitude')
  })
}
