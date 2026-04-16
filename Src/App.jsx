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

const SPECIAL_BIRYANIS = [
  {
    idMeal: 'biryani-001',
    strMeal: 'Royal Hyderabadi Dum Biryani',
    strCategory: 'Biryani',
    strArea: 'Indian',
    strMealThumb:
      'https://images.unsplash.com/photo-1563379091339-03246963d51a?auto=format&fit=crop&w=1200&q=80',
    strInstructions:
      'Marinate chicken with yogurt, ginger-garlic paste, chili powder, turmeric, and salt for at least 1 hour. Fry onions until golden and reserve half for layering. Parboil basmati rice with whole spices until 70 percent cooked. Layer marinated chicken, rice, fried onion, mint, coriander, saffron milk, and ghee in a heavy pot. Seal and cook on low dum heat for 30 to 35 minutes. Rest for 10 minutes, then fluff and serve hot with raita.',
    spiceSignature: ['Byadgi Chili', 'Saffron', 'Shahi Jeera'],
    strIngredient1: 'Chicken',
    strMeasure1: '700 g',
    strIngredient2: 'Basmati Rice',
    strMeasure2: '2 cups',
    strIngredient3: 'Yogurt',
    strMeasure3: '1 cup',
    strIngredient4: 'Fried Onions',
    strMeasure4: '1.5 cups',
    strIngredient5: 'Mint & Coriander',
    strMeasure5: '1 cup',
    strIngredient6: 'Saffron Milk',
    strMeasure6: '3 tbsp'
  },
  {
    idMeal: 'biryani-002',
    strMeal: 'Kolkata Aloo Biryani',
    strCategory: 'Biryani',
    strArea: 'Indian',
    strMealThumb:
      'https://images.unsplash.com/photo-1701579231305-d84d8af9a3fd?auto=format&fit=crop&w=1200&q=80',
    strInstructions:
      'Marinate mutton in yogurt, onion paste, nutmeg, mace, and salt. Cook mutton until tender and reserve gravy. Parboil aromatic rice with cardamom and bay leaf. Fry boiled potatoes until lightly golden. Layer rice, mutton, potatoes, kewra water, rose water, and ghee in a pot. Finish with slow dum cooking for 25 to 30 minutes until fragrant.',
    spiceSignature: ['Kewra', 'Nutmeg', 'Mace'],
    strIngredient1: 'Mutton',
    strMeasure1: '600 g',
    strIngredient2: 'Potatoes',
    strMeasure2: '3 large',
    strIngredient3: 'Basmati Rice',
    strMeasure3: '2 cups',
    strIngredient4: 'Yogurt',
    strMeasure4: '3/4 cup',
    strIngredient5: 'Kewra Water',
    strMeasure5: '1 tsp',
    strIngredient6: 'Ghee',
    strMeasure6: '4 tbsp'
  },
  {
    idMeal: 'biryani-003',
    strMeal: 'Malabar Coastal Biryani',
    strCategory: 'Biryani',
    strArea: 'Indian',
    strMealThumb:
      'https://images.unsplash.com/photo-1599043513900-ed6fe01d3833?auto=format&fit=crop&w=1200&q=80',
    strInstructions:
      'Saute onions in coconut oil with fennel and green chilies. Add chicken, tomatoes, turmeric, and garam masala and cook until thick. Cook jeerakasala rice separately with whole spices. Layer masala and rice with fried cashews, raisins, mint, and ghee. Cover and steam briefly so flavors combine. Serve with pickle and onion salad.',
    spiceSignature: ['Fennel', 'Green Chili', 'Coconut Oil'],
    strIngredient1: 'Chicken',
    strMeasure1: '700 g',
    strIngredient2: 'Jeerakasala Rice',
    strMeasure2: '2 cups',
    strIngredient3: 'Onions',
    strMeasure3: '3 medium',
    strIngredient4: 'Tomatoes',
    strMeasure4: '2 medium',
    strIngredient5: 'Cashews & Raisins',
    strMeasure5: '1/3 cup',
    strIngredient6: 'Coconut Oil',
    strMeasure6: '3 tbsp'
  },
  {
    idMeal: 'biryani-004',
    strMeal: 'Sindhi Spicy Biryani',
    strCategory: 'Biryani',
    strArea: 'Pakistani',
    strMealThumb:
      'https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?auto=format&fit=crop&w=1200&q=80',
    strInstructions:
      'Fry onions and add mutton, ginger-garlic paste, yogurt, tomato, and robust spices. Simmer until mutton is tender and masala is rich. Boil potatoes and add into masala for body. Parboil long-grain rice with salt and whole spices. Layer masala and rice with mint, coriander, lemon juice, and saffron. Cook on dum until spicy aromas are fully developed.',
    spiceSignature: ['Black Cardamom', 'Red Chili', 'Dried Plum'],
    strIngredient1: 'Mutton',
    strMeasure1: '700 g',
    strIngredient2: 'Basmati Rice',
    strMeasure2: '2 cups',
    strIngredient3: 'Potatoes',
    strMeasure3: '2 medium',
    strIngredient4: 'Yogurt',
    strMeasure4: '1 cup',
    strIngredient5: 'Tomatoes',
    strMeasure5: '3 medium',
    strIngredient6: 'Mint & Coriander',
    strMeasure6: '1 cup'
  }
];

