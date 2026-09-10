"use client"
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";

const Login = () => {
  const router = useRouter();

  // Login uchun state-lar
  const [formData, setFormData] = useState({
    phone: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Input qiymatlarini yangilash
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Formani yuborish (Login so'rovi)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const data = await api.post("/auth/login", formData);

      console.log("Muvaffaqiyatli kirildi:", data);
      
      // Tokenni localStorage ga saqlash
      if (data && data.token) {
        localStorage.setItem("token", data.token);
      }
      
      alert("Tizimga muvaffaqiyatli kirdingiz! Xush kelibsiz!");
      router.push("/owner/dashboard");
    } catch (err) {
      const errorMessage = err.response?.data?.error || err.response?.data?.message || "Telefon raqam yoki parol noto‘g‘ri!";
      setError(errorMessage);
      alert(errorMessage); // Xatolikni alert orqali ham chiqarish
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-100 p-6 sm:p-8">
        {/* Sarlavha qismi */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 mb-3 font-bold text-xl">
            ⚽
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 tracking-tight">
            Tizimga kirish
          </h1>
          <p className="text-sm text-slate-500 mt-2">
            Maydoningizni boshqarish uchun hisobingizga kiring.
          </p>
        </div>

        {/* Xatolik xabari (agar bo'lsa) */}
        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm flex items-center gap-2">
            <span>⚠️</span>
            <span>{error}</span>
          </div>
        )}

        {/* Forma qismi */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Telefon raqam */}
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-slate-700 mb-1.5"
            >
              Telefon raqam
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              placeholder="+998 90 123 45 67"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-sm"
            />
          </div>

          {/* Parol */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-slate-700"
              >
                Parol
              </label>
              <a
                href="/forgot-password"
                className="text-xs text-emerald-600 hover:text-emerald-700 font-medium hover:underline"
              >
                Parolni unutdingizmi?
              </a>
            </div>
            <input
              type="password"
              id="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-sm"
            />
          </div>

          {/* Kirish tugmasi */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] text-white font-medium text-sm rounded-xl shadow-lg shadow-emerald-600/20 transition-all duration-150 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer mt-2"
          >
            {loading ? "Kirilmoqda..." : "Tizimga kirish"}
          </button>
        </form>

        {/* Ro'yxatdan o'tishga havola */}
        <p className="text-center text-xs sm:text-sm text-slate-500 mt-6">
          Akkauntingiz yo‘qmi?{" "}
          <Link
            href="/owner/register"
            className="text-emerald-600 hover:text-emerald-700 font-semibold hover:underline"
          >
            Ro‘yxatdan o‘tish
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
