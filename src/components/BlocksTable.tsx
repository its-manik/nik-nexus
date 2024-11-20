import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Clock, Hash, User } from "lucide-react";
import { useInfiniteQuery } from "../hooks/useInfiniteQuery";
import { getBlocks } from "../lib/api/blocks";
import { formatDate } from "../lib/utils";
import Card from "./Card";
import SearchInput from "./SearchInput";
import LoadingState from "./LoadingState";
import ErrorState from "./ErrorState";
import EmptyState from "./EmptyState";
import Select from "./Select";
import type { Block } from "../types/api";

const pageSizeOptions = [
  { value: "10", label: "10 per page" },
  { value: "25", label: "25 per page" },
  { value: "50", label: "50 per page" },
  { value: "100", label: "100 per page" },
];

function BlocksTable() {
  const [searchQuery, setSearchQuery] = useState("");
  const [pageSize, setPageSize] = useState(25);

  const {
    items: blocks,
    isLoading,
    isError,
    error,
    loadMoreRef,
    isFetching,
  } = useInfiniteQuery({
    queryKey: ['blocks', pageSize.toString()],
    queryFn: (page) => getBlocks(page, pageSize),
    pageSize,
  });

  const handleSearch = () => {
    if (!searchQuery.trim()) return;

    if (/^\d+$/.test(searchQuery)) {
      window.location.href = `/block/${searchQuery}`;
    }
  };

  const renderBlock = (block: Block) => (
    <tr key={block.id} className="hover:bg-background-light dark:hover:bg-background-darker">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <Hash className="h-4 w-4 text-text-light dark:text-text-dark-secondary mr-2" />
          <Link
            to={`/block/${block.id}`}
            className="text-sm font-medium text-brand-primary-DEFAULT hover:text-brand-primary-DEFAULT/80 dark:text-brand-primary-dark dark:hover:text-brand-primary-dark/90"
          >
            {block.height}
          </Link>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <Clock className="h-4 w-4 text-text-light dark:text-text-dark-secondary mr-2" />
          <span className="text-sm text-text-light dark:text-text-dark-secondary">
            {formatDate(block.datetime_added)}
          </span>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className="text-sm text-text-primary dark:text-text-dark">
          {block.round}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <User className="h-4 w-4 text-text-light dark:text-text-dark-secondary mr-2" />
          <span className="text-sm text-text-light dark:text-text-dark-secondary">
            {block.eth_block_num || "N/A"}
          </span>
        </div>
      </td>
    </tr>
  );

  return (
    <Card title="Latest Blocks" className="bg-background-white dark:bg-background-dark shadow-none border-black">
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <SearchInput
              value={searchQuery}
              onChange={setSearchQuery}
              onSubmit={handleSearch}
              placeholder="Search by block number..."
              className="w-full"
            />
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <span className="text-sm text-text-light dark:text-text-dark-secondary">Show</span>
            <Select
              options={pageSizeOptions}
              value={pageSize.toString()}
              onChange={(value) => setPageSize(Number(value))}
              className="w-40"
            />
          </div>
        </div>

        {isLoading ? (
          <LoadingState />
        ) : isError ? (
          <ErrorState error={error} />
        ) : !blocks.length ? (
          <EmptyState message="No blocks found" icon={Hash} />
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-background-light dark:bg-background-darker">
                  <th className="px-6 py-3 text-left text-xs font-medium text-text-light dark:text-text-dark-secondary uppercase tracking-wider">
                    Height
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-text-light dark:text-text-dark-secondary uppercase tracking-wider">
                    Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-text-light dark:text-text-dark-secondary uppercase tracking-wider">
                    Round
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-text-light dark:text-text-dark-secondary uppercase tracking-wider">
                    TIG Block
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ui-border dark:divide-ui-dark-border">
                {blocks.map((block: Block) => renderBlock(block))}
              </tbody>
            </table>
            <div
              ref={loadMoreRef}
              className="h-20 flex items-center justify-center"
            >
              {isFetching && (
                <LoadingState 
                  message={
                    <span className="text-text-light dark:text-text-dark-secondary">
                      Loading more blocks...
                    </span>
                  }
                />
              )}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}

export default BlocksTable;
