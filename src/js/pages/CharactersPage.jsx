import React, { useEffect, useState } from 'react';
import { useFavoritesContext } from '../context/FavoritesContext.jsx';
import EntityCard from '../component/EntityCard.jsx';
import SearchBar from '../component/Searchbar.jsx';

const CharactersPage = () => {
  const { isFavorite, addToFavorites, removeFromFavorites } = useFavoritesContext();
  const [characters, setCharacters] = useState([]);
  const [filteredCharacters, setFilteredCharacters] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('https://swapi.tech/api/people/')
      .then(response => response.json())
      .then(data => setCharacters(data.results))
      .catch(error => console.error('Error fetching characters:', error));
  }, []);

  useEffect(() => {
    const filtered = characters.filter(character =>
      character.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCharacters(filtered);
  }, [characters, searchTerm]);

  const handleSearch = term => {
    setSearchTerm(term);
  };

  return (
    <div>
      <h2>Star Wars Characters</h2>
      <SearchBar options={characters.map(character => character.name)} onSearch={handleSearch} />
      <div className="card-deck">
        {filteredCharacters.map(character => (
          <EntityCard
            key={character.url}
            entityData={character}
            isFavorite={isFavorite(character.url)}
            addToFavorites={() => addToFavorites(character)}
            removeFromFavorites={() => removeFromFavorites(character.url)}
          />
        ))}
      </div>
    </div>
  );
};

export default CharactersPage;
