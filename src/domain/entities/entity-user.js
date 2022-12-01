const mongoose = require('mongoose');

 const user = (db) => {
  const userSchema = new db.Schema(
    {
      username: { type: String, required: true },
      nickname: { type: String, required: true, unique: true },
      gmail: { type: String, required: true, unique: true },
      password: { type: String, required: true },
      role: { type: String, enum: ['user', 'admin'], required: true },
      image: { type: String },
      points: {type: Number, },
      lineup: [{type: String}],
      competition:{type: String}
    },
    {
      timestamps: true,
    }
  );
  return db.model('user', userSchema);
};
export default user;