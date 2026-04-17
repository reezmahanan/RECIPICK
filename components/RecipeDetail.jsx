import React from 'react';
import { FaHeart, FaRegHeart, FaTimes } from 'react-icons/fa';

const FALLBACK_IMAGE =
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="%23f5d2b1"/><stop offset="100%" stop-color="%23f0a877"/></linearGradient></defs><rect width="1200" height="800" fill="url(%23g)"/><text x="50%" y="48%" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="68" fill="%234d2107">ReciPick</text><text x="50%" y="58%" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="34" fill="%234d2107">Image unavailable</text></svg>';

const handleImageError = (e) => {
  e.currentTarget.onerror = null;
  e.currentTarget.src = FALLBACK_IMAGE;
};

const RecipeDetail = ({ recipe, onClose, onAddToFavorites, isFavorite }) => {
  const videoUrl = recipe.strYoutube || `https://www.youtube.com/results?search_query=${encodeURIComponent(`${recipe.strMeal} recipe`)}`;

  // Extract ingredients from recipe
  const getIngredients = () => {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = recipe[`strIngredient${i}`];
      const measure = recipe[`strMeasure${i}`];
      if (ingredient && ingredient.trim()) {
        ingredients.push({ ingredient, measure });
      }
    }
    return ingredients;
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <FaTimes />
        </button>
        <div className="recipe-detail">
          <img 
            src={recipe.strMealThumb} 
            alt={recipe.strMeal} 
            className="recipe-detail-image"
            onError={handleImageError}
          />
          <div className="recipe-detail-header">
            <h1 className="recipe-detail-title">{recipe.strMeal}</h1>
            <button 
              onClick={() => onAddToFavorites(recipe)}
              className="recipe-favorite-toggle"
              aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              {isFavorite ? <FaHeart color="#f5576c" size={28} /> : <FaRegHeart size={28} />}
            </button>
          </div>
          
          <p><strong>Category:</strong> {recipe.strCategory}</p>
          <p><strong>Cuisine:</strong> {recipe.strArea}</p>
          
          <h3>Ingredients:</h3>
          <ul className="ingredients-list">
            {getIngredients().map((item, index) => (
              <li key={index}>
                {item.measure} {item.ingredient}
              </li>
            ))}
          </ul>
          
          <h3>Instructions:</h3>
          <div className="instructions">
            {recipe.strInstructions?.split('. ').map((sentence, index) => (
              sentence && <p key={index}>{sentence}.</p>
            ))}
          </div>
          
          <div className="video-section">
            <h3>Video Tutorial:</h3>
            <a 
              href={videoUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="video-link"
            >
              Watch on YouTube
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;