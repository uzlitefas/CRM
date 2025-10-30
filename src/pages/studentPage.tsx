import StudentAdd from "@/components/student/studentAdd";

function StudentPage() {
  return (
    <div className="w-full min-h-screen bg-gray-100 flex justify-center p-6">
      <div className="flex  flex-col md:flex-row w-full max-w-7xl gap-6">
        <StudentAdd />
      </div>
    </div>
  );
}

export default StudentPage;
