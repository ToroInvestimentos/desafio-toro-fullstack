export class Asset {
    public id: string;
    public currentValue: number;
    public negotationRate: number;

    /**
     *
     */
    constructor(id: string, currentValue: number = 0, negotationRate: number = 0) {
        this.id = id;
        this.currentValue = currentValue;
        this.negotationRate = negotationRate;
    }

    public updateCurrentValue(value: number) {
        this.currentValue = value;
    }

    public updateNegotiationRate(value: number) {
        this.negotationRate = value;
    }

}