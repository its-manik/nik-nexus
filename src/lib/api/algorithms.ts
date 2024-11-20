import { z } from 'zod';
import { fetchAPI, fetchPaginatedAPI, validateResponse } from './client';
import { 
  AlgorithmSchema, 
  AlgorithmStateSchema,
  AlgorithmDataSchema,
  AlgorithmBlockDataSchema 
} from '../../types/api';

// Validate block ID format
function isValidBlockId(blockId: string): boolean {
  return /^[0-9a-f]{32}$/i.test(blockId);
}

export async function getAlgorithms(page = 0, count = 25) {
  try {
    console.log('[getAlgorithms] Fetching page:', page, 'count:', count);
    
    // Get the paginated response as a tuple [items, total]
    const [items, total] = await fetchAPI<[unknown[], number]>('/algorithms', {
      params: { page, count }
    });
    console.log('[getAlgorithms] Raw API response items:', JSON.stringify(items, null, 2));
    console.log('[getAlgorithms] Raw API response total:', total);
    
    // Validate the items array
    const validatedItems = await validateResponse(z.array(AlgorithmSchema), items);
    console.log('[getAlgorithms] Validated items:', validatedItems.length);
    console.log('[getAlgorithms] Total count:', total);
    
    // Return in the expected format with the actual total from the database
    return { 
      data: validatedItems, 
      total: total 
    };
  } catch (error) {
    console.error('[getAlgorithms] Error:', error);
    throw error;
  }
}

export async function getAlgorithm(id: string) {
  try {
    // Log raw response
    const rawData = await fetchAPI(`/algorithms/${id}`);
    console.log('[getAlgorithm] Raw API response:', JSON.stringify(rawData, null, 2));
    
    const validated = await validateResponse(AlgorithmSchema, rawData);
    console.log('[getAlgorithm] Validated data:', JSON.stringify(validated, null, 2));
    return validated;
  } catch (error) {
    console.error('[getAlgorithm] Validation error:', error);
    throw error;
  }
}

export async function getAlgorithmsByBlock(blockId: string, comparison = '<=') {
  try {
    if (!isValidBlockId(blockId)) {
      console.error('[getAlgorithmsByBlock] Invalid block ID format:', blockId);
      return [];
    }

    // Log raw response
    const rawData = await fetchAPI<unknown[]>(`/algorithms/by-block/${blockId}?comparison=${comparison}`);
    console.log('[getAlgorithmsByBlock] Raw API response:', JSON.stringify(rawData, null, 2));
    
    const validated = await validateResponse(z.array(AlgorithmSchema), rawData);
    console.log('[getAlgorithmsByBlock] Validated data:', JSON.stringify(validated, null, 2));
    return validated;
  } catch (error) {
    console.error('[getAlgorithmsByBlock] Error:', error);
    return [];
  }
}

export async function getAlgorithmState(id: string) {
  try {
    const data = await fetchAPI(`/algorithms/${id}/state`);
    console.log('[getAlgorithmState] Raw response:', JSON.stringify(data, null, 2));
    const validated = await validateResponse(AlgorithmStateSchema, data);
    console.log('[getAlgorithmState] Validated data:', JSON.stringify(validated, null, 2));
    return validated;
  } catch (error) {
    console.error('[getAlgorithmState] Validation error:', error);
    throw error;
  }
}

export async function getAlgorithmData(id: string) {
  try {
    const data = await fetchAPI(`/algorithms/${id}/data`);
    console.log('[getAlgorithmData] Raw response:', JSON.stringify(data, null, 2));
    const validated = await validateResponse(AlgorithmDataSchema, data);
    console.log('[getAlgorithmData] Validated data:', JSON.stringify(validated, null, 2));
    return validated;
  } catch (error) {
    console.error('[getAlgorithmData] Validation error:', error);
    throw error;
  }
}

export async function getAlgorithmBlockData(algorithmId: string, blockId: string) {
  try {
    const data = await fetchAPI(`/algorithms/${algorithmId}/block-data/${blockId}`);
    console.log('[getAlgorithmBlockData] Raw response:', JSON.stringify(data, null, 2));
    const validated = await validateResponse(AlgorithmBlockDataSchema, data);
    console.log('[getAlgorithmBlockData] Validated data:', JSON.stringify(validated, null, 2));
    return validated;
  } catch (error) {
    console.error('[getAlgorithmBlockData] Validation error:', error);
    throw error;
  }
}

export async function getAlgorithmsBlockDataByBlock(blockId: string) {
  try {
    const [items, total] = await fetchAPI<[unknown, number]>(`/algorithms/block-data/${blockId}`);
    console.log('[getAlgorithmsBlockDataByBlock] Raw response:', JSON.stringify([items, total], null, 2));
    const validatedItems = await validateResponse(z.array(AlgorithmBlockDataSchema), items);
    console.log('[getAlgorithmsBlockDataByBlock] Validated data:', JSON.stringify(validatedItems, null, 2));
    return { data: validatedItems, total };
  } catch (error) {
    console.error('[getAlgorithmsBlockDataByBlock] Validation error:', error);
    throw error;
  }
}

export async function getAlgorithmRoundEarnings(algorithmId: string, blockId: string) {
  try {
    const data = await fetchAPI<{ round_earnings: string }>(
      `/algorithms/${algorithmId}/round-earnings/${blockId}`
    );
    console.log('[getAlgorithmRoundEarnings] Raw response:', JSON.stringify(data, null, 2));
    return data.round_earnings;
  } catch (error) {
    console.error('[getAlgorithmRoundEarnings] Error:', error);
    throw error;
  }
}
