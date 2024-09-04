import React, { useState } from 'react';

const AccountManagement = () => {
  const [employees, setEmployees] = useState([
    { id: 1, name: 'Coach A', clients: 3 },
    { id: 2, name: 'Coach B', clients: 5 }
  ]);

  return (
    <div className="w-full h-full p-8 bg-[#A8DADC]">
      <h1 className="text-3xl font-bold text-[#4B4B4B] mb-6">Account Management</h1>
      <div className="bg-white p-4 shadow-xl rounded-md">
        <h2 className="text-xl font-semibold text-[#7D7D7D]">Employee Accounts</h2>
        <ul className="mt-4">
          {employees.map(emp => (
            <li key={emp.id} className="text-lg">
              {emp.name} - {emp.clients} clients
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AccountManagement;
