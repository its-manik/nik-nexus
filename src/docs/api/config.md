# Configuration API

## Get Network Configuration
Retrieve current network configuration.

```typescript
GET /api/config
```

Response:
```typescript
{
  rewardsSchedule: Array<{
    round_start: number;
    block_reward: number;
  }>;
  distribution: {
    benchmarkers: number;
    breakthroughs: number;
    optimisations: number;
  };
  solutionSignature: {
    threshold_decay: number;
    max_percent_delta: number;
    percent_error_multiplier: number;
    equilibrium_rate_multiplier: number;
  };
  algorithmStats: {
    algorithm_submissions: {
      push_delay: number;
      submission_fee: string;
      adoption_threshold: number;
      merge_points_threshold: number;
    };
    benchmark_submissions: {
      max_samples: number;
      lifespan_period: number;
      min_num_solutions: number;
      submission_delay_multiplier: number;
    };
    optimisable_proof_of_work: {
      imbalance_multiplier: number;
      rolling_deposit_decay: number;
      enable_proof_of_deposit: boolean;
    };
  };
}
```