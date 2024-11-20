import { describe, expect, it, beforeAll, afterAll, afterEach } from 'vitest';
import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';
import { getBenchmarks, getBenchmark } from '../../../lib/api';
import { monitor } from '../../../lib/monitoring';

const server = setupServer(
  http.get('/api/benchmarks', () => {
    return HttpResponse.json({
      benchmarks: [
        {
          id: 'bench1',
          datetime_added: '2024-03-14T12:00:00Z',
          merkle_root: null,
          num_solutions: 1,
          block_confirmed: 305580,
          performance_metrics: {
            avg_solution_time: 0.45,
            success_rate: 92.5,
            memory_usage: '128MB',
          },
        },
      ],
      total: 1,
    });
  }),

  http.get('/api/benchmarks/:id', ({ params }) => {
    const { id } = params;
    if (id === 'invalid') {
      return new HttpResponse(null, { status: 404 });
    }
    return HttpResponse.json({
      id,
      datetime_added: '2024-03-14T12:00:00Z',
      merkle_root: 'aa84e2f1b7228ee16a18ce4d65c6969547273ff56bf720bafd637bcf26759d7e',
      num_solutions: 7,
      block_confirmed: 440987,
      sampled_nonces: [9059488, 9422415],
      solution_nonces: [9059488, 393330],
      performance_metrics: {
        avg_solution_time: 0.45,
        success_rate: 92.5,
        memory_usage: '128MB',
      },
    });
  })
);

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  monitor.clear();
});
afterAll(() => server.close());

describe('Benchmarks API Integration', () => {
  it('successfully fetches benchmarks list with monitoring', async () => {
    const response = await getBenchmarks(0, 10);
    
    expect(response.benchmarks).toHaveLength(1);
    expect(response.total).toBe(1);
    expect(response.benchmarks[0].performance_metrics).toBeDefined();

    const metrics = monitor.getMetrics();
    expect(metrics.some(m => m.name === 'api.getBenchmarks.duration')).toBe(true);
  });

  it('successfully fetches single benchmark with details', async () => {
    const response = await getBenchmark('bench1');
    expect(response.id).toBe('bench1');
    expect(response.merkle_root).toBeDefined();
    expect(response.sampled_nonces).toHaveLength(2);
    expect(response.solution_nonces).toHaveLength(2);
  });

  it('handles benchmark not found with error monitoring', async () => {
    try {
      await getBenchmark('invalid');
      throw new Error('Should have thrown');
    } catch (error) {
      const logs = monitor.getLogs();
      expect(logs).toHaveLength(1);
      expect(logs[0].type).toBe('error');
    }
  });

  it('handles server errors with monitoring', async () => {
    server.use(
      http.get('/api/benchmarks', () => {
        return new HttpResponse(null, { status: 500 });
      })
    );

    try {
      await getBenchmarks(0, 10);
      throw new Error('Should have thrown');
    } catch (error) {
      const logs = monitor.getLogs();
      expect(logs).toHaveLength(1);
      expect(logs[0].type).toBe('error');
      expect(logs[0].message).toContain('500');
    }
  });
});