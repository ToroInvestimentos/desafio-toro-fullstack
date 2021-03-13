import { InsufficientFundsException } from "../infrastructure/exceptions/insufficientFunds.exception";
import { InvalidValueException } from "../infrastructure/exceptions/invalidValue.exception";
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
            id = '0001';
        }
        this.id = id;
        this.owner = owner;
        this.balance = balance;
    }

    public deposit(value: number) {
        if (value < 0) throw new InvalidValueException('Invalid value to deposit');
        
        this.balance += value;
    }

    public withdraw(value: number) {
        if (value < 0) throw new InvalidValueException('Invalid value to withdraw');
        if (this.balance < value) throw new InsufficientFundsException();
        this.balance -= value;
    }
}