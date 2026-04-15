module.exports = (db) =>
  db.model(
    'Gacha',
    db.Schema({
      userId: { type: db.Schema.Types.ObjectId, ref: 'Users', required: true },
      prize: { type: String, default: null },
      createdAt: { type: Date, default: Date.now },
    })
  );