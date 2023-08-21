import React, { useEffect, useState } from 'react';
import { useFavoritesContext } from '../context/FavoritesContext.jsx';
import EntityCard from '../component/EntityCard.jsx';
import SearchBar from '../component/Searchbar.jsx';

const VehiclesPage = () => {
  const { isFavorite, addToFavorites, removeFromFavorites } = useFavoritesContext();
  const [vehicles, setVehicles] = useState([]);
  const [filteredVehicles, setFilteredVehicles] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('https://swapi.tech/api/vehicles/')
      .then(response => response.json())
      .then(data => setVehicles(data.results))
      .catch(error => console.error('Error fetching vehicles:', error));
  }, []);

  useEffect(() => {
    const filtered = vehicles.filter(vehicle =>
      vehicle.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredVehicles(filtered);
  }, [vehicles, searchTerm]);

  const handleSearch = term => {
    setSearchTerm(term);
  };

  return (
    <div>
      <h2>Star Wars Vehicles</h2>
      <SearchBar options={vehicles.map(vehicle => vehicle.name)} onSearch={handleSearch} />
      <div className="card-deck">
        {filteredVehicles.map(vehicle => (
          <EntityCard
            key={vehicle.url}
            entityData={vehicle}
            isFavorite={isFavorite(vehicle.url)}
            addToFavorites={() => addToFavorites(vehicle)}
            removeFromFavorites={() => removeFromFavorites(vehicle.url)}
          />
        ))}
      </div>
    </div>
  );
};

export default VehiclesPage;
