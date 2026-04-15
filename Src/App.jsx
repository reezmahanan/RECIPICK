import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import SearchBar from '../components/Searchbar';
import RecipeCard from '../components/RecipeCard';
import RecipeDetail from '../components/RecipeDetail';
import Filters from '../components/Filter';
import Favorites from '../components/Favorite';
import './App.css';

const App = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);

  // API key (Get free key from https://www.themealdb.com/api.php - no key needed!)
  const API_URL = 'https://www.themealdb.com/api/json/v1/1/';

  useEffect(() => {
    // Load favorites from localStorage
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
    // Load default recipes
    fetchDefaultRecipes();
  }, []);

  useEffect(() => {
    // Save favorites to localStorage
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const fetchDefaultRecipes = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}search.php?s=`);
      setRecipes(response.data.meals || []);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
    setLoading(false);
  };

  const searchRecipes = async (query) => {
    setLoading(true);
    setShowFavorites(false);
    try {
      const response = await axios.get(`${API_URL}search.php?s=${query}`);
      setRecipes(response.data.meals || []);
    } catch (error) {
      console.error('Error searching recipes:', error);
    }
    setLoading(false);
  };

  const filterByCategory = async (category) => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}filter.php?c=${category}`);
      const meals = response.data.meals || [];
      // Fetch full details for each meal
      const fullRecipes = await Promise.all(
        meals.map(async (meal) => {
          const detailResponse = await axios.get(`${API_URL}lookup.php?i=${meal.idMeal}`);
          return detailResponse.data.meals?.[0];
        })
      );
      setRecipes(fullRecipes.filter(recipe => recipe !== undefined));
    } catch (error) {
      console.error('Error filtering recipes:', error);
    }
    setLoading(false);
  };

  const addToFavorites = (recipe) => {
    if (!favorites.find(fav => fav.idMeal === recipe.idMeal)) {
      setFavorites([...favorites, recipe]);
    }
  };

  const removeFromFavorites = (recipeId) => {
    setFavorites(favorites.filter(recipe => recipe.idMeal !== recipeId));
  };

  const headline = showFavorites ? 'Your Saved Flavor Vault' : 'Cook Something Bold Today';

  return (
    <div className="app">
      <Header />
      <main className="container page-shell">
        <section className="hero-panel">
          <p className="eyebrow">Daily Recipe Explorer</p>
          <h1>{headline}</h1>
          <p className="hero-copy">
            Search, filter, and build a personal cookbook with easy-to-follow meals from around the world.
          </p>
          <div className="hero-stats">
            <article>
              <strong>{recipes.length}</strong>
              <span>Recipes Loaded</span>
            </article>
            <article>
              <strong>{favorites.length}</strong>
              <span>Favorites</span>
            </article>
            <article>
              <strong>{showFavorites ? 'On' : 'Off'}</strong>
              <span>Favorite View</span>
            </article>
          </div>
        </section>

        <section className="control-panel">
          <SearchBar onSearch={searchRecipes} />
          <Filters
            onFilter={filterByCategory}
            onShowFavorites={() => setShowFavorites(!showFavorites)}
            showFavorites={showFavorites}
          />
        </section>

        <section className="content-panel">
          {showFavorites ? (
            <Favorites
              favorites={favorites}
              onSelectRecipe={setSelectedRecipe}
              onRemoveFavorite={removeFromFavorites}
            />
          ) : (
            <>
              {loading && <div className="loader">Loading delicious recipes...</div>}
              <div className="recipes-grid">
                {recipes.map((recipe) => (
                  <RecipeCard
                    key={recipe.idMeal}
                    recipe={recipe}
                    onClick={setSelectedRecipe}
                    onAddToFavorites={addToFavorites}
                    isFavorite={favorites.some(fav => fav.idMeal === recipe.idMeal)}
                  />
                ))}
              </div>
              {!loading && recipes.length === 0 && (
                <div className="no-results">
                  <h2>No recipes found 😢</h2>
                  <p>Try searching for something else!</p>
                </div>
              )}
            </>
          )}
        </section>

        {selectedRecipe && (
          <RecipeDetail
            recipe={selectedRecipe}
            onClose={() => setSelectedRecipe(null)}
            onAddToFavorites={addToFavorites}
            isFavorite={favorites.some(fav => fav.idMeal === selectedRecipe.idMeal)}
          />
        )}
      </main>
    </div>
  );
};

export default App;