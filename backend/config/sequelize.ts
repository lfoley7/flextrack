import { Sequelize } from 'sequelize-typescript';
import { User } from '../models/User.model';
import { LoginCredential } from '../models/LoginCredential.model';
import { Exercise } from '../models/Exercise.model';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'database.sqlite',
  models: [User, LoginCredential, Exercise],
});

export default sequelize;