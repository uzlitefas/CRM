import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Menu, X } from "lucide-react";
import { adminNavItems } from "@/constants";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "./mode-toggle";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === "uz" ? "en" : "uz");
  };

  return (
    <div className="w-full border-b bg-background text-foreground transition">
      <div className="flex justify-between items-center px-4 py-5 md:px-10">
        <div className="text-2xl font-semibold tracking-wide">LOGO</div>

        {/* desktop actions */}
        <div className="hidden md:flex items-center gap-3 mb-5">
          <Button onClick={toggleLanguage} variant="secondary">
            {i18n.language === "uz" ? "EN" : "UZ"}
          </Button>

          {/* ✅ dark/light toggle */}
          <ModeToggle />

          <Button variant="ghost">{t("profil")}</Button>
          <Button variant="destructive">{t("chiqish")}</Button>
        </div>

        {/* mobile toggle */}
        <Button
          variant="ghost"
          className="md:hidden p-2"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </Button>
      </div>

      {/* menu */}
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
            className={`px-4 py-2 rounded text-center mb-6 hover:bg-accent hover:text-accent-foreground transition`}
          >
            {t(item.titleKey)}
          </Link>
        ))}
      </div>
    </div>
  );
}
