import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Menu, X } from "lucide-react";
import { adminNavItems } from "@/constants";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const { t, i18n } = useTranslation();
  const location = useLocation();

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === "uz" ? "en" : "uz");
  };

  return (
    <div
      className={`w-full ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      } border-b ${
        darkMode ? "border-gray-700" : "border-gray-300"
      } transition`}
    >
      <div className="flex justify-between items-center px-4 py-5 md:px-10">
        <div
          className={`text-2xl font-semibold tracking-wide ${
            darkMode ? "text-white" : "text-gray-800"
          }`}
        >
          LOGO
        </div>

        <div className="hidden md:flex items-center gap-3 mb-5">
          <button
            onClick={toggleLanguage}
            className={`px-4 py-2 rounded ${
              darkMode
                ? "bg-blue-800 hover:bg-blue-700"
                : "bg-blue-500 hover:bg-blue-600 text-white"
            }`}
          >
            {i18n.language === "uz" ? "EN" : "UZ"}
          </button>

          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`px-4 py-2 rounded ${
              darkMode
                ? "bg-gray-700 hover:bg-gray-600"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
          >
            {darkMode ? "☀️" : "🌙"}
          </button>

          <button
            className={`px-4 py-2 rounded ${
              darkMode
                ? "bg-gray-800 hover:bg-gray-700"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
          >
            {t("profil")}
          </button>

          <button
            className={`px-4 py-2 rounded ${
              darkMode
                ? "bg-red-700 hover:bg-red-600"
                : "bg-red-500 hover:bg-red-400 text-white"
            }`}
          >
            {t("chiqish")}
          </button>
        </div>

        <button
          className="md:hidden p-2 rounded hover:bg-gray-800"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

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
            className={`px-4 py-2 rounded text-center mb-6 ${
              location.pathname === item.path
                ? darkMode
                  ? "bg-gray-700 border border-gray-500"
                  : "bg-gray-300 border border-gray-400"
                : darkMode
                ? "hover:bg-gray-800 border border-gray-700"
                : "hover:bg-gray-200 border border-gray-300"
            }`}
          >
            {t(item.titleKey)}
          </Link>
        ))}
      </div>
    </div>
  );
}
