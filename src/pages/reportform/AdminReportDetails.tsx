// pages/AdminReportDetails.tsx
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { adminApi } from "../../services/api";

interface Report {
  _id: string;
  busNumber: string;
  issueType: string;
  description: string;
  contactDetails?: string;
  reportedAt: string;
  adminComment?: string;
}

const AdminReportDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [report, setReport] = useState<Report | null>(null);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const { data } = await adminApi.get(`/reports/${id}`);
        setReport(data);
      } catch {
        setError("Failed to load report details");
      }
    };
    fetchReport();
  }, [id]);

  const handleCommentSubmit = async () => {
    if (!comment.trim()) return;
    
    setLoading(true);
    try {
      await adminApi.put(`/reports/${id}/comment`, { comment });
      setComment("");
      const { data } = await adminApi.get(`/reports/${id}`);
      setReport(data);
    } catch {
      setError("Failed to save comment");
    }
    setLoading(false);
  };

  if (!report) return (
    <div className="max-w-3xl mx-auto p-6 text-gray-500">
      Loading...
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="mb-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-500 hover:text-gray-700 transition-colors"
        >
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Reports
        </button>
      </div>

      {error && (
        <div className="mb-6 p-3 text-red-600 bg-red-50 rounded-lg">
          {error}
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-semibold text-gray-800">Report Details</h2>
        </div>

        <div className="p-6 space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="text-gray-500">Bus Number</div>
            <div className="col-span-2 text-gray-800">{report.busNumber}</div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="text-gray-500">Issue Type</div>
            <div className="col-span-2">
              <span className="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm">
                {report.issueType}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="text-gray-500">Description</div>
            <div className="col-span-2 text-gray-800 whitespace-pre-wrap">
              {report.description}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="text-gray-500">Reported At</div>
            <div className="col-span-2 text-gray-800">
              {new Date(report.reportedAt).toLocaleString()}
            </div>
          </div>

          {report.contactDetails && (
            <div className="grid grid-cols-3 gap-4">
              <div className="text-gray-500">Contact Details</div>
              <div className="col-span-2 text-gray-800">
                {report.contactDetails}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h3 className="font-semibold text-gray-800">Admin Comments</h3>
        </div>

        <div className="p-6 space-y-4">
          {report.adminComment ? (
            <div className="p-4 bg-gray-50 rounded-lg text-gray-700 whitespace-pre-wrap">
              {report.adminComment}
            </div>
          ) : (
            <div className="text-gray-400 italic">No comments added yet</div>
          )}

          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add a comment..."
            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500 outline-none transition-all"
            rows={3}
          />

          <button
            onClick={handleCommentSubmit}
            disabled={loading}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving...
              </span>
            ) : (
              "Save Comment"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminReportDetails;