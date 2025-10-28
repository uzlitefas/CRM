"use client";

import { useState } from "react";

const groups = {
  A: Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    ism: `O'quvchi ${i + 1}`,
    familiya: `A`,
    holat: "Keldi",
  })),
  B: Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    ism: `O'quvchi ${i + 1}`,
    familiya: `B`,
    holat: "Keldi",
  })),
  C: Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    ism: `O'quvchi ${i + 1}`,
    familiya: `C`,
    holat: "Keldi",
  })),
  D: Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    ism: `O'quvchi ${i + 1}`,
    familiya: `D`,
    holat: "Keldi",
  })),
  E: Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    ism: `O'quvchi ${i + 1}`,
    familiya: `E`,
    holat: "Keldi",
  })),
};

function StudentAttendance() {
  const [selectedGroup, setSelectedGroup] = useState("");
  const [students, setStudents] = useState([]);

  const handleGroupChange = (e) => {
    const group = e.target.value;
    setSelectedGroup(group);
    setStudents(groups[group] || []);
  };

  const handleAttendanceChange = (id, value) => {
    const yangiStudents = students.map((s) =>
      s.id === id ? { ...s, holat: value } : s
    );
    setStudents(yangiStudents);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start p-6 bg-gray-100">
      <div className="w-full max-w-6xl bg-white rounded-lg shadow p-6 space-y-6">
        <h2 className="text-xl font-semibold">Guruh bo‘yicha davomati</h2>

        <div className="mb-4 ">
          <label className="block mb-2 font-medium">Guruhni tanlang:</label>
          <select
            className="border rounded-md p-2 w-60"
            value={selectedGroup}
            onChange={handleGroupChange}
          >
            <option value=""> Guruhni tanlang </option>
            {Object.keys(groups).map((g) => (
              <option key={g} value={g}>
                {g} guruhi
              </option>
            ))}
          </select>
        </div>

        {students.length > 0 && (
          <ul className="divide-y divide-gray-200 border rounded-lg overflow-hidden w-full">
            {students.map((s) => (
              <li
                key={s.id}
                className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 hover:bg-gray-50 transition"
              >
                <div className="flex-1 mb-2 md:mb-0">
                  <p className="font-semibold">
                    {s.id}. {s.ism} {s.familiya}
                  </p>
                </div>
                <div className="w-full md:w-48">
                  <select
                    className={`border rounded-md p-2 w-full font-medium ${
                      s.holat === "Keldi"
                        ? "text-green-600"
                        : s.holat === "Kelmagan"
                        ? "text-red-600"
                        : "text-yellow-600"
                    }`}
                    value={s.holat}
                    onChange={(e) =>
                      handleAttendanceChange(s.id, e.target.value)
                    }
                  >
                    <option value="Keldi">Keldi</option>
                    <option value="Kelmagan">Kelmagan</option>
                    <option value="Kechikdi">Kechikdi</option>
                  </select>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default StudentAttendance;
