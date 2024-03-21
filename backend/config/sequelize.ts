import { Sequelize } from 'sequelize-typescript';
import { User } from '../models/User.model';
import { LoginCredential } from '../models/LoginCredential.model';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'database.sqlite',
  models: [User, LoginCredential],
});

export default sequelize;