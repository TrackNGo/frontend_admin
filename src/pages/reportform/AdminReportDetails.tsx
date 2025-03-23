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

  if (!report) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 text-blue-500 hover:text-blue-700"
      >
        ← Back to Reports
      </button>
      
      {error && <div className="text-red-500 mb-4">{error}</div>}

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Report Details</h2>
        
        <div className="space-y-4">
          <div>
            <label className="font-semibold">Bus Number:</label>
            <p>{report.busNumber}</p>
          </div>
          
          <div>
            <label className="font-semibold">Issue Type:</label>
            <p>{report.issueType}</p>
          </div>
          
          <div>
            <label className="font-semibold">Description:</label>
            <p>{report.description}</p>
          </div>
          
          <div>
            <label className="font-semibold">Reported At:</label>
            <p>{new Date(report.reportedAt).toLocaleString()}</p>
          </div>
          
          {report.contactDetails && (
            <div>
              <label className="font-semibold">Contact Details:</label>
              <p>{report.contactDetails}</p>
            </div>
          )}
          
          <div className="mt-6">
            <h3 className="font-semibold mb-2">Admin Comments</h3>
            {report.adminComment ? (
              <div className="bg-gray-50 p-4 rounded">
                {report.adminComment}
              </div>
            ) : (
              <p className="text-gray-500">No comments added yet</p>
            )}
            
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full mt-4 p-2 border rounded"
              placeholder="Add a comment..."
              rows={3}
            />
            
            <button
              onClick={handleCommentSubmit}
              disabled={loading}
              className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
            >
              {loading ? 'Saving...' : 'Save Comment'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminReportDetails;