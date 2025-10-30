import React, { useState } from "react";
import { useTokenStore } from "@/stores/storeToken";
import { api } from "@/service";
import { toast } from "sonner"; // toast bildirishnoma uchun (shadcn/toast)

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

  const token = useTokenStore((state) => state.accessToken);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!firstName || !lastName || !phone || !password) {
      toast.error("Iltimos, barcha majburiy maydonlarni to‘ldiring!");
      return;
    }

    setLoading(true);

    try {
      const dto = {
        firstName,
        lastName,
        phone,
        password,
        photoUrl,
        monthlySalary: parseFloat(monthlySalary) || 0,
      };

      const res = await api.post("/managers", dto);
      toast.success("Manager muvaffaqiyatli qo‘shildi!");

      setFirstName("");
      setLastName("");
      setPhone("");
      setPassword("");
      setPhotoUrl("");
      setMonthlySalary("");

      if (onSuccess) onSuccess();
    } catch (error: any) {
      const message =
        error.response?.data?.message || "Xatolik yuz berdi (401 yoki boshqa)";
      toast.error(message);
      console.error("Manager qo‘shishda xato:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 transition-colors duration-300 px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 transition-all">
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-100 mb-6">
          Yangi Manager Qo‘shish
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 dark:text-gray-200 mb-1 font-semibold">
              Ism
            </label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-200 mb-1 font-semibold">
              Familiya
            </label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-200 mb-1 font-semibold">
              Telefon raqam
            </label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-200 mb-1 font-semibold">
              Parol
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-200 mb-1 font-semibold">
              Rasm URL (ixtiyoriy)
            </label>
            <input
              type="text"
              value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
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
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 mt-4 text-white font-semibold bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Qo‘shilmoqda..." : "Qo‘shish"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ManagerAdd;
