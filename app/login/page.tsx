"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
// We don't need useRouter if we use window.location

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false, // Prevents automatic redirect to error pages
    });

    if (result?.ok) {
      // FIX: Use window.location.href instead of router.push
      // This forces the browser to refresh and pick up the new session immediately
      window.location.href = "/dashboard"; 
    } else {
      alert("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-200">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Admin Access</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input 
              type="email" 
              autoComplete="email"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border rounded-lg text-black outline-none focus:ring-2 focus:ring-blue-500" 
              placeholder="admin@test.com"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input 
              type="password" 
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border rounded-lg text-black outline-none focus:ring-2 focus:ring-blue-500" 
              placeholder="••••••••"
              required
            />
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition shadow-lg">
            Sign In to Dashboard
          </button>
        </form>
      </div>
    </div>
  );
}