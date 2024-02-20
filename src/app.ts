import express from 'express';
export class App {
    bootstrap(): express.Express {

        const app = express();
        app.use(express.json());
        // app.use('/api', router);
        console.log('Express')

        return app;
    }
}