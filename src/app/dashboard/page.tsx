"use client";

import React from "react";
import { useStatesNumber } from "@/hooks/useStatesNumber";
import { useUserData } from "@/hooks/useUserData";
import { useAdminStats } from "@/hooks/useAdmin";
import {
  FaBoxOpen,
  FaShoppingCart,
  FaHeart,
  FaUsers,
  FaMoneyBillWave,
  FaHistory,
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
const formatNumber = (num: number, isPrice: boolean = false) => {
  let formatted = num.toString();
  if (num >= 1_000_000) formatted = (num / 1_000_000).toFixed(1) + "M";
  else if (num >= 1_000) formatted = (num / 1_000).toFixed(1) + "K";

  return isPrice ? `BDT ${formatted}` : formatted;
};

export default function DashboardHome() {
  const { currentUser } = useUserData();
  const isAdmin = currentUser?.role === "admin";

  const { totalCarts, totalFavorites, totalSpent, totalOrders } =
    useStatesNumber();

  const { data: adminStats } = useAdminStats();

  /** =========================
   * 📊 Chart Data
   ========================= */
  const pieData = isAdmin
    ? [
        { name: "Products", value: adminStats?.totalProducts || 0 },
        { name: "Users", value: adminStats?.totalUsers || 0 },
        { name: "Categories", value: adminStats?.totalCategories || 0 },
      ]
    : [
        { name: "Carts", value: totalCarts },
        { name: "Favorites", value: totalFavorites },
        { name: "Orders", value: totalOrders },
      ];

  const pieColors = ["#4f46e5", "#16a34a", "#e11d48"];

  const barData = [
    { month: "Jan", value: 30 },
    { month: "Feb", value: 45 },
    { month: "Mar", value: 60 },
    { month: "Apr", value: 40 },
    { month: "May", value: 75 },
    { month: "Jun", value: 90 },
  ];

  /** =========================
   * 📦 State Summary Data
   ========================= */
  const stateCards = isAdmin
    ? [
        {
          name: "Total Products",
          value: adminStats?.totalProducts || 0,
          icon: <FaBoxOpen size={26} />,
          color: "bg-indigo-100 text-indigo-600",
          growth: adminStats?.totalProducts ? "In Catalog" : "Empty",
        },
        {
          name: "Total Stock",
          value: adminStats?.totalStock || 0,
          icon: <FaBoxOpen size={26} />,
          color: "bg-pink-100 text-pink-600",
          growth: "Total Units",
        },
        {
          name: "Total Users",
          value: adminStats?.totalUsers || 0,
          icon: <FaUsers size={26} />,
          color: "bg-blue-100 text-blue-600",
          growth: "Registered",
        },
        {
          name: "Total Revenue",
          value: adminStats?.totalRevenue || 0,
          icon: <FaMoneyBillWave size={26} />,
          color: "bg-green-100 text-green-600",
          growth: "All Time",
          isPrice: true,
        },
      ]
    : [
        {
          name: "Cart Items",
          value: totalCarts,
          icon: <FaShoppingCart size={26} />,
          color: "bg-indigo-100 text-indigo-600",
          growth: "+2",
        },
        {
          name: "Favorites",
          value: totalFavorites,
          icon: <FaHeart size={26} />,
          color: "bg-pink-100 text-pink-600",
          growth: "+1",
        },
        {
          name: "Money Spent",
          value: totalSpent,
          icon: <FaMoneyBillWave size={26} />,
          color: "bg-green-100 text-green-600",
          growth: "+15%",
          isPrice: true,
        },
        {
          name: "Total Orders",
          value: totalOrders,
          icon: <FaHistory size={26} />,
          color: "bg-blue-100 text-blue-600",
          growth: "+1",
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
                {formatNumber(card.value, card.isPrice)}
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
            {isAdmin ? "Admin Overview" : "Your Activity"}
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
            {isAdmin ? "Monthly Product Added" : "Monthly Spending"}
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
              <Bar dataKey="value" fill="#4f46e5" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
}
