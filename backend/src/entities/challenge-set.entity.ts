import { Entity, PrimaryKey, Property, ManyToOne, OneToMany, Cascade, Collection, PrimaryKeyProp } from '@mikro-orm/core';
import { User } from './user.entity.js';
import { WorkoutSession } from './workout-session.entity.js';
import { Exercise } from './exercise.entity.js';
import { WorkoutLog } from './workout-log.entity.js';
import { Challenge } from './challenge.entity.js';
import { ChallengeLog } from './challenge-log.entity.js';

@Entity()
export class ChallengeSet {

    @PrimaryKey()
    set_number!: number;

    @ManyToOne({ primary: true })
    challenge!: Challenge;

    @ManyToOne({ primary: true })
    exercise!: Exercise;

    [PrimaryKeyProp]?: ['set_number', 'challenge', 'exercise'];

    @Property()
    target_weight!: number;

    @Property()
    target_reps!: number;

    @OneToMany(() => ChallengeLog, (log: ChallengeLog) => log.set, { cascade: [Cascade.ALL] })
    logs = new Collection<ChallengeLog>(this);
}