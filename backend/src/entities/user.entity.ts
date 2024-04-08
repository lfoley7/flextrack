import { Entity, PrimaryKey, Property, OneToOne } from '@mikro-orm/core';
import { LoginCredential } from './login-credential.entity';

@Entity()
export class User {

    @PrimaryKey()
    id!: number;
  
    @Property()
    username!: string;

    @OneToOne()
    login!: LoginCredential;

    constructor(username: string, login: LoginCredential) {
        this.username = username;
        this.login = login;
    }
}