"use client";

import React from "react";
import { useUserData } from "@/hooks/useUserData";
import Image from "next/image";
import {
  FaUser,
  FaEnvelope,
  FaVenusMars,
  FaUserShield,
  FaCalendarAlt,
  FaPhone,
} from "react-icons/fa";
import { format, parseISO } from "date-fns";

export default function ProfilePage() {
  const { currentUser, isLoading } = useUserData();

  if (isLoading) {
    return (
      <section className="p-6 flex justify-center items-center min-h-[60vh]">
        <p className="text-base-content/50 text-lg animate-pulse">
          Loading profile...
        </p>
      </section>
    );
  }

  if (!currentUser) {
    return (
      <section className="p-6 flex justify-center items-center min-h-[60vh]">
        <p className="text-red-500 text-lg font-medium">
          No profile data available.
        </p>
      </section>
    );
  }

  const { name, email, gender, image, role, createdAt, lastSignInAt, phone } =
    currentUser;

  // Safely format dates using date-fns
  const formattedCreatedAt = createdAt
    ? format(parseISO(createdAt), "PPP")
    : "N/A";
  const formattedLastSignIn = lastSignInAt
    ? format(parseISO(lastSignInAt), "PPpp")
    : "N/A";

  return (
    <section className="w-full flex flex-col md:flex-row items-start gap-10 bg-base-100 rounded-2xl shadow-md p-8 border border-base-content/10 transition-all hover:shadow-lg duration-300">
      {/* Profile Image */}
      <div className="flex-shrink-0 relative w-full h-44 md:w-44 md:h-44 mb-5 md:mb-0">
        <Image
          src={image || "./assets/placeholder-profile.svg"}
          alt={name || "User avatar"}
          fill
          className="rounded-2xl object-cover border border-base-content/10"
        />
      </div>

      {/* Profile Details */}
      <div className="flex-1 flex flex-col gap-6 text-base-content">
        <h2 className="text-2xl font-semibold text-base-content border-b border-base-content/10 pb-2">
          Profile Information
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Name */}
          <ProfileItem
            icon={<FaUser className="text-indigo-600" />}
            label="Name"
            value={name}
          />

          {/* Email */}
          <ProfileItem
            icon={<FaEnvelope className="text-green-600" />}
            label="Email"
            value={email}
          />

          {/* Gender */}
          <ProfileItem
            icon={<FaVenusMars className="text-pink-600" />}
            label="Gender"
            value={gender || "N/A"}
          />
          {/* Phone */}
          <ProfileItem
            icon={<FaPhone className="text-accent" />}
            label="Phone"
            value={phone || "N/A"}
          />

          {/* Role */}
          <ProfileItem
            icon={<FaUserShield className="text-yellow-600" />}
            label="Role"
            value={role}
          />

          {/* Created At */}
          <ProfileItem
            icon={<FaCalendarAlt className="text-indigo-500" />}
            label="Created At"
            value={formattedCreatedAt}
          />

          {/* Last Sign In */}
          <ProfileItem
            icon={<FaCalendarAlt className="text-red-500" />}
            label="Last Sign In"
            value={formattedLastSignIn}
          />
        </div>
      </div>
    </section>
  );
}

interface ProfileItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

// ✅ Reusable Info Row Component
function ProfileItem({ icon, label, value }: ProfileItemProps) {
  return (
    <div className="flex items-center gap-4 p-3 bg-base-200 rounded-lg border border-base-content/5 hover:bg-base-300/50 transition">
      <div className="text-xl">{icon}</div>
      <div>
        <p className="text-sm text-base-content/50">{label}</p>
        <p className="text-base font-medium text-base-content capitalize">
          {value}
        </p>
      </div>
    </div>
  );
}
