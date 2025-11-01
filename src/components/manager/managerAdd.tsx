import React, { useState } from "react";
import { api } from "@/service";

interface ManagerAddProps {
  onSuccess?: () => void;
}

const ManagerAdd: React.FC<ManagerAddProps> = ({ onSuccess }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [monthlySalary, setMonthlySalary] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    try {
      const dto = {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        phone: phone.trim(),
        password: password.trim(),
        photoUrl: photoUrl.trim() || null,
        monthlySalary: parseFloat(monthlySalary) || 0,
      };

      console.log("📤 Yuborilayotgan DTO:", dto);

      const res = await api.post("/managers", dto);
      console.log("✅ Manager added:", res.data);

      // Forma tozalash
      setFirstName("");
      setLastName("");
      setPhone("");
      setPassword("");
      setPhotoUrl("");
      setMonthlySalary("");

      if (onSuccess) onSuccess();
    } catch (error: any) {
      console.error("❌ Manager qo‘shishda xato:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 transition-colors duration-300 px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 transition-all">
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-100 mb-6">
          🧑‍💼 Yangi Manager Qo‘shish
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            { label: "Ism", value: firstName, setter: setFirstName },
            { label: "Familiya", value: lastName, setter: setLastName },
            { label: "Telefon raqam", value: phone, setter: setPhone },
            {
              label: "Parol",
              value: password,
              setter: setPassword,
              type: "password",
            },
          ].map(({ label, value, setter, type }) => (
            <div key={label}>
              <label className="block text-gray-700 dark:text-gray-200 mb-1 font-semibold">
                {label}
              </label>
              <input
                type={type || "text"}
                value={value}
                onChange={(e) => setter(e.target.value)}
                required
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          ))}

          <div>
            <label className="block text-gray-700 dark:text-gray-200 mb-1 font-semibold">
              Rasm URL (ixtiyoriy)
            </label>
            <input
              type="text"
              value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
              placeholder="https://example.com/photo.jpg"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-200 mb-1 font-semibold">
              Oylik maosh (ixtiyoriy)
            </label>
            <input
              type="number"
              value={monthlySalary}
              onChange={(e) => setMonthlySalary(e.target.value)}
              placeholder="Masalan: 3000000"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 mt-4 text-white font-semibold rounded-lg transition-all ${
              loading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
            }`}
          >
            {loading ? "Qo‘shilmoqda..." : "Qo‘shish"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ManagerAdd;
