import { Block, Algorithm, Benchmark, Challenge, Account, Proof } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

// Generic error handler for API responses
async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'An error occurred' }));
    throw new Error(error.message || `HTTP error! status: ${response.status}`);
  }
  return response.json();
}

// Blocks API
export async function getBlocks(page = 0, limit = 10): Promise<{ blocks: Block[]; total: number }> {
  try {
    const response = await fetch(`${API_BASE_URL}/blocks?page=${page}&limit=${limit}`);
    return handleResponse(response);
  } catch (error) {
    console.error('Error fetching blocks:', error);
    return { blocks: [], total: 0 };
  }
}

export async function getBlock(id: string): Promise<Block | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/blocks/${id}`);
    return handleResponse(response);
  } catch (error) {
    console.error('Error fetching block:', error);
    return null;
  }
}

// Algorithms API
export async function getAlgorithms(page = 0, limit = 10): Promise<{ algorithms: Algorithm[]; total: number }> {
  try {
    const response = await fetch(`${API_BASE_URL}/algorithms?page=${page}&limit=${limit}`);
    return handleResponse(response);
  } catch (error) {
    console.error('Error fetching algorithms:', error);
    return { algorithms: [], total: 0 };
  }
}

export async function getAlgorithm(id: string): Promise<Algorithm | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/algorithms/${id}`);
    return handleResponse(response);
  } catch (error) {
    console.error('Error fetching algorithm:', error);
    return null;
  }
}

// Benchmarks API
export async function getBenchmarks(page = 0, limit = 10): Promise<{ benchmarks: Benchmark[]; total: number }> {
  try {
    const response = await fetch(`${API_BASE_URL}/benchmarks?page=${page}&limit=${limit}`);
    return handleResponse(response);
  } catch (error) {
    console.error('Error fetching benchmarks:', error);
    return { benchmarks: [], total: 0 };
  }
}

export async function getBenchmark(id: string): Promise<Benchmark | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/benchmarks/${id}`);
    return handleResponse(response);
  } catch (error) {
    console.error('Error fetching benchmark:', error);
    return null;
  }
}

// Challenges API
export async function getChallenges(page = 0, limit = 10): Promise<{ challenges: Challenge[]; total: number }> {
  try {
    const response = await fetch(`${API_BASE_URL}/challenges?page=${page}&limit=${limit}`);
    return handleResponse(response);
  } catch (error) {
    console.error('Error fetching challenges:', error);
    return { challenges: [], total: 0 };
  }
}

export async function getChallenge(id: string): Promise<Challenge | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/challenges/${id}`);
    return handleResponse(response);
  } catch (error) {
    console.error('Error fetching challenge:', error);
    return null;
  }
}

// Accounts API
export async function getAccounts(page = 0, limit = 10): Promise<{ accounts: Account[]; total: number }> {
  try {
    const response = await fetch(`${API_BASE_URL}/accounts?page=${page}&limit=${limit}`);
    return handleResponse(response);
  } catch (error) {
    console.error('Error fetching accounts:', error);
    return { accounts: [], total: 0 };
  }
}

export async function getAccount(id: string): Promise<Account | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/accounts/${id}`);
    return handleResponse(response);
  } catch (error) {
    console.error('Error fetching account:', error);
    return null;
  }
}

// Proofs API
export async function getProofs(page = 0, limit = 10): Promise<{ proofs: Proof[]; total: number }> {
  try {
    const response = await fetch(`${API_BASE_URL}/proofs?page=${page}&limit=${limit}`);
    return handleResponse(response);
  } catch (error) {
    console.error('Error fetching proofs:', error);
    return { proofs: [], total: 0 };
  }
}

export async function getProof(id: string): Promise<Proof | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/proofs/${id}`);
    return handleResponse(response);
  } catch (error) {
    console.error('Error fetching proof:', error);
    return null;
  }
}