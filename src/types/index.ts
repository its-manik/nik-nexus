export interface Block {
  id: string;
  height: number;
  timestamp: string;
  hash: string;
  parent_hash: string;
  state_root: string;
  transactions: Transaction[];
}

export interface Transaction {
  id: string;
  hash: string;
  block_id: string;
  from: string;
  to: string;
  value: string;
  gas_used: number;
}

export interface Algorithm {
  id: string;
  name: string;
  version: string;
  player_id: string;
  challenge_id: string;
  datetime_added: string;
  code: string;
  status: 'active' | 'inactive' | 'banned';
}

export interface Benchmark {
  id: string;
  algorithm_id: string;
  block_id: string;
  datetime_added: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  results: BenchmarkResult[];
}

export interface BenchmarkResult {
  nonce: number;
  runtime: number;
  memory_used: number;
  success: boolean;
}

export interface Challenge {
  id: string;
  name: string;
  description: string;
  difficulty: number;
  reward: string;
  datetime_added: string;
  status: 'active' | 'completed' | 'cancelled';
}

export interface Account {
  id: string;
  name: string;
  balance: string;
  datetime_added: string;
  is_contract: boolean;
  code_hash?: string;
}

export interface Proof {
  id: string;
  benchmark_id: string;
  block_id: string;
  datetime_added: string;
  merkle_root: string;
  status: 'pending' | 'verified' | 'rejected';
}