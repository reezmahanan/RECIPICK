import React from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

const FALLBACK_IMAGE =
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="%23f5d2b1"/><stop offset="100%" stop-color="%23f0a877"/></linearGradient></defs><rect width="1200" height="800" fill="url(%23g)"/><text x="50%" y="48%" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="68" fill="%234d2107">ReciPick</text><text x="50%" y="58%" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="34" fill="%234d2107">Image unavailable</text></svg>';

const handleImageError = (e) => {
  e.currentTarget.onerror = null;
  e.currentTarget.src = FALLBACK_IMAGE;
};

const RecipeCard = ({ recipe, onClick, onAddToFavorites, isFavorite }) => {
  return (
    <div className="recipe-card">
      <img 
        src={recipe.strMealThumb} 
        alt={recipe.strMeal} 
        className="recipe-image"
        onError={handleImageError}
        onClick={() => onClick(recipe)}
      />
      <div 
        className="favorite-icon"
        onClick={(e) => {
          e.stopPropagation();
          onAddToFavorites(recipe);
        }}
      >
        {isFavorite ? <FaHeart color="#f5576c" size={20} /> : <FaRegHeart size={20} />}
      </div>
      <div className="recipe-info" onClick={() => onClick(recipe)}>
        <h3 className="recipe-title">{recipe.strMeal}</h3>
        <p className="recipe-category">{recipe.strCategory || 'Various'}</p>
        <p style={{ fontSize: '14px', color: '#888' }}>
          {recipe.strArea ? `Cuisine: ${recipe.strArea}` : 'International'}
        </p>
      </div>
    </div>
  );
};

export default RecipeCard;