const SRI_LANKAN_SPECIALS = [
  {
    idMeal: 'sri-001',
    strMeal: 'Sri Lankan Chicken Kottu',
    strCategory: 'Street Food',
    strArea: 'Sri Lankan',
    strMealThumb:
      'https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=1200&q=80',
    strInstructions:
      'Shred godamba roti into strips. Saute onion, curry leaves, garlic, green chili, and carrot. Add cooked chicken and a spoon of curry powder. Toss in roti strips with eggs and a splash of stock. Chop and mix rapidly on high heat until smoky and flavorful. Finish with black pepper and serve hot.',
    spiceSignature: ['Curry Leaves', 'Roasted Curry Powder', 'Black Pepper'],
    strIngredient1: 'Godamba Roti',
    strMeasure1: '4 pieces',
    strIngredient2: 'Cooked Chicken',
    strMeasure2: '300 g',
    strIngredient3: 'Eggs',
    strMeasure3: '2',
    strIngredient4: 'Cabbage & Carrot',
    strMeasure4: '1.5 cups',
    strIngredient5: 'Curry Powder',
    strMeasure5: '2 tsp'
  },
  {
    idMeal: 'sri-002',
    strMeal: 'Fish Ambul Thiyal',
    strCategory: 'Seafood Curry',
    strArea: 'Sri Lankan',
    strMealThumb:
      'https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=1200&q=80',
    strInstructions:
      'Cube firm fish and coat with goraka paste, black pepper, turmeric, chili flakes, garlic, and salt. Add curry leaves and pandan leaf, then place in an earthen pot. Cook covered on low heat until the fish firms up and the masala turns dark and dry. Let it rest so flavors deepen before serving with rice.',
    spiceSignature: ['Goraka', 'Black Pepper', 'Pandan'],
    strIngredient1: 'Firm Fish',
    strMeasure1: '600 g',
    strIngredient2: 'Goraka Paste',
    strMeasure2: '2 tbsp',
    strIngredient3: 'Curry Leaves',
    strMeasure3: '2 sprigs',
    strIngredient4: 'Garlic',
    strMeasure4: '5 cloves',
    strIngredient5: 'Turmeric & Chili Flakes',
    strMeasure5: '2 tsp'
  },
  {
    idMeal: 'sri-003',
    strMeal: 'Polos Young Jackfruit Curry',
    strCategory: 'Curry',
    strArea: 'Sri Lankan',
    strMealThumb:
      'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1200&q=80',
    strInstructions:
      'Cook young jackfruit with roasted curry powder, cinnamon, mustard seeds, and coconut milk. Add onion, garlic, ginger, and green chili. Simmer until the gravy thickens and coats the jackfruit. Finish with toasted coconut and lime for a rich village-style curry.',
    spiceSignature: ['Roasted Curry Powder', 'Cinnamon', 'Coconut Milk'],
    strIngredient1: 'Young Jackfruit',
    strMeasure1: '500 g',
    strIngredient2: 'Coconut Milk',
    strMeasure2: '1.5 cups',
    strIngredient3: 'Onion & Garlic',
    strMeasure3: '1 cup',
    strIngredient4: 'Mustard Seeds',
    strMeasure4: '1 tsp',
    strIngredient5: 'Roasted Curry Powder',
    strMeasure5: '2 tsp'
  }
];

