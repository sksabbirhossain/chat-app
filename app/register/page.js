import RegisterForm from "@/components/Register/RegisterForm";
import Link from "next/link";

export const metadata = {
  title: "Register",
};

const Register = () => {
  return (
    <section className="flex h-screen items-center justify-center px-2">
      <div className="w-full max-w-[380px] rounded bg-white px-4 py-6 shadow-md">
        {/* heading */}
        <div className="mb-6 space-y-1 text-center">
          <h1 className="text-xl font-bold">Register</h1>
          <p className="text-base text-gray-600 capitalize">
            Welcome! Create a new account to get started.
          </p>
        </div>

        {/* register form */}
        <RegisterForm />

        {/* link to login */}
        <p className="mt-4 text-center text-sm font-medium text-gray-600 capitalize">
          Already you have an account?{" "}
          <Link href="/" className="text-green-700 hover:underline">
            login here
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Register;
