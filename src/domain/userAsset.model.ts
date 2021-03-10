import { Asset } from "./asset.model";

export class UserAsset {
    public quantity: number;
    public asset: Asset;

    /**
     *
     */
    constructor(quantity: number, asset: Asset) {
        this.quantity = quantity;
        this.asset = asset;
    }
}