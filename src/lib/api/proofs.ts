import { z } from 'zod';
import { fetchAPI, validateResponse } from './client';
import { 
  ProofSchema, 
  ProofStateSchema,
  ProofDataSchema 
} from '../../types/api';

export async function getProofs(page = 0, count = 25) {
  try {
    console.log('[getProofs] Fetching page:', page, 'count:', count);
    
    // Get proofs with pagination
    const response = await fetchAPI<unknown[]>('/proofs', {
      params: { page, count }
    });
    console.log('[getProofs] Raw API response:', JSON.stringify(response, null, 2));
    
    // Validate the array
    const validatedItems = await validateResponse(z.array(ProofSchema), response);
    console.log('[getProofs] Validated items:', validatedItems.length);
    
    return { 
      data: validatedItems, 
      total: validatedItems.length // Use length as total since API doesn't return total
    };
  } catch (error) {
    console.error('[getProofs] Error:', error);
    throw error;
  }
}

export async function getProofByBenchmark(benchmarkId: string) {
  try {
    console.log('[getProofByBenchmark] Fetching proof for benchmark:', benchmarkId);
    const data = await fetchAPI(`/proofs/${benchmarkId}`);
    console.log('[getProofByBenchmark] Raw response:', JSON.stringify(data, null, 2));
    return validateResponse(ProofSchema, data);
  } catch (error) {
    console.error('[getProofByBenchmark] Error:', error);
    throw error;
  }
}

export async function getProofsByBlock(blockId: string) {
  try {
    console.log('[getProofsByBlock] Fetching proofs for block:', blockId);
    const data = await fetchAPI(`/proofs/by-block/${blockId}`);
    console.log('[getProofsByBlock] Raw response:', JSON.stringify(data, null, 2));
    return validateResponse(z.array(ProofSchema), data);
  } catch (error) {
    console.error('[getProofsByBlock] Error:', error);
    throw error;
  }
}

export async function getProofState(benchmarkId: string) {
  try {
    console.log('[getProofState] Fetching state for benchmark:', benchmarkId);
    const data = await fetchAPI(`/proofs/${benchmarkId}/state`);
    console.log('[getProofState] Raw response:', JSON.stringify(data, null, 2));
    return validateResponse(ProofStateSchema, data);
  } catch (error) {
    console.error('[getProofState] Error:', error);
    throw error;
  }
}

export async function getProofData(benchmarkId: string) {
  try {
    console.log('[getProofData] Fetching data for benchmark:', benchmarkId);
    const data = await fetchAPI(`/proofs/${benchmarkId}/data`);
    console.log('[getProofData] Raw response:', JSON.stringify(data, null, 2));
    return validateResponse(ProofDataSchema, data);
  } catch (error) {
    console.error('[getProofData] Error:', error);
    throw error;
  }
}