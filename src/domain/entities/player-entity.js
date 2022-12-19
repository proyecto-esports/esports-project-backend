import mongoose from 'mongoose';

const player = (db) => {
  const playerSchema = new db.Schema({
    nickname: { type: String, required: true, unique: true },
    value: { type: Number, required: true },
    points: { type: Number, default: 0 },
    image: { type: String},
    stats:{
      kills: { type: Number, default: 0 },
      deads: { type: Number, default: 0 },
      asists: { type: Number, default: 0 },
      dmg: { type: Number, default: 0 },
    },
    bids: [{ type: mongoose.Schema.Types.ObjectId, ref: 'bid' }],
  });

  return db.model('player', playerSchema);
};

export default player;
