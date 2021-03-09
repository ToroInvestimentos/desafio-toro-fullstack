import { Wallet } from "./wallet.model";

export class User {
    public cpf: string;
    public name: string;
    public wallet: Wallet;

    /**
     *
     */
    constructor(accountCode: string, cpf: string, name: string, balance: number = 0) {
        this.cpf = cpf;
        this.name = name;

        this.wallet = new Wallet(accountCode, balance);
    }
}