import React, { createContext, useState, useContext } from 'react';

const FavoritesContext = createContext();

const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  const addToFavorites = entity => {
    setFavorites(prevFavorites => [...prevFavorites, entity]);
  };

  const removeFromFavorites = url => {
    setFavorites(prevFavorites => prevFavorites.filter(entity => entity.url !== url));
  };

  const isFavorite = url => {
    return favorites.some(entity => entity.url === url);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addToFavorites, removeFromFavorites, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

const useFavoritesContext = () => {
  return useContext(FavoritesContext);
};

export { FavoritesProvider, useFavoritesContext };
