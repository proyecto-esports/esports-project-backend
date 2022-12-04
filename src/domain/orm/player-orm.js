import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { default as conn } from '../repositories/mongo.repository.js';
import { LogDanger } from '../../utils/magic.js';

const db = conn.connMongo;

export const Create = async (req) => {
  try {
    const newPlayer = new db.Player(req.body);
    const playerExists = await db.Player.findOne({
      nickname: newPlayer.nickname,
    });
    if (playerExists) return LogDanger('That player already exists');
    const savedPlayer = await newPlayer.save();
    return savedPlayer;
  } catch (error) {
    LogDanger('User register failed', error);
    return await { err: { code: 123, message: error } };
  }
};

export const GetAll = async (req) => {
  try {
    const playersInDB = await db.Player.find().populate('bids');
    return playersInDB;
  } catch (error) {
    LogDanger('User GetAll failed', error);
    return await { err: { code: 123, message: error } };
  }
};

export const GetOne = async (req) => {
  try {
    const { id } = req.params;
    const playerInDB = await db.Player.findById(id);
    return playerInDB;
  } catch (error) {
    LogDanger('User delete failed', error);
    return await { err: { code: 123, message: error } };
  }
};

export const Delete = async (req) => {
  try {
    const { id } = req.params;
    const removedPlayer = await db.Player.findByIdAndDelete(id);
    return removedPlayer;
  } catch (error) {
    LogDanger('User delete failed', error);
    return await { err: { code: 123, message: error } };
  }
};

export const Update = async (req) => {
  try {
    const { id } = req.params;
    const updatedPlayer = await db.Player.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    return updatedPlayer;
  } catch (error) {
    LogDanger('User delete failed', error);
    return await { err: { code: 123, message: error } };
  }
};

export const AddBid = async (req) => {
  try {
    const { id } = req.params;
    const addedBid = await db.Player.findByIdAndUpdate(
      id,
      { bid: req.body },
      { new: true }
    );
    return addedBid;
  } catch (error) {
    LogDanger('User delete failed', error);
    return await { err: { code: 123, message: error } };
  }
};


export const ChangePoints = async (req) => {
  try {
    const allPlayer = await db.Player.find()
    allPlayer.forEach(player => {
      let kills = Math.floor(Math.random() * (50 + 1)) ;
      let deads = Math.floor(Math.random() * (14 + 1)) ;
      let asists = Math.floor(Math.random() * (50 + 1)) ;
      let dmg =  Math.floor(Math.random() * (750 + 1));
      let allStats = {
        kills: kills,
        deads: deads,
        asists: asists,
        dmg:dmg
      }
      console.log(allStats);
      const updatedPlayer = db.Player.findByIdAndUpdate(player._id, { $set:{
        stats:{
          kills: kills,
          deads: deads,
          asists: asists,
          dmg:dmg
        }
      }}
    ); 
    return updatedPlayer;
    });
    
   
    
  } catch (error) {
    LogDanger('Player update failed', error);
    return await { err: { code: 123, message: error } };
  }
};