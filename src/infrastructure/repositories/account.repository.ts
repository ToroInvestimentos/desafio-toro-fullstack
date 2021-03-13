import { Account } from "../../domain/account.model";
import { User } from "../../domain/user.model";
import { EntityNotFoundException } from "../exceptions/entityNotFound.exception";

export class AccountRepository {
    protected accounts: Array<Account>;

    /**
     *
     */
    constructor() {
        this.accounts = new Array<Account>();

        const user = new User('Test user', '45358996060');
        const account = new Account(user, '300123');
        this.accounts.push(account);
    }

    public getAccounts() {
        return this.accounts;
    }

    public getAccountById(accountId: string) {
        const filteredAccounts = this.accounts.filter(x => x.id === accountId);
        
        if (filteredAccounts.length === 0) {
            throw new EntityNotFoundException('No accounts found with this Id');
        } else if (filteredAccounts.length > 1) {
            throw new EntityNotFoundException('Found more than one account with this Id');
        } else {
            return filteredAccounts[0];
        }
    }

    public addAccount(account: Account) {
        this.accounts.push(account);
    }

    public updateAccount(account: Account) {
        const accountIndex = this.findAccountIndex(account);
        this.accounts[accountIndex] = account;
    }

    public removeAccount(account: Account) {
        const accountIndex = this.findAccountIndex(account);
        this.accounts.splice(accountIndex, 1);
    }

    private findAccountIndex(account: Account): number {
        const accountIndex = this.accounts.indexOf(account);

        if (accountIndex === -1) {
            throw new EntityNotFoundException();
        }

        return accountIndex;
    }
}