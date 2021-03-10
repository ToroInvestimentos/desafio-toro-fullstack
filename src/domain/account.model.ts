import { InsufficientFundsError } from "../infrastructure/exceptions/insufficientFunds.exception";
import { InvalidValueError } from "../infrastructure/exceptions/InvalidValue.exception";
import { User } from "./user.model";

export class Account {
    public id: string;
    public balance: number;
    public owner: User;

    /**
     *
     */
    constructor(owner: User, id?: string, balance: number = 0) {
        if (!id) {
            //TODO: Generate new account id
            throw new Error('Not implemented');
        }
        this.id = id;
        this.owner = owner;
        this.balance = balance;
    }

    public deposit(value: number) {
        if (value < 0) throw new InvalidValueError('Invalid value to deposit');
        
        this.balance += value;
    }

    public withdraw(value: number) {
        if (value < 0) throw new InvalidValueError('Invalid value to withdraw');
        if (this.balance < value) throw new InsufficientFundsError();
        this.balance -= value;
    }
}