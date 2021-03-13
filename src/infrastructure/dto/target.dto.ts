import { BankAccountDto } from "./bankAccount.dto";

export class TargetDto extends BankAccountDto {
    public account: string;

    /**
     *
     */
    constructor(bank: string, branch: string, account: string) {
        super(bank, branch);
        this.account = account;
    }
}