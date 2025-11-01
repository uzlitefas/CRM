import { Link } from "react-router-dom";

function Header() {
  return (
    <div>
      <div>
        nav qisimcha <Link to={"/admin/manager"}>manager</Link>{" "}
        <Link to={"/admin/student"}>stu</Link>{" "}
        <Link to={"/admin/teacher"}>teach</Link>{" "}
        <Link to={"/admin/group"}>group</Link>
      </div>
    </div>
  );
}

export default Header;
