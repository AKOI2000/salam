// app/_components/LogoutButton.jsx
"use client";

import { useTransition } from "react";
import { logout } from "@/app/_lib/auth-actions";
import toast from "react-hot-toast";

function LogoutButton() {
  const [isPending, startTransition] = useTransition();

  const handleLogout = () => {
    startTransition(async () => {
      const result = await logout();
      if (result?.error) toast.error(result.error);
    });
  };

  return (
    <button
      onClick={handleLogout}
      disabled={isPending}
      className="btn-dashboard-primary"
    >
      {isPending ? "Signing out..." : "Sign out"}
    </button>
  );
}

export default LogoutButton;