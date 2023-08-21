import React, { useEffect, useState } from 'react';
import { useFavoritesContext } from '../context/FavoritesContext.jsx';
import EntityCard from '../component/EntityCard.jsx';
import SearchBar from '../component/Searchbar.jsx';

const PlanetsPage = () => {
  const { isFavorite, addToFavorites, removeFromFavorites } = useFavoritesContext();
  const [planets, setPlanets] = useState([]);
  const [filteredPlanets, setFilteredPlanets] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('https://swapi.tech/api/planets/')
      .then(response => response.json())
      .then(data => setPlanets(data.results))
      .catch(error => console.error('Error fetching planets:', error));
  }, []);

  useEffect(() => {
    const filtered = planets.filter(planet =>
      planet.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPlanets(filtered);
  }, [planets, searchTerm]);

  const handleSearch = term => {
    setSearchTerm(term);
  };

  return (
    <div>
      <h2>Star Wars Planets</h2>
      <SearchBar options={planets.map(planet => planet.name)} onSearch={handleSearch} />
      <div className="card-deck">
        {filteredPlanets.map(planet => (
          <EntityCard
            key={planet.url}
            entityData={planet}
            isFavorite={isFavorite(planet.url)}
            addToFavorites={() => addToFavorites(planet)}
            removeFromFavorites={() => removeFromFavorites(planet.url)}
          />
        ))}
      </div>
    </div>
  );
};

export default PlanetsPage;
