import React, { useState } from "react";
import { api } from "@/service/api"; // api instance
import { useTokenStore } from "@/stores/storeToken"; // token store (Zustand)

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

  const token = useTokenStore((state) => state.accessToken); // ✅ tokenni olish

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!firstName || !lastName || !phone || !password) {
      alert("Iltimos, barcha majburiy maydonlarni to‘ldiring!");
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

      console.log("Yuborilayotgan DTO:", dto);
      console.log("Token:", token);

      const res = await api.post("/managers", dto); // ✅ api orqali yuboramiz
      console.log("Manager added:", res.data);

      alert("Manager muvaffaqiyatli qo‘shildi!");

      // Formani tozalaymiz
      setFirstName("");
      setLastName("");
      setPhone("");
      setPassword("");
      setPhotoUrl("");
      setMonthlySalary("");

      if (onSuccess) onSuccess();
    } catch (error: any) {
      console.error("Manager qo‘shishda xato:", error);
      const message =
        error.response?.data?.message || "Xatolik yuz berdi (401 yoki boshqa)";
      alert(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Yangi Manager Qo‘shish</h2>

      <form onSubmit={handleSubmit} style={styles.form}>
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
          {
            label: "Rasm URL (ixtiyoriy)",
            value: photoUrl,
            setter: setPhotoUrl,
          },
          {
            label: "Oylik maosh (ixtiyoriy)",
            value: monthlySalary,
            setter: setMonthlySalary,
            type: "number",
          },
        ].map((field) => (
          <div key={field.label} style={styles.formGroup}>
            <label style={styles.label}>{field.label}:</label>
            <input
              type={field.type || "text"}
              value={field.value}
              onChange={(e) => field.setter(e.target.value)}
              style={styles.input}
              required={
                field.label !== "Rasm URL (ixtiyoriy)" &&
                field.label !== "Oylik maosh (ixtiyoriy)"
              }
            />
          </div>
        ))}

        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? "Qo‘shilmoqda..." : "Qo‘shish"}
        </button>
      </form>
    </div>
  );
};

// 🎨 Inline style
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    maxWidth: "480px",
    margin: "40px auto",
    padding: "24px",
    borderRadius: "8px",
    backgroundColor: "#ffffff",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#333",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  formGroup: {
    marginBottom: "15px",
  },
  label: {
    marginBottom: "6px",
    fontWeight: 600,
  },
  input: {
    padding: "10px",
    fontSize: "14px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "10px",
    fontSize: "16px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "background 0.2s ease",
  },
};

export default ManagerAdd;
