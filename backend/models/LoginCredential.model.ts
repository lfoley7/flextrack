import {
  Model,
  Table,
  DataType,
  Column,
  PrimaryKey,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { User } from './User.model';


@Table
export class LoginCredential extends Model<LoginCredential> {
  
  @PrimaryKey
  @Column(DataType.STRING)
  declare email: string;

  @Column(DataType.STRING)
  declare password: string;

  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  userId: number;

  @BelongsTo(() => User)
  user: User;
}
