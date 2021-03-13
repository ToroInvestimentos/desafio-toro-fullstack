import { injectable } from "inversify";
import { Asset } from "../../domain/asset.model";

@injectable()
export class AssetRepository {
    protected assets: Array<Asset>;

    /**
     *
     */
    constructor() {
        this.assets = new Array<Asset>();
    }

    public getMostNegotiated(quantity: number = 5) {
        return this.assets.sort((a, b) => b.negotationRate - a.negotationRate).slice(0,quantity);
    }

    public addAsset(asset: Asset) {
        this.assets.push(asset);
    }

    public removeAsset(asset: Asset) {
        const index = this.assets.indexOf(asset);
        if (index === -1) {
            throw new Error('Asset not found');
        }

        this.assets.splice(index, 1);
    }
}