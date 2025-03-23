import { useEffect, useState } from "react";
import axios from "axios";
import {  useParams } from "react-router-dom";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/api-report", // Replace with your backend API URL
  timeout: 1000,
  headers: { "X-Custom-Header": "foobar" },
});

interface Report {
  _id: string;
  busNumber: string;
  issueType: string;
  description: string;
  contactDetails?: string;
  reportedAt: string;
  adminComment?: string;
}

const AdminReports = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [error, setError] = useState<string>("");
  const { id } = useParams<{ id: string }>();
  const [commentInput, setCommentInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchReportDetails();
  }, [id]);

  const fetchReportDetails = async () => {
    try {
      const response = await axiosInstance.get(`/reports/${id}`);
      setReports(response.data.report);
    } catch {
      setError("Error fetching report details");
    }
  };

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axiosInstance.get("/view");
        setReports(response.data.reports);
      } catch {
        setError("Error fetching reports");
      }
    };
    fetchReports();
  }, []);

  const handleCommentSubmit = async () => {
    if (!commentInput.trim()) return;

    setLoading(true);
    try {
      await axiosInstance.put(`/reports/${id}/comment`, {
        comment: commentInput,
      });
      setCommentInput("");
      await fetchReportDetails(); // Refresh the report data
    } catch {
      setError("Failed to save comment");
    }
    setLoading(false);
  };

  if (error) return <div>{error}</div>;

  return (
    <div className="px-2">
      <h2 className="text-xl font-semibold">Report Details</h2>
      {reports ? (
        <div className="space-y-4">
          {/* Existing details */}
          {reports.map((report) => (
            <div key={report._id} className="space-y-2">
              <p>
                <strong>Bus ID:</strong> {report.busNumber}
              </p>
              <p>
                <strong>Issue Type:</strong> {report.issueType}
              </p>
              <p>
                <strong>Description:</strong> {report.description}
              </p>
              <p>
                <strong>Contact Details:</strong>{" "}
                {report.contactDetails || "Not provided"}
              </p>
              <p>
                <strong>Reported On:</strong>{" "}
                {new Date(report.reportedAt).toLocaleString()}
              </p>
            </div>
          ))}

          {/* Comment Section */}
          <div className="mt-4">
            <h3 className="font-semibold mb-2">Admin Comments</h3>
            {reports.map((report) => (
              report.adminComment && (
                <div key={report._id} className="bg-gray-100 p-3 rounded mb-3">
                  {report.adminComment}
                </div>
              )
            ))}
            <textarea
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Add a comment..."
              rows={3}
            />
            <button
              onClick={handleCommentSubmit}
              disabled={loading}
              className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
            >
              {loading ? "Saving..." : "Save Comment"}
            </button>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default AdminReports;
