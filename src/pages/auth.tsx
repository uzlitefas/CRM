"use client";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { validatePassword, validatePhone } from "@/lib/validation";
import { ModeToggle } from "@/components/shared/mode-toggle";

export default function Auth() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ phone?: string; password?: string }>(
    {}
  );
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const phoneError = validatePhone(phone);
    const passwordError = validatePassword(password);

    if (phoneError || passwordError) {
      setErrors({ phone: phoneError || "", password: passwordError || "" });
      return;
    }

    setErrors({});
    const cleanPhone = phone.replace(/\s/g, "");

    if (cleanPhone === "+998919408180") {
      navigate("/student");
    } else if (cleanPhone === "+998942458790") {
      navigate("/admin");
    } else {
      setErrors({
        phone: "Noto'g'ri telefon raqam yoki parol!",
      });
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-background">
      <div className="hidden md:flex flex-1 relative">
        <img
          src="assets\image.png"
          alt="TeamSoftCRM"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      <div className="flex flex-1 justify-center items-center p-6 relative z-10">
        <Card className="w-full max-w-md shadow-lg border border-border">
          <CardHeader className="relative">
            <CardTitle className="text-2xl font-semibold text-center">
              Sign In to TeamSoftCRM
            </CardTitle>

            <div className="absolute top-3 right-3">
              <ModeToggle />
            </div>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+998 90 123 45 67"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
                {errors.phone && (
                  <p className="text-sm text-red-500">{errors.phone}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                {errors.password && (
                  <p className="text-sm text-red-500">{errors.password}</p>
                )}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox id="remember" />
                  <Label htmlFor="remember" className="text-sm cursor-pointer">
                    Remember me
                  </Label>
                </div>
                <Link to="#" className="text-sm text-primary hover:underline">
                  Forgot Password?
                </Link>
              </div>

              <Button
                type="submit"
                className="w-full mt-2 bg-blue-500 hover:bg-blue-600"
              >
                Sign In →
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
