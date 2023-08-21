import React, { useContext, useEffect, useState } from 'react';
import { FavoritesContext } from '../context/FavoritesContext.jsx';

const EntityCard = ({ entityData }) => {
  const { addToFavorites, removeFromFavorites, favorites } = useContext(FavoritesContext);
  const [entityDescription, setEntityDescription] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    // Check if the entity is in favorites
    const isEntityFavorite = favorites.some(favorite => favorite.url === entityData.url);
    setIsFavorite(isEntityFavorite);

    // Fetch additional details for the entity
    fetch(entityData.url)
      .then(response => response.json())
      .then(data => {
        // Set the entity description
        if (data.description) {
          setEntityDescription(data.description);
        }
      })
      .catch(error => console.error('Error fetching entity details:', error));
  }, [entityData, favorites]);

  const handleToggleFavorite = () => {
    if (isFavorite) {
      removeFromFavorites(entityData.url);
    } else {
      addToFavorites(entityData);
    }
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{entityData.name}</h5>
        {entityDescription && <p className="card-text">{entityDescription}</p>}
        <button className={`btn ${isFavorite ? 'btn-danger' : 'btn-primary'}`} onClick={handleToggleFavorite}>
          {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
        </button>
      </div>
    </div>
  );
};

export default EntityCard;
