"use client";

import { useState } from "react";
import Link from "next/link";

import { GrDocumentTime } from "react-icons/gr";
import { supabase } from "@/lib/supabase/client";
export default function SignupPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setMessage(null);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username,
        },
      },
    });

    if (error) {
      setError(error.message);
    } else if (data.user) {
      if (data.user.identities?.length === 0) {
        setError("User with this email already exists.");
      } else {
        setMessage("Check your email for the confirmation link!");
        setUsername("");
        setEmail("");
        setPassword("");
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="mb-8">
        <GrDocumentTime className="text-4xl" />
      </div>
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Create an account</h1>
        </div>
        <form className="space-y-6" onSubmit={handleSignup}>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          {message && <p className="text-green-500 text-sm text-center">{message}</p>}
          <div>
            <label
              htmlFor="username"
              className="text-sm font-medium text-gray-700"
            >
              Username *
            </label>
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="email" className="text-sm font-medium text-gray-700">
              Email *
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-700"
            >
              Password *
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800"
            >
              SIGN UP
            </button>
          </div>
        </form>
        <div className="p-4 mt-6 bg-[#f5f5f5] rounded-md">
          <p className="text-xs text-center text-gray-500">
            By creating an account, you agree to our{" "}
            <a href="#" className="underline hover:text-gray-700">
              Terms
            </a>{" "}
            and{" "}
            <a href="#" className="underline hover:text-gray-700">
              Privacy Policy
            </a>
            .
          </p>
          <p className="mt-3 text-sm text-center text-gray-600">
            Already have an account?{" "}
            <Link href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
              Login
            </Link>
          </p>
        </div>
      </div>
      <div className="mt-8 text-xs text-gray-500">
        <p>© {new Date().getFullYear()} Karo Inc.</p>
      </div>
    </div>
  );
}
