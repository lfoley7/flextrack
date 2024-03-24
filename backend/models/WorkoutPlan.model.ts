import {
    Model,
    Table,
    DataType,
    Column,
    PrimaryKey,
    BelongsTo,
    ForeignKey,
    AutoIncrement,
    HasMany,
  } from 'sequelize-typescript';
  import { User } from './User.model';
import { WorkoutSession } from './WorkoutSession.model';
  
@Table
export class WorkoutPlan extends Model<WorkoutPlan> {

    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    declare id: number;

    @Column(DataType.STRING)
    declare name: string;

    @ForeignKey(() => User)
    @Column(DataType.INTEGER)
    userId: number;

    @BelongsTo(() => User)
    user: User;

    @HasMany(() => WorkoutSession)
    sessions: WorkoutSession[]
}
  