import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/api/admin", // Replace with your backend API URL
  timeout: 1000,
  headers: { "X-Custom-Header": "foobar" },
});

const AdminReportDetails = () => {
  const { id } = useParams<{ id: string }>();
  interface Report {
    busNumber: string;
    issueType: string;
    description: string;
    contactDetails?: string;
    createdAt: string;
  }

  const [report, setReport] = useState<Report | null>(null);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchReportDetails = async () => {
      try {
        const response = await axiosInstance.get(`/reports/${id}`);
        setReport(response.data.report);
      } catch {
        setError("Error fetching report details");
      }
    };
    fetchReportDetails();
  }, [id]);

  if (error) return <div>{error}</div>;

  return (
    <div className="px-2">
      <h2 className="text-xl font-semibold">Report Details</h2>
      {report ? (
        <div>
          <p><strong>Bus ID:</strong> {report.busNumber}</p>
          <p><strong>Issue Type:</strong> {report.issueType}</p>
          <p><strong>Description:</strong> {report.description}</p>
          <p><strong>Contact Details:</strong> {report.contactDetails || "Not provided"}</p>
          <p><strong>Reported On:</strong> {new Date(report.createdAt).toLocaleString()}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default AdminReportDetails;
