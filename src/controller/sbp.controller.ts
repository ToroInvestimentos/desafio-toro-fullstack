import { Request, Response } from "express";
import { DepositDto } from "../infrastructure/dto/deposit.dto";
import { HttpError } from "../infrastructure/dto/httpError.dto";
import { InvalidDtoException } from "../infrastructure/exceptions/invalidDto.exception";
import { InvalidOperationException } from "../infrastructure/exceptions/invalidOperation.exception";
import { AccountService } from "../service/account.service";

export class SbpController {

    private _accountService: AccountService;

    /**
     *
     */
    constructor() {
        this._accountService = new AccountService();
    }

    public events = async (req: Request, res: Response): Promise<void> => {
        try {
            const depositDto: DepositDto = req.body;
            this._accountService.DepositValue(depositDto);
            res.sendStatus(200);
        } catch (error) {
            const processedError: HttpError = this.processError(error)
            res.status(processedError.statusCode)
                .send({ message: processedError.message });
        }
    }

    private processError(error: Error): HttpError {
        let statusCode = 500;
        
        if (error instanceof InvalidDtoException) {
            statusCode = 400;
        }

        if (error instanceof InvalidOperationException) {
            statusCode = 422;
        }

        return new HttpError(statusCode, error.message)
    }

}