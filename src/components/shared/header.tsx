import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Globe, LogOut, Menu, Settings, User, X } from "lucide-react";
import { adminNavItems } from "@/constants";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "./mode-toggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  // 👤 Foydalanuvchi ma'lumotlari (mock)
  const user = {
    name: "Sulton O‘skanboyev",
    role: "Admin",
  };

  // 🌐 Tilni almashtirish
  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === "uz" ? "en" : "uz");
  };

  // 🚪 Chiqish funksiyasi
  const handleLogout = () => {
    console.log("Chiqish bosildi!");
    // logout logikasi: token tozalash va navigate("/login") kabi
  };

  return (
    <div className="w-full border-b bg-background text-foreground transition">
      <div className="flex justify-between items-center px-4 py-5 md:px-10">
        {/* ✅ Logo */}
        <div className="text-2xl font-semibold tracking-wide">LOGO</div>

        {/* ✅ Desktop Actions */}
        <div className="hidden md:flex items-center gap-4 ml-auto">
          {/* 🌐 Tilni almashtirish */}
          <Button
            onClick={toggleLanguage}
            variant="secondary"
            size="sm"
            className="flex items-center gap-1"
          >
            <Globe size={16} />
            {i18n.language === "uz" ? "EN" : "UZ"}
          </Button>

          {/* 🌗 Dark/Light mode */}
          <ModeToggle />

          {/* 👤 Profil dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2 hover:bg-accent"
              >
                <User size={16} />
                <span>{user.name.split(" ")[0]}</span>
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-56 mt-2">
              <DropdownMenuLabel>
                <div>
                  <p className="font-semibold">{user.name}</p>
                  <p className="text-sm text-muted-foreground">{user.role}</p>
                </div>
              </DropdownMenuLabel>

              <DropdownMenuSeparator />

              <DropdownMenuItem asChild>
                <Link to="/admin/profile" className="flex items-center gap-2">
                  <User size={16} />
                  {t("profil")}
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem asChild>
                <Link to="/admin/settings" className="flex items-center gap-2">
                  <Settings size={16} />
                  {t("sozlamalar")}
                </Link>
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              {/* 🔹 Chiqish shu yerning o'zida ishlaydi */}
              <DropdownMenuItem
                onClick={() => {
                  localStorage.removeItem("token");
                  localStorage.removeItem("user");
                  navigate("/login");
                }}
                className="text-destructive focus:text-destructive flex items-center gap-2"
              >
                <LogOut size={16} />
                {t("chiqish")}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* 🚪 Chiqish tugmasi */}
          <Button
            variant="destructive"
            size="sm"
            className="flex items-center gap-1 shadow-md hover:scale-[1.03] transition"
            onClick={handleLogout}
          >
            <LogOut size={16} />
            {t("chiqish")}
          </Button>
        </div>

        {/* 📱 Mobile Menu Toggle */}
        <Button
          variant="ghost"
          className="md:hidden p-2"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </Button>
      </div>

      {/* 📋 Menu Links */}
      <div
        className={`${
          menuOpen
            ? "flex flex-col md:flex-row md:justify-center"
            : "hidden md:flex md:justify-center"
        } border-t md:border-none p-4 md:p-0 gap-2 md:gap-4 transition-all`}
      >
        {adminNavItems.map((item) => (
          <Link
            key={item.id}
            to={item.path}
            onClick={() => setMenuOpen(false)}
            className="px-4 py-2 rounded text-center mb-2 md:mb-0 hover:bg-accent hover:text-accent-foreground transition"
          >
            {t(item.titleKey)}
          </Link>
        ))}
      </div>
    </div>
  );
}
