// pages/SubmissionDetails.tsx
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { adminApiform } from '../../services/api';
 
type Submission = {
  _id: string;
  type: 'bus-service' | 'technical';
  name: string;
  contact: string;
  status: string;
  submittedAt: string;
  adminComment?: string;
  busNumber?: string;
  registrationNumber?: string;
  routeDetails?: string;
  issueType?: string;
  description?: string;
};

const ContactUsDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [submission, setSubmission] = useState<Submission | null>(null);
  const [comment, setComment] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSubmission = async () => {
      try {
        const { data } = await adminApiform.get(`/contact-us/${id}`);
        setSubmission(data);
        setStatus(data.status);
      } catch {
        setError('Failed to load submission');
      }
    };
    fetchSubmission();
  }, [id]);

  const handleUpdate = async () => {
    if (!submission) return;

    setLoading(true);
    try {
      const { data } = await adminApiform.put(`/contact-us/${id}`, {
        comment,
        status,
      });
      setSubmission(data);
      setComment('');
    } catch {
      setError('Failed to update submission');
    } finally {
      setLoading(false);
    }
  };

  if (!submission) return <div className="p-8 text-center">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center text-gray-600 hover:text-gray-800"
      >
        <svg
          className="w-4 h-4 mr-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        Back to Submissions
      </button>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-semibold">
            {submission.type === 'bus-service' ? 'Bus Service' : 'Technical'}{' '}
            Submission
          </h2>
        </div>

        <div className="p-6 space-y-4">
          {error && (
            <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg">
              {error}
            </div>
          )}

          <div className="grid grid-cols-3 gap-4">
            <div className="text-gray-500">Status</div>
            <div className="col-span-2">
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="px-3 py-2 border rounded-md"
              >
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="resolved">Resolved</option>
              </select>
            </div>
          </div>

          {submission.type === 'bus-service' && (
            <>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-gray-500">Bus Number</div>
                <div className="col-span-2">{submission.busNumber}</div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-gray-500">Owner</div>
                <div className="col-span-2">{submission.name}</div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-gray-500">Contact</div>
                <div className="col-span-2">{submission.contact}</div>
              </div>
            </>
          )}

          {submission.type === 'technical' && (
            <>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-gray-500">Name</div>
                <div className="col-span-2">{submission.name}</div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-gray-500">Email</div>
                <div className="col-span-2">{submission.contact}</div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-gray-500">Issue Type</div>
                <div className="col-span-2">{submission.issueType}</div>
              </div>
            </>
          )}

          <div className="grid grid-cols-3 gap-4">
            <div className="text-gray-500">Submitted At</div>
            <div className="col-span-2">
              {new Date(submission.submittedAt).toLocaleString()}
            </div>
          </div>

          <div className="pt-6">
            <h3 className="text-lg font-medium mb-4">Admin Comments</h3>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add new comment..."
              className="w-full p-3 border rounded-md mb-4"
              rows={3}
            />
            <button
              onClick={handleUpdate}
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded-md disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </button>

            {submission.adminComment && (
              <div className="mt-4 p-4 bg-gray-50 rounded-md">
                <p className="text-gray-700">{submission.adminComment}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUsDetails;