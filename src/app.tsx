import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import Header from "./components/shared/header";
import CreditePage from "./pages/creditePage";
import FinancialPage from "./pages/financialPage";
import GroupPage from "./pages/groupPage";
import LidlarPage from "./pages/lidlarPage";
import SettingsPage from "./pages/settingsPage";
import StudentPage from "./pages/studentPage";
import TeacherPage from "./pages/teacherPage";
import Admin from "./pages/admin/admin";
import Manager from "./pages/manager/manager";
import AdminStudents from "./pages/admin/admin-students";
import AdminTeachers from "./pages/admin/admin-teachers";
import Auth from "./pages/auth";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Auth />} />
        <Route
          path={"/admin"}
          element={
            <div>
              <Header />
              <Outlet />
            </div>
          }
        >
          <Route path="/admin/students" element={<AdminStudents />} />
          <Route path="/admin/teachers" element={<AdminTeachers />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="credite" element={<CreditePage />} />
          <Route path="financial" element={<FinancialPage />} />
          <Route path="groups" element={<GroupPage />} />
          <Route path="lids" element={<LidlarPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="students" element={<StudentPage />} />
          <Route path="teachers" element={<TeacherPage />} />
          <Route path="/admin/manager" element={<Manager />} />
        </Route>
        <Route
          path={"/manager"}
          element={
            <div>
              <Header />
              <Outlet />
            </div>
          }
        >
          <Route path="" element={<Manager />} />
          <Route path="credite" element={<CreditePage />} />
          <Route path="financial" element={<FinancialPage />} />
          <Route path="groups" element={<GroupPage />} />
          <Route path="lids" element={<LidlarPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="students" element={<StudentPage />} />
          <Route path="teachers" element={<TeacherPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
