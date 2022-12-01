import db from '../repositories/mongo.repository.js';
import { LogDanger } from '../../utils/magic.js';

const conn = conn.db.connMongo;

export const GetAll = async () => {
  try {
    return await conn.Competicion.find();
  } catch (error) {
    LogDanger('Cannot getAll competition', error);
    return await { error: { code: 123, message: error } };
  }
};

export const Create = async (req) => {
  try {
    const data = await new conn.Competicion(req);
    data.save();
    return data;
  } catch (error) {
    LogDanger('Cannot create competition', error);
    return await { error: { code: 123, message: error } };
  }
};

export const GetOne = async (req) => {
  try {
    const { id } = req.params;
    const competicion = await conn.Competicion.findById(id);
    if (!competicion) return LogDanger('Cannot get the competition');
    return competicion;
  } catch (error) {
    LogDanger('Cannot get the competition', error);
    return await { error: { code: 123, message: error } };
  }
};

export const GetName = async (req) => {
  try {
    const { name } = req.params;
    const competicion = await conn.Competicion.findOne({ name: name });
    if (!competicion) return LogDanger('Cannot get the competition');
    return competicion;
  } catch (error) {
    LogDanger('Cannot get the competition', error);
    return await { error: { code: 123, message: error } };
  }
};

export const Update = async (req) => {
  try {
    const { id } = req.params;
    const newCompeticion = await new conn.Competicion(req.body);
    newCompeticion._id = id;
    const competicionUpdate = await conn.Competicion.findByIdAndUpdate(
      id,
      newCompeticion
    );
    return competicionUpdate;
  } catch (error) {
    LogDanger('Cannot update the competition', error);
    return await { error: { code: 123, message: error } };
  }
};

export const Delete = async (req) => {
  try {
    const { id } = req.params;
    const deleteCompeticion = await conn.Competicion.findByIdAndDelete(id);
    return deleteCompeticion;
  } catch (error) {
    LogDanger('Cannot delete the competition', error);
    return await { error: { code: 123, message: error } };
  }
};
