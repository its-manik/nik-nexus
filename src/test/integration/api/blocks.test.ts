import { describe, expect, it, beforeAll, afterAll, afterEach } from 'vitest';
import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';
import { getBlocks, getBlock } from '../../../lib/api';
import { monitor } from '../../../lib/monitoring';

const server = setupServer(
  http.get('/api/blocks', () => {
    return HttpResponse.json({
      blocks: [
        {
          id: '1',
          height: 1,
          datetime_added: '2024-03-14T12:00:00Z',
          hash: '0x123...',
          miner: '0xabc...',
          tx_count: 10,
        },
      ],
      total: 1,
    });
  }),

  http.get('/api/blocks/:id', ({ params }) => {
    const { id } = params;
    if (id === '999') {
      return new HttpResponse(null, { status: 404 });
    }
    return HttpResponse.json({
      id,
      height: 1,
      datetime_added: '2024-03-14T12:00:00Z',
      hash: '0x123...',
      miner: '0xabc...',
      tx_count: 10,
    });
  })
);

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  monitor.clear();
});
afterAll(() => server.close());

describe('Blocks API Integration', () => {
  it('successfully fetches blocks list with monitoring', async () => {
    const response = await getBlocks(0, 10);
    
    // Verify response
    expect(response.blocks).toHaveLength(1);
    expect(response.total).toBe(1);

    // Verify monitoring
    const metrics = monitor.getMetrics();
    expect(metrics.some(m => m.name === 'api.getBlocks.duration')).toBe(true);
  });

  it('successfully fetches single block', async () => {
    const response = await getBlock('1');
    expect(response.id).toBe('1');
  });

  it('handles block not found with error monitoring', async () => {
    try {
      await getBlock('999');
      throw new Error('Should have thrown');
    } catch (error) {
      const logs = monitor.getLogs();
      expect(logs).toHaveLength(1);
      expect(logs[0].type).toBe('error');
    }
  });

  it('handles network errors', async () => {
    server.use(
      http.get('/api/blocks', () => {
        return HttpResponse.error();
      })
    );

    try {
      await getBlocks(0, 10);
      throw new Error('Should have thrown');
    } catch (error) {
      const logs = monitor.getLogs();
      expect(logs).toHaveLength(1);
      expect(logs[0].type).toBe('error');
    }
  });
});