import React from 'react';
import RecipeCard from './RecipeCard';

const Favorites = ({ favorites, onSelectRecipe, onRemoveFavorite }) => {
  return (
    <div>
      <h2 style={{ color: 'white', marginBottom: '20px' }}>
        Your Favorite Recipes ❤️ ({favorites.length})
      </h2>
      {favorites.length === 0 ? (
        <div className="no-results">
          <h2>No favorites yet!</h2>
          <p>Start adding recipes to your favorites collection.</p>
        </div>
      ) : (
        <div className="recipes-grid">
          {favorites.map(recipe => (
            <RecipeCard
              key={recipe.idMeal}
              recipe={recipe}
              onClick={onSelectRecipe}
              onAddToFavorites={() => onRemoveFavorite(recipe.idMeal)}
              isFavorite={true}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;