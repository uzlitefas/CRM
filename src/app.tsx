import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import Header from "./components/shared/header";
import Admin from "./pages/admin/admin";
import Manager from "./pages/manager/manager";

import Auth from "./pages/auth";
import TeacherPage from "./pages/teacherPage";
import Group from "./components/group/group";
import StudentPage from "./pages/studentPage";

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
          <Route path="" element={<Admin />} />
          <Route path="manager" element={<Manager />} />
          <Route path="student" element={<StudentPage />} />
          <Route path="group" element={<Group />} />
          <Route path="teacher" element={<TeacherPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
