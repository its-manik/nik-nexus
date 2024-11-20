import express from 'express';
import { getBlocks, getBlock, getBlockData } from '../database/blocks';
import { getAlgorithm, getAlgorithms, getAlgorithmState, getAlgorithmData, getAlgorithmBlockData } from '../database/algorithms';
import { getBenchmark, getBenchmarks, getBenchmarkState, getBenchmarkData } from '../database/benchmarks';

const router = express.Router();

// Block routes
router.get('/blocks', async (req, res) => {
  try {
    const page = parseInt(req.query.page as string) || 0;
    const count = parseInt(req.query.count as string) || 10;
    const [blocks, total] = await getBlocks(page, count);
    res.json({ blocks, total });
  } catch (error) {
    console.error('Error fetching blocks:', error);
    res.status(500).json({ error: 'Failed to fetch blocks' });
  }
});

router.get('/blocks/:id', async (req, res) => {
  try {
    const block = await getBlock(req.params.id);
    if (!block) {
      res.status(404).json({ error: 'Block not found' });
      return;
    }
    const blockData = await getBlockData(req.params.id);
    res.json({ block, blockData });
  } catch (error) {
    console.error('Error fetching block:', error);
    res.status(500).json({ error: 'Failed to fetch block' });
  }
});

// Algorithm routes
router.get('/algorithms', async (req, res) => {
  try {
    const page = parseInt(req.query.page as string) || 0;
    const count = parseInt(req.query.count as string) || 10;
    const algorithms = await getAlgorithms(page, count);
    res.json(algorithms);
  } catch (error) {
    console.error('Error fetching algorithms:', error);
    res.status(500).json({ error: 'Failed to fetch algorithms' });
  }
});

router.get('/algorithms/:id', async (req, res) => {
  try {
    const algorithm = await getAlgorithm(req.params.id);
    if (!algorithm) {
      res.status(404).json({ error: 'Algorithm not found' });
      return;
    }
    const state = await getAlgorithmState(req.params.id);
    const data = await getAlgorithmData(req.params.id);
    const blockData = await getAlgorithmBlockData(req.params.id, algorithm.block_id);
    res.json({ algorithm, state, data, blockData });
  } catch (error) {
    console.error('Error fetching algorithm:', error);
    res.status(500).json({ error: 'Failed to fetch algorithm' });
  }
});

// Benchmark routes
router.get('/benchmarks', async (req, res) => {
  try {
    const page = parseInt(req.query.page as string) || 0;
    const count = parseInt(req.query.count as string) || 10;
    const benchmarks = await getBenchmarks(page, count);
    res.json(benchmarks);
  } catch (error) {
    console.error('Error fetching benchmarks:', error);
    res.status(500).json({ error: 'Failed to fetch benchmarks' });
  }
});

router.get('/benchmarks/:id', async (req, res) => {
  try {
    const benchmark = await getBenchmark(req.params.id);
    if (!benchmark) {
      res.status(404).json({ error: 'Benchmark not found' });
      return;
    }
    const state = await getBenchmarkState(req.params.id);
    const data = await getBenchmarkData(req.params.id);
    res.json({ benchmark, state, data });
  } catch (error) {
    console.error('Error fetching benchmark:', error);
    res.status(500).json({ error: 'Failed to fetch benchmark' });
  }
});

export default router;