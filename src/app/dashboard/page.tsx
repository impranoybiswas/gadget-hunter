"use client";

import React from "react";
import { useStatesNumber } from "@/hooks/useStatesNumber";
import {
  FaBoxOpen,
  FaShoppingCart,
  FaHeart,
  FaTags,
} from "react-icons/fa";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

/** =========================
 * ✅ Number Formatter (for large values like 1.2K, 3.5M)
 ========================= */
const formatNumber = (num: number) => {
  if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + "M";
  if (num >= 1_000) return (num / 1_000).toFixed(1) + "K";
  return num.toString();
};

export default function DashboardHome() {
  const { totalProducts, totalCarts, totalFavorites, totalCategories } =
    useStatesNumber();

  /** =========================
   * 📊 Chart Data
   ========================= */
  const pieData = [
    { name: "Products", value: totalProducts },
    { name: "Carts", value: totalCarts },
    { name: "favorites", value: totalFavorites },
  ];
  const pieColors = ["#4f46e5", "#16a34a", "#e11d48"];

  const barData = [
    { month: "Jan", products: 30 },
    { month: "Feb", products: 45 },
    { month: "Mar", products: 60 },
    { month: "Apr", products: 40 },
    { month: "May", products: 75 },
    { month: "Jun", products: 90 },
  ];

  /** =========================
   * 📦 State Summary Data
   ========================= */
  const stateCards = [
    {
      name: "Total Products",
      value: totalProducts,
      icon: <FaBoxOpen size={26} />,
      color: "bg-indigo-100 text-indigo-600",
      growth: "+12%",
    },
    {
      name: "Carts",
      value: totalCarts,
      icon: <FaShoppingCart size={26} />,
      color: "bg-green-100 text-green-600",
      growth: "+8%",
    },
    {
      name: "favorites",
      value: totalFavorites,
      icon: <FaHeart size={26} />,
      color: "bg-pink-100 text-pink-600",
      growth: "+5%",
    },
    {
      name: "Categories",
      value: totalCategories,
      icon: <FaTags size={26} />,
      color: "bg-yellow-100 text-yellow-600",
      growth: "+3%",
    },
  ];

  return (
    <section className="space-y-8">
      {/* =========================
       * 🧩 Overview Cards
       ========================= */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stateCards.map((card, i) => (
          <div
            key={i}
            className="bg-base-100 p-6 rounded-xl shadow-md hover:shadow-lg transition-transform transform hover:-translate-y-1 flex flex-col gap-4 border border-base-content/10"
          >
            <div className="flex items-center justify-between">
              <div className={`p-3 rounded-full ${card.color}`}>
                {card.icon}
              </div>
              <span className="text-sm text-success font-semibold">
                {card.growth}
              </span>
            </div>

            <div>
              <p className="text-base-content/50 text-sm">{card.name}</p>
              <p className="text-3xl font-bold text-base-content mt-1">
                {formatNumber(card.value)}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* =========================
       * 📊 Analytics Charts
       ========================= */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <div className="bg-base-100 p-6 rounded-xl shadow-md border border-base-content/10">
          <h3 className="text-lg font-semibold mb-4 text-base-content/80">
            Distribution Overview
          </h3>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={90}
                label
              >
                {pieData.map((_, index) => (
                  <Cell
                    key={index}
                    fill={pieColors[index % pieColors.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div className="bg-base-100 p-6 rounded-xl shadow-md border border-base-content/10">
          <h3 className="text-lg font-semibold mb-4 text-base-content/80">
            Monthly Product Added
          </h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart
              data={barData}
              margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
            >
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="products" fill="#4f46e5" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
}
