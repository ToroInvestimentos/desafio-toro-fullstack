import { Asset } from "./asset.model";
import { User } from "./user.model";
import { UserAsset } from "./userAsset.model";

export class Wallet {
    public assets: Array<UserAsset>;
    public owner: User;

    /**
     *
     */
    constructor(owner: User,  assets: Array<UserAsset> = new Array<UserAsset>()) {
        this.owner = owner;
        this.assets = assets;
    }

    public buyAsset(asset: Asset, quantity: number): void {
        try {
            if (!this.owner.account) throw new Error(`User doesn't have an account`);

            this.owner.account.withdraw(asset.currentValue * quantity);
            this.assets.push(new UserAsset(quantity, asset));    
        } catch (error) {
            throw error;
        }
    }

    public sellAsset(asset: Asset, quantity: number): void {
        try {
            if (!this.owner.account) throw new Error(`User doesn't have an account`);
            this.removeUserAsset(asset, quantity);
            this.owner.account.deposit(asset.currentValue * quantity);
        } catch (error) {
            throw error;
        }
    }

    private removeUserAsset(asset: Asset, quantity: number): void {
        const index = this.assets.findIndex(x => x.asset.id === asset.id);
        const userAsset = this.assets[index];

        if (quantity > userAsset.quantity) throw new Error(`User can't sell more assets that it has`);
        
        if (quantity < userAsset.quantity) {
            this.assets[index].quantity -= quantity;
        } else {
            this.assets.splice(index, 1);
        }
    }
}