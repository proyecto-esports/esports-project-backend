import mongoose from 'mongoose';

const bid = (db) => {
  const bidSchema = new db.Schema(
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'user',
      },
      money: { type: Number, required: true },
      player: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'player',
      },
    },
    {
      timestamps: true,
    }
  );
  return db.model('bid', bidSchema);
};

export default bid;
