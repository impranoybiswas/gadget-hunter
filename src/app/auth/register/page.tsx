"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { signIn, useSession } from "next-auth/react";

import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { ImageUpload } from "@/customs/ImageUpload";
import { FcGoogle } from "react-icons/fc";
import Loading from "@/app/loading";
import Button from "@/ui/Button";
import Link from "next/link";
import Swal from "sweetalert2";

type RegisterFormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  image: string; // URL from ImageUpload
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
    control,
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
    const { name, email, password, confirmPassword, gender, image } = data;

    if (password !== confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Passwords do not match",
        text: "Confirm password must match the password",
      });
      return;
    }

    if (!image) {
      Swal.fire({
        icon: "error",
        title: "Profile Photo Required",
        text: "Please upload a profile image",
      });
      return;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/;
    if (!passwordRegex.test(password)) {
      Swal.fire({
        icon: "error",
        title: "Invalid Password",
        text: "Password must have 6+ chars, one uppercase, one lowercase, and one number",
      });
      return;
    }

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, gender, image }),
      });

      if (res.ok) {
        Swal.fire({
          icon: "success",
          title: "Registration Successful",
          text: "Welcome to Gadget Hunter!",
          timer: 2000,
          showConfirmButton: false,
        });

        // Auto login
        await signIn("credentials", { redirect: false, email, password });
      } else if (res.status === 400) {
        Swal.fire({
          icon: "warning",
          title: "User Already Exists",
        });
      } else {
        throw new Error("Something went wrong");
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: "Please try again later",
      });
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-base-100 via-base-100 to-primary/10 p-4 md:p-10 py-4 lg:py-20">
      <div className="w-full max-w-6xl flex flex-col md:flex-row bg-base-200 rounded-[2.5rem] shadow-2xl overflow-hidden min-h-[800px] border border-base-content/5">
        {/* Left Column - Image Background (Hidden on small devices) */}
        <div
          className="hidden md:flex md:w-1/2 relative bg-cover bg-center items-end p-16"
          style={{ backgroundImage: "url('/assets/register-bg.png')" }}
        >
          {/* Gradient Overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>

          {/* Shop Link Overlay */}
          <div className="absolute top-10 left-10 group">
            <Link
              href="/"
              className="flex items-center gap-3 text-white/90 hover:text-white transition-all duration-300 font-semibold bg-white/10 backdrop-blur-xl px-6 py-3 rounded-2xl border border-white/20 hover:bg-white/20 hover:scale-105"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 transform group-hover:-translate-x-1 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Back to Home
            </Link>
          </div>

          {/* Branding Content */}
          <div className="relative z-10 text-white">
            <h1 className="text-6xl font-black mb-6 tracking-tighter drop-shadow-2xl">
              Gadget <span className="text-primary">Hunter</span>
            </h1>
            <p className="text-xl text-white/80 max-w-md font-light leading-relaxed mb-4">
              Step into the future of technology. Your ultimate destination for
              Bangladesh&apos;s most innovative gadgets.
            </p>
            <div className="w-20 h-1.5 bg-primary rounded-full"></div>
          </div>
        </div>

        {/* Right Column - Registration Form */}
        <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center overflow-y-auto max-h-screen md:max-h-none">
          {/* Mobile Branding (Visible only on small devices) */}
          <div className="md:hidden flex flex-col items-center mb-10">
            <div className="p-4 bg-primary/10 rounded-3xl mb-4">
              <h1 className="text-3xl font-black text-primary tracking-tighter">
                Gadget Hunter
              </h1>
            </div>
            <Link
              href="/"
              className="text-primary hover:underline font-semibold flex items-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Back to Home
            </Link>
          </div>

          <div className="mb-10 text-center md:text-left">
            <h2 className="text-4xl font-bold mb-3 tracking-tight text-base-content">
              Create Account
            </h2>
            <p className="text-base-content/60 text-lg">
              Join our community of 10k+ tech hunters.
            </p>
          </div>

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
                className="w-full border border-base-content/10 bg-base-100 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all shadow-sm group-hover:shadow-md"
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
                className="w-full border border-base-content/10 bg-base-100 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all shadow-sm group-hover:shadow-md"
              />
              {errors.email && (
                <p className="text-xs text-error mt-2 ml-1 font-medium">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Image Upload Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="group">
                <Controller
                  name="image"
                  control={control}
                  defaultValue=""
                  rules={{ required: "Profile image is required" }}
                  render={({ field }) => (
                    <ImageUpload
                      folder="users"
                      label="Profile Photo"
                      imageUrl={field.value || null}
                      onUploadSuccess={(url) => field.onChange(url)}
                      className="transition-all"
                    />
                  )}
                />
                {errors.image && (
                  <p className="text-xs text-error mt-2 ml-1 font-medium">
                    {errors.image.message}
                  </p>
                )}
              </div>

              {/* Gender */}
              <div className="group">
                <label className="text-sm font-semibold mb-2 block ml-1 text-base-content/70">
                  Gender
                </label>
                <select
                  {...register("gender", { required: "Gender is required" })}
                  className="w-full border border-base-content/10 bg-base-100 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all shadow-sm group-hover:shadow-md appearance-none"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                {errors.gender && (
                  <p className="text-xs text-error mt-2 ml-1 font-medium">
                    {errors.gender.message}
                  </p>
                )}
              </div>
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
                  className="w-full border border-base-content/10 bg-base-100 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all shadow-sm group-hover:shadow-md"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-[3.25rem] text-base-content/40 hover:text-primary transition-colors"
                >
                  {showPassword ? (
                    <FaEyeSlash size={18} />
                  ) : (
                    <FaEye size={18} />
                  )}
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
                  className="w-full border border-base-content/10 bg-base-100 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all shadow-sm group-hover:shadow-md"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-4 top-[3.25rem] text-base-content/40 hover:text-primary transition-colors"
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
                isSubmitting || loadingImage
                  ? "Registering..."
                  : "Create Account"
              }
              type="submit"
              disabled={isSubmitting || loadingImage}
              isOutline={false}
              isLarge={true}
            />
          </form>

          {/* Divider */}
          <div className="flex items-center my-8">
            <div className="flex-grow border-t border-base-content/10"></div>
            <span className="px-5 text-base-content/30 text-xs font-bold uppercase tracking-widest">
              Or continue with
            </span>
            <div className="flex-grow border-t border-base-content/10"></div>
          </div>

          {/* Google login */}
          <button
            onClick={() => signIn("google", { callbackUrl })}
            className="w-full flex items-center justify-center gap-4 bg-base-100 border border-base-content/10 py-4 rounded-2xl shadow-sm hover:shadow-md hover:bg-base-200/50 transition-all duration-300 transform active:scale-[0.98]"
          >
            <FcGoogle className="w-6 h-6" />
            <span className="font-bold text-base-content/80">
              Google Account
            </span>
          </button>

          {/* Already have an account? */}
          <p className="text-center text-base-content/60 mt-8 font-medium">
            Already a hunter?{" "}
            <Link
              href="/auth/login"
              className="text-primary font-bold hover:underline ml-1"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
