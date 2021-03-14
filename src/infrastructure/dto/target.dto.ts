import { BankAccountDto } from "./bankAccount.dto";

export class TargetDto extends BankAccountDto {
    public account: number;

    /**
     *
     */
    constructor(bank: string, branch: string, account: number) {
        super(bank, branch);
        this.account = account;
    }
}