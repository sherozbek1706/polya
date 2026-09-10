"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";

const Register = () => {
  const router = useRouter();

  // Formalar uchun state-lar (role har doim "OWNER")
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    password: "",
    role: "OWNER",
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

  // Formani yuborish
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // 4 ta qiymat (name, phone, password, role) /auth/register ga yuboriladi
      const data = await api.post("/auth/register", formData);

      alert("Muvaffaqiyatli ro'yxatdan o'tdingiz!");
      // axios interceptor to'g'ridan-to'g'ri datani qaytargani uchun xatolik bo'lmasa ishladi deb olamiz
      router.push("/owner/login");
    } catch (err) {
      console.error("Registratsiya xatosi:", err);
      const errorMessage = err.response?.data?.error || err.response?.data?.message || "Ro'yxatdan o'tishda xatolik yuz berdi yoki bu raqam oldin ro'yxatdan o'tgan.";
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
            Registratsiya
          </h1>
          <p className="text-sm text-slate-500 mt-2">
            Mini polyangizni biz bilan oson ijaraga bering.
          </p>
        </div>

        {/* Xatolik xabari chiqadigan joy */}
        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm flex items-center gap-2">
            <span>⚠️</span>
            <span>{error}</span>
          </div>
        )}

        {/* Forma qismi */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Ism */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-slate-700 mb-1.5"
            >
              Ism
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="Masalan: Jasur"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-sm"
            />
          </div>

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
            <label
              htmlFor="password"
              className="block text-sm font-medium text-slate-700 mb-1.5"
            >
              Parol
            </label>
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

          {/* Eslatma: Rol haqida yashirin/ko'rgazmali belgi */}
          <div className="flex items-center gap-2 p-2.5 bg-emerald-50 rounded-lg text-emerald-800 text-xs font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            Siz tizimga maydon egasi (OWNER) sifatida ro‘yxatdan o‘tyapsiz.
          </div>

          {/* Yuborish tugmasi */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] text-white font-medium text-sm rounded-xl shadow-lg shadow-emerald-600/20 transition-all duration-150 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer mt-2"
          >
            {loading ? "Ro'yxatdan o'tilmoqda..." : "Ro'yxatdan o'tish"}
          </button>
        </form>

        {/* Tizimga kirish havolasi */}
        <p className="text-center text-xs sm:text-sm text-slate-500 mt-6">
          Akkauntingiz bormi?{" "}
          <Link
            href="/owner/login"
            className="text-emerald-600 hover:text-emerald-700 font-semibold hover:underline"
          >
            Kirish
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;