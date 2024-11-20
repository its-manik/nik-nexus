import '@testing-library/jest-dom';
import { afterAll, afterEach, beforeAll } from 'vitest';
import { setupServer } from 'msw/node';
import { HttpResponse, http } from 'msw';

// Mock handlers for API endpoints
const handlers = [
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

  // Add more handlers as needed
];

const server = setupServer(...handlers);

// Start server before all tests
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));

// Reset handlers after each test
afterEach(() => server.resetHandlers());

// Clean up after all tests
afterAll(() => server.close());