import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/stores/authStore";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Auth() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const { login, loading, user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(phone, password);
    if (success) {
      alert("Kirish muvaffaqiyatli!");
    } else {
      alert("Login amalga oshmadi. Raqam yoki parolni tekshiring.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-muted/20">
      <Card className="w-[380px]">
        <CardHeader>
          <CardTitle>Telefon raqam orqali kirish</CardTitle>
          <CardDescription>Raqamingiz va parolingizni kiriting</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <label htmlFor="phone">Telefon raqami</label>
                <input
                  id="phone"
                  type="tel"
                  placeholder="+998901234567"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>

              <div className="grid gap-2">
                <label htmlFor="password">Parol</label>
                <input
                  id="password"
                  type="password"
                  placeholder="Parolni kiriting"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col">
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? "Kirilmoqda..." : "Kirish"}
            </Button>

            {user && (
              <pre className="mt-4 bg-muted text-sm p-3 rounded-md w-full overflow-auto">
                {JSON.stringify(user, null, 2)}
              </pre>
            )}
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
