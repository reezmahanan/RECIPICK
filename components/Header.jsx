import React from 'react';
import { FaUtensils } from 'react-icons/fa';

const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <FaUtensils size={32} />
          <span>ReciPick</span>
        </div>
        <p style={{ color: '#666' }}>Discover & Save Your Favorite Recipes</p>
      </div>
    </header>
  );
};

export default Header;