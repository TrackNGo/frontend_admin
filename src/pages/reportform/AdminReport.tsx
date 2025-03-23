// pages/AdminReports.tsx
import { useEffect, useState } from "react";
import { adminApi } from "../../services/api";
import { Link } from "react-router-dom";

interface Report {
  _id: string;
  busNumber: string;
  issueType: string;
  description: string;
  reportedAt: string;
}

const AdminReports = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const { data } = await adminApi.get("/reports");
        setReports(data);
      } catch {
        setError("Failed to load reports");
      }
    };
    fetchReports();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this report?")) {
      try {
        await adminApi.delete(`/reports/${id}`);
        setReports(reports.filter(report => report._id !== id));
      } catch {
        setError("Failed to delete report");
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Reports Management</h1>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Bus Number</th>
              <th className="py-2 px-4 border-b">Issue Type</th>
              <th className="py-2 px-4 border-b">Reported At</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reports.map(report => (
              <tr key={report._id}>
                <td className="py-2 px-4 border-b">{report.busNumber}</td>
                <td className="py-2 px-4 border-b">{report.issueType}</td>
                <td className="py-2 px-4 border-b">
                  {new Date(report.reportedAt).toLocaleDateString()}
                </td>
                <td className="py-2 px-4 border-b space-x-2">
                  <Link
                    to={`/reports/${report._id}`}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    View
                  </Link>
                  <button
                    onClick={() => handleDelete(report._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Delete
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

export default AdminReports;