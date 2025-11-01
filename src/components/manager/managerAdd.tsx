import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { api } from "@/service";

const ManagerAdd: React.FC = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    password: "",
    photoUrl: "",
    monthlySalary: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const manager = {
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        phone: form.phone.trim(),
        password: form.password.trim(),
        photoUrl: form.photoUrl.trim() || null,
        monthlySalary: parseFloat(form.monthlySalary) || 0,
      };

      await api.post("/managers", manager);
      toast.success("✅ Manager muvaffaqiyatli qo‘shildi!");
      navigate("/managers");
    } catch (error: any) {
      console.error("Manager qo‘shishda xatolik:", error);
      const message =
        error.response?.data?.message ||
        "Manager qo‘shishda xatolik yuz berdi.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl text-center font-semibold">
            🧑‍💼 Yangi Manager Qo‘shish
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              name="firstName"
              placeholder="Ism"
              value={form.firstName}
              onChange={handleChange}
              required
            />
            <Input
              name="lastName"
              placeholder="Familiya"
              value={form.lastName}
              onChange={handleChange}
              required
            />
            <Input
              name="phone"
              placeholder="Telefon raqam"
              value={form.phone}
              onChange={handleChange}
              required
            />
            <Input
              type="password"
              name="password"
              placeholder="Parol"
              value={form.password}
              onChange={handleChange}
              required
            />
            <Input
              name="photoUrl"
              placeholder="Rasm URL (ixtiyoriy)"
              value={form.photoUrl}
              onChange={handleChange}
            />
            <Input
              type="number"
              name="monthlySalary"
              placeholder="Oylik maoshi"
              value={form.monthlySalary}
              onChange={handleChange}
            />

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Yuborilmoqda..." : "Qo‘shish"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ManagerAdd;
