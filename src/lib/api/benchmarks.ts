import { z } from 'zod';
import { fetchAPI, fetchPaginatedAPI, validateResponse } from './client';
import { 
  BenchmarkSchema, 
  BenchmarkStateSchema,
  BenchmarkDataSchema 
} from '../../types/api';

export async function getBenchmarks(page = 0, count = 25) {
  try {
    console.log('[getBenchmarks] Fetching page:', page, 'count:', count);
    
    // Get the raw response
    const response = await fetchAPI<[unknown[], number]>('/benchmarks', {
      params: { page, count }
    });
    console.log('[getBenchmarks] Raw response:', JSON.stringify(response, null, 2));

    // The response is [[...items], total], so we need to get the first array
    const [itemsArray, total] = response;
    console.log('[getBenchmarks] Items array:', JSON.stringify(itemsArray, null, 2));
    console.log('[getBenchmarks] Total:', total);
    
    // Validate the items array
    const validatedItems = await validateResponse(z.array(BenchmarkSchema), itemsArray);
    console.log('[getBenchmarks] Validated items:', validatedItems.length);
    
    return { 
      data: validatedItems, 
      total: total 
    };
  } catch (error) {
    console.error('[getBenchmarks] Error:', error);
    throw error;
  }
}

export async function getBenchmark(id: string) {
  try {
    const data = await fetchAPI(`/benchmarks/${id}`);
    console.log('[getBenchmark] Raw API response:', JSON.stringify(data, null, 2));
    const validated = await validateResponse(BenchmarkSchema, data);
    console.log('[getBenchmark] Validated data:', JSON.stringify(validated, null, 2));
    return validated;
  } catch (error) {
    console.error('[getBenchmark] Error:', error);
    throw error;
  }
}

export async function getBenchmarkState(id: string) {
  try {
    const data = await fetchAPI(`/benchmarks/${id}/state`);
    console.log('[getBenchmarkState] Raw API response:', JSON.stringify(data, null, 2));
    const validated = await validateResponse(BenchmarkStateSchema, data);
    console.log('[getBenchmarkState] Validated data:', JSON.stringify(validated, null, 2));
    return validated;
  } catch (error) {
    console.error('[getBenchmarkState] Error:', error);
    throw error;
  }
}

export async function getBenchmarkData(id: string) {
  try {
    const data = await fetchAPI(`/benchmarks/${id}/data`);
    console.log('[getBenchmarkData] Raw API response:', JSON.stringify(data, null, 2));
    const validated = await validateResponse(BenchmarkDataSchema, data);
    console.log('[getBenchmarkData] Validated data:', JSON.stringify(validated, null, 2));
    return validated;
  } catch (error) {
    console.error('[getBenchmarkData] Error:', error);
    throw error;
  }
}

export async function getBenchmarksByBlock(blockId: string) {
  const data = await fetchAPI(`/benchmarks/by-block/${blockId}`);
  return validateResponse(z.array(BenchmarkSchema), data);
}