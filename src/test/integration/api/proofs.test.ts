import { describe, expect, it, beforeAll, afterAll, afterEach } from 'vitest';
import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';
import { getProofs, getProof } from '../../../lib/api';
import { monitor } from '../../../lib/monitoring';

const server = setupServer(
  http.get('/api/proofs', () => {
    return HttpResponse.json({
      proofs: [
        {
          benchmark_id: 'ffffffecb1b37d2c0e3115ec4b6f4eb6',
          datetime_added: '2024-07-01T21:15:34.141013Z',
          block_confirmed: '305581',
          submission_delay: '3',
          num_merkle_proofs: 1,
          total_fuel_consumed: 1450631,
        },
      ],
      total: 1,
    });
  }),

  http.get('/api/proofs/:id', ({ params }) => {
    const { id } = params;
    if (id === 'invalid') {
      return new HttpResponse(null, { status: 404 });
    }
    return HttpResponse.json({
      benchmark_id: id,
      datetime_added: '2024-10-22T23:21:32.805342Z',
      block_confirmed: '440989',
      submission_delay: '5',
      proof_data: {
        merkle_proofs: [
          {
            leaf: {
              nonce: 9059488,
              solution: { routes: [[0, 3, 9, 4, 5, 0]] },
              fuel_consumed: 8391793,
              runtime_signature: 11814881146146202618,
            },
            branch: '0070158e72a63704c102dba37bdfd336156a5047c0a1926ac40934153fa3b019',
          },
        ],
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

describe('Proofs API Integration', () => {
  it('successfully fetches proofs list with monitoring', async () => {
    const response = await getProofs(0, 10);
    
    expect(response.proofs).toHaveLength(1);
    expect(response.total).toBe(1);
    expect(response.proofs[0].num_merkle_proofs).toBe(1);

    const metrics = monitor.getMetrics();
    expect(metrics.some(m => m.name === 'api.getProofs.duration')).toBe(true);
  });

  it('successfully fetches single proof with merkle data', async () => {
    const response = await getProof('proof1');
    expect(response.benchmark_id).toBe('proof1');
    expect(response.proof_data.merkle_proofs).toHaveLength(1);
    expect(response.proof_data.merkle_proofs[0].leaf.solution).toBeDefined();
  });

  it('handles proof not found with error monitoring', async () => {
    try {
      await getProof('invalid');
      throw new Error('Should have thrown');
    } catch (error) {
      const logs = monitor.getLogs();
      expect(logs).toHaveLength(1);
      expect(logs[0].type).toBe('error');
    }
  });

  it('handles malformed proof data', async () => {
    server.use(
      http.get('/api/proofs/:id', () => {
        return HttpResponse.json({
          benchmark_id: 'malformed',
          proof_data: { merkle_proofs: 'invalid' },
        });
      })
    );

    try {
      await getProof('malformed');
      throw new Error('Should have thrown');
    } catch (error) {
      const logs = monitor.getLogs();
      expect(logs).toHaveLength(1);
      expect(logs[0].type).toBe('error');
    }
  });
});