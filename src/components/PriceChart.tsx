import React from "react";
import { ArrowUp, ArrowDown } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useApi } from "../hooks/useApi";
import { useDarkMode } from "../hooks/useDarkMode";
import { formatNumber } from "../lib/utils";
import { format, parseISO } from "date-fns";
import Card from "./Card";
import LoadingState from "./LoadingState";
import ErrorState from "./ErrorState";

interface PriceData {
  date: string;
  price: number;
  volume: number;
  change: number;
}

interface PriceResponse {
  currentPrice: number;
  priceChange: number;
  historicalData: PriceData[];
}

async function fetchPriceData(): Promise<PriceResponse> {
  const response = await fetch("/price-api/price");
  if (!response.ok) {
    throw new Error("Failed to fetch price data");
  }
  return response.json();
}

function PriceChart() {
  const { data, loading, error } = useApi(fetchPriceData);
  const { isDark } = useDarkMode();

  if (loading) return <LoadingState />;
  if (error) return <ErrorState error={error} />;
  if (!data) return null;

  const { currentPrice, priceChange, historicalData } = data;
  const isPositive = priceChange > 0;

  const formatXAxis = (dateStr: string) => {
    const date = parseISO(dateStr);
    return format(date, "MMM d");
  };

  const formatTooltipDate = (dateStr: string) => {
    const date = parseISO(dateStr);
    return format(date, "PPp");
  };

  return (
    <Card className="shadow-none border-black">
      <div className="flex items-center justify-between mb-4 ">
        <h2 className="text-lg font-semibold text-text-primary dark:text-text-dark">Price Chart</h2>
        <div className="flex items-center gap-4">
          <div>
            <p className="text-2xl font-bold text-text-primary dark:text-text-dark">
              ${formatNumber(currentPrice)}
            </p>
            <div
              className={`flex items-center ${
                isPositive ? 'text-status-success-DEFAULT' : 'text-status-error-DEFAULT'
              }`}
            >
              {isPositive ? (
                <ArrowUp className="h-4 w-4" />
              ) : (
                <ArrowDown className="h-4 w-4" />
              )}
              <span className="ml-1">{priceChange.toFixed(2)}%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={historicalData}>
            <defs>
              <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#810636" stopOpacity={0.1} />
                <stop offset="95%" stopColor="#810636" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="#f0f0f0" 
              className="dark:stroke-gray-700" 
            />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 12, fill: "#6b7280" }}
              tickLine={false}
              tickFormatter={formatXAxis}
              className="dark:text-gray-400"
            />
            <YAxis
              tick={{ fontSize: 12, fill: "#6b7280" }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `$${formatNumber(value)}`}
              className="dark:text-gray-400"
            />
            <Tooltip
              contentStyle={{
                backgroundColor: isDark ? "var(--background-dark)" : "var(--background-white)",
                border: `1px solid ${isDark ? "var(--ui-dark-border)" : "var(--ui-border)"}`,
                borderRadius: "0.5rem",
                padding: "0.5rem",
              }}
              formatter={(value: number) => [`$${formatNumber(value)}`, "Price"]}
              labelFormatter={formatTooltipDate}
            />
            <Area
              type="monotone"
              dataKey="price"
              stroke="#810636"
              strokeWidth={2}
              fill="url(#colorPrice)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}

export default PriceChart;
