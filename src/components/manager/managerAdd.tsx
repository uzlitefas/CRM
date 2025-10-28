import React, { useState } from "react";
import axios from "axios";

interface ManagerAddProps {
  onSuccess?: () => void;
}

const ManagerAdd: React.FC<ManagerAddProps> = ({ onSuccess }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [monthlySalary, setMonthlySalary] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!firstName || !lastName || !phone || !password) {
      alert("Please fill in all required fields!");
      return;
    }

    setLoading(true);

    try {
      const dto = {
        firstName,
        lastName,
        phone,
        password,
        photoUrl,
        monthlySalary: parseFloat(monthlySalary),
      };
      console.log("Submitting DTO:", dto);
      const token = localStorage.getItem("token");

      await axios.post("http://localhost:3000/managers", dto, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Manager added successfully!");

      setFirstName("");
      setLastName("");
      setPhone("");
      setPassword("");
      setPhotoUrl("");
      setMonthlySalary("");

      if (onSuccess) onSuccess();
    } catch (error: any) {
      console.error(error);
      alert(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="manager-add">
      <h2>Add New Manager</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name:</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Last Name:</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Phone:</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Photo URL:</label>
          <input
            type="text"
            value={photoUrl}
            onChange={(e) => setPhotoUrl(e.target.value)}
          />
        </div>
        <div>
          <label>Monthly Salary:</label>
          <input
            type="number"
            value={monthlySalary}
            onChange={(e) => setMonthlySalary(e.target.value)}
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add Manager"}
        </button>
      </form>
    </div>
  );
};

export default ManagerAdd;
