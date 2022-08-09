exports.up = (pgm) => {
  pgm.createTable('notes', {
    id: {
      type: 'VARCAHR(50',
      primaryKey: true,
    },
    title: {
      type: 'TEXT',
      notNull: true,
    },
    body: {
      notNull: true,
      type: 'TEXT',
    },
    tags: {
      type: 'TEXT[]',
      notNull: true,
    },
    created_at: {
      type: 'TEXT',
      notNull: true,
    },
    updated_at: {
      type: 'TEXT',
      notNull: true,
    },
  })
};

exports.down = (pgm) => {
  pgm.dropTable('notes')
};
