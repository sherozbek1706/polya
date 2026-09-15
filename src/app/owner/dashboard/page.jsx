"use client";
import React, { useEffect, useState } from "react";
import api from "@/lib/axios";

const Dashboard = () => {
  const [stadiums, setStadiums] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal va Form statelari
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    has_shower: false,
    price_per_hour: "",
    image_url: "",
  });

  const getStadiums = async () => {
    try {
      const res = await api.get("/stadiums/my-stadiums");
      setStadiums(res); // Agar xato qilsa res.data ga o'zgartirarsiz
    } catch (error) {
      console.error("Stadionlarni yuklashda xatolik:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getStadiums();
  }, []);

  // Formadagi o'zgarishlarni ushlash
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Stadionni saqlash (POST so'rov)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await api.post("/stadiums", {
        ...formData,
        price_per_hour: Number(formData.price_per_hour), // raqam formatiga o'tkazish
      });

      // Muaffaqiyatli saqlangach modalni yopib, formani tozalaymiz
      setIsModalOpen(false);
      setFormData({
        name: "",
        address: "",
        has_shower: false,
        price_per_hour: "",
        image_url: "",
      });

      // Stadionlar ro'yxatini yangilaymiz
      getStadiums();
    } catch (error) {
      console.error("Stadion qo'shishda xatolik:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-gray-500 font-medium">Yuklanmoqda...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10 relative">
      <div className="max-w-7xl mx-auto">
        {/* Sarlavha va Qo'shish tugmasi */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold text-gray-900">
            Mening Stadionlarim
          </h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-xl transition duration-200 shadow-sm"
          >
            + Stadion qo'shish
          </button>
        </div>

        {/* Stadionlar Ro'yxati */}
        {stadiums?.length === 0 ? (
          <div className="text-center text-gray-500 bg-white rounded-xl shadow-sm p-10 border border-gray-100">
            Hozircha stadionlar mavjud emas.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {stadiums?.map((stadium) => (
              <div
                key={stadium.id}
                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-shadow duration-300 flex flex-col"
              >
                <div className="h-48 w-full bg-gray-200 relative">
                  <img
                    src={
                      stadium.image_url ||
                      "https://via.placeholder.com/400x250?text=Rasm+Yo'q"
                    }
                    alt={stadium.name}
                    className="w-full h-full object-cover"
                  />
                  {stadium.has_shower && (
                    <div className="absolute top-3 right-3 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm flex items-center gap-1">
                      🚿 Dush bor
                    </div>
                  )}
                </div>

                <div className="p-5 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-1">
                    {stadium.name}
                  </h3>
                  <p className="text-gray-500 text-sm mb-4 flex-grow flex items-start gap-1">
                    <span className="text-gray-400">📍</span>
                    <span className="line-clamp-2">{stadium.address}</span>
                  </p>
                  <div className="pt-4 border-t border-gray-100 mt-auto flex items-center justify-between">
                    <div className="text-sm text-gray-500">Soatiga:</div>
                    <div className="text-lg font-bold text-green-600">
                      {Number(stadium.price_per_hour).toLocaleString("uz-UZ")}{" "}
                      so'm
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* MODAL OYNA */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-fade-in-up">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-800">
                Yangi stadion qo'shish
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6">
              <div className="space-y-4">
                {/* Nomi */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Stadion nomi
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    placeholder="Masalan: Bunyodkor stadioni"
                  />
                </div>

                {/* Manzili */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Manzili
                  </label>
                  <input
                    type="text"
                    name="address"
                    required
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    placeholder="Manzilni kiriting"
                  />
                </div>

                {/* Narxi */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Soatiga narxi (so'm)
                  </label>
                  <input
                    type="number"
                    name="price_per_hour"
                    required
                    value={formData.price_per_hour}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    placeholder="Masalan: 150000"
                  />
                </div>

                {/* Rasm URL */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Rasm havolasi (URL)
                  </label>
                  <input
                    type="text"
                    name="image_url"
                    value={formData.image_url}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    placeholder="https://..."
                  />
                </div>

                {/* Dush bormi? */}
                <div className="flex items-center pt-2">
                  <input
                    type="checkbox"
                    id="has_shower"
                    name="has_shower"
                    checked={formData.has_shower}
                    onChange={handleInputChange}
                    className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer"
                  />
                  <label
                    htmlFor="has_shower"
                    className="ml-2 block text-sm text-gray-700 cursor-pointer"
                  >
                    Stadionda dush bormi?
                  </label>
                </div>
              </div>

              {/* Tugmalar */}
              <div className="mt-8 flex gap-3 justify-end">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-5 py-2 text-sm font-medium text-white rounded-lg transition ${
                    isSubmitting
                      ? "bg-blue-400 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700"
                  }`}
                >
                  {isSubmitting ? "Saqlanmoqda..." : "Saqlash"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
