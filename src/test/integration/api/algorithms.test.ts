import { describe, expect, it, beforeAll, afterAll, afterEach } from 'vitest';
import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';
import { getAlgorithms, getAlgorithm } from '../../../lib/api';
import { monitor } from '../../../lib/monitoring';

const server = setupServer(
  http.get('/api/algorithms', () => {
    return HttpResponse.json({
      algorithms: [
        {
          id: 'algo1',
          name: 'Test Algorithm',
          datetime_added: '2024-03-14T12:00:00Z',
          player_id: '0x123...',
          challenge_id: 'c001',
          tx_hash: '0xdef...',
        },
      ],
      total: 1,
    });
  }),

  http.get('/api/algorithms/:id', ({ params }) => {
    const { id } = params;
    if (id === 'invalid') {
      return new HttpResponse(null, { status: 404 });
    }
    return HttpResponse.json({
      id,
      name: 'Test Algorithm',
      datetime_added: '2024-03-14T12:00:00Z',
      player_id: '0x123...',
      challenge_id: 'c001',
      tx_hash: '0xdef...',
    });
  })
);

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  monitor.clear();
});
afterAll(() => server.close());

describe('Algorithms API Integration', () => {
  it('successfully fetches algorithms list with monitoring', async () => {
    const response = await getAlgorithms(0, 10);
    
    expect(response.algorithms).toHaveLength(1);
    expect(response.total).toBe(1);

    const metrics = monitor.getMetrics();
    expect(metrics.some(m => m.name === 'api.getAlgorithms.duration')).toBe(true);
  });

  it('successfully fetches single algorithm', async () => {
    const response = await getAlgorithm('algo1');
    expect(response.id).toBe('algo1');
  });

  it('handles algorithm not found with error monitoring', async () => {
    try {
      await getAlgorithm('invalid');
      throw new Error('Should have thrown');
    } catch (error) {
      const logs = monitor.getLogs();
      expect(logs).toHaveLength(1);
      expect(logs[0].type).toBe('error');
    }
  });

  it('handles network errors', async () => {
    server.use(
      http.get('/api/algorithms', () => {
        return HttpResponse.error();
      })
    );

    try {
      await getAlgorithms(0, 10);
      throw new Error('Should have thrown');
    } catch (error) {
      const logs = monitor.getLogs();
      expect(logs).toHaveLength(1);
      expect(logs[0].type).toBe('error');
    }
  });
});