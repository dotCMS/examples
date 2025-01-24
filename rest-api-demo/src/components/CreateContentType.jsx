import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateContentType = () => {
  const navigate = useNavigate();
  const [contentTypeName, setContentTypeName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [contentTypes, setContentTypes] = useState([]);
  const [loadingTypes, setLoadingTypes] = useState(true);

  useEffect(() => {
    fetchContentTypes();
  }, []);

  const fetchContentTypes = async () => {
    try {
      const response = await fetch('https://demo.dotcms.com/api/v1/contenttype?per_page=100', {
        headers: {
          'Authorization': `Bearer ${process.env.REACT_APP_DOTCMS_API_TOKEN}`
        }
      });
      if (!response.ok) throw new Error('Failed to fetch content types');
      const data = await response.json();
      setContentTypes(data.entity.filter(type => type.name.startsWith('demo-apis')));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoadingTypes(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const prefixedName = `demo-apis-${contentTypeName}`;

    try {
      const response = await fetch('/api/v1/contenttype', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.REACT_APP_DOTCMS_API_TOKEN}`
        },
        body: JSON.stringify({
          defaultType: false,
          fixed: false,
          system: false,
          clazz: 'com.dotcms.contenttype.model.type.ImmutableSimpleContentType',
          description: '',
          host: 'SYSTEM_HOST',
          folder: 'SYSTEM_FOLDER',
          name: prefixedName,
          systemActionMappings: { NEW: '' },
          workflow: ['d61a59e1-a49c-46f2-a929-db2b4bfa88b2'],
          fields: [
            {
              clazz: 'com.dotcms.contenttype.model.field.TextField',
              indexed: true,
              dataType: 'TEXT',
              readOnly: false,
              required: true,
              searchable: true,
              listed: true,
              sortOrder: 1,
              unique: false,
              name: 'title',
              variable: 'title',
              fixed: true
            },
            {
              clazz: 'com.dotcms.contenttype.model.field.ImmutableStoryBlockField',
              required: false,
              name: 'block',
              defaultValue: '',
              hint: '',
              searchable: true,
              sortOrder: 2
            }
          ]
        })
      });

      if (!response.ok) throw new Error('Failed to create content type');
      
      const data = await response.json();
      navigate(`/create-content/${data.entity[0].id}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="bg-gradient-to-r from-purple-600 to-blue-500 text-white py-12 mb-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-4 mb-6">
            <img 
              src="https://www.dotcms.com/assets/logo.svg?w=3840" 
              alt="dotCMS Logo" 
              className="h-8 brightness-0 invert"
            />
          </div>
          <h1 className="text-3xl font-semibold mb-4">Content Management</h1>
          <p className="text-lg text-white/80">Create and manage your content types with ease</p>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-semibold mb-6 text-gray-800 flex items-center gap-3">
                <span className="p-2 bg-purple-100 rounded-lg">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </span>
                Create Content Type
              </h2>
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-100">
                <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm p-6 border border-[#E2E8F0]">
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="contentTypeName">
                      Content Type Name
                    </label>
                    <input
                      className="w-full px-4 py-2.5 bg-white text-gray-900 border border-[#E2E8F0] rounded-lg focus:ring-2 focus:ring-[#4C2FE6] focus:border-transparent transition-all"
                      id="contentTypeName"
                      type="text"
                      value={contentTypeName}
                      onChange={(e) => setContentTypeName(e.target.value)}
                      placeholder="Enter name (e.g., blog-post)"
                      required
                    />
                  </div>
                  {error && (
                    <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm">
                      {error}
                    </div>
                  )}
                  <button
                    className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
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
                      'Create Content Type'
                    )}
                  </button>
                </form>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-6 text-gray-800 flex items-center gap-3">
                <span className="p-2 bg-blue-100 rounded-lg">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </span>
                Existing Content Types
              </h2>
              {loadingTypes ? (
                <div className="bg-gray-50 rounded-lg p-8 border border-gray-100 flex items-center justify-center">
                  <div className="animate-pulse text-gray-400">Loading content types...</div>
                </div>
              ) : contentTypes.length > 0 ? (
                <div className="bg-gray-50 rounded-lg border border-gray-100 overflow-hidden">
                  <ul className="divide-y divide-gray-200 max-h-[500px] overflow-y-auto">
                    {contentTypes.map((type) => (
                      <li key={type.id} className="p-4 hover:bg-white transition-colors">
                        <div className="flex justify-between items-center gap-4">
                          <div className="flex-1 min-w-0">
                            <h3 className="text-base font-medium text-gray-900 truncate">{type.name}</h3>
                            <p className="text-sm text-gray-500 truncate">{type.description || 'No description'}</p>
                          </div>
                          <button
                            onClick={() => navigate(`/create-content/${type.id}`)}
                            className="flex-shrink-0 bg-gradient-to-r from-purple-600 to-blue-500 text-white hover:from-purple-700 hover:to-blue-600 font-medium text-sm px-4 py-2 rounded-lg transition-all duration-200"
                          >
                            Create Content →
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div className="bg-gray-50 rounded-lg p-8 border border-gray-100 text-center text-gray-500">
                  No content types found
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateContentType; 