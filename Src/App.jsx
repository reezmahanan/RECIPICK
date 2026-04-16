import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaPepperHot, FaMortarPestle, FaFire, FaDrumstickBite } from 'react-icons/fa';
import Header from '../components/Header';
import SearchBar from '../components/Searchbar';
import RecipeCard from '../components/RecipeCard';
import RecipeDetail from '../components/RecipeDetail';
import Filters from '../components/Filter';
import Favorites from '../components/Favorite';
import './App.css';

const BIRYANI_MEAL_IDS = ['52805'];

const INDIAN_MEAL_IDS = ['52795', '52785', '52868', '52865', '52808', '52807'];

const BIRYANI_SHOWCASE = [
  {
    idMeal: '52805',
    strMeal: 'Lamb Biryani',
    strArea: 'Indian',
    spiceSignature: ['Saffron', 'Cardamom', 'Crisp Onions']
  },
  {
    idMeal: '52795',
    strMeal: 'Chicken Handi',
    strArea: 'Indian',
    spiceSignature: ['Garam Masala', 'Tomato Base', 'Creamy Gravy']
  },
  {
    idMeal: '52808',
    strMeal: 'Lamb Rogan Josh',
    strArea: 'Indian',
    spiceSignature: ['Kashmiri Chili', 'Clove', 'Yogurt']
  },
  {
    idMeal: '53359',
    strMeal: 'Beef Mandi',
    strArea: 'Arabian-Indian',
    spiceSignature: ['Smoked Rice', 'Whole Spices', 'Slow Roast']
  }
];

const SRI_LANKAN_SPECIALS = [
  {
    idMeal: 'sri-001',
    strMeal: 'Sri Lankan Chicken Kottu',
    strCategory: 'Street Food',
    strArea: 'Sri Lankan',
    strMealThumb: 'https://img.youtube.com/vi/t4TQxQH2fG8/hqdefault.jpg',
    strYoutube: 'https://www.youtube.com/watch?v=t4TQxQH2fG8',
    strInstructions:
      'Shred roti and stir fry with chicken, egg, vegetables, curry powder, and pepper until smoky and well mixed.',
    spiceSignature: ['Curry Leaves', 'Ceylon Pepper', 'Roasted Curry Powder'],
    strIngredient1: 'Roti',
    strMeasure1: '4 pieces',
    strIngredient2: 'Chicken',
    strMeasure2: '300 g',
    strIngredient3: 'Egg',
    strMeasure3: '2',
    strIngredient4: 'Vegetables',
    strMeasure4: '1 cup'
  },
  {
    idMeal: 'sri-002',
    strMeal: 'Fish Ambul Thiyal',
    strCategory: 'Seafood Curry',
    strArea: 'Sri Lankan',
    strMealThumb: 'https://img.youtube.com/vi/R4wzN4F8kQ8/hqdefault.jpg',
    strYoutube: 'https://www.youtube.com/watch?v=R4wzN4F8kQ8',
    strInstructions:
      'Cook fish with goraka, curry leaves, pepper, chili, and garlic until the masala turns thick, dark, and tangy.',
    spiceSignature: ['Goraka', 'Black Pepper', 'Curry Leaves'],
    strIngredient1: 'Fish',
    strMeasure1: '600 g',
    strIngredient2: 'Goraka',
    strMeasure2: '2 tbsp',
    strIngredient3: 'Garlic',
    strMeasure3: '5 cloves',
    strIngredient4: 'Curry Leaves',
    strMeasure4: '2 sprigs'
  },
  {
    idMeal: 'sri-003',
    strMeal: 'Polos Jackfruit Curry',
    strCategory: 'Curry',
    strArea: 'Sri Lankan',
    strMealThumb: 'https://img.youtube.com/vi/Sf7Q0DhJ7nQ/hqdefault.jpg',
    strYoutube: 'https://www.youtube.com/watch?v=Sf7Q0DhJ7nQ',
    strInstructions:
      'Simmer young jackfruit with roasted curry powder, coconut milk, mustard, onion, and garlic until rich and tender.',
    spiceSignature: ['Roasted Curry Powder', 'Coconut Milk', 'Cinnamon'],
    strIngredient1: 'Young Jackfruit',
    strMeasure1: '500 g',
    strIngredient2: 'Coconut Milk',
    strMeasure2: '1.5 cups',
    strIngredient3: 'Onion',
    strMeasure3: '1 medium',
    strIngredient4: 'Mustard Seeds',
    strMeasure4: '1 tsp'
  }
];

