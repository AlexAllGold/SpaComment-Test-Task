import express from 'express';
import {router} from "./router/routes";
import {Database} from "./config/database";

export class App {
    bootstrap(): express.Express {
        Database.initialize();

        const app = express();
        app.use(express.json());
        app.use('/api', router);
        console.log('Express')

        return app;
    }
}