import express from 'express';
import serveStatic from 'serve-static';
import { join } from 'path';

const app = express();

app.use(serveStatic(join(__dirname, 'build')));

const port = process.env.PORT || 80;

app.listen(port, () => {
    console.log(`App is listening on PORT ${port}`);
});
