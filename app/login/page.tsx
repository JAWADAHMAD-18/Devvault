//login page 
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login(){
    const router=useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    async function handelSubmit(e) {
        console.log(email, password);
        e.preventDefault();
        const response = await fetch("/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });
        const data = await response.json();
        if (!response.ok) {
          setError(data.message);
          return;
        }
        router.push("/notes");
      }

    return(<div className="flex min-h-screen items-center justify-center bg-[#12141C] px-4">
    <div className="w-full max-w-sm rounded-lg border border-[#2A2E3F] bg-[#1A1D29] p-8 shadow-xl">
      <p className="font-mono text-sm text-[#E8A33D]">~/devvault</p>
      <h1 className="mt-2 text-xl font-semibold text-[#E8E9ED]">
        Login to your account
      </h1>
      <p className="mt-1 text-sm text-[#8B8FA3]">
        Don't have an account?{" "}
        <a
          href="/signup"
          className="text-[#E8A33D] underline"
        >
          Sign up
        </a>
      </p>
      <form className="mt-6" onSubmit={handelSubmit} >
        <div className="mb-2">
          <label
            htmlFor="email"
            className="mb-1 block text-xs font-semibold text-[#8B8FA3]"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="block w-full rounded-md border border-[#2A2E3F] bg-[#1A1D29] px-4 py-2 text-[#E8E9ED] placeholder:text-[#8B8FA3] focus:border-[#E8A33D] focus:outline-none focus:ring-[#E8A33D]"
          />
        </div>
        <div className="mb-2">
          <label
            htmlFor="password"
            className="mb-1 block text-xs font-semibold text-[#8B8FA3]"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="block w-full rounded-md border border-[#2A2E3F] bg-[#1A1D29] px-4 py-2 text-[#E8E9ED] placeholder:text-[#8B8FA3] focus:border-[#E8A33D] focus:outline-none focus:ring-[#E8A33D]"
          />
        </div>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        <button
          type="submit"
          className="mt-6 w-full rounded-md bg-[#E8A33D] py-2 text-sm font-semibold text-[#1A1D29] hover:bg-[#E8A33D]/80"
        >
          Login
        </button>
      </form>
    </div>
  </div>)
}