import React, { useEffect, useState } from 'react';

const EntityDetail = ({ entityData }) => {
  const [entityDetails, setEntityDetails] = useState(null);

  useEffect(() => {
    // Fetch additional details for the entity
    fetch(entityData.url)
      .then(response => response.json())
      .then(data => {
        setEntityDetails(data);
      })
      .catch(error => console.error('Error fetching entity details:', error));
  }, [entityData]);

  if (!entityDetails) {
    return <p>Loading entity details...</p>;
  }

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{entityData.name}</h5>
        {entityDetails.description && <p className="card-text">{entityDetails.description}</p>}
        <ul className="list-group">
          {Object.entries(entityDetails).map(([key, value]) => (
            <li key={key} className="list-group-item">
              {key}: {Array.isArray(value) ? value.join(', ') : value}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default EntityDetail;
