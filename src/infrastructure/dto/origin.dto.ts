import { BankAccountDto } from "./bankAccount.dto";

export class OriginDto extends BankAccountDto {
    public cpf: string;

    /**
     *
     */
    constructor(bank: string, branch: string, cpf: string) {
        super(bank, branch);
        this.cpf = cpf;
    }
}