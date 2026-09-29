import React from "react";
import { useToast } from "../../context/ToastContext";

export const AdminUsers: React.FC = () => {
  const { showToast } = useToast();

  const users = [
    {
      id: "usr-1",
      name: "Aarav Deshmukh",
      email: "aarav.d@gmail.com",
      role: "Job Seeker",
      status: "Active",
    },
    {
      id: "usr-2",
      name: "Shashank Garg",
      email: "sgarg@infocepts.com",
      role: "Company Representative",
      status: "Verified Rep",
    },
    {
      id: "usr-3",
      name: "System Administrator",
      email: "admin@nagpur-ecosystem.gov.in",
      role: "Super Admin",
      status: "Active",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-3xl border border-[#E5E9E6] shadow-sm">
        <h1 className="text-2xl font-bold text-[#1F2937] font-sans">
          User & Role Management
        </h1>
        <p className="text-xs text-gray-500 mt-1">
          Manage user access permissions across Nagpur Hub.
        </p>
      </div>

      <div className="bg-white p-6 rounded-3xl border border-[#E5E9E6] shadow-sm">
        <table className="w-full text-left text-xs">
          <thead className="bg-[#F5F8F6] border-b">
            <tr>
              <th className="p-3">User</th>
              <th className="p-3">Email</th>
              <th className="p-3">Role</th>
              <th className="p-3">Status</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {users.map((u) => (
              <tr key={u.id}>
                <td className="p-3 font-bold">{u.name}</td>
                <td className="p-3 text-gray-600">{u.email}</td>
                <td className="p-3 font-semibold text-[#0B5D3B]">{u.role}</td>
                <td className="p-3">
                  <span className="px-2.5 py-0.5 rounded-full bg-green-100 text-green-700 font-bold">
                    {u.status}
                  </span>
                </td>
                <td className="p-3">
                  <button
                    onClick={() =>
                      showToast(`User ${u.name} permissions updated`, "info")
                    }
                    className="text-[#F28C28] font-bold hover:underline"
                  >
                    Edit Role
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
