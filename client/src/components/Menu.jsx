import React, { useState } from 'react';

const Menu = () => {
  const [genre, setGenre] = useState('');

  const handleGenreChange = (e) => {
    setGenre(e.target.value);
  };

  return (
    <div>
      <h1>Choose a Genre</h1>
      <select value={genre} onChange={handleGenreChange}>
        <option value="">Select Genre</option>
        <option value="rock">Rock</option>
        <option value="pop">Pop</option>
        <option value="rap">Rap</option>
        <option value="country">Country</option>
        <option value="alternative">Alternative</option>
      </select>
    </div>
  );
};

export default Menu;
