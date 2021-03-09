export class Asset {
    public assetCode: string;
    public value: number;

    /**
     *
     */
    constructor(assetCode: string, value: number = 0) {
        this.assetCode = assetCode;
        this.value = value;
    }
}