const INDIAN_SPECIALS = [
  {
    idMeal: 'ind-001',
    strMeal: 'Butter Chicken Delhi Style',
    strCategory: 'Curry',
    strArea: 'Indian',
    strMealThumb:
      'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=1200&q=80',
    strInstructions:
      'Marinate chicken in yogurt, ginger-garlic paste, chili powder, and garam masala, then grill or sear. Prepare sauce with butter, tomatoes, kasuri methi, and cream. Simmer chicken in sauce until glossy and rich. Serve with naan or jeera rice.',
    spiceSignature: ['Kasuri Methi', 'Garam Masala', 'Creamy Tomato'],
    strIngredient1: 'Chicken',
    strMeasure1: '700 g',
    strIngredient2: 'Tomato Puree',
    strMeasure2: '2 cups',
    strIngredient3: 'Butter',
    strMeasure3: '4 tbsp',
    strIngredient4: 'Fresh Cream',
    strMeasure4: '1/2 cup',
    strIngredient5: 'Kasuri Methi',
    strMeasure5: '1 tbsp'
  },
  {
    idMeal: 'ind-002',
    strMeal: 'Paneer Tikka Masala',
    strCategory: 'Vegetarian',
    strArea: 'Indian',
    strMealThumb:
      'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=1200&q=80',
    strInstructions:
      'Marinate paneer cubes with yogurt, turmeric, chili powder, and ginger-garlic paste. Roast or pan-char until lightly smoky. Prepare onion-tomato masala with cashew paste and spices. Fold paneer in gently and simmer for 5 minutes. Garnish with coriander and serve warm.',
    spiceSignature: ['Smoked Paprika', 'Kasuri Methi', 'Cashew Masala'],
    strIngredient1: 'Paneer',
    strMeasure1: '400 g',
    strIngredient2: 'Yogurt',
    strMeasure2: '1/2 cup',
    strIngredient3: 'Tomatoes',
    strMeasure3: '3 medium',
    strIngredient4: 'Onions',
    strMeasure4: '2 medium',
    strIngredient5: 'Cashew Paste',
    strMeasure5: '3 tbsp'
  },
  {
    idMeal: 'ind-003',
    strMeal: 'Chettinad Pepper Chicken',
    strCategory: 'Spicy Curry',
    strArea: 'Indian',
    strMealThumb:
      'https://images.unsplash.com/photo-1628294896516-1f0c6be5adcf?auto=format&fit=crop&w=1200&q=80',
    strInstructions:
      'Dry roast black pepper, fennel, cumin, and coriander, then grind coarse. Saute onion, curry leaves, and ginger-garlic until golden. Add chicken, tomatoes, and the spice blend. Cook until thick and peppery with a dark roasted finish. Serve with parotta or rice.',
    spiceSignature: ['Black Pepper', 'Fennel', 'Stone Flower'],
    strIngredient1: 'Chicken',
    strMeasure1: '800 g',
    strIngredient2: 'Black Pepper',
    strMeasure2: '1.5 tbsp',
    strIngredient3: 'Fennel Seeds',
    strMeasure3: '2 tsp',
    strIngredient4: 'Onions',
    strMeasure4: '3 medium',
    strIngredient5: 'Curry Leaves',
    strMeasure5: '2 sprigs'
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

  const addToFavorites = (recipe) => {
    if (!favorites.find(fav => fav.idMeal === recipe.idMeal)) {
      setFavorites([...favorites, recipe]);
    }
  };

  const removeFromFavorites = (recipeId) => {
    setFavorites(favorites.filter(recipe => recipe.idMeal !== recipeId));
  };

  const loadSpecialBiryanis = () => {
    setShowFavorites(false);
    setRecipes(SPECIAL_BIRYANIS);
  };

  const loadSriLankanRecipes = () => {
    setShowFavorites(false);
    setRecipes(SRI_LANKAN_SPECIALS);
  };

  const loadIndianRecipes = () => {
    setShowFavorites(false);
    setRecipes([...SPECIAL_BIRYANIS, ...INDIAN_SPECIALS]);
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
            {SPECIAL_BIRYANIS.map((biryani, index) => {
              const Icon = BIRYANI_ICONS[index % BIRYANI_ICONS.length];
              return (
                <article key={biryani.idMeal} className="biryani-card" onClick={() => setSelectedRecipe(biryani)}>
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