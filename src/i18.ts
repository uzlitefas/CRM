import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  uz: {
    translation: {
      lidlar: "Lidlar",
      oqituvchilar: "O‘qituvchilar ro‘yxati",
      guruhlar: "Guruhlar",
      oquvchilar: "O‘quvchilar ro‘yxati",
      qarzdorlar: "Qarzdorlar ro‘yxati",
      sozlamalar: "Sozlamalar",
      moliya: "Moliya",
      profil: "Profil",
      chiqish: "Chiqish",

      lidlar_sahifasi: "Lidlar sahifasi",
      oqituvchilar_sahifasi: "O‘qituvchilar ro‘yxati sahifasi",
      guruhlar_sahifasi: "Guruhlar sahifasi",
      oquvchilar_sahifasi: "O‘quvchilar ro‘yxati sahifasi",
      qarzdorlar_sahifasi: "Qarzdorlar ro‘yxati sahifasi",
      sozlamalar_sahifasi: "Sozlamalar sahifasi",
      moliya_sahifasi: "Moliya sahifasi",
    },
  },
  en: {
    translation: {
      lidlar: "Leads",
      oqituvchilar: "Teachers list",
      guruhlar: "Groups",
      oquvchilar: "Students list",
      qarzdorlar: "Debtors list",
      sozlamalar: "Settings",
      moliya: "Finance",
      profil: "Profile",
      chiqish: "Logout",

      lidlar_sahifasi: "Leads page",
      oqituvchilar_sahifasi: "Teachers page",
      guruhlar_sahifasi: "Groups page",
      oquvchilar_sahifasi: "Students page",
      qarzdorlar_sahifasi: "Debtors page",
      sozlamalar_sahifasi: "Settings page",
      moliya_sahifasi: "Finance page",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "uz",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
