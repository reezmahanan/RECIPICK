import React from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

const RecipeCard = ({ recipe, onClick, onAddToFavorites, isFavorite }) => {
  return (
    <div className="recipe-card">
      <img 
        src={recipe.strMealThumb} 
        alt={recipe.strMeal} 
        className="recipe-image"
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