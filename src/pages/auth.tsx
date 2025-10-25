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

function validatePhone(phone: string): string | null {
  const regex = /^\+998\d{9}$/
  if (!phone.trim()) return "Telefon raqami kiritilishi shart!"
  if (!regex.test(phone.replace(/\s/g, ""))) return "Telefon raqam noto'g'ri formatda!"
  return null
}

function validatePassword(password: string): string | null {
  if (!password.trim()) return "Parol kiritilishi shart!"
  if (password.length < 4) return "Parol kamida 4 ta belgidan iborat bo'lishi kerak!"
  return null
}

export function Auth({ className, ...props }: React.ComponentProps<"div">) {
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
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
    const cleanPhone = phone.replace(/\s/g, "")

    if (cleanPhone === "+998919408180") {
      navigate("/student")
    } else if (cleanPhone === "+998942458790") {
      navigate("/admin")
    } else {
      setErrors({
        phone: "Noto'g'ri telefon raqam yoki parol!",
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
                  <a
                    href="#"
                    className="text-sm text-muted-foreground hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
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
