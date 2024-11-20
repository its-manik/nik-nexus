import { z } from 'zod';

// Block schemas
export const BlockSchema = z.object({
  id: z.string(),
  datetime_added: z.string(),
  prev_block_id: z.string(),
  height: z.number(),
  round: z.number(),
  config: z.record(z.unknown()),
  eth_block_num: z.number().optional(),
});

export const BlockDataSchema = z.object({
  block_id: z.string(),
  mempool_algorithm_ids: z.array(z.string()).optional().default([]),
  mempool_benchmark_ids: z.array(z.string()).optional().default([]),
  mempool_challenge_ids: z.array(z.string()).optional().default([]),
  mempool_fraud_ids: z.array(z.string()).optional().default([]),
  mempool_proof_ids: z.array(z.string()).optional().default([]),
  mempool_wasm_ids: z.array(z.string()).optional().default([]),
  active_algorithm_ids: z.array(z.string()).optional().default([]),
  active_benchmark_ids: z.array(z.string()).optional().default([]),
  active_challenge_ids: z.array(z.string()).optional().default([]),
  active_player_ids: z.array(z.string()).optional().default([]),
}).passthrough(); // Add passthrough to allow additional fields

// Algorithm schemas
export const AlgorithmSchema = z.object({
  id: z.string(),
  datetime_added: z.string(),
  name: z.string(),
  player_id: z.string(),
  challenge_id: z.string(),
  tx_hash: z.string(),
});

export const AlgorithmStateSchema = z.object({
  algorithm_id: z.string(),
  block_confirmed: z.number(),
  round_submitted: z.number(),
  round_pushed: z.number().nullable(),
  round_merged: z.number().nullable(),
  banned: z.boolean().nullable(),
});

export const AlgorithmDataSchema = z.object({
  algorithm_id: z.string(),
  code: z.string(),
});

export const AlgorithmBlockDataSchema = z.object({
  algorithm_id: z.string(),
  block_id: z.string(),
  num_qualifiers_by_player: z.record(z.number()).nullable(),
  adoption: z.number().nullable(),
  merge_points: z.number().nullable(),
  reward: z.number().nullable(),
});

// Benchmark schemas
export const BenchmarkSchema = z.object({
  id: z.string(),
  datetime_added: z.string(),
  merkle_root: z.string().nullable(),
  num_solutions: z.number(),
});

export const BenchmarkStateSchema = z.object({
  benchmark_id: z.string(),
  block_confirmed: z.number(),
  sampled_nonces: z.array(z.number()),
});

export const BenchmarkDataSchema = z.object({
  benchmark_id: z.string(),
  solution_nonces: z.array(z.number()),
});

// Challenge schemas
export const ChallengeSchema = z.object({
  id: z.string(),
  datetime_added: z.string(),
  name: z.string(),
});

export const ChallengeStateSchema = z.object({
  challenge_id: z.string(),
  block_confirmed: z.number(),
  round_active: z.number().optional(),
});

export const ChallengeBlockDataSchema = z.object({
  challenge_id: z.string(),
  block_id: z.string(),
  solution_signature_threshold: z.number(),
  num_qualifiers: z.number(),
  qualifier_difficulties: z.array(z.tuple([z.number(), z.number()])),  // Array of [number, number] tuples
  base_frontier: z.array(z.tuple([z.number(), z.number()])),  // Array of [number, number] tuples
  cutoff_frontier: z.array(z.tuple([z.number(), z.number()])).nullable(),  // Can be null
  scaled_frontier: z.array(z.tuple([z.number(), z.number()])),  // Array of [number, number] tuples
  scaling_factor: z.number(),
});

// Define each solution type
const SatSolutionSchema = z.object({
  type: z.literal('sat'),
  variables: z.array(z.boolean()),
  routes: z.null(),
  items: z.null(),
  indexes: z.null(),
});

const VrpSolutionSchema = z.object({
  type: z.literal('vrp'),
  variables: z.null(),
  routes: z.array(z.array(z.number())),
  items: z.null(),
  indexes: z.null(),
});

const KnapsackSolutionSchema = z.object({
  type: z.literal('knapsack'),
  variables: z.null(),
  routes: z.null(),
  items: z.array(z.number()),
  indexes: z.null(),
});

const VectorSearchSolutionSchema = z.object({
  type: z.literal('vector'),
  variables: z.null(),
  routes: z.null(),
  items: z.null(),
  indexes: z.array(z.number()),
});

// Union of all solution types
const SolutionSchema = z.discriminatedUnion('type', [
  SatSolutionSchema,
  VrpSolutionSchema,
  KnapsackSolutionSchema,
  VectorSearchSolutionSchema,
]);

// Proof schemas
export const ProofSchema = z.object({
  benchmark_id: z.string(),
  datetime_added: z.string(),
});

export const ProofStateSchema = z.object({
  benchmark_id: z.string(),
  block_confirmed: z.number(),
  submission_delay: z.number(),
});

export const ProofLeafSchema = z.object({
  nonce: z.number(),
  solution: z.object({
    variables: z.array(z.boolean()).nullable(),
    routes: z.array(z.array(z.number())).nullable(),
    items: z.array(z.number()).nullable(),
    indexes: z.array(z.number()).nullable(),
  }),
  fuel_consumed: z.number(),
  runtime_signature: z.number()
});

