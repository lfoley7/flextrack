import { Entity, PrimaryKey, Property, ManyToOne } from '@mikro-orm/core';
import { User } from './user.entity.js';

@Entity()
export class Exercise {

    @PrimaryKey()
    id!: number;
  
    @Property()
    name!: string;

    @Property()
    targetMuscle!: string;

    @ManyToOne()
    user!: User;
}