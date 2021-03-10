import { Account } from "./account.model";
import { Asset } from "./asset.model";
import { UserAsset } from "./userAsset.model";
import { Wallet } from "./wallet.model";

export class User {
    public name: string;
    public cpf: string;
    public account: Account;
    public wallet: Wallet;

    /**
     *
     */
    constructor(name: string, cpf: string, account: Account, wallet: Wallet) {
        this.name = name;
        this.cpf = cpf;
        
        if (!account) {
            account = new Account(this);
        }

        this.account = account;
        this.wallet = wallet;
    }
}