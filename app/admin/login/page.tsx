"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { createClient } from "@/utils/supabase/client";
import { AlertCircle, Lock, Mail } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErrorMsg(error.message);
      setLoading(false);
    } else {
      router.push("/admin");
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen bg-bone flex items-center justify-center p-6">
      {/* Background grain noise */}
      <div className="grain-overlay opacity-[0.03]" aria-hidden="true" />

      <div className="w-full max-w-md bg-cream border border-stone/10 rounded-card shadow-warm-lg overflow-hidden relative z-10">
        <div className="p-8">
          {/* Logo & Header */}
          <div className="flex flex-col items-center mb-8">
            <div className="relative w-14 h-14 mb-4">
              <Image
                src="/images/logo.png"
                alt="Ridhana Logo"
                fill
                className="object-contain"
              />
            </div>
            <h1 className="font-serif text-display-md text-espresso text-center">
              Admin Console
            </h1>
            <p className="font-sans text-stone text-xs tracking-widest uppercase mt-1">
              Ridhana Slow-Milled Atta
            </p>
          </div>

          {errorMsg && (
            <div className="mb-6 p-4 bg-terracotta/10 border border-terracotta/20 rounded-lg flex items-start gap-3 text-terracotta text-sm">
              <AlertCircle size={18} className="flex-shrink-0 mt-0.5" />
              <p className="font-sans leading-relaxed">{errorMsg}</p>
            </div>
          )}

          <form onSubmit={handleLogin} className="flex flex-col gap-5">
            {/* Email Field */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="email"
                className="font-sans text-label text-stone/80 tracking-widest uppercase font-semibold"
              >
                Email Address
              </label>
              <div className="relative">
                <Mail
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-stone/50"
                />
                <input
                  id="email"
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-bone border border-stone/20 rounded-lg text-sm text-espresso placeholder:text-stone/40 focus:outline-none focus:border-gold transition-colors font-sans"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="password"
                className="font-sans text-label text-stone/80 tracking-widest uppercase font-semibold"
              >
                Password
              </label>
              <div className="relative">
                <Lock
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-stone/50"
                />
                <input
                  id="password"
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-bone border border-stone/20 rounded-lg text-sm text-espresso placeholder:text-stone/40 focus:outline-none focus:border-gold transition-colors font-sans"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-espresso text-bone hover:bg-stone-dark active:scale-[0.98] py-3.5 rounded-lg text-xs font-semibold tracking-widest uppercase transition-all flex items-center justify-center gap-2 mt-2"
            >
              {loading ? (
                <span className="w-4 h-4 rounded-full border-2 border-bone border-t-transparent animate-spin" />
              ) : (
                "Sign In"
              )}
            </button>
          </form>
        </div>

        {/* Small footer note */}
        <div className="p-4 bg-espresso/5 border-t border-stone/5 text-center">
          <p className="font-sans text-[10px] text-stone/50 uppercase tracking-widest">
            Protected internal area
          </p>
        </div>
      </div>
    </div>
  );
}
