import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/api/admin", // Replace with your backend API URL
  timeout: 1000,
  headers: { "X-Custom-Header": "foobar" },
});

interface Report {
  _id: string;
  busId: string;
  issueType: string;
  description: string;
  contactDetails: string;
  createdAt: string;
}

const AdminReports = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axiosInstance.get("/reports");
        setReports(response.data.reports);
      } catch {
        setError("Error fetching reports");
      }
    };
    fetchReports();
  }, []);

  return (
    <div className="px-2">
      <h2 className="text-xl font-semibold">Submitted Reports</h2>
      {error && <p className="text-red-500">{error}</p>}
      <table className="mt-4 w-full border-collapse">
        <thead>
          <tr>
            <th className="border px-4 py-2">Bus ID</th>
            <th className="border px-4 py-2">Issue Type</th>
            <th className="border px-4 py-2">Description</th>
            <th className="border px-4 py-2">Date</th>
            <th className="border px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {reports.length === 0 ? (
            <tr>
              <td colSpan={5} className="text-center border px-4 py-2">
                No reports available.
              </td>
            </tr>
          ) : (
            reports.map((report) => (
              <tr key={report._id}>
                <td className="border px-4 py-2">{report.busId}</td>
                <td className="border px-4 py-2">{report.issueType}</td>
                <td className="border px-4 py-2">{report.description}</td>
                <td className="border px-4 py-2">{new Date(report.createdAt).toLocaleString()}</td>
                <td className="border px-4 py-2">
                  <Link to={`/admin/reports/${report._id}`} className="text-blue-600">
                    View Details
                  </Link>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminReports;