export const ProofMerkleSchema = z.object({
  leaf: ProofLeafSchema,
  branch: z.null()
});

export const ProofDataSchema = z.object({
  benchmark_id: z.string(),
  merkle_proofs: z.array(ProofMerkleSchema)
});

// Player schemas
export const PlayerBlockDataSchema = z.object({
  player_id: z.string(),
  block_id: z.string(),
  num_qualifiers_by_challenge: z.record(z.number()),
  cutoff: z.number(),
  imbalance: z.number(),
  imbalance_penalty: z.number(),
  influence: z.number(),
  reward: z.number(),
  rolling_balance: z.number().nullable(),
});

// Add Account schema
export const AccountSchema = z.object({
  id: z.string(),
  player_id: z.string(),
  block_id: z.string(),
  num_qualifiers_by_challenge: z.record(z.number()),
  cutoff: z.number(),
  imbalance: z.number(),
  imbalance_penalty: z.number(),
  influence: z.number(),
  reward: z.number(),
  rolling_balance: z.number().nullable(),
  datetime_added: z.string(),
  balance: z.string(),
  round_earnings: z.string(),
});

// Add Account type export
export type Account = z.infer<typeof AccountSchema>;

// Type exports
export type Block = z.infer<typeof BlockSchema>;
export type BlockData = z.infer<typeof BlockDataSchema>;
export type Algorithm = z.infer<typeof AlgorithmSchema>;
export type AlgorithmState = z.infer<typeof AlgorithmStateSchema>;
export type AlgorithmData = z.infer<typeof AlgorithmDataSchema>;
export type AlgorithmBlockData = z.infer<typeof AlgorithmBlockDataSchema>;
export type Benchmark = z.infer<typeof BenchmarkSchema>;
export type BenchmarkState = z.infer<typeof BenchmarkStateSchema>;
export type BenchmarkData = z.infer<typeof BenchmarkDataSchema>;
export type Challenge = z.infer<typeof ChallengeSchema>;
export type ChallengeState = z.infer<typeof ChallengeStateSchema>;
export type ChallengeBlockData = z.infer<typeof ChallengeBlockDataSchema>;
export type Proof = z.infer<typeof ProofSchema>;
export type ProofState = z.infer<typeof ProofStateSchema>;
export type ProofData = z.infer<typeof ProofDataSchema>;
export type PlayerBlockData = z.infer<typeof PlayerBlockDataSchema>;

// Config schemas
export const RewardScheduleSchema = z.object({
  round_start: z.number(),
  block_reward: z.number()
});

export const RewardDistributionSchema = z.object({
  benchmarkers: z.number(),
  breakthroughs: z.number(),
  optimisations: z.number()
});

export const DifficultyParameterSchema = z.object({
  name: z.string(),
  max_value: z.number(),
  min_value: z.number()
});

export const BlockConfigSchema = z.object({
  erc20: z.object({
    rpc_url: z.string(),
    chain_id: z.string(),
    burn_address: z.string(),
    token_address: z.string()
  }),
  rounds: z.object({
    blocks_per_round: z.number()
  }),
  rewards: z.object({
    schedule: z.array(RewardScheduleSchema),
    distribution: RewardDistributionSchema
  }),
  wasm_vm: z.object({
    max_fuel: z.number(),
    max_memory: z.number()
  }),
  difficulty: z.object({
    parameters: z.object({
      c001: z.array(DifficultyParameterSchema),
      c002: z.array(DifficultyParameterSchema),
      c003: z.array(DifficultyParameterSchema),
      c004: z.array(DifficultyParameterSchema)
    }),
    max_scaling_factor: z.number()
  }),
  qualifiers: z.object({
    min_cutoff: z.number(),
    cutoff_multiplier: z.number(),
    cutoff_phase_in_period: z.number(),
    total_qualifiers_threshold: z.number()
  }),
  solution_signature: z.object({
    threshold_decay: z.number(),
    max_percent_delta: z.number(),
    percent_error_multiplier: z.number(),
    equilibrium_rate_multiplier: z.number()
  }),
  algorithm_submissions: z.object({
    push_delay: z.number(),
    submission_fee: z.string(),
    adoption_threshold: z.number(),
    merge_points_threshold: z.number()
  }),
  benchmark_submissions: z.object({
    max_samples: z.number(),
    lifespan_period: z.number(),
    min_num_solutions: z.number(),
    submission_delay_multiplier: z.number()
  }),
  precommit_submissions: z.object({
    min_base_fee: z.string(),
    topup_amount: z.string(),
    min_per_nonce_fee: z.string(),
    target_num_precommits: z.number(),
    max_fee_percentage_delta: z.number()
  }),
  optimisable_proof_of_work: z.object({
    imbalance_multiplier: z.number(),
    rolling_deposit_decay: z.number(),
    enable_proof_of_deposit: z.boolean(),
    avg_percent_qualifiers_multiplier: z.number()
  })
});

export type BlockConfig = z.infer<typeof BlockConfigSchema>;

// Add this to your existing types
export interface LeaderboardEntry {
  id: string;
  datetime_added: string;
  balance: number;
  round_earnings: number;
  num_qualifiers_by_challenge: Record<string, number>;
  cutoff: number;
  imbalance: number;
  imbalance_penalty: number;
  influence: number;
  reward: number;
  rolling_balance: number | null;
}
