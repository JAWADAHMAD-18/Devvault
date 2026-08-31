"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  async function handelSubmit(e) {
    console.log(email, password, username);
    e.preventDefault();

    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, username }),
    });
    const data = await response.json();
    if (!response.ok) {
      setError(data.message);
      return;
    }
    router.push("/login");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#12141C] px-4">
      <div className="w-full max-w-sm rounded-lg border border-[#2A2E3F] bg-[#1A1D29] p-8 shadow-xl">
        <p className="font-mono text-sm text-[#E8A33D]">~/devvault</p>
        <h1 className="mt-2 text-xl font-semibold text-[#E8E9ED]">
          Create your account
        </h1>
        <p className="mt-1 text-sm text-[#8B8FA3]">
          Save and organize your dev notes and snippets.
        </p>

        {error && (
          <p className="mt-4 rounded-md border border-red-900 bg-red-950/50 px-3 py-2 text-sm text-red-300">
            {error}
          </p>
        )}

        <div className="mt-6 flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm text-[#8B8FA3]">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-md border border-[#2A2E3F] bg-[#12141C] px-3 py-2 text-sm text-[#E8E9ED] placeholder-[#565B70] outline-none transition focus:border-[#E8A33D] focus:ring-1 focus:ring-[#E8A33D]"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm text-[#8B8FA3]">Username</label>
            <input
              type="text"
              placeholder="jawad"
              onChange={(e) => setUsername(e.target.value)}
              className="rounded-md border border-[#2A2E3F] bg-[#12141C] px-3 py-2 text-sm text-[#E8E9ED] placeholder-[#565B70] outline-none transition focus:border-[#E8A33D] focus:ring-1 focus:ring-[#E8A33D]"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm text-[#8B8FA3]">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              onChange={(e) => setPassword(e.target.value)}
              className="rounded-md border border-[#2A2E3F] bg-[#12141C] px-3 py-2 text-sm text-[#E8E9ED] placeholder-[#565B70] outline-none transition focus:border-[#E8A33D] focus:ring-1 focus:ring-[#E8A33D]"
            />
          </div>

          <button
            onClick={handelSubmit}
            className="mt-2 rounded-md bg-[#E8A33D] px-4 py-2 text-sm font-medium text-[#12141C] transition hover:bg-[#f0b158] active:bg-[#d8933a]"
          >
            Create account
          </button>
        </div>

        <p className="mt-6 text-center text-sm text-[#8B8FA3]">
          Already have an account?{" "}
          <a href="/login" className="text-[#E8A33D] hover:underline">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
}
