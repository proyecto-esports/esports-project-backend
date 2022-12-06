import passport from "passport";
import { OAuth2Strategy as GoogleStrategy } from "passport-google-oauth";
import { config } from "dotenv";
import bcrypt from 'bcrypt';
import {LogDanger} from '../magic.js';
import { default as conn } from '../../domain/repositories/mongo.repository.js';

config();
const db = conn.connMongo;
const emails = ["proyectoesports2022@gmail.com"];

passport.use(
  "auth-google",
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:8080/api/v1/google",
    },
    function (accessToken, refreshToken, profile, done) {
      const response = emails.includes(profile.emails[0].value);
      if (response) {
        done(null, profile);
        console.log(accessToken);
        const Login = async (profile) =>{
          try {
            const userByGmail = await db.User.findOne({ gmail: profile.emails[0].value });
            const userIndb =userByGmail;
            if (!userIndb) return LogDanger("Login credentials doesn't exist");
        
            if (bcrypt.compareSync(profile.id, userIndb.password)) {
                console.log('Logeado');
            } else {
              return next('User password incorrect');
            }
          } catch (error) {
            LogDanger('User login failed', error);
            return await { error: { code: 123, message: error } };
          }
        }
        Login(profile)
      }
      
      
      
      else {
        emails.push(profile.emails[0].value);
        done(null, profile)   
        console.log(accessToken);
      const Create = async (profile) => {
        let bodyUser = {
          username: profile.displayName ,
          nickname: profile.name.givenName,
          gmail: profile.emails[0].value,
          password: profile.id,
          role: "user",
        }
        const userGmail = await db.User.findOne({ gmail: bodyUser.gmail });
        const userExists = userGmail;
        if (userExists){
          try {
            const userByGmail = await db.User.findOne({ gmail: profile.emails[0].value });
            const userIndb =userByGmail;
            if (!userIndb) return LogDanger("Login credentials doesn't exist");
            if (bcrypt.compareSync(profile.id, userIndb.password)) {
                console.log('Logeado');
            } else {
              return next('User password incorrect');
            }
          } catch (error) {
            LogDanger('User login failed', error);
            return await { error: { code: 123, message: error } };
          }
        }else{ try {
          const newUser = new db.User(bodyUser);
          newUser.password = bcrypt.hashSync(newUser.password, 6);
          const savedUser = await newUser.save();
          console.log('Registrado');
          return savedUser;
        } catch (error) {
          LogDanger('User register failed', error);
          return await { error: { code: 123, message: error } };
        }}
      };
      Create(profile) 
      }
    }
  )
);