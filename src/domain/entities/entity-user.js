import mongoose from 'mongoose';

const user = (db) => {
  const userSchema = new db.Schema(
    {
      username: { type: String, required: true },
      nickname: { type: String, required: true},
      gmail: { type: String, required: true, unique: true },
      password: { type: String, required: true },
      role: { type: String, enum: ['user', 'admin'], required: true },
      image: { type: String },
      money: { type: Number, default: 1000000 },
      players: [{ type: mongoose.Schema.Types.ObjectId, ref: 'player' }],
      points: { type: Number },
      lineup: [{ type: mongoose.Schema.Types.ObjectId, ref: 'player' }],
      competition:{ type: mongoose.Schema.Types.ObjectId, ref: 'competition' },
    },
    {
      timestamps: true,
    }
  );
  return db.model('user', userSchema);
};
export default user;
