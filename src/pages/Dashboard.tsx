import React from "react";
import {
  Home,
  TrendingUp,
  Users,
  Code,
  Activity,
  Shield,
  AlertTriangle,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchAPI } from "../lib/api/client";
import BlocksTable from "../components/BlocksTable";
import StatsPanel from "../components/StatsPanel";
import PriceChart from "../components/PriceChart";
import Card from "../components/Card";
import PageLayout from "../components/PageLayout";

interface NetworkStats {
  total_blocks: number;
  total_players: number;
  total_algorithms: number;
  total_benchmarks: number;
  total_proofs: number;
  num_qualifiers_this_block: number;
  num_proofs_this_block: number;
  num_benchmarks_this_block: number;
  num_frauds_this_block: number;
}

async function fetchNetworkStats(): Promise<NetworkStats> {
  const data = await fetchAPI<NetworkStats>("/stats");
  return data;
}

const STAT_CARD_STYLES = {
  indigo: {
    light:
      "from-indigo-50 via-indigo-50/50 to-white/80 bg-gradient-to-br border border-indigo-100/20",
    dark: "dark:from-indigo-500/10 dark:via-background-dark/80 dark:to-background-dark dark:border-indigo-500/10",
    icon: {
      bg: "bg-indigo-100 dark:bg-indigo-500/20",
      color: "text-indigo-600 dark:text-indigo-400",
    },
  },
  blue: {
    light:
      "from-blue-50 via-blue-50/50 to-white/80 bg-gradient-to-br border border-blue-100/20",
    dark: "dark:from-blue-500/10 dark:via-background-dark/80 dark:to-background-dark dark:border-blue-500/10",
    icon: {
      bg: "bg-blue-100 dark:bg-blue-500/20",
      color: "text-blue-600 dark:text-blue-400",
    },
  },
  purple: {
    light:
      "from-purple-50 via-purple-50/50 to-white/80 bg-gradient-to-br border border-purple-100/20",
    dark: "dark:from-purple-500/10 dark:via-background-dark/80 dark:to-background-dark dark:border-purple-500/10",
    icon: {
      bg: "bg-purple-100 dark:bg-purple-500/20",
      color: "text-purple-600 dark:text-purple-400",
    },
  },
  pink: {
    light:
      "from-pink-50 via-pink-50/50 to-white/80 bg-gradient-to-br border border-pink-100/20",
    dark: "dark:from-pink-500/10 dark:via-background-dark/80 dark:to-background-dark dark:border-pink-500/10",
    icon: {
      bg: "bg-pink-100 dark:bg-pink-500/20",
      color: "text-pink-600 dark:text-pink-400",
    },
  },
};

function Dashboard() {
  const { data: stats, isLoading } = useQuery({
    queryKey: ["networkStats"],
    queryFn: fetchNetworkStats,
  });

  const StatCard = ({
    title,
    value,
    icon: Icon,
    trend = 0,
    color = "indigo",
  }) => (
    <Card className={`transition-colors duration-200 border border-black`}>
      <div>
        <div className="flex items-center justify-between">
          <p className="text-sm text-text-light dark:text-text-dark-secondary">
            {title}
          </p>
          <div
            className={`p-3 rounded-full ${STAT_CARD_STYLES[color].icon.bg}`}
          >
            <Icon className={`h-6 w-6 ${STAT_CARD_STYLES[color].icon.color}`} />
          </div>
        </div>
        <p className="mt-2 text-xl lg:text-2xl font-semibold text-text-primary dark:text-text-dark">
          {value?.toLocaleString() ?? "-"}
        </p>
      </div>
      {trend !== 0 && (
        <div className="mt-4 flex items-center">
          <TrendingUp
            className={`h-4 w-4 ${
              trend > 0
                ? "text-status-success-DEFAULT dark:text-status-success-light"
                : "text-status-error-DEFAULT dark:text-status-error-light"
            }`}
          />
          <span
            className={`ml-2 text-sm ${
              trend > 0
                ? "text-status-success-DEFAULT dark:text-status-success-light"
                : "text-status-error-DEFAULT dark:text-status-error-light"
            }`}
          >
            {Math.abs(trend)}% from last block
          </span>
        </div>
      )}
    </Card>
  );

  return (
    <PageLayout
      title="Network Overview"
      icon={Home}
      loading={isLoading}
      actions={`wallet`}
      iconClassName="text-brand-primary-DEFAULT dark:text-brand-primary-dark"
    >
      {/* Stats Grid */}
      <div className="grid grid-cols-1 -mt-18 md:-mt-32 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-6">
        <StatCard
          title="Total Blocks"
          value={stats?.total_blocks}
          icon={Home}
          color="indigo"
        />
        <StatCard
          title="Active Players"
          value={stats?.total_players}
          icon={Users}
          color="blue"
        />
        <StatCard
          title="Total Algorithms"
          value={stats?.total_algorithms}
          icon={Code}
          color="purple"
        />
        <StatCard
          title="Total Benchmarks"
          value={stats?.total_benchmarks}
          icon={Activity}
          color="pink"
        />
      </div>

      {/* Current Block Stats */}
      <Card
        title="Current Block Activity"
        className="mb-6 shadow-none border-black"
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-background-light dark:bg-background-darker p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-status-success-DEFAULT dark:text-status-success-light">
                  Qualifiers
                </p>
                <p className="mt-1 text-2xl font-semibold text-text-primary dark:text-text-dark">
                  {stats?.num_qualifiers_this_block.toLocaleString()}
                </p>
              </div>
              <Shield className="h-8 w-8 text-status-success-DEFAULT dark:text-status-success-light" />
            </div>
          </div>

          <div className="bg-background-light dark:bg-background-darker p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-brand-primary dark:text-status-success-light">
                  Proofs
                </p>
                <p className="mt-1 text-2xl font-semibold text-text-primary dark:text-text-dark">
                  {stats?.num_proofs_this_block.toLocaleString()}
                </p>
              </div>
              <Activity className="h-8 w-8 text-brand-primary dark:text-status-info-light" />
            </div>
          </div>

          <div className="bg-background-light dark:bg-background-darker p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-status-info-DEFAULT dark:text-status-info-ligh">
                  Benchmarks
                </p>
                <p className="mt-1 text-2xl font-semibold text-text-primary dark:text-text-dark">
                  {stats?.num_benchmarks_this_block.toLocaleString()}
                </p>
              </div>
              <Code className="h-8 w-8 text-status-info-DEFAULT dark:text-status-info-light" />
            </div>
          </div>

          <div className="bg-background-light dark:bg-background-darker p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-status-error-DEFAULT dark:text-status-error-light">
                  Frauds
                </p>
                <p className="mt-1 text-2xl font-semibold text-text-primary dark:text-text-dark">
                  {stats?.num_frauds_this_block.toLocaleString()}
                </p>
              </div>
              <AlertTriangle className="h-8 w-8 text-status-error-DEFAULT dark:text-status-error-light" />
            </div>
          </div>
        </div>
      </Card>

      {/* Main content grid */}
      <div className="flex flex-col-reverse xl:grid xl:grid-cols-3 2xl:grid-cols-[1fr,350px] gap-6">
        <div className="space-y-6 2xl:col-auto col-span-2">
          <PriceChart />
          <BlocksTable />
        </div>
        <StatsPanel />
      </div>
    </PageLayout>
  );
}

export default Dashboard;
