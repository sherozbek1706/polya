"use client";
import Navbar from "@/components/Navbar";
import api from "@/lib/axios";
import React, { useEffect, useState } from "react";
import Link from "next/link";

const Home = () => {
  const [stadiums, setStadiums] = useState([]);

  const getStadiums = async () => {
    try {
      let res = await api.get("/stadiums");
      // Agar axios interceptor o'rnatilmagan bo'lsa, res.data ishlatiladi.
      setStadiums(res.data || res);
    } catch (error) {
      console.error("Stadionlarni yuklashda xatolik yuz berdi:", error);
    }
  };

  useEffect(() => {
    getStadiums();
  }, []);

  // Mijozlar fikri uchun dummy (namuna) ma'lumotlar
  const testimonials = [
    {
      id: 1,
      name: "Sardor Ibrohimov",
      role: "Havaskor futbolchi",
      text: "Bu sayt orqali stadion topish juda oson! Kechasi o'ynash uchun dushi bor va yoritgichlari zo'r maydonni tezda topdik. Rahmat!",
      rating: 5,
    },
    {
      id: 2,
      name: "Alisher Usmonov",
      role: "Jamoa sardori",
      text: "Narxlar hamyonbop va qoplama turlarini oldindan ko'rish imkoniyati borligi juda yoqdi. Endi doim shu yerdan band qilamiz.",
      rating: 5,
    },
    {
      id: 3,
      name: "Javohir Qodirov",
      role: "Talaba",
      text: "Do'stlar bilan dam olish kunlari futbol o'ynashga doim joy qidirardik. Ushbu platforma muammomizni to'liq hal qildi.",
      rating: 4,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* 1. HERO BANNER SECTION */}
      <div className="max-w-7xl mx-auto px-4 pt-6 pb-12">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-800 shadow-2xl">
          {/* Dekorativ orqa fon elementlari */}
          <div className="absolute top-0 right-0 -mt-16 -mr-16 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 -mb-16 -ml-16 w-48 h-48 bg-blue-400 opacity-20 rounded-full blur-2xl"></div>

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between p-8 md:p-16">
            <div className="md:w-3/5 text-white">
              <span className="inline-block py-1 px-3 rounded-full bg-blue-500 bg-opacity-30 border border-blue-400 text-sm font-semibold mb-4 backdrop-blur-sm">
                #1 Stadionlarni band qilish platformasi
              </span>
              <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
                O'z jamoangiz uchun eng yaxshi maydonni toping!
              </h1>
              <p className="text-blue-100 text-lg mb-8 max-w-lg">
                Shahar bo'ylab joylashgan ochiq va yopiq, sun'iy va tabiiy
                qoplamali mini-futbol maydonlarini onlayn band qiling.
              </p>
              <div className="flex gap-4">
                <Link
                  href="/stadiums"
                  className="bg-white text-blue-700 font-bold py-3 px-8 rounded-full shadow-lg hover:bg-gray-100 transition duration-300 transform hover:scale-105"
                >
                  Stadionlarni ko'rish
                </Link>
              </div>
            </div>

            {/* Banner uchun vizual rasm (ixtiyoriy) */}
            <div className="hidden md:flex md:w-2/5 justify-end">
              <img
                src="https://cdn-icons-png.flaticon.com/512/5119/5119102.png"
                alt="Football"
                className="w-64 h-64 object-contain opacity-90 drop-shadow-2xl transform rotate-12 hover:rotate-0 transition duration-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 2. STADIONLAR SECTION */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900">
              Mashhur Stadionlar
            </h2>
            <p className="text-gray-500 mt-2">
              Eng ko'p band qilinadigan va reytingi baland maydonlar
            </p>
          </div>
          <Link
            href="/stadiums"
            className="hidden sm:inline-flex text-blue-600 font-semibold hover:text-blue-800 transition"
          >
            Barchasini ko'rish &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {stadiums?.slice(0, 6).map((stadium) => (
            <div
              key={stadium.id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group"
            >
              <div className="relative overflow-hidden">
                {stadium.image_url ? (
                  <img
                    src={stadium.image_url}
                    alt={stadium.name}
                    className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-56 bg-gray-200 flex items-center justify-center text-gray-400 group-hover:scale-110 transition-transform duration-500">
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
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold text-gray-900 shadow">
                  {stadium.price_per_hour} so'm/soat
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {stadium.name}
                </h3>
                <p className="text-gray-500 text-sm mb-4 flex items-start line-clamp-2">
                  <svg
                    className="w-4 h-4 mr-1 mt-0.5 flex-shrink-0 text-gray-400"
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

                <div className="flex flex-wrap gap-2 mb-4">
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
              </div>
            </div>
          ))}
        </div>

        {stadiums?.length > 0 && (
          <div className="mt-12 flex justify-center sm:hidden">
            <Link
              href="/stadiums"
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-xl transition duration-300 w-full text-center"
            >
              Barcha stadionlarni ko'rish
            </Link>
          </div>
        )}
      </div>

      {/* 3. MIJOZLAR FIKRI (TESTIMONIALS) */}
      <div className="bg-white py-16 border-t border-gray-100 mt-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Mijozlarimiz nima deydi?
            </h2>
            <p className="text-gray-500 mt-3 max-w-2xl mx-auto">
              Bizning platformamizdan foydalanib stadion band qilgan futbol
              ixlosmandlarining xolis fikrlari.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((review) => (
              <div
                key={review.id}
                className="bg-gray-50 rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition"
              >
                <div className="flex text-yellow-400 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 fill-current"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 italic mb-6">"{review.text}"</p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-lg">
                    {review.name.charAt(0)}
                  </div>
                  <div className="ml-3">
                    <h4 className="text-sm font-bold text-gray-900">
                      {review.name}
                    </h4>
                    <p className="text-xs text-gray-500">{review.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;