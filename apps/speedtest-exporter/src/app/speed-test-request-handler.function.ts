import {Request, Response, NextFunction} from 'express';
import * as speedTest from 'speedtest-net';
import { SpeedTestResult, SpeedTestEvent } from './external.interface';
import { formatPrometheusMetric } from './format-prometheus-metric.function';
import { Subject } from 'rxjs';
import { pairwise, map, distinctUntilChanged, filter, tap, takeUntil } from 'rxjs/operators';

export async function speedTestRequestHandler(request: Request, response: Response, next: NextFunction): Promise<any> {

  const events = new Subject<SpeedTestEvent>();

  events.pipe(
    map(e => e.type),
    filter(e => e !== 'testStart'),
    distinctUntilChanged(),
    tap(e => console.log(`executing ${e} ...`))
  ).subscribe();

  try {
    console.log('starting speed test ...');

    const test: SpeedTestResult = await speedTest({
      acceptLicense: true,
      acceptGdpr: true,
      progress: e => events.next(e)
    });

    console.log('speed test completed');

    response
      .contentType('text/plain')
      .send(
`${formatPrometheusMetric('ping_jitter', test.ping.jitter)}
${formatPrometheusMetric('ping_latency', test.ping.latency, 'Latency in ms')}
${formatPrometheusMetric('download_bandwidth', test.download.bandwidth, 'Download bandwidth in bytes per second')}
${formatPrometheusMetric('download_bytes', test.download.bytes, 'Total bytes downloaded')}
${formatPrometheusMetric('download_elapsed', test.download.elapsed, 'Elapsed download time')}
${formatPrometheusMetric('upload_bandwidth', test.upload.bandwidth, 'Upload bandwidth in bytes per second')}
${formatPrometheusMetric('upload_bytes', test.upload.bytes, 'Total bytes uploaded')}
${formatPrometheusMetric('upload_elapsed', test.upload.elapsed, 'Elapsed upload time')}
${formatPrometheusMetric('packet_loss', test.packetLoss, 'Number of lost packets')}
${formatPrometheusMetric('isp', { name: test.isp }, 'Internet service provider')}
${formatPrometheusMetric('interface', test.interface, 'Network interface used by the test')}
${formatPrometheusMetric('server', test.server, 'Server used by the test')}
${formatPrometheusMetric('result', test.result, 'Test result details')}
`);
  } catch (error) {
    console.error('speed test failed', error);
    return next(error);
  } finally {
    events.complete();
  }

}
