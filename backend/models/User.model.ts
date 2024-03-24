import { Exercise } from './Exercise.model';
import { LoginCredential } from './LoginCredential.model';
import {
  Model,
  Table,
  DataType,
  Column,
  PrimaryKey,
  AutoIncrement,
  HasOne,
  HasMany,
} from 'sequelize-typescript';
import { WorkoutPlan } from './WorkoutPlan.model';

@Table
export class User extends Model<User> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number;

  @Column(DataType.STRING)
  declare username: string;

  @HasOne(() => LoginCredential, 'loginCredentialId')
  loginCredential: LoginCredential

  @HasMany(() => Exercise)
  exercises: Exercise[]

  @HasMany(() => WorkoutPlan)
  workoutPlans: WorkoutPlan[]
}
