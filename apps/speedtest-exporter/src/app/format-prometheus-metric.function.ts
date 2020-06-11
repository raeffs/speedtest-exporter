const PREFIX = 'speedtest_';

export function formatPrometheusMetric(metricName: string, value: any, description: string = null, type: string = 'gauge'): string {
  let labels = '';

  if (typeof value === 'object') {
    labels = Object
      .keys(value)
      .map(k => `${k}="${value[k]}"`)
      .join(',');
    labels = `{${labels}}`;
    value = 1;
  }

  return `# HELP ${PREFIX}${metricName} ${description || metricName}
# TYPE ${PREFIX}${metricName} ${type}
${PREFIX}${metricName}${labels} ${value}`;
}
