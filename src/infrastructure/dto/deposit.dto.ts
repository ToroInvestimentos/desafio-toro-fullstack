import { OriginDto } from "./origin.dto";
import { TargetDto } from "./target.dto";

export class DepositDto {
    public event: string;
    public target: TargetDto;
    public origin: OriginDto;
    public amount: number;

    /**
     *
     */
    constructor(event: string, target: TargetDto, origin: OriginDto, amount: number) {
        this.event = event;
        this.target = target;
        this.origin =  origin;
        this.amount = amount;
    }
}