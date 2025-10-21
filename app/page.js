import LoginForm from "@/components/Login/LoginForm";
import Link from "next/link";

export const metadata = {
  title: "Login",
};

export default function Login() {
  return (
    <section className="flex h-screen items-center justify-center px-2">
      <div className="w-full max-w-[350px] rounded-md bg-white px-4 py-7 shadow-md sm:px-5 sm:py-10">
        {/* heading */}
        <div className="mb-6 space-y-1 text-center">
          <h1 className="text-xl font-medium text-gray-600 uppercase">Login</h1>
          <p className="text-[15px] text-gray-500">
            Welcome back! Please login to your account.
          </p>
        </div>

        {/* login form */}
        <LoginForm />

        <p className="mt-7 text-center text-sm font-medium text-gray-600">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-green-700 hover:underline">
            Register Account
          </Link>
        </p>
      </div>
    </section>
  );
}
