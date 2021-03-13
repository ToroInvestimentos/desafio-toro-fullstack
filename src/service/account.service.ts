import { Account } from "../domain/account.model";
import { DepositDto } from "../infrastructure/dto/deposit.dto";
import { InvalidDtoException } from "../infrastructure/exceptions/invalidDto.exception";
import { InvalidOperationException } from "../infrastructure/exceptions/invalidOperation.exception";
import { AccountRepository } from "../infrastructure/repositories/account.repository";
import { UserRepository } from "../infrastructure/repositories/user.repository";

export class AccountService {
    
    private _accountRepository: AccountRepository;

    /**
     *
     */
    constructor() {
        this._accountRepository = new AccountRepository();
    }

    public DepositValue(deposit: DepositDto) {
        this.ValidateDepositObject(deposit);
        const account = this._accountRepository.getAccountById(deposit.target.account);
        this.ValidateCPF(deposit, account);
        account.deposit(deposit.amount);
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

}