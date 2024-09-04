export async function up(knex) {
  await knex.schema.createTable('tolls', (table) => {
    table.increments('id').primary()
    table.string('users_token')
    table.integer('candies')
    table.string('time_stamp')
    table
      .integer('bridges_id')
      .references('bridges.id')
      .nullable()
      .onDelete('SET NULL')
  })
}

export async function down(knex) {
  await knex.schema.dropTable('tolls')
}
