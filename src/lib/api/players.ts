import { z } from 'zod';
import { fetchAPI, fetchPaginatedAPI, validateResponse } from './client';
import { PlayerBlockDataSchema } from '../../types/api';
import { getBlocks } from './blocks';  // Add this import

// Response schemas for the various endpoints
const PlayerBalanceResponse = z.object({
  player_id: z.string(),
  block_id: z.string(),
  balance: z.string()
});

const PlayerEthBalanceResponse = z.object({
  player_id: z.string(),
  eth_block_num: z.number(),
  balance: z.string()
});

const PlayerRoundEarningsResponse = z.object({
  player_id: z.string(),
  block_id: z.string(),
  round_earnings: z.string()
});

const TopBalanceResponse = z.object({
  player_id: z.string(),
  balance: z.string()
});

const PlayerBalanceSchema = z.object({
  eth_block_num: z.number(),
  balance: z.string(),
  player_id: z.string(),
  datetime: z.string(),
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

// Get all player block data for a specific block
export async function getPlayerBlockDataByBlock(blockId?: string) {
  const actualBlockId = blockId || await getLatestBlockId();
  const data = await fetchAPI<[unknown, number]>(`/players/block-data/${actualBlockId}`);
  const [items, total] = data;
  const validatedItems = await validateResponse(z.array(PlayerBlockDataSchema), items);
  return { data: validatedItems, total };
}

// Get block data for a specific player with pagination
export async function getPlayerBlockDataHistory(
  playerId: string,
  page = 0,
  count = 10
) {
  const data = await fetchAPI(`/players/${playerId}/block-data?page=${page}&count=${count}`);
  return validateResponse(z.array(PlayerBlockDataSchema), data);
}

// Get specific block data for a player
export async function getPlayerBlockData(playerId: string, blockId: string) {
  const data = await fetchAPI(`/players/${playerId}/block-data/${blockId}`);
  return validateResponse(PlayerBlockDataSchema, data);
}

export async function getActivePlayersByBlock(blockId?: string) {
  const actualBlockId = blockId || await getLatestBlockId();
  const data = await fetchAPI<[string[], number]>(`/players/active/${actualBlockId}`);
  return data;
}

export async function getPlayerBalance(playerId: string, blockId: string) {
  const data = await fetchAPI(`/players/${playerId}/balance/block/${blockId}`);
  const validated = await validateResponse(PlayerBalanceResponse, data);
  return validated.balance;
}

export async function getPlayerBalanceByEthBlock(
  playerId: string,
  ethBlockNum: number
) {
  const data = await fetchAPI(`/players/${playerId}/balance/eth-block/${ethBlockNum}`);
  const validated = await validateResponse(PlayerEthBalanceResponse, data);
  return validated.balance;
}

export async function getPlayerRoundEarnings(playerId: string, blockId: string) {
  const data = await fetchAPI(`/players/${playerId}/round-earnings/${blockId}`);
  const validated = await validateResponse(PlayerRoundEarningsResponse, data);
  return validated.round_earnings;
}

export async function getTopPlayerBalances(n = 10) {
  const data = await fetchAPI(`/players/top-balances?n=${n}`);
  return validateResponse(z.array(TopBalanceResponse), data);
}

export async function getPlayerBalanceHistory(
  playerId: string,
  startBlock?: number,
  endBlock?: number
) {
  let url = `/players/${playerId}/balance-history`;
  if (startBlock !== undefined || endBlock !== undefined) {
    const params = new URLSearchParams();
    if (startBlock !== undefined) params.append('start_block', startBlock.toString());
    if (endBlock !== undefined) params.append('end_block', endBlock.toString());
    url += `?${params.toString()}`;
  }
  const data = await fetchAPI(url);
  return validateResponse(z.array(PlayerBalanceSchema), data);
}

export async function getPlayersBalancesGroupByBlock(n = 100) {
  const data = await fetchAPI(`/players/balances-by-block?n=${n}`);
  return validateResponse(z.array(PlayerBalanceSchema), data);
}

export async function getPlayersBalancesOverLastNBlocks(n = 100) {
  const data = await fetchAPI(`/players/balances-over-last-n-blocks?n=${n}`);
  return validateResponse(z.array(PlayerBalanceSchema), data);
}
