import {
    Model,
    Table,
    DataType,
    Column,
    PrimaryKey,
    BelongsTo,
    ForeignKey,
  } from 'sequelize-typescript';
import { WorkoutSession } from './WorkoutSession.model';
import { Exercise } from './Exercise.model';
  
@Table
export class WorkoutSet extends Model<WorkoutSet> {

    @PrimaryKey
    @Column(DataType.INTEGER)
    declare setNumber: number;

    // TODO: assuming this is pounds?
    @Column(DataType.NUMBER)
    declare targetWeight: number;

    @Column(DataType.INTEGER)
    declare targetReps: number;

    @PrimaryKey
    @ForeignKey(() => WorkoutSession)
    @Column(DataType.STRING)
    sessionType: string;

    // TODO: type validation on this
    @PrimaryKey
    @ForeignKey(() => WorkoutSession)
    @Column(DataType.STRING)
    dayOfWeek: string;

    @PrimaryKey
    @ForeignKey(() => WorkoutSession)
    @Column(DataType.INTEGER)
    planId: number;

    @BelongsTo(() => WorkoutSession)
    workoutSession: WorkoutSession;

    @PrimaryKey
    @ForeignKey(() => Exercise)
    @Column(DataType.INTEGER)
    exerciseId: number;

    @BelongsTo(() => Exercise)
    exercise: Exercise
}
  