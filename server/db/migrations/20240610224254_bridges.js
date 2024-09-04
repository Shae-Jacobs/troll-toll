export async function up(knex) {
  await knex.schema.createTable('bridges', (table) => {
    table.increments('id').primary()
    table.string('name')
    table.string('location')
    table.string('type')
    table.integer('year_built')
    table.integer('length_meters')
    table.integer('lanes').nullable()
    table.string('active_by_users').nullable()
    table.string('image_path')
  })
}

export async function down(knex) {
  await knex.schema.dropTable('bridges')
}
