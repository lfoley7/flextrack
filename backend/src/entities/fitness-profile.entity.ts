import { Entity, OneToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { User } from './user.entity.js';

@Entity()
export class FitnessProfile {

    @PrimaryKey()
    id!: number;
  
    @Property()
    height!: number;
  
    @Property()
    weight!: number;

    @Property()
    description!: string;

    @OneToOne(() => User, user => user.profile, { orphanRemoval: true })
    user!: User;

    public constructor() {
        this.height = -1;
        this.weight = -1;
        this.description = "";
    }
}