import { describe, expect, it, beforeAll, afterAll, afterEach } from 'vitest';
import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';
import { getAccounts, getAccount } from '../../../lib/api';
import { monitor } from '../../../lib/monitoring';

const server = setupServer(
  http.get('/api/accounts', () => {
    return HttpResponse.json({
      accounts: [
        {
          id: '0xfffa67a7d2277b9bebef6f0fedc3fb43abf19a32',
          datetime_added: '2024-08-31T22:43:55.069442Z',
          name: '0xfffa67a7d2277b9bebef6f0fedc3fb43abf19a32',
          is_multisig: false,
          api_key: '37946e9a9a8b719d9fd7c9aed95ee4c5',
          balance: '243762659438222120103',
          total_fees_paid: '6178167500000000000',
          available_fee_balance: '3821832500000000000',
          round_earnings: '7464587246891947119',
        },
      ],
      total: 1,
    });
  }),

  http.get('/api/accounts/:id', ({ params }) => {
    const { id } = params;
    if (id === 'invalid') {
      return new HttpResponse(null, { status: 404 });
    }
    return HttpResponse.json({
      player: {
        id,
        datetime_added: '2024-08-31T22:43:55.069442Z',
        name: id,
        is_multisig: false,
        api_key: '37946e9a9a8b719d9fd7c9aed95ee4c5',
      },
      player_balance_data: {
        eth_block_num: '16961496',
        balance: '243762659438222120103',
      },
      player_round_earnings: {
        round_earnings: '7464587246891947119',
      },
      player_state: {
        total_fees_paid: '6178167500000000000',
        available_fee_balance: '3821832500000000000',
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

describe('Accounts API Integration', () => {
  it('successfully fetches accounts list with monitoring', async () => {
    const response = await getAccounts(0, 10);
    
    expect(response.accounts).toHaveLength(1);
    expect(response.total).toBe(1);
    expect(response.accounts[0].balance).toBeDefined();

    const metrics = monitor.getMetrics();
    expect(metrics.some(m => m.name === 'api.getAccounts.duration')).toBe(true);
  });

  it('successfully fetches single account with details', async () => {
    const accountId = '0xfffa67a7d2277b9bebef6f0fedc3fb43abf19a32';
    const response = await getAccount(accountId);
    
    expect(response.player.id).toBe(accountId);
    expect(response.player_balance_data.balance).toBeDefined();
    expect(response.player_round_earnings.round_earnings).toBeDefined();
    expect(response.player_state.total_fees_paid).toBeDefined();
  });

  it('handles account not found with error monitoring', async () => {
    try {
      await getAccount('invalid');
      throw new Error('Should have thrown');
    } catch (error) {
      const logs = monitor.getLogs();
      expect(logs).toHaveLength(1);
      expect(logs[0].type).toBe('error');
    }
  });

  it('validates account balance data', async () => {
    server.use(
      http.get('/api/accounts/:id', () => {
        return HttpResponse.json({
          player: {
            id: 'test',
            datetime_added: '2024-08-31T22:43:55.069442Z',
          },
          player_balance_data: {
            balance: 'invalid', // Invalid balance format
          },
        });
      })
    );

    try {
      await getAccount('test');
      throw new Error('Should have thrown');
    } catch (error) {
      const logs = monitor.getLogs();
      expect(logs).toHaveLength(1);
      expect(logs[0].type).toBe('error');
    }
  });
});