import { z } from 'zod';
import { fetchAPI, fetchPaginatedAPI, validateResponse } from './client';
import { 
  ChallengeSchema, 
  ChallengeStateSchema,
  ChallengeBlockDataSchema 
} from '../../types/api';

export async function getChallenges(page = 0, count = 10) {
  try {
    // The API returns an array directly, not a tuple
    const response = await fetchAPI<unknown[]>('/challenges');
    console.log('[getChallenges] Raw API response:', JSON.stringify(response, null, 2));

    // Validate the array of challenges
    const validatedItems = await validateResponse(z.array(ChallengeSchema), response);
    console.log('[getChallenges] Validated items:', JSON.stringify(validatedItems, null, 2));

    // Return in the expected format
    return { 
      data: validatedItems, 
      total: validatedItems.length 
    };
  } catch (error) {
    console.error('[getChallenges] Error:', error);
    throw error;
  }
}

export async function getChallenge(id: string) {
  try {
    const response = await fetchAPI(`/challenges/${id}`);
    console.log('[getChallenge] Raw API response:', JSON.stringify(response, null, 2));
    const validated = await validateResponse(ChallengeSchema, response);
    console.log('[getChallenge] Validated data:', JSON.stringify(validated, null, 2));
    return validated;
  } catch (error) {
    console.error('[getChallenge] Error:', error);
    throw error;
  }
}

export async function getChallengeState(id: string) {
  try {
    const response = await fetchAPI(`/challenges/${id}/state`);
    console.log('[getChallengeState] Raw API response:', JSON.stringify(response, null, 2));
    const validated = await validateResponse(ChallengeStateSchema, response);
    console.log('[getChallengeState] Validated data:', JSON.stringify(validated, null, 2));
    return validated;
  } catch (error) {
    console.error('[getChallengeState] Error:', error);
    throw error;
  }
}

export async function getChallengeDataByBlock(blockId: string) {
  try {
    const response = await fetchAPI<[unknown, number]>(`/challenges/block-data/${blockId}`);
    console.log('[getChallengeDataByBlock] Raw API response:', JSON.stringify(response, null, 2));
    
    const [items, total] = response;
    console.log('[getChallengeDataByBlock] Items:', JSON.stringify(items, null, 2));
    console.log('[getChallengeDataByBlock] Total:', total);

    const validatedItems = await validateResponse(z.array(ChallengeBlockDataSchema), items);
    console.log('[getChallengeDataByBlock] Validated items:', JSON.stringify(validatedItems, null, 2));
    return { data: validatedItems, total };
  } catch (error) {
    console.error('[getChallengeDataByBlock] Error:', error);
    throw error;
  }
}

export async function getChallengeBlockData(challengeId: string, blockId: string) {
  try {
    const response = await fetchAPI(`/challenges/${challengeId}/block-data/${blockId}`);
    console.log('[getChallengeBlockData] Raw API response:', JSON.stringify(response, null, 2));
    const validated = await validateResponse(ChallengeBlockDataSchema, response);
    console.log('[getChallengeBlockData] Validated data:', JSON.stringify(validated, null, 2));
    return validated;
  } catch (error) {
    console.error('[getChallengeBlockData] Error:', error);
    throw error;
  }
}
