import { injectable } from "inversify";
import { Account } from "../../domain/account.model";
import { User } from "../../domain/user.model";
import { EntityNotFoundException } from "../exceptions/entityNotFound.exception";
import { Pool } from "pg";
import { InvalidValueException } from "../exceptions/invalidValue.exception";

@injectable()
export class AccountRepository {
    private _pool: Pool

    /**
     *
     */
    constructor() {
        this._pool = new Pool({
            user: process.env.POSTGRES_USER,
            host: process.env.POSTGRES_HOST,
            database: process.env.POSTGRES_DATABASE,
            password: process.env.POSTGRES_PASSWORD,
            port: parseInt(process.env.POSTGRES_PORT || '5432')
        });
    }

    public async getAccounts(): Promise<Array<Account>> {
        const sqlCommand = `SELECT A.Id as accountId,
                                    A.balance as balance,
                                    U.cpf as cpf,
                                    U.name as userName
                            FROM Account A
                                INNER JOIN "User" U ON A.OwnerCPF = U.CPF`;
        
        const result = await this._pool.query(sqlCommand);
        const accounts: Array<Account> = new Array<Account>();

        if (result.rowCount === 0) return accounts;

        for (let accountDao of result.rows) {
            const user = new User(accountDao.userName, accountDao.cpf);
            const account = new Account(user, accountDao.accountId, accountDao.balance);
            accounts.push(account);
        }

        return accounts;
    }

    public async getAccountById(accountId: number): Promise<Account> {
        const sqlCommand = `SELECT A.Id as accountId,
                                    A.balance as balance,
                                    U.cpf as cpf,
                                    U.name as userName
                            FROM Account A
                                INNER JOIN "User" U ON A.OwnerCPF = U.CPF
                            WHERE A.ID = $1`;
        
        const result = await this._pool.query(sqlCommand, [accountId]);
        const accounts: Array<Account> = new Array<Account>();

        if (result.rowCount === 0) {
            throw new EntityNotFoundException('No accounts found with this Id');
        } else if (result.rowCount > 1) {
            throw new EntityNotFoundException('Found more than one account with this Id');
        } else {
            let accountDao = result.rows[0];
            const user = new User(accountDao.username, accountDao.cpf);
            const account = new Account(user, accountDao.accountid, accountDao.balance);
            return account;
        }
    }

    public async getAccountByCPF(cpf: string): Promise<Account> {
        const sqlCommand = `SELECT A.Id as accountId,
                                    A.balance as balance,
                                    A.ownercpf as cpf
                            FROM Account A
                            WHERE A.OwnerCPF = $1`;
        
        const result = await this._pool.query(sqlCommand, [cpf]);

        if (result.rowCount === 0) {
            throw new EntityNotFoundException('No accounts found with this CPF');
        } else if (result.rowCount > 1) {
            throw new EntityNotFoundException('Found more than one account with this CPF');
        } else {
            let accountDao = result.rows[0];
            const user = new User(accountDao.username, accountDao.cpf);
            const account = new Account(user, accountDao.accountid, accountDao.balance);
            return account;
        }
    }

    public async addAccount(account: Account): Promise<Account> {
        const sqlCommand = `INSERT INTO Account (balance, ownercpf) VALUES ($1, $2);`;
        
        const result = await this._pool.query(sqlCommand, [account.balance, account.owner.cpf]);

        if (result.rowCount !== 1) throw new InvalidValueException('Account not found');

        const newAccount = await this.getAccountByCPF(account.owner.cpf);
        return newAccount;
    }

    public async updateAccount(account: Account) {
        const sqlCommand = `UPDATE Account A
                            SET balance = $2,
                                ownercpf = $3
                            WHERE id = $1`;
        
        const result = await this._pool.query(sqlCommand, [account.id, account.balance, account.owner.cpf]);

        if (result.rowCount !== 1) throw new InvalidValueException('Account not found');
    }

    public async removeAccount(account: Account) {
        const sqlCommand = `DELETE FROM Account A
                            WHERE id = $1`;
        
        const result = await this._pool.query(sqlCommand, [account.id]);

        if (result.rowCount !== 1) throw new InvalidValueException('Account not found');
    }
}