"use client";

import Link from "next/link";
import Button from "../Common/Button/Button";
import FormInput from "../Common/FormInput/FormInput";

const LoginForm = () => {
  return (
    <form className="space-y-3">
      <FormInput
        label="email"
        type="email"
        name="email"
        placeholder="Enter your email"
      />

      <FormInput
        label="password"
        type="password"
        name="password"
        placeholder="Enter your password"
      />

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
      <Button>Login</Button>
    </form>
  );
};

export default LoginForm;
