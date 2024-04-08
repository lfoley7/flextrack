import { Entity, PrimaryKey, Property, OneToOne, OneToMany } from '@mikro-orm/core';
import { LoginCredential } from './login-credential.entity.js';
import { Exercise } from './exercise.entity.js';

@Entity()
export class User {

    @PrimaryKey()
    id!: number;
  
    @Property()
    username!: string;

    @OneToOne()
    login!: LoginCredential;

    @OneToMany(() => Exercise, exercise => exercise.user)
    exercises!: Exercise[];

    constructor(username: string, login: LoginCredential) {
        this.username = username;
        this.login = login;
    }
}