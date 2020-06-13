# Prometheus Speedtest Exporter

A Prometheus exporter that exposes results of a speed test.

## Docker Compose

```dockerfile
speedtest-exporter:
  container_name: 'speedtest-exporter'
  image: 'raeffs/speedtest-exporter'
  restart: 'unless-stopped'
  ports: 
    - '9112:9112'
```

## Metrics

The following metrics are exposed on the `/metrics` endpoint:

```
# HELP speedtest_ping_jitter ping_jitter
# TYPE speedtest_ping_jitter gauge
speedtest_ping_jitter 3.049
# HELP speedtest_ping_latency Latency in ms
# TYPE speedtest_ping_latency gauge
speedtest_ping_latency 11.698
# HELP speedtest_download_bandwidth Download bandwidth in bytes per second
# TYPE speedtest_download_bandwidth gauge
speedtest_download_bandwidth 11000532
# HELP speedtest_download_bytes Total bytes downloaded
# TYPE speedtest_download_bytes gauge
speedtest_download_bytes 149649464
# HELP speedtest_download_elapsed Elapsed download time
# TYPE speedtest_download_elapsed gauge
speedtest_download_elapsed 15008
# HELP speedtest_upload_bandwidth Upload bandwidth in bytes per second
# TYPE speedtest_upload_bandwidth gauge
speedtest_upload_bandwidth 5548919
# HELP speedtest_upload_bytes Total bytes uploaded
# TYPE speedtest_upload_bytes gauge
speedtest_upload_bytes 30254260
# HELP speedtest_upload_elapsed Elapsed upload time
# TYPE speedtest_upload_elapsed gauge
speedtest_upload_elapsed 5519
# HELP speedtest_packet_loss Number of lost packets
# TYPE speedtest_packet_loss gauge
speedtest_packet_loss 0
```
