"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGoldPrice } from "@/hooks/useCafeF";
import { useState } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function GoldPage() {
  const [interval, setInterval] = useState<"1w" | "2w" | "1m">("1m");
  const { data, isLoading, isError } = useGoldPrice(interval);

  if (isLoading) return <div className="p-6">Loading gold price data...</div>;
  if (isError || !data) return <div className="p-6">Failed to load data</div>;

  const gold = data.goldPriceWorlds;
  const chartData = data.goldPriceWorldHistories
    .filter((item) => {
      const days = interval === "1m" ? 30 : interval === "2w" ? 14 : 7;
      const cutoff = new Date();
      cutoff.setDate(cutoff.getDate() - days);
      return new Date(item.createdAt) >= cutoff;
    })
    .map((item) => ({
      time: new Date(item.createdAt).toLocaleString("vi-VN"),
      buy: item.buyPrice,
      sell: item.sellPrice,
    }));

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Vietnam Gold Price */}
        <Card>
          <CardHeader>
            <CardTitle>Vietnam Gold Price</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-xl font-semibold">
              🇻🇳 {data.goldPriceWorldHistories[0]?.name}
            </p>
            <p className="text-md">
              Buy:{" "}
              {(
                data.goldPriceWorldHistories[0]?.buyPrice * 1_000_000
              ).toLocaleString("vi-VN")}{" "}
              VND
            </p>
            <p className="text-md">
              Sell:{" "}
              {(
                data.goldPriceWorldHistories[0]?.sellPrice * 1_000_000
              ).toLocaleString("vi-VN")}{" "}
              VND
            </p>
            <p className="text-xs text-muted-foreground">
              Updated:{" "}
              {new Date(
                data.goldPriceWorldHistories[0]?.createdAt
              ).toLocaleString("vi-VN")}
            </p>
          </CardContent>
        </Card>

        {/* World Gold Price */}
        <Card>
          <CardHeader>
            <CardTitle>World Gold Price</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-xl font-semibold">
              🌍 {data.goldPriceWorlds.name}
            </p>
            <p className="text-md">
              Price: {data.goldPriceWorlds.price.toLocaleString("vi-VN")} (
              {data.goldPriceWorlds.rate} USD/oz)
            </p>
            <p
              className={`text-sm ${
                data.goldPriceWorlds.changePrice >= 0
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {data.goldPriceWorlds.changePrice >= 0 ? "+" : ""}
              {data.goldPriceWorlds.changePrice} (
              {data.goldPriceWorlds.changePricePercent}%)
            </p>
            <p className="text-xs text-muted-foreground">
              Updated:{" "}
              {new Date(data.goldPriceWorlds.lastUpdate).toLocaleString(
                "vi-VN"
              )}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row justify-between items-center">
          <CardTitle>Buy/Sell Price Chart</CardTitle>
          <div className="flex gap-2">
            {["1w", "2w", "1m"].map((key) => (
              <Button
                key={key}
                variant={interval === key ? "default" : "outline"}
                size="sm"
                onClick={() => setInterval(key as any)}
              >
                {key.toUpperCase()}
              </Button>
            ))}
          </div>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" tick={{ fontSize: 10 }} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="buy"
                stroke="#8884d8"
                name="Buy Price"
              />
              <Line
                type="monotone"
                dataKey="sell"
                stroke="#82ca9d"
                name="Sell Price"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
