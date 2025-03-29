import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { adminApiform } from '../../services/api';

interface BaseSubmission {
  _id: string;
  type: 'bus-service' | 'technical';
  name: string;
  status: 'pending' | 'in-progress' | 'resolved';
  submittedAt: string;
}

interface BusServiceSubmission extends BaseSubmission {
  type: 'bus-service';
  busNumber: string;
}

interface TechnicalSubmission extends BaseSubmission {
  type: 'technical';
  issueType: string;
}

type Submission = BusServiceSubmission | TechnicalSubmission;

const ContactUs = () => {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const { data } = await adminApiform.get('/forms');
        setSubmissions(data);
      } catch {
        setError('Failed to load submissions');
      }
    };
    fetchSubmissions();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this submission?')) {
      try {
        await adminApiform.delete(`/forms/${id}`);
        setSubmissions(submissions.filter(sub => sub._id !== id));
      } catch {
        setError('Failed to delete submission');
      }
    }
  };

  const getSubmissionIdentifier = (sub: Submission) => {
    if (sub.type === 'bus-service') return `Bus #${sub.busNumber}`;
    return sub.issueType;
  };

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    'in-progress': 'bg-blue-100 text-blue-800',
    resolved: 'bg-green-100 text-green-800'
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-semibold text-gray-800">Submissions</h1>
        {error && <div className="text-red-600">{error}</div>}
      </div>

      <div className="bg-white rounded-lg shadow border border-gray-200">
        <div className="px-6 py-3 grid grid-cols-12 gap-4 border-b border-gray-200 text-sm font-medium text-gray-600">
          <div className="col-span-2">Type</div>
          <div className="col-span-4">Details</div>
          <div className="col-span-3">Status</div>
          <div className="col-span-2">Submitted</div>
          <div className="col-span-1">Actions</div>
        </div>

        <div className="divide-y divide-gray-200">
          {submissions.map(sub => (
            <div key={sub._id} className="px-6 py-4 grid grid-cols-12 gap-4 hover:bg-gray-50">
              <div className="col-span-2">
                <span className="capitalize">{sub.type.replace('-', ' ')}</span>
              </div>
              <div className="col-span-4 font-medium text-gray-900">
                {getSubmissionIdentifier(sub)}
              </div>
              <div className="col-span-3">
                <span className={`inline-block px-2 py-1 rounded-full text-sm ${statusColors[sub.status]}`}>
                  {sub.status.replace('-', ' ')}
                </span>
              </div>
              <div className="col-span-2 text-sm text-gray-500">
                {new Date(sub.submittedAt).toLocaleDateString()}
              </div>
              <div className="col-span-1 flex items-center space-x-4">
                <Link
                  to={`/contact-us/${sub._id}`}
                  className="text-gray-400 hover:text-blue-600"
                  title="View details"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </Link>
                {/* Delete Button */}
                <button
                  onClick={() => handleDelete(sub._id)}
                  className="text-gray-400 hover:text-red-600"
                  title="Delete submission"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        {submissions.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            <svg className="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="mt-2">No submissions found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactUs;