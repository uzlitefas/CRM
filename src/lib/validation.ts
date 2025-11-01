export function validatePhone(phone: string): string | null {
  const cleaned = phone.replace(/\s|-/g, "");

  const uzbPhoneRegex = /^\+998\d{9}$/;

  if (!cleaned) return "Telefon raqami kiritilmagan!";
  if (!uzbPhoneRegex.test(cleaned))
    return "Telefon raqami formati noto'g'ri! Masalan: +998901234567";

  return null;
}

export function validatePassword(password: string): string | null {
  if (!password) return "Parol kiritilmagan!";
  if (password.length < 8)
    return "Parol kamida 8 ta belgidan iborat bo'lishi kerak!";

  return null;
}
