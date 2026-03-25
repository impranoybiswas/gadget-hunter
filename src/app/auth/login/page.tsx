"use client";
import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";
import Loading from "@/app/loading";
import Button from "@/ui/Button";
import Link from "next/link";

type LoginFormData = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>();

  const { status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const [showPassword, setShowPassword] = useState(false);

  // Auto redirect if already logged in
  useEffect(() => {
    if (status === "authenticated") {
      router.push(callbackUrl);
    }
  }, [status, callbackUrl, router]);

  if (status === "loading") return <Loading />;

  const onSubmit = async (data: LoginFormData) => {
    const res = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
      callbackUrl,
    });

    if (res?.error) {
      toast.error(res.error || "Login failed");
    } else {
      toast.success("Login Successful! Welcome back.");
      router.push(res?.url || callbackUrl);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Email */}
      <div className="group">
        <label className="text-sm font-semibold mb-2 block ml-1 text-base-content/70">
          Email Address
        </label>
        <input
          type="email"
          placeholder="hunter@example.com"
          {...register("email", { required: "Email is required" })}
          className="form-input"
        />
        {errors.email && (
          <p className="text-xs text-error mt-2 ml-1 font-medium">
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Password */}
      <div className="relative group">
        <div className="flex justify-between items-center mb-2 px-1">
          <label className="text-sm font-semibold text-base-content/70">
            Password
          </label>
          <Link
            href="/auth/forgot-password"
            className="text-xs text-primary hover:underline font-bold"
          >
            Forgot password?
          </Link>
        </div>
        <input
          type={showPassword ? "text" : "password"}
          placeholder="••••••••"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
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

      {/* Submit */}
      <Button
        className="w-full py-2 rounded-2xl shadow-lg hover:shadow-primary/20 transition-all font-bold text-lg"
        label={isSubmitting ? "Initializing..." : "Login"}
        type="submit"
        disabled={isSubmitting}
        isOutline={false}
        isLarge={true}
      />
    </form>
  );
}
