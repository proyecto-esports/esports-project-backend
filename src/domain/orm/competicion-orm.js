import { default as conn } from '../repositories/mongo.repository.js';
import { LogDanger } from '../../utils/magic.js';

const db = conn.connMongo;

export const GetAll = async () => {
  try {
    return await db.Competition.find().populate('users players');
  } catch (error) {
    LogDanger('Cannot getAll competition', error);
    return await { error: { code: 123, message: error } };
  }
};

export const Create = async (req) => {
  try {
    const data = await new db.Competition(req);
    const saveCompetition = await data.save();
    return saveCompetition;
  } catch (error) {
    LogDanger('Cannot create competition', error);
    return await { error: { code: 123, message: error } };
  }
};

export const GetOne = async (req) => {
  try {
    const { id } = req.params;
    const competition = await db.Competition.findById(id).populate(
      'users players'
    );
    if (!competition) return LogDanger('Cannot get the competition');
    return competition;
  } catch (error) {
    LogDanger('Cannot get the competition', error);
    return { error: { code: 123, message: error } };
  }
};

export const GetName = async (req) => {
  try {
    const { name } = req.params;
    console.log(name);
    const competition = await db.Competition.find({ name: name }).populate(
      'users players'
    );
    if (!competition) return LogDanger('Cannot get the competition');
    return competition;
  } catch (error) {
    LogDanger('Cannot get the competition', error);
    return await { error: { code: 123, message: error } };
  }
};

export const Update = async (req) => {
  try {
    const { id } = req.params;
    const newCompetition = await new db.Competition(req.body);
    newCompetition._id = id;
    const competitionUpdate = await db.Competition.findByIdAndUpdate(
      id,
      newCompetition
    );
    return competitionUpdate;
  } catch (error) {
    LogDanger('Cannot update the competition', error);
    return await { error: { code: 123, message: error } };
  }
};

export const UpdateUsers = async (req) => {
  try {
    const { competitionId } = req.params;
    const { userId } = req.params;
    const newCompetition = await db.Competition.findByIdAndUpdate(
      competitionId,
      { $push: { users: userId } },
      { new: true }
    );
    return newCompetition;
  } catch (error) {
    LogDanger('Cannot update the competition', error);
    return await { error: { code: 123, message: error } };
  }
};

export const Delete = async (req) => {
  try {
    const { id } = req.params;
    const competition = await db.Competition.findByIdAndDelete(id);
    return competition;
  } catch (error) {
    LogDanger('Cannot delete bid', error);
    return await { error: { code: 123, message: error } };
  }
};
