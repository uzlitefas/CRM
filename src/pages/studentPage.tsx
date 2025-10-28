import StudentAttendance from "@/components/student/studentAttendance";
import StudentProfile from "@/components/student/studentProfile";

function StudentPage() {
  return (
    <div className="w-full min-h-screen bg-gray-100 flex justify-center p-6">
      <div className="flex  flex-col md:flex-row w-full max-w-7xl gap-6">
        <div className="flex-1">
          <StudentProfile />
        </div>

        <div className="flex-1 ">
          <StudentAttendance />
        </div>
      </div>
    </div>
  );
}

export default StudentPage;
