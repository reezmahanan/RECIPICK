import React from 'react';
import { FaHeart, FaRegHeart, FaTimes } from 'react-icons/fa';

const RecipeDetail = ({ recipe, onClose, onAddToFavorites, isFavorite }) => {
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
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h1 className="recipe-detail-title">{recipe.strMeal}</h1>
            <button 
              onClick={() => onAddToFavorites(recipe)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: '24px'
              }}
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
          
          {recipe.strYoutube && (
            <div style={{ marginTop: '20px' }}>
              <h3>Video Tutorial:</h3>
              <a 
                href={recipe.strYoutube} 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ color: '#667eea' }}
              >
                Watch on YouTube
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;