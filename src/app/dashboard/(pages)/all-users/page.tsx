"use client";

import React from "react";
import { useAllUsers } from "@/hooks/useAdmin";
import ProtectedLayout from "@/customs/ProtectedLayout";
import { FaUserShield, FaUser, FaUserTie } from "react-icons/fa";

const roles = ["user", "member", "admin"];

export default function AllUsersPage() {
  const { users, isLoading, updateRole, isUpdating } = useAllUsers();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "admin":
        return <FaUserShield className="text-error" />;
      case "member":
        return <FaUserTie className="text-secondary" />;
      default:
        return <FaUser className="text-primary" />;
    }
  };

  return (
    <ProtectedLayout protectedFor="admin">
      <div className="bg-base-100 rounded-xl shadow-md border border-base-content/10 overflow-hidden">
        <div className="p-6 border-b border-base-content/10 flex justify-between items-center">
          <h2 className="text-xl font-bold text-base-content">Manage Users</h2>
          <span className="badge badge-primary">
            {users.length} Total Users
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="table table-zebra w-full text-left">
            <thead className="bg-base-200 text-base-content/70 uppercase text-xs font-semibold">
              <tr>
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Current Role</th>
                <th className="px-6 py-4">Change Role</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-base-content/5">
              {users.map((user) => (
                <tr
                  key={user._id}
                  className="hover:bg-base-200/50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-10 h-10 bg-base-300">
                          {user.image ? (
                            <img src={user.image} alt={user.name} />
                          ) : (
                            <div className="flex items-center justify-center h-full text-base-content/30">
                              <FaUser size={20} />
                            </div>
                          )}
                        </div>
                      </div>
                      <div>
                        <div className="font-bold text-base-content">
                          {user.name}
                        </div>
                        <div className="text-xs text-base-content/50">
                          Joined {new Date(user.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-base-content/70">
                    {user.email}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className={`p-1.5 rounded-full bg-base-200`}>
                        {getRoleIcon(user.role)}
                      </span>
                      <span className="capitalize font-medium text-base-content">
                        {user.role}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <select
                      className="select select-bordered select-sm w-full max-w-xs capitalize bg-base-100"
                      value={user.role}
                      disabled={isUpdating}
                      onChange={(e) =>
                        updateRole({ userId: user._id, role: e.target.value })
                      }
                    >
                      {roles.map((role) => (
                        <option key={role} value={role}>
                          {role}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </ProtectedLayout>
  );
}
