"use client";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import Button from "../Common/Button/Button";
import FormInput from "../Common/FormInput/FormInput";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    try {
      const data = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (data?.error) {
        setLoading(false);
        setErrors({
          errors: {
            common: {
              msg: "Invalid credentials!",
            },
          },
        });
      } else {
        setLoading(false);
        toast.success("Login Successful!");
        router.push("/message");
      }
    } catch (err) {
      setLoading(false);
      setErrors({
        errors: {
          common: {
            msg: "Intranal server error!",
          },
        },
      });
    }
  };

  return (
    <form className="space-y-3" onSubmit={handleSubmit}>
      <div className="space-y-2">
        <FormInput
          label="email"
          type="email"
          name="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <p className="text-sm font-medium text-red-600">
          {errors?.errors?.email?.msg}
        </p>
      </div>

      <div className="relative space-y-1">
        <FormInput
          label="password"
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <span
          className="absolute top-[55%] right-1 w-fit cursor-pointer text-gray-500 select-none"
          onClick={() => setShowPassword((prev) => !prev)}
        >
          {showPassword ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>
          )}
        </span>
        <p className="text-sm font-medium text-red-600">
          {errors?.errors?.password?.msg}
        </p>
      </div>

      {/* Remember me and forgot password links */}
      <div className="flex items-center justify-between text-sm font-medium text-gray-600">
        {/* Remember me checkbox */}
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="remember"
            name="remember"
            className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
          />
          <label
            htmlFor="remember"
            className="select-none hover:cursor-pointer"
          >
            Remember me
          </label>
        </div>
        {/* Forgot password */}
        <p className="hover:text-green-700">
          <Link href="/forgot-password">Forgot Password</Link>
        </p>
      </div>

      {/* submit button */}
      <Button isLoading={loading}>Login</Button>

      {/* common error message */}
      {errors?.errors?.common && (
        <p className="rounded bg-red-600 py-2 text-center text-[15px] font-medium text-white">
          {errors?.errors?.common?.msg}
        </p>
      )}
    </form>
  );
};

export default LoginForm;
