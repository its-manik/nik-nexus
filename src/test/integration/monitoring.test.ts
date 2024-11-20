import { describe, expect, it, beforeEach } from 'vitest';
import { monitor } from '../../lib/monitoring';

describe('Monitoring Integration', () => {
  beforeEach(() => {
    monitor.clear();
  });

  it('records error reports', () => {
    const error = new Error('Test error');
    const context = { test: true };

    monitor.reportError(error, context);
    const logs = monitor.getLogs();

    expect(logs).toHaveLength(1);
    expect(logs[0]).toMatchObject({
      message: 'Test error',
      context: { test: true },
      type: 'error',
    });
  });

  it('records performance metrics', () => {
    monitor.recordMetric('test.operation', 100, 'ms', { tag: 'value' });
    const metrics = monitor.getMetrics();

    expect(metrics).toHaveLength(1);
    expect(metrics[0]).toMatchObject({
      name: 'test.operation',
      value: 100,
      unit: 'ms',
      tags: { tag: 'value' },
    });
  });

  it('measures API calls', () => {
    const startTime = performance.now() - 100; // Simulate 100ms operation
    monitor.measureApiCall('test.api', startTime);
    
    const metrics = monitor.getMetrics();
    expect(metrics).toHaveLength(1);
    expect(metrics[0].name).toBe('api.test.api.duration');
    expect(metrics[0].value).toBeGreaterThan(0);
  });
});