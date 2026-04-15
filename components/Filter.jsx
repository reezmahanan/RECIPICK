import React from 'react';
import { FaStar } from 'react-icons/fa';

const Filters = ({ onFilter, onShowFavorites, showFavorites }) => {
  const categories = ['Beef', 'Chicken', 'Dessert', 'Lamb', 'Miscellaneous', 'Pasta', 'Pork', 'Seafood', 'Vegetarian'];

  return (
    <div className="filters">
      <button className="filter-btn favorites-btn" onClick={onShowFavorites}>
        <FaStar /> {showFavorites ? 'Show All' : 'Favorites'}
      </button>
      {!showFavorites && categories.map(category => (
        <button 
          key={category} 
          className="filter-btn"
          onClick={() => onFilter(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default Filters;