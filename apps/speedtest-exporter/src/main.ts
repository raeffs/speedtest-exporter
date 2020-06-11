import * as express from 'express';
import { speedTestRequestHandler } from './app/speed-test-request-handler.function';

const app = express();

app.get('/metrics', speedTestRequestHandler);

const port = process.env.port || 9112;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/metrics`);
});
server.on('error', console.error);
