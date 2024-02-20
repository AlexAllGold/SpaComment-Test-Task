import { App } from './app';
import { configService } from './config/configService';

const app = new App().bootstrap();
const port = configService.getPort();

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});