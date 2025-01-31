import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const CreateContent = () => {
  const { contentTypeId } = useParams();
  const [title, setTitle] = useState('');
  const [blockContent, setBlockContent] = useState('');
  const [contents, setContents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/v1/workflow/actions/default/fire/PUBLISH', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_DOTCMS_API_TOKEN}`
        },
        body: JSON.stringify({
          contentlet: {
            contentType: contentTypeId,
            title,
            block: JSON.stringify({
              type: 'doc',
              content: [{
                type: 'paragraph',
                content: [{
                  type: 'text',
                  text: blockContent
                }]
              }]
            })
          }
        })
      });

      if (!response.ok) throw new Error('Failed to create content');
      
      const data = await response.json();
      setContents([...contents, data.entity]);
      setTitle('');
      setBlockContent('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center mb-8">
        <button
          onClick={() => window.history.back()}
          className="text-[#4C2FE6] hover:text-[#3B1BD1] font-medium flex items-center gap-1 text-sm"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Content Types
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h1 className="text-2xl font-semibold mb-6">Create Content</h1>
          <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm p-6 border border-[#E2E8F0]">
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="title">
                Title
              </label>
              <input
                className="w-full px-4 py-2.5 bg-white text-gray-900 border border-[#E2E8F0] rounded-lg focus:ring-2 focus:ring-[#4C2FE6] focus:border-transparent transition-all"
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter title"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="blockContent">
                Content
              </label>
              <textarea
                className="w-full px-4 py-2.5 bg-white text-gray-900 border border-[#E2E8F0] rounded-lg focus:ring-2 focus:ring-[#4C2FE6] focus:border-transparent transition-all"
                id="blockContent"
                value={blockContent}
                onChange={(e) => setBlockContent(e.target.value)}
                placeholder="Enter your content here..."
                rows="6"
                required
              />
            </div>
            {error && (
              <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm">
                {error}
              </div>
            )}
            <button
              className="w-full bg-[#4C2FE6] hover:bg-[#3B1BD1] text-white font-medium py-2.5 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Creating...
                </>
              ) : (
                'Create Content'
              )}
            </button>
          </form>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-6">Created Content</h2>
          {contents.length > 0 ? (
            <div className="bg-white rounded-xl border border-[#E2E8F0] overflow-hidden">
              <ul className="divide-y divide-[#E2E8F0]">
                {contents.map((content, index) => (
                  <li key={index} className="p-4 hover:bg-gray-50 transition-colors">
                    <span className="font-medium text-gray-900">{content.title}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="bg-white rounded-xl p-8 border border-[#E2E8F0] text-center text-gray-500">
              No content created yet
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateContent; 