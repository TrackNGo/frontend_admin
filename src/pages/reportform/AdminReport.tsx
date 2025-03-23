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
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-semibold text-gray-800">Report Management</h1>
        {error && <div className="px-4 py-2 text-red-600 bg-red-50 rounded-md">{error}</div>}
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-3 grid grid-cols-12 gap-4 border-b border-gray-200 text-sm font-medium text-gray-600">
          <div className="col-span-3">Bus Number</div>
          <div className="col-span-4">Issue Type</div>
          <div className="col-span-3">Reported</div>
          <div className="col-span-2">Actions</div>
        </div>

        <div className="divide-y divide-gray-200">
          {reports.map(report => (
            <div key={report._id} className="px-6 py-4 grid grid-cols-12 gap-4 hover:bg-gray-50 transition-colors">
              <div className="col-span-3 font-medium text-gray-900">
                {report.busNumber}
              </div>
              <div className="col-span-4">
                <span className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm">
                  {report.issueType}
                </span>
              </div>
              <div className="col-span-3 text-gray-500 text-sm">
                {new Date(report.reportedAt).toLocaleString()}
              </div>
              <div className="col-span-2 flex items-center space-x-4">
                <Link
                  to={`/reports/${report._id}`}
                  className="text-gray-400 hover:text-blue-600 transition-colors"
                  title="View details"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </Link>
                <button
                  onClick={() => handleDelete(report._id)}
                  className="text-gray-400 hover:text-red-600 transition-colors"
                  title="Delete report"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        {reports.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H5a2 2 0 01-2-2V7a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="mt-4">No reports found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminReports;