import { Entity, PrimaryKey, Property, ManyToOne, PrimaryKeyProp, Collection, OneToMany, Cascade } from '@mikro-orm/core';
import { WorkoutPlan } from './workout-plan.entity.js';
import { SessionSet } from './set.entity.js';

@Entity()
export class WorkoutSession {

    @PrimaryKey()
    day_of_week!: string;

    @PrimaryKey()
    workout_type!: string;

    @ManyToOne({ primary: true })
    plan!: WorkoutPlan;

    @OneToMany(() => SessionSet, (session_set: SessionSet) => session_set.session, { cascade: [Cascade.ALL] })
    sets = new Collection<SessionSet>(this);

    [PrimaryKeyProp]?: ['day_of_week', 'workout_type', 'plan'];

}