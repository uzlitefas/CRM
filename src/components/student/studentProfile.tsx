"use client";

import { useState } from "react";

const Students = [
  {
    id: 1,
    ism: "Ali",
    familiya: "Karimov",
    buyData: "10.09.2025.",
    payment_amount: "300 000",
    pImage:
      "https://img.freepik.com/free-photo/lifestyle-beauty-fashion-people-emotions-concept-young-asian-female-office-manager-ceo-with-pleased-expression-standing-white-background-smiling-with-arms-crossed-chest_1258-59329.jpg?semt=ais_hybrid&w=740&q=80",
  },
  {
    id: 2,
    ism: "Laylo",
    buyData: "11.10.2025.",
    familiya: "Abdullayeva",
    payment_amount: "400 000",
    pImage:
      "https://allprodad.com/wp-content/uploads/2021/03/05-12-21-happy-people.jpg",
  },
  {
    id: 3,
    ism: "Javohir",
    buyData: "12.12.2025.",
    familiya: "Sodiqov",
    payment_amount: "450 000",
    pImage:
      "https://images.pexels.com/photos/7562185/pexels-photo-7562185.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: 4,
    ism: "Madina",
    buyData: "09.01.2025.",
    payment_amount: "150 000",
    familiya: "Tursunova",
    pImage:
      "https://ichef.bbci.co.uk/ace/standard/2048/cpsprodpb/0b10/live/6d7759d0-9862-11ef-9117-610baa963618.jpg",
  },
  {
    id: 5,
    ism: "Bekzod",
    buyData: "12.19.2025.",
    familiya: "Rahimov",
    payment_amount: "350 000",
    pImage:
      "https://cdn.psychologytoday.com/sites/default/files/styles/article-inline-half-caption/public/field_blog_entry_images/2018-09/shutterstock_648907024.jpg?itok=0hb44OrI",
  },
];

function StudentProfile() {
  const [selectedStudent, setSelectedStudent] = useState(null);

  return (
    <div className="min-h-screen flex items-center justify-center  p-4">
      <div className="w-full max-w-8xl bg-white rounded-lg shadow border p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg border flex flex-col justify-between">
            <div>
              <p className="font-semibold mb-2">
                {selectedStudent
                  ? `${selectedStudent.ism} ${selectedStudent.familiya}`
                  : "Student not found"}
              </p>

              <select
                name="status"
                className="border rounded-md p-2 w-full outline-none text-sm"
              >
                <option value="muzlatilgan">Muzlatilgan</option>
                <option value="active">Active</option>
                <option value="ketgan">Ketgan</option>
              </select>
            </div>

            <div className="mt-4 text-sm space-y-2">
              <div>
                <label className="block text-gray-700">To‘lov sanasi:</label>
                <input
                  type="text"
                  className="border rounded px-2 py-1 w-full font-medium"
                />
              </div>

              <div>
                <label className="block text-gray-700">To‘lov summasi:</label>
                <input
                  type="text"
                  className="border rounded px-2 py-1 w-full font-medium"
                />
              </div>

              <div>
                <label className="block text-gray-700">To‘lov turi:</label>
                <input
                  type="text"
                  className="border rounded px-2 py-1 w-full font-medium"
                  placeholder="naqt"
                />
              </div>
            </div>
          </div>
        </div>

        <ul className="divide-y divide-gray-200 border rounded-lg overflow-hidden w-full">
          {Students.map((s) => (
            <li
              key={s.id}
              className="flex items-center justify-between p-4 hover:bg-gray-50 transition cursor-pointer w-full"
              onClick={() => setSelectedStudent(s)}
            >
              <div className="flex-1">
                <p className="font-semibold">
                  {s.id}. {s.ism} {s.familiya}
                </p>
              </div>
              <div className="flex space-x-2">
                <button className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition w-full">
                  To‘landi
                </button>
                <button className="px-3 py-1.5 text-sm bg-red-600 text-white rounded-md hover:bg-red-700 transition w-full">
                  Qarzdor
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default StudentProfile;
