// app/_components/LoginForm.jsx
"use client";

import { useForm } from "react-hook-form";
import { useTransition } from "react";
import { login } from "@/app/_lib/auth-actions";
import toast from "react-hot-toast";

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isPending, startTransition] = useTransition();

  const onSubmit = (data) => {
    startTransition(async () => {
      const result = await login(data);
      if (!result.success) {
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
          <input
            type="password"
            placeholder="Password"
            {...register("password", { required: "Password is required" })}
          />
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
