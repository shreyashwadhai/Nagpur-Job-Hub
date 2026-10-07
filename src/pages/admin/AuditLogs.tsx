import React from "react";
import { mockAuditLogs } from "../../data/mockAdminData";

export const AuditLogs: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-3xl border border-[#E5E9E6] shadow-sm">
        <h1 className="text-2xl font-bold text-[#1F2937] font-sans">
          System Audit Logs
        </h1>
        <p className="text-xs text-gray-500 mt-1">
          Security and administrative action log trail.
        </p>
      </div>

      <div className="bg-white p-6 rounded-3xl border border-[#E5E9E6] shadow-sm">
        <table className="w-full text-left text-xs font-mono">
          <thead className="bg-[#F5F8F6] border-b">
            <tr>
              <th className="p-3">Timestamp</th>
              <th className="p-3">Actor</th>
              <th className="p-3">Action</th>
              <th className="p-3">Target</th>
              <th className="p-3">IP Address</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {mockAuditLogs.map((log) => (
              <tr key={log.id}>
                <td className="p-3 text-gray-500">{log.timestamp}</td>
                <td className="p-3 font-bold text-[#1F2937]">{log.actor}</td>
                <td className="p-3 text-[#0B5D3B]">{log.action}</td>
                <td className="p-3 text-gray-700">{log.target}</td>
                <td className="p-3 text-gray-500">{log.ipAddress}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      log.status === "Success"
                        ? "bg-green-100 text-green-700"
                        : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {log.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
