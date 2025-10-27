
import React, { useState } from "react";

export default function EmployeeForm() {
  const [form, setForm] = useState({ name: "", role: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.role) return alert("Please fill in all fields");
    const res = await fetch("/api/employees", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });
    const data = await res.json();
    setMessage(`✅ Added ${data.name} (${data.role})`);
    setForm({ name: "", role: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Employee</h2>
      <div>
        <label>Name: </label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Role: </label>
        <input
          name="role"
          value={form.role}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit" style={{ marginTop: 10 }}>
        Add Employee
      </button>
      {message && <p style={{ color: "green" }}>{message}</p>}
    </form>
  );
}
