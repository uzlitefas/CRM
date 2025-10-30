import { api } from "@/service";
import { useTokenStore } from "@/stores/storeToken";
import React, { useState } from "react";

export const CreateRoom: React.FC = () => {
  const [name, setName] = useState("");
  const [capacity, setCapacity] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const token = useTokenStore((state) => state.accessToken);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      await api.post("/rooms", {
        name,
        capacity: capacity ? parseInt(capacity) : undefined,
      });
      console.log(token);

      setMessage("✅ Xona muvaffaqiyatli yaratildi!");
      setName("");
      setCapacity("");
    } catch (error: any) {
      setMessage(
        "❌ Xona yaratishda xatolik: " + (error.message || "Noma’lum xato")
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-slate-800 p-6 rounded-lg border border-slate-700 text-white">
      <h2 className="text-xl font-bold mb-4">Yangi xona yaratish</h2>

      {message && <p className="mb-3 text-emerald-400">{message}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm mb-1">Xona nomi</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg focus:outline-none"
            placeholder="Masalan: Xona 101"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Sig‘imi (ixtiyoriy)</label>
          <input
            type="number"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
            className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg focus:outline-none"
            placeholder="Masalan: 20"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-emerald-600 hover:bg-emerald-700 py-2 rounded-lg font-semibold transition disabled:opacity-50"
        >
          {loading ? "Yaratilmoqda..." : "Xona yaratish"}
        </button>
      </form>
    </div>
  );
};
