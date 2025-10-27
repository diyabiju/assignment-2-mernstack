import React, { useEffect, useState } from "react";

export default function Home() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetch("/api/employeelist")
      .then((res) => res.json())
      .then(setEmployees)
      .catch((err) => console.error("Error fetching employees:", err));
  }, []);

  return (
    <div>
      <h2>Employee List</h2>
      {employees.length === 0 ? (
        <p>No employees found.</p>
      ) : (
        <ul>
          {employees.map((e) => (
            <li key={e.id}>
              <strong>{e.name}</strong> — {e.role}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

