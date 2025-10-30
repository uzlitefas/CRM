import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTokenStore } from "@/stores/storeToken";
import { api } from "@/service";

export default function Auth() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const setTokens = useTokenStore((s) => s.setTokens);
  const nav = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post("/auth/login", { phone, password });
      const { user, accessToken, refreshToken } = res.data;
      setTokens(accessToken, refreshToken);

      if (user.role === "admin") nav("/admin");
      else nav("/admin");
    } catch (err) {
      alert("Login amalga oshmadi!");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="Telefon raqam"
      />
      <input
        value={password}
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Parol"
      />
      <button type="submit" disabled={loading}>
        {loading ? "Kirilmoqda..." : "Kirish"}
      </button>
    </form>
  );
}
