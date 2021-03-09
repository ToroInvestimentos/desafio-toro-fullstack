import express from "express";
import bodyParser from "body-parser";
import { injectable, inject } from "inversify";

@injectable()
export class Server {
    public server: express.Express;

    constructor() {
        this.server = express();
        this.server.use(bodyParser.json());
    }

    /***
     * Setup the routes for the API server
     */
    private setupRoutes(): void {

    }
}
