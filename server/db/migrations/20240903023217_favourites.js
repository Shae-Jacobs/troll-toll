export async function up(knex) {
  await knex.schema.createTable('favourites', (table) => {
    table.increments('id').primary()
    table
      .integer('bridges_id')
      .reference('bridges.id')
      .nullable()
      .onDelete('SET NULL')
    table.string('users_token')
  })
}

export async function down(knex) {
  await knex.schema.dropTable('favourites')
}
