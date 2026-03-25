"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { signIn, useSession } from "next-auth/react";

import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Loading from "@/app/loading";
import Button from "@/ui/Button";
import toast from "react-hot-toast";

type RegisterFormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  image: string; // URL from ImageUpload
  phone: string;
};

export default function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loadingImage] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>();

  const { status } = useSession();

  const searchParams = useSearchParams();

  const callbackUrl = searchParams.get("callbackUrl") || "/";

  // Auto redirect if already logged in
  useEffect(() => {
    if (status === "authenticated") {
      router.push(callbackUrl);
    }
  }, [status, callbackUrl, router]);

  if (status === "loading") return <Loading />;

  const passwordValue = watch("password");

  const onSubmit: SubmitHandler<RegisterFormData> = async (data) => {
    const {
      name,
      email,
      password,
      confirmPassword,
      gender = "",
      image = "",
      phone = "",
    } = data;

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/;
    if (!passwordRegex.test(password)) {
      toast.error("Password must be 6+ chars, with upper, lower, and digit");
      return;
    }

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, gender, image, phone }),
      });

      if (res.ok) {
        toast.success("Welcome! Registration Successful.");

        // Auto login
        await signIn("credentials", { redirect: false, email, password });
      } else if (res.status === 400) {
        toast.error("User already exists with this email");
      } else {
        throw new Error("Something went wrong");
      }
    } catch (err) {
      toast.error("Registration failed. Please try again.");
      console.log(err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Name */}
      <div className="group">
        <label className="text-sm font-semibold mb-2 block ml-1 text-base-content/70">
          Full Name
        </label>
        <input
          type="text"
          placeholder="John Doe"
          {...register("name", { required: "Name is required" })}
          className="form-input"
        />
        {errors.name && (
          <p className="text-xs text-error mt-2 ml-1 font-medium">
            {errors.name.message}
          </p>
        )}
      </div>

      {/* Email */}
      <div className="group">
        <label className="text-sm font-semibold mb-2 block ml-1 text-base-content/70">
          Email Address
        </label>
        <input
          type="email"
          placeholder="john@example.com"
          {...register("email", { required: "Email is required" })}
          className="form-input"
        />
        {errors.email && (
          <p className="text-xs text-error mt-2 ml-1 font-medium">
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Phone */}
      <div className="group">
        <label className="text-sm font-semibold mb-2 block ml-1 text-base-content/70">
          Phone Number
        </label>
        <input
          type="tel"
          placeholder="+1 234 567 890"
          {...register("phone", { required: "Phone number is required" })}
          className="form-input"
        />
        {errors.phone && (
          <p className="text-xs text-error mt-2 ml-1 font-medium">
            {errors.phone.message}
          </p>
        )}
      </div>

      {/* Password Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="relative group">
          <label className="text-sm font-semibold mb-2 block ml-1 text-base-content/70">
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            {...register("password", {
              required: "Password is required",
            })}
            className="form-input"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 bottom-4 text-base-content/40 hover:text-primary transition-colors cursor-pointer"
          >
            {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
          </button>
          {errors.password && (
            <p className="text-xs text-error mt-2 ml-1 font-medium">
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="relative group">
          <label className="text-sm font-semibold mb-2 block ml-1 text-base-content/70">
            Confirm Password
          </label>
          <input
            type={showConfirm ? "text" : "password"}
            placeholder="••••••••"
            {...register("confirmPassword", {
              required: "Confirm password is required",
              validate: (value) =>
                value === passwordValue || "Passwords do not match",
            })}
            className="form-input"
          />
          <button
            type="button"
            onClick={() => setShowConfirm(!showConfirm)}
            className="absolute right-4 bottom-4 text-base-content/40 hover:text-primary transition-colors cursor-pointer"
          >
            {showConfirm ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
          </button>
          {errors.confirmPassword && (
            <p className="text-xs text-error mt-2 ml-1 font-medium">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>
      </div>

      {/* Submit */}
      <Button
        className="w-full py-4 rounded-2xl shadow-lg hover:shadow-primary/20 transition-all font-bold text-lg"
        label={
          isSubmitting || loadingImage ? "Registering..." : "Create Account"
        }
        type="submit"
        disabled={isSubmitting || loadingImage}
        isOutline={false}
        isLarge={true}
      />
    </form>
  );
}
