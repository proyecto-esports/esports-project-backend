import mongoose from 'mongoose';

const bid = (db) => {
  const bidSchema = new db.Schema(
    {
      user: { type: String, required: true },
      money: { type: Number, required: true },
    },
    {
      timestamps: true,
    }
  );
  return db.model('bid', bidSchema);
};

export default bid;
