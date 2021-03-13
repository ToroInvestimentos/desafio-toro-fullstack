export class BankAccountDto {
    public bank: string;
    public branch: string;

    /**
     *
     */
    constructor(bank: string, branch: string) {
        this.bank = bank;
        this.branch = branch
    }
}