import { z } from 'zod';
import { fetchAPI, fetchPaginatedAPI, validateResponse } from './client';
import { BlockSchema, BlockDataSchema } from '../../types/api';

export async function getBlocks(page = 0, count = 10, ascending = false) {
  return fetchPaginatedAPI('/blocks', BlockSchema, page, count, {
    params: { ascending }
  });
}

export async function getBlock(id: string) {
  const data = await fetchAPI(`/blocks/${id}`);
  return validateResponse(BlockSchema, data);
}

export async function getBlockByIdx(idx: number) {
  const data = await fetchAPI(`/blocks/by-idx/${idx}`);
  return validateResponse(BlockSchema, data);
}

export async function getBlockData(id: string): Promise<BlockData | null> {
  try {
    const data = await fetchAPI(`/blocks/${id}/data`);
    console.log('Raw block data:', data); // Add logging
    const validated = await validateResponse(BlockDataSchema, data);
    console.log('Validated block data:', validated); // Add logging
    return validated;
  } catch (error) {
    console.error('Error fetching block data:', error);
    return null;
  }
}

export async function getEthBlockNum(id: string) {
  const data = await fetchAPI<{ eth_block_num: number }>(`/blocks/${id}/eth-block-num`);
  return data.eth_block_num;
}

export async function getBlockIdFromBenchmark(benchmarkId: string) {
  const data = await fetchAPI<{ block_id: string }>(`/blocks/by-benchmark/${benchmarkId}`);
  return data.block_id;
}

export async function getAverageBlockTime(): Promise<number> {
  try {
    console.log('[getAverageBlockTime] Fetching average block time...');
    const response = await fetchAPI<string>('/block-avg-time');
    console.log('[getAverageBlockTime] Raw response:', JSON.stringify(response, null, 2));
    
    // Convert the string response to a number
    const avgTime = parseFloat(response);
    if (isNaN(avgTime)) {
      throw new Error('Invalid average block time response');
    }
    
    return avgTime;
  } catch (error) {
    console.error('[getAverageBlockTime] Error:', error);
    throw error;
  }
}
