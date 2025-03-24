import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import adminApi from '../../services/adminApi';

interface ContactSubmission {
  _id: string;
  formType: 'busService' | 'technical';
  submittedAt: string;
  busNumber?: string;
  name?: string;
  issueType?: string;
}

const AdminContactSubmissions = () => {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const { data } = await adminApi.get('/contact-submissions');
        setSubmissions(data);
      } catch (err) {
        setError('Failed to load submissions');
        console.error(err);
      }
    };
    fetchSubmissions();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this submission?')) {
      try {
        await adminApi.delete(`/contact-submissions/${id}`);
        setSubmissions(submissions.filter(sub => sub._id !== id));
      } catch (err) {
        setError('Failed to delete submission');
        console.error(err);
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-semibold text-gray-800">Contact Submissions</h1>
        {error && <div className="px-4 py-2 text-red-600 bg-red-50 rounded-md">{error}</div>}
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-3 grid grid-cols-12 gap-4 border-b border-gray-200 text-sm font-medium text-gray-600">
          <div className="col-span-2">Type</div>
          <div className="col-span-3">Identifier</div>
          <div className="col-span-3">Issue Type</div>
          <div className="col-span-2">Submitted</div>
          <div className="col-span-2">Actions</div>
        </div>

        <div className="divide-y divide-gray-200">
          {submissions.map(submission => (
            <div key={submission._id} className="px-6 py-4 grid grid-cols-12 gap-4 hover:bg-gray-50 transition-colors">
              <div className="col-span-2">
                <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                  submission.formType === 'busService' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-blue-100 text-blue-800'
                }`}>
                  {submission.formType === 'busService' ? 'Bus Service' : 'Technical'}
                </span>
              </div>
              <div className="col-span-3 font-medium text-gray-900">
                {submission.formType === 'busService' 
                  ? submission.busNumber 
                  : submission.name}
              </div>
              <div className="col-span-3">
                {submission.issueType && (
                  <span className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm">
                    {submission.issueType}
                  </span>
                )}
              </div>
              <div className="col-span-2 text-gray-500 text-sm">
                {new Date(submission.submittedAt).toLocaleString()}
              </div>
              <div className="col-span-2 flex items-center space-x-4">
                <Link
                  to={`/admin/contact-submissions/${submission._id}`}
                  className="text-gray-400 hover:text-blue-600 transition-colors"
                  title="View details"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </Link>
                <button
                  onClick={() => handleDelete(submission._id)}
                  className="text-gray-400 hover:text-red-600 transition-colors"
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
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H5a2 2 0 01-2-2V7a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="mt-4">No contact submissions found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminContactSubmissions;