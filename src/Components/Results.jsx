import React from 'react';
import { useLocation } from 'react-router-dom';

const FilteredResults = () => {
  const location = useLocation();
  const { filteredPosts, appliedFilters } = location.state || { 
    filteredPosts: [], 
    appliedFilters: {} 
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Filtered Results</h1>
        <div className="text-sm text-gray-600 mt-2">
          {Object.entries(appliedFilters)
            .filter(([_, value]) => value !== '')
            .map(([key, value]) => (
              <span key={key} className="mr-4">
                {key}: {value}
              </span>
            ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.map(post => (
          <div key={post.id} className="border rounded-lg p-4 shadow">
            <h2 className="text-xl font-semibold">{post.name}</h2>
            <p className="text-gray-600">{post.location}</p>
            <p className="text-gray-600">{post.Continent}</p>
            <p className="mt-2">{post.description}</p>
            <div className="mt-4">
              <p className="font-medium">Activities: {post.activities.length}</p>
              <p className="font-medium">
                Total Price: $
                {post.activities.reduce((sum, activity) => 
                  sum + (activity.price || 0), 0
                )}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilteredResults;