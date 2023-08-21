import React, { useContext } from 'react';
import { FavoritesContext } from '../context/FavoritesContext.jsx';
import EntityCard from './EntityCard.jsx';

const FavoritesList = () => {
  const { favorites } = useContext(FavoritesContext);

  return (
    <div>
      <h2>Favorites</h2>
      {favorites.length === 0 ? (
        <p>No favorites added yet.</p>
      ) : (
        <div className="card-deck">
          {favorites.map(entity => (
            <EntityCard key={entity.url} entityData={entity} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesList;
