import mongoose from 'mongoose';

const competition = (db) => {
  const competitionSchema = new db.Schema(
    {
      name: { type: String, required: true, unique: true },
      users: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'user',
        },
      ],
      market: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'player',
        },
      ],
    },
    {
      timestamps: true,
    }
  );
  return db.model('competition', competitionSchema);
};

export default competition;