const BIRYANI_ICONS = [FaDrumstickBite, FaMortarPestle, FaFire, FaPepperHot];

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

  const fetchMealsByIds = async (mealIds) => {
    const details = await Promise.all(
      mealIds.map(async (mealId) => {
        const response = await axios.get(`${API_URL}lookup.php?i=${mealId}`);
        return response.data.meals?.[0];
      })
    );
    return details.filter(Boolean);
  };

  const addToFavorites = (recipe) => {
    if (!favorites.find(fav => fav.idMeal === recipe.idMeal)) {
      setFavorites([...favorites, recipe]);
    }
  };

  const removeFromFavorites = (recipeId) => {
    setFavorites(favorites.filter(recipe => recipe.idMeal !== recipeId));
  };

  const loadSpecialBiryanis = async () => {
    setLoading(true);
    setShowFavorites(false);
    try {
      const biryaniMeals = await fetchMealsByIds(BIRYANI_MEAL_IDS);
      setRecipes(biryaniMeals);
    } catch (error) {
      console.error('Error loading biryani recipes:', error);
      setRecipes([]);
    }
    setLoading(false);
  };

  const loadSriLankanRecipes = () => {
    setShowFavorites(false);
    setRecipes(SRI_LANKAN_SPECIALS);
  };

  const loadIndianRecipes = async () => {
    setLoading(true);
    setShowFavorites(false);
    try {
      const indianMeals = await fetchMealsByIds(INDIAN_MEAL_IDS);
      setRecipes(indianMeals);
    } catch (error) {
      console.error('Error loading Indian recipes:', error);
      setRecipes([]);
    }
    setLoading(false);
  };

  const openShowcaseRecipe = async (mealId) => {
    setLoading(true);
    try {
      const [meal] = await fetchMealsByIds([mealId]);
      if (meal) {
        setSelectedRecipe(meal);
      }
    } catch (error) {
      console.error('Error opening showcase recipe:', error);
    }
    setLoading(false);
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

        <section className="biryani-showcase">
          <div className="biryani-heading-row">
            <div>
              <p className="eyebrow">Special Biryani Types</p>
              <h2>South Asian Vault: Biryani, Sri Lankan, and Indian Specials</h2>
            </div>
            <div className="showcase-actions">
              <button className="search-button" onClick={loadSpecialBiryanis}>
                Biryani
              </button>
              <button className="search-button alt" onClick={loadSriLankanRecipes}>
                Sri Lankan
              </button>
              <button className="search-button alt-2" onClick={loadIndianRecipes}>
                Indian
              </button>
            </div>
          </div>

          <div className="biryani-grid">
            {BIRYANI_SHOWCASE.map((biryani, index) => {
              const Icon = BIRYANI_ICONS[index % BIRYANI_ICONS.length];
              return (
                <article key={biryani.idMeal} className="biryani-card" onClick={() => openShowcaseRecipe(biryani.idMeal)}>
                  <div className="biryani-icon-wrap">
                    <Icon className="biryani-icon" />
                  </div>
                  <h3>{biryani.strMeal}</h3>
                  <p className="biryani-region">{biryani.strArea}</p>
                  <div className="spice-chips">
                    {biryani.spiceSignature.map((spice) => (
                      <span key={spice}>{spice}</span>
                    ))}
                  </div>
                </article>
              );
            })}
          </div>
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