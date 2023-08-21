import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const SearchBar = ({ options, onSearch }) => {
  const history = useHistory();
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = event => {
    setSearchTerm(event.target.value);
    onSearch(event.target.value);
  };

  const handleOptionClick = option => {
    setSearchTerm(option);
    onSearch(option);
    history.push(`/search/${encodeURIComponent(option)}`);
  };

  return (
    <div className="mb-3">
      <input
        type="text"
        className="form-control"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleInputChange}
      />
      <div className="autocomplete">
        {options
          .filter(option => option.toLowerCase().includes(searchTerm.toLowerCase()))
          .map((option, index) => (
            <div
              key={index}
              className="autocomplete-item"
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </div>
          ))}
      </div>
    </div>
  );
};

export default SearchBar;
