import { z } from 'zod';
import { fetchAPI, validateResponse } from './client';
import { PlayerBlockDataSchema, AccountSchema, LeaderboardEntry } from '../../types/api';

const AccountBalanceResponse = z.object({
  player_id: z.string(),
  block_id: z.string(),
  balance: z.string()
});

// Helper function to get the latest block ID
async function getLatestBlockId(): Promise<string> {
  const data = await fetchAPI<[unknown, number]>('/blocks?ascending=false&count=1');
  const [blocks] = data;
  const validatedBlocks = await validateResponse(z.array(z.object({
    id: z.string(),
    datetime_added: z.string(),
    prev_block_id: z.string(),
    height: z.number(),
    round: z.number(),
    config: z.record(z.unknown()),
    eth_block_num: z.number().optional(),
  })), blocks);

  if (!validatedBlocks || validatedBlocks.length === 0) {
    throw new Error('No blocks found');
  }
  return validatedBlocks[0].id;
}

// Since accounts are actually players in the backend, we'll use the player endpoints
export async function getAccounts() {
  try {
    const blockId = await getLatestBlockId();
    console.log('[getAccounts] Latest block ID:', blockId);

    const response = await fetchAPI<[unknown[], number]>(`/players/block-data/${blockId}`);
    console.log('[getAccounts] Raw response:', JSON.stringify(response, null, 2));

    const [playerDataArray, total] = response;
    console.log('[getAccounts] Player data array:', JSON.stringify(playerDataArray, null, 2));

    const validatedItems = await validateResponse(z.array(PlayerBlockDataSchema), playerDataArray);
    console.log('[getAccounts] Validated items:', JSON.stringify(validatedItems, null, 2));

    if (!validatedItems || validatedItems.length === 0) {
      console.log('[getAccounts] No validated items found');
      return { data: [], total: 0 };
    }

    // Transform PlayerBlockData into Account format, maintaining all original fields
    const accounts = validatedItems.map(item => ({
      id: item.player_id, // Map player_id to id for UI
      player_id: item.player_id,
      block_id: item.block_id,
      num_qualifiers_by_challenge: item.num_qualifiers_by_challenge,
      cutoff: item.cutoff,
      imbalance: item.imbalance,
      imbalance_penalty: item.imbalance_penalty,
      influence: item.influence,
      reward: item.reward,
      rolling_balance: item.rolling_balance,
      // Add derived fields that the UI expects
      datetime_added: new Date().toISOString(),
      balance: (item.rolling_balance ?? 0).toString(),
      round_earnings: (item.reward ?? 0).toString(),
    }));

    console.log('[getAccounts] Transformed accounts:', JSON.stringify(accounts, null, 2));
    return { data: accounts, total };
  } catch (error) {
    console.error('[getAccounts] Error fetching accounts:', error);
    return { data: [], total: 0 };
  }
}

export async function getAccount(playerId: string, page = 0, count = 10) {
  try {
    const data = await fetchAPI<PlayerBlockDataSchema[]>(`/players/${playerId}/block-data?page=${page}&count=${count}`);
    const validatedData = await validateResponse(z.array(PlayerBlockDataSchema), data);
    return validatedData;
  } catch (error) {
    console.error('Error fetching account:', error);
    return [];
  }
}

export async function getAccountBalance(id: string, blockId: string) {
  try {
    const data = await fetchAPI(`/players/${id}/balance/block/${blockId}`);
    const validated = await validateResponse(AccountBalanceResponse, data);
    return validated.balance;
  } catch (error) {
    console.error('Error fetching account balance:', error);
    return '0';
  }
}

// Add this function to the accounts API module
export async function getLeaderboard(n: number = 10) {
  try {
    console.log('[getLeaderboard] Fetching top', n, 'accounts...');
    const response = await fetchAPI<LeaderboardEntry[]>(`/accounts/leaderboard/${n}`);
    console.log('[getLeaderboard] Raw response:', JSON.stringify(response, null, 2));
    
    return {
      data: response,
      total: response.length
    };
  } catch (error) {
    console.error('[getLeaderboard] Error:', error);
    throw error;
  }
}
