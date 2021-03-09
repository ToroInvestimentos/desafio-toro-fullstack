import { WalletItem } from "./walletItem.model";

export class Wallet {
    public accountCode: string;
    public balance: number;
    public items: WalletItem[];

    /**
     *
     */
    constructor(accountCode: string, balance: number = 0) {
        this.accountCode = accountCode;
        this.balance = balance;
        this.items = [];
    }


    public addItem(item: WalletItem) {
        this.items.push(item);
    }

    public findItemByAssetCode(assetCode: string): WalletItem | null {
        const filteredItems = this.items.filter(x => x.asset?.assetCode == assetCode);
        if (filteredItems.length === 0) return null;
        
        return filteredItems[0];
    }

    public removeItem(item: WalletItem) {
        const index = this.items.indexOf(item, 0);
        if (index > -1) this.items.splice(index, 1);
    }


}