import { describe, expect, it, beforeAll, afterAll, afterEach } from 'vitest';
import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';
import { getBlocks, getBlock, getAlgorithms, getBenchmarks } from '../../lib/api';

const server = setupServer(
  // Blocks endpoints
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
    return HttpResponse.json({
      id,
      height: 1,
      datetime_added: '2024-03-14T12:00:00Z',
      hash: '0x123...',
      miner: '0xabc...',
      tx_count: 10,
    });
  }),

  // Algorithms endpoints
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

  // Benchmarks endpoints
  http.get('/api/benchmarks', () => {
    return HttpResponse.json({
      benchmarks: [
        {
          id: 'bench1',
          datetime_added: '2024-03-14T12:00:00Z',
          merkle_root: null,
          num_solutions: 1,
          block_confirmed: 1,
        },
      ],
      total: 1,
    });
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('API Integration', () => {
  describe('Blocks API', () => {
    it('fetches blocks list successfully', async () => {
      const response = await getBlocks(0, 10);
      expect(response.blocks).toHaveLength(1);
      expect(response.total).toBe(1);
    });

    it('fetches single block successfully', async () => {
      const response = await getBlock('1');
      expect(response.id).toBe('1');
    });

    it('handles block not found', async () => {
      server.use(
        http.get('/api/blocks/:id', () => {
          return new HttpResponse(null, { status: 404 });
        })
      );

      await expect(getBlock('999')).rejects.toThrow();
    });
  });

  describe('Algorithms API', () => {
    it('fetches algorithms list successfully', async () => {
      const response = await getAlgorithms(0, 10);
      expect(response.algorithms).toHaveLength(1);
      expect(response.total).toBe(1);
    });

    it('handles API errors', async () => {
      server.use(
        http.get('/api/algorithms', () => {
          return new HttpResponse(null, { status: 500 });
        })
      );

      await expect(getAlgorithms(0, 10)).rejects.toThrow();
    });
  });

  describe('Benchmarks API', () => {
    it('fetches benchmarks list successfully', async () => {
      const response = await getBenchmarks(0, 10);
      expect(response.benchmarks).toHaveLength(1);
      expect(response.total).toBe(1);
    });

    it('handles network errors', async () => {
      server.use(
        http.get('/api/benchmarks', () => {
          return HttpResponse.error();
        })
      );

      await expect(getBenchmarks(0, 10)).rejects.toThrow();
    });
  });
});