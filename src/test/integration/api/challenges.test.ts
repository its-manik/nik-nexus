import { describe, expect, it, beforeAll, afterAll, afterEach } from 'vitest';
import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';
import { getChallenges, getChallenge } from '../../../lib/api';
import { monitor } from '../../../lib/monitoring';

const server = setupServer(
  http.get('/api/challenges', () => {
    return HttpResponse.json({
      challenges: [
        {
          challenge_id: 'c004',
          challenge_name: 'vector_search',
          round_submitted: 123,
          block_confirmed: 17860934,
          block_submitted: 17860930,
        },
      ],
      total: 1,
    });
  }),

  http.get('/api/challenges/:id', ({ params }) => {
    const { id } = params;
    if (id === 'invalid') {
      return new HttpResponse(null, { status: 404 });
    }
    return HttpResponse.json({
      challenge_id: id,
      challenge_name: 'vector_search',
      round_submitted: 123,
      block_confirmed: 17860934,
      block_submitted: 17860930,
      difficulty_params: {
        num_variables: 500,
        clauses_to_variables_percent: 400,
      },
      reward_schedule: {
        base_reward: '1000000000000000000',
        decay_rate: 0.1,
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

describe('Challenges API Integration', () => {
  it('successfully fetches challenges list with monitoring', async () => {
    const response = await getChallenges(0, 10);
    
    expect(response.challenges).toHaveLength(1);
    expect(response.total).toBe(1);
    expect(response.challenges[0].challenge_name).toBe('vector_search');

    const metrics = monitor.getMetrics();
    expect(metrics.some(m => m.name === 'api.getChallenges.duration')).toBe(true);
  });

  it('successfully fetches single challenge with details', async () => {
    const response = await getChallenge('c004');
    
    expect(response.challenge_id).toBe('c004');
    expect(response.difficulty_params).toBeDefined();
    expect(response.reward_schedule).toBeDefined();
  });

  it('handles challenge not found with error monitoring', async () => {
    try {
      await getChallenge('invalid');
      throw new Error('Should have thrown');
    } catch (error) {
      const logs = monitor.getLogs();
      expect(logs).toHaveLength(1);
      expect(logs[0].type).toBe('error');
    }
  });

  it('handles malformed challenge data', async () => {
    server.use(
      http.get('/api/challenges/:id', () => {
        return HttpResponse.json({
          challenge_id: 'malformed',
          difficulty_params: 'invalid',
        });
      })
    );

    try {
      await getChallenge('malformed');
      throw new Error('Should have thrown');
    } catch (error) {
      const logs = monitor.getLogs();
      expect(logs).toHaveLength(1);
      expect(logs[0].type).toBe('error');
    }
  });
});