import LoginForm from "@/components/Login/LoginForm";
import Link from "next/link";

export const metadata = {
  title: "Login",
};

export default function Login() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="w-full max-w-[350px] rounded bg-white px-4 py-6 shadow-md">
        {/* heading */}
        <div className="mb-6 space-y-1 text-center">
          <h1 className="text-xl font-bold">Login</h1>
          <p className="text-base text-gray-600 capitalize">
            Welcome back! Please login to your account.
          </p>
        </div>

        {/* login form */}
        <LoginForm />

        <p className="mt-4 text-center text-sm font-medium text-gray-600 capitalize">
          Don't have an account?{" "}
          <Link href="/register" className="text-green-700 hover:underline">
            register account.
          </Link>
        </p>
      </div>
    </div>
  );
}
