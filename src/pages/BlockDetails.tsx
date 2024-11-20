import React from "react";
import { useParams, Link } from "react-router-dom";
import { Blocks, Activity, Hash } from "lucide-react";
import { useApi } from "../hooks/useApi";
import { getBlock, getBlockData } from "../lib/api/blocks";
import { getAlgorithmsByBlock } from "../lib/api/algorithms";
import { formatDate } from "../lib/utils";
import PageLayout from "../components/PageLayout";
import Card from "../components/Card";
import DataTable from "../components/DataTable";
import type { Algorithm, Block, BlockData } from "../types/api";

function BlockDetails() {
  const { blockId } = useParams<{ blockId: string }>();

  // Validate block ID format
  const isValidBlockId = (id: string): boolean => /^[0-9a-f]{32}$/i.test(id);

  const {
    data: block,
    loading: blockLoading,
    error: blockError,
  } = useApi<Block>(async () => {
    if (!blockId || !isValidBlockId(blockId)) {
      return Promise.reject(new Error("Invalid or missing block ID"));
    }
    return await getBlock(blockId);
  }, [blockId]);

  const {
    data: blockData,
    loading: dataLoading,
    error: dataError,
  } = useApi<BlockData>(async () => {
    if (!blockId || !isValidBlockId(blockId)) {
      return Promise.reject(new Error("Invalid or missing block ID"));
    }
    return await getBlockData(blockId);
  }, [blockId]);

  const {
    data: algorithms,
    loading: algoLoading,
    error: algoError,
  } = useApi<Algorithm[]>(async () => {
    if (!blockId || !isValidBlockId(blockId)) {
      return Promise.reject(new Error("Invalid or missing block ID"));
    }
    return await getAlgorithmsByBlock(blockId);
  }, [blockId]);

  const loading = blockLoading || dataLoading || algoLoading;
  const error = blockError || dataError || algoError;

  const algorithmColumns = [
    {
      header: "ID",
      accessor: (algo: Algorithm) => (
        <Link
          to={`/algorithm/${algo.id}`}
          className="text-sm font-medium text-brand-primary-DEFAULT hover:text-brand-primary-DEFAULT/80 dark:text-brand-primary-dark dark:hover:text-brand-primary-dark/90"
        >
          {algo.id}
        </Link>
      ),
    },
    {
      header: "Name",
      accessor: (algo: Algorithm) => (
        <span className="text-sm text-text-primary dark:text-text-dark">
          {algo.name}
        </span>
      ),
    },
    {
      header: "Player",
      accessor: (algo: Algorithm) => (
        <Link
          to={`/account/${algo.player_id}`}
          className="text-sm text-brand-primary-DEFAULT hover:text-brand-primary-DEFAULT/80 dark:text-brand-primary-dark dark:hover:text-brand-primary-dark/90"
        >
          {algo.player_id}
        </Link>
      ),
    },
    {
      header: "Added",
      accessor: (algo: Algorithm) => (
        <span className="text-sm text-text-light dark:text-text-dark-secondary">
          {formatDate(algo.datetime_added)}
        </span>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-darker">
      <PageLayout
        title={`Block ${block?.height || ""}`}
        subtitle={blockId}
        icon={Blocks}
        backLink="/blocks"
        loading={loading}
        error={error}
        empty={!block}
      >

        {block && blockData && (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <Card title="Block Overview" className="bg-background-white dark:bg-background-dark shadow-none border-black">
                <dl className="grid grid-cols-2 gap-4">
                  <div className="bg-background-light dark:bg-background-darker p-4 rounded-lg">
                    <dt className="text-sm text-text-light dark:text-text-dark-secondary">Height</dt>
                    <dd className="mt-1 text-lg font-semibold text-text-primary dark:text-text-dark">
                      {block.height}
                    </dd>
                  </div>
                  <div className="bg-background-light dark:bg-background-darker p-4 rounded-lg">
                    <dt className="text-sm text-text-light dark:text-text-dark-secondary">Round</dt>
                    <dd className="mt-1 text-lg font-semibold text-text-primary dark:text-text-dark">
                      {block.round}
                    </dd>
                  </div>
                  <div className="bg-background-light dark:bg-background-darker p-4 rounded-lg">
                    <dt className="text-sm text-text-light dark:text-text-dark-secondary">Added</dt>
                    <dd className="mt-1 text-sm text-text-primary dark:text-text-dark">
                      {formatDate(block.datetime_added)}
                    </dd>
                  </div>
                  <div className="bg-background-light dark:bg-background-darker p-4 rounded-lg">
                    <dt className="text-sm text-text-light dark:text-text-dark-secondary">TIG Block</dt>
                    <dd className="mt-1 text-lg font-semibold text-text-primary dark:text-text-dark">
                      {block.eth_block_num || "N/A"}
                    </dd>
                  </div>
                </dl>
              </Card>

              <Card title="Active Items" className="bg-background-white dark:bg-background-dark shadow-none border-black">
                <dl className="grid grid-cols-2 gap-4">
                  <div className="bg-background-light dark:bg-background-darker p-4 rounded-lg">
                    <dt className="text-sm text-text-light dark:text-text-dark-secondary">Active Algorithms</dt>
                    <dd className="mt-1 text-lg font-semibold text-text-primary dark:text-text-dark">
                      {blockData.active_algorithm_ids.length}
                    </dd>
                  </div>
                  <div className="bg-background-light dark:bg-background-darker p-4 rounded-lg">
                    <dt className="text-sm text-text-light dark:text-text-dark-secondary">Active Benchmarks</dt>
                    <dd className="mt-1 text-lg font-semibold text-text-primary dark:text-text-dark">
                      {blockData.active_benchmark_ids.length}
                    </dd>
                  </div>
                  <div className="bg-background-light dark:bg-background-darker p-4 rounded-lg">
                    <dt className="text-sm text-text-light dark:text-text-dark-secondary">Active Challenges</dt>
                    <dd className="mt-1 text-lg font-semibold text-text-primary dark:text-text-dark">
                      {blockData.active_challenge_ids.length}
                    </dd>
                  </div>
                  <div className="bg-background-light dark:bg-background-darker p-4 rounded-lg">
                    <dt className="text-sm text-text-light dark:text-text-dark-secondary">Active Players</dt>
                    <dd className="mt-1 text-lg font-semibold text-text-primary dark:text-text-dark">
                      {blockData.active_player_ids.length}
                    </dd>
                  </div>
                </dl>
              </Card>
            </div>

            {algorithms && algorithms.length > 0 && (
              <Card title="Active Algorithms" className="bg-background-white dark:bg-background-dark shadow-none border-black">
                <DataTable
                  columns={algorithmColumns}
                  data={algorithms}
                  keyExtractor={(algo) => algo.id}
                />
              </Card>
            )}
          </>
        )}
      </PageLayout>
    </div>
  );
}

export default BlockDetails;
