import * as express from 'express';
import * as speedTest from 'speedtest-net';
import { SpeedTestResult } from './speed-test.interface';

const app = express();

app.get('/metrics', async (request, response, next) => {
  try {
    const test: SpeedTestResult = await speedTest({
      acceptLicense: true,
      acceptGdpr: true
    });
    response
      .contentType('text/plain')
      .send(`
# HELP speedtest_upload Upload bandwidth (Bps)
# TYPE speedtest_upload gauge
speedtest_upload ${test.upload.bandwidth}
# HELP speedtest_download Download bandwidth (Bps)
# TYPE speedtest_download gauge
speedtest_download ${test.download.bandwidth}
# HELP speedtest_latency Latency (ms)
# TYPE speedtest_latency gauge
speedtest_latency ${test.ping.latency}
# HELP speedtest_packet_loss Number of lost packets
# TYPE speedtest_packet_loss gauge
speedtest_packet_loss ${test.packetLoss}
    `);
  } catch (error) {
    return next(error);
  }
});

const port = process.env.port || 9112;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/metrics`);
});
server.on('error', console.error);
