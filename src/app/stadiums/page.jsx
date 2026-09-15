"use client";
import Navbar from "@/components/Navbar";
import api from "@/lib/axios";
import React, { useEffect, useState } from "react";
import Link from "next/link";

const Stadiums = () => {
  const [stadiums, setStadiums] = useState([]);
  const [loading, setLoading] = useState(true);

  const getStadiums = async () => {
    try {
      setLoading(true);
      let res = await api.get("/stadiums");
      // Axios orqali kelgan ma'lumotni o'qish
      setStadiums(res.data || res);
    } catch (error) {
      console.error("Stadionlarni yuklashda xatolik yuz berdi:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getStadiums();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Sahifa sarlavhasi (Header) */}
      <div className="bg-white border-b border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div>
              <h1 className="text-3xl font-extrabold text-gray-900">
                Barcha Stadionlar
              </h1>
              <p className="text-gray-500 mt-2">
                O'zingizga eng qulay va yaqin bo'lgan maydonni tanlang va band
                qiling.
              </p>
            </div>

            {/* Ortga qaytish tugmasi */}
            <div className="mt-4 md:mt-0">
              <Link
                href="/"
                className="inline-flex items-center text-blue-600 bg-blue-50 hover:bg-blue-100 font-medium py-2 px-4 rounded-lg transition"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  ></path>
                </svg>
                Bosh sahifaga
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Stadionlar ro'yxati */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {loading ? (
          // Yuklanish jarayoni (Loading Skeleton yoki Text)
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-500 font-medium">
              Stadionlar yuklanmoqda...
            </p>
          </div>
        ) : stadiums?.length > 0 ? (
          // Stadionlar Grid ro'yxati
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {stadiums.map((stadium) => (
              <div
                key={stadium.id}
                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group cursor-pointer"
              >
                {/* Rasm qismi */}
                <div className="relative overflow-hidden">
                  {stadium.image_url ? (
                    <img
                      src={stadium.image_url}
                      alt={stadium.name}
                      className="w-full h-52 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-52 bg-gray-100 flex items-center justify-center text-gray-400 group-hover:scale-110 transition-transform duration-500">
                      <svg
                        className="w-12 h-12"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        ></path>
                      </svg>
                    </div>
                  )}
                  {/* Narx tegi */}
                  <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm font-bold text-gray-900 shadow-md">
                    {stadium.price_per_hour} so'm
                  </div>
                </div>

                {/* Ma'lumot qismi */}
                <div className="p-5">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {stadium.name}
                  </h3>
                  <p className="text-gray-500 text-sm mb-4 flex items-start line-clamp-2 min-h-10">
                    <svg
                      className="w-4 h-4 mr-1.5 mt-0.5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      ></path>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      ></path>
                    </svg>
                    {stadium.address}
                  </p>

                  <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-100">
                    <span className="bg-blue-50 text-blue-700 text-xs font-semibold px-2.5 py-1 rounded-md border border-blue-100">
                      {stadium.cover_type}
                    </span>
                    {stadium.has_shower && (
                      <span className="bg-green-50 text-green-700 text-xs font-semibold px-2.5 py-1 rounded-md border border-green-100 flex items-center">
                        <svg
                          className="w-3 h-3 mr-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
                          ></path>
                        </svg>
                        Dush mavjud
                      </span>
                    )}
                  </div>

                  {/* Batafsil tugmasi */}
                  <div className="mt-5">
                    <button className="w-full bg-gray-50 hover:bg-blue-600 text-gray-700 hover:text-white font-medium py-2 rounded-lg transition-colors border border-gray-200 hover:border-transparent">
                      Batafsil ko'rish
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Agar ma'lumot bo'lmasa (Empty state)
          <div className="text-center py-20">
            <svg
              className="mx-auto h-16 w-16 text-gray-300 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Stadionlar topilmadi
            </h3>
            <p className="text-gray-500">
              Hozircha tizimda hech qanday stadion mavjud emas.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Stadiums;
