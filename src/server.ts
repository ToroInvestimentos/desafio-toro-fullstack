import express from "express";
import bodyParser from "body-parser";
import { injectable, inject } from "inversify";
import { SbpController } from "./controller/sbp.controller";
import { Request, Response } from "express";

@injectable()
export class Server {
    public server: express.Express;

    constructor(
        @inject(SbpController) private _sbpController: SbpController
    ) {
        this.server = express();
        this.server.use(bodyParser.json());

        this.setupRoutes();
    }

    /***
     * Setup the routes for the API server
     */
    private setupRoutes(): void {
        this.server.get('/healthcheck', this.healthCheck);
        this.server.post('/sbp/events', this._sbpController.events);
    }

    private healthCheck = async (req: Request, res: Response) => {
        res.sendStatus(200);
    }
}
