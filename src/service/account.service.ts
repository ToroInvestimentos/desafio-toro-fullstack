import { inject, injectable } from "inversify";
import { Account } from "../domain/account.model";
import { DepositDto } from "../infrastructure/dto/deposit.dto";
import { InvalidDtoException } from "../infrastructure/exceptions/invalidDto.exception";
import { InvalidOperationException } from "../infrastructure/exceptions/invalidOperation.exception";
import { AccountRepository } from "../infrastructure/repositories/account.repository";

@injectable()
export class AccountService {
    
    /**
     *
     */
    constructor(
        @inject(AccountRepository) private _accountRepository: AccountRepository
    ) {
    }

    public async DepositValue(deposit: DepositDto) {
        this.ValidateDepositObject(deposit);
        const account = await this._accountRepository.getAccountById(deposit.target.account);
        this.ValidateCPF(deposit, account);
        this.Deposit(deposit.amount, account);
    }

    private ValidateDepositObject(deposit: DepositDto) {
        if (deposit.event.toLowerCase() !== 'transfer') throw new InvalidOperationException('Event not supported');
        if (deposit.target.bank !== '352') throw new InvalidDtoException('Invalid target bank number');
        if (deposit.target.branch !== '0001') throw new InvalidDtoException('Invalid target branch number');
        if (!deposit.target.account) throw new InvalidDtoException('An account number must be provided');
    }

    private ValidateCPF(deposit: DepositDto, account: Account) {
        if (deposit.origin.cpf !== account.owner.cpf) throw new InvalidOperationException('Transfers can only be made to the same CPF');
    }

    private Deposit(amount: number, account: Account) {
        account.deposit(amount);
        this._accountRepository.updateAccount(account);
    }

}