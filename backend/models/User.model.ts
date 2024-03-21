// import sequelize from '../config/sequelize';
import { LoginCredential } from './LoginCredential.model';
import {
  Model,
  Table,
  DataType,
  Column,
  PrimaryKey,
  AutoIncrement,
  HasOne,
} from 'sequelize-typescript';

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
}
