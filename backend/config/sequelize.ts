import { Sequelize } from 'sequelize-typescript';
import { User } from '../models/User.model';
import { LoginCredential } from '../models/LoginCredential.model';
import { Exercise } from '../models/Exercise.model';
import { WorkoutPlan } from '../models/WorkoutPlan.model';
import { WorkoutSession } from '../models/WorkoutSession.model';
import { WorkoutSet } from '../models/Set.model';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'database.sqlite',
  models: [User, LoginCredential, Exercise, WorkoutPlan, WorkoutSession, WorkoutSet],
});

export default sequelize;