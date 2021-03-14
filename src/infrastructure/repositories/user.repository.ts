import { injectable } from "inversify";
import { User } from "../../domain/user.model";
import { EntityNotFoundException } from "../exceptions/entityNotFound.exception";
import { Pool } from "pg";

@injectable()
export class UserRepository {
    protected users: Array<User>;
    private pool: Pool

    /**
     *
     */
    constructor() {
        this.pool = new Pool({
            user: process.env.POSTGRES_USER,
            host: process.env.POSTGRES_HOST,
            database: process.env.POSTGRES_DATABASE,
            password: process.env.POSTGRES_PASSWORD,
            port: parseInt(process.env.POSTGRES_PORT || '5432')
        });
        this.users = new Array<User>();
    }

    public getUsers(): Array<User> {
        return this.users;
    }

    public getUserByCpf(cpf: string): User {
        const filteredUsers = this.users.filter(x => x.cpf === cpf);
        
        if (filteredUsers.length === 0) {
            throw new EntityNotFoundException('User not found with this CPF');
        } else if (filteredUsers.length > 1) {
            throw new EntityNotFoundException('Found more than one user with this CPF');
        } else {
            return filteredUsers[0];
        }
    }

    public addUser(user: User): void {
        this.users.push(user);
    }

    public updateUser(user: User): void {
        const userIndex = this.findUserIndex(user);
        this.users[userIndex] = user;
    }

    public removeUser(user: User): void {
        const userIndex = this.findUserIndex(user);
        this.users.splice(userIndex, 1);
    }

    private findUserIndex(user: User): number {
        const userIndex = this.users.indexOf(user);

        if (userIndex === -1) {
            throw new EntityNotFoundException();
        }

        return userIndex;
    }
}