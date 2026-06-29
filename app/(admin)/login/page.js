// app/login/page.jsx
import LoginForm from "@/app/_components/LoginForm";

export const metadata = {
  title: "Login",
};

export default function LoginPage() {
  return (
    <div className="login-page">
      <LoginForm />
    </div>
  );
}
