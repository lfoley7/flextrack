import {
    Model,
    Table,
    DataType,
    Column,
    PrimaryKey,
    BelongsTo,
    ForeignKey,
    HasMany,
  } from 'sequelize-typescript';
import { WorkoutPlan } from './WorkoutPlan.model';
import { WorkoutSet } from './Set.model';
  
@Table
export class WorkoutSession extends Model<WorkoutSession> {

    @PrimaryKey
    @Column(DataType.STRING)
    declare name: string;

    // TODO: type validation on this
    @PrimaryKey
    @Column(DataType.STRING)
    declare dayOfWeek: string;

    @PrimaryKey
    @ForeignKey(() => WorkoutPlan)
    @Column(DataType.INTEGER)
    planId: number;

    @BelongsTo(() => WorkoutPlan)
    workoutPlan: WorkoutPlan;

    @HasMany(() => WorkoutSet)
    sets: WorkoutSet[]
}
  