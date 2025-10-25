"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Eye, EyeOff } from "lucide-react"
import { validatePhone, validatePassword } from "@/lib/validation"

export function Auth({ className, ...props }: React.ComponentProps<"div">) {
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false) 
  const [errors, setErrors] = useState<{ phone?: string; password?: string }>({})
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const phoneError = validatePhone(phone)
    const passwordError = validatePassword(password)

    if (phoneError || passwordError) {
      setErrors({ phone: phoneError || "", password: passwordError || "" })
      return
    }

    setErrors({})
    const cleanPhone = phone.replace(/\s|-/g, "")

    if (cleanPhone === "+998919408180") {
      navigate("/student")
    } else if (cleanPhone === "+998942458790") {
      navigate("/admin")
    } else {
      setErrors({
        phone: "Nomer to'g'ri yoz => keyin kel ",
      })
    }
  }

  return (
    <div className={cn("flex justify-center items-center min-h-screen", className)} {...props}>
      <Card className="w-[380px] shadow-md">
        <CardHeader className="text-center">
          <CardTitle className="text-lg font-semibold">Login to your account</CardTitle>
          <CardDescription>Enter your phone number to login</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <FieldGroup className="space-y-4">
              <Field>
                <FieldLabel htmlFor="phone">Phone Number</FieldLabel>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+998901234567"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                )}
              </Field>

              <Field>
                <div className="flex items-center justify-between">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                </div>

                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>

                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                )}
              </Field>

              <div className="space-y-2 pt-2">
                <Button type="submit" className="w-full border-2">
                  Login
                </Button>
              </div>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
