import connection from '../connection.ts'

export const getAllBridges = async () => {
  return connection('bridges').select(
    'id',
    'name',
    'location',
    'type',
    'year_built as yearBuilt',
    'length_meters as lengthMeters',
    'active_by_users as activeByUsers',
    'image_path as imagePath',
  )
}

export const getBridgeById = async (id: number) => {
  return connection('bridges')
    .select(
      'id',
      'name',
      'location',
      'type',
      'year_built as yearBuilt',
      'length_meters as lengthMeters',
      'active_by_users as activeByUsers',
      'image_path as imagePath',
    )
    .where({ id })
    .first()
}

// table.increments('id').primary()
// table.string('name')
// table.string('location')
// table.string('type')
// table.integer('year_built')
// table.integer('length_meters')
// table.integer('lanes').nullable()
// table.string('active_by_users').nullable()
// table.string('image_path')
