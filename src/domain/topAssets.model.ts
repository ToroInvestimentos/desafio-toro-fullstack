import { Asset } from "./assets.model";

export class TopAssets {
    private topAssets: Array<Asset> = new Array<Asset>(5);

    public getTopAssets() {
        return this.topAssets;
    }

    public addAsset(asset: Asset) {
        
    }

    public removeAsset(asset: Asset) {
        
    }
}