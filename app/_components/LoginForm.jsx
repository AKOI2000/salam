"use client";

import { useForm } from "react-hook-form";
import { useTransition, useState } from "react";
import { login } from "@/app/_lib/auth-actions";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isPending, startTransition] = useTransition();
  const [showPassword, setShowPassword] = useState(false); // ← toggle state

  const onSubmit = (data) => {
    startTransition(async () => {
      const result = await login(data);
      // Fix 1 — result is undefined when redirect fires (success case)
      // only show error if result exists and has an error
      if (result?.error) {
        toast.error(result.error);
      }
    });
  };

  return (
    <div className="login-box">
      <h3>Welcome back, Salam</h3>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="input-box">
          <input
            type="email"
            placeholder="Email"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && <span>{errors.email.message}</span>}
        </div>

        <div className="input-box">
          {/* Fix 2 — password toggle */}
          <div className="input-password">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              {...register("password", { required: "Password is required" })}
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="input-password__toggle"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          {errors.password && <span>{errors.password.message}</span>}
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="btn-dashboard-primary"
        >
          {isPending ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
