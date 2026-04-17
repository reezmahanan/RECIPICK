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

const CUSTOM_BIRYANI_TYPES = [
  {
    idMeal: 'bir-001',
    strMeal: 'Hyderabadi Chicken Biryani',
    strCategory: 'Biryani',
    strArea: 'Indian',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/xrttsx1487339558.jpg',
    strYoutube: 'https://www.youtube.com/results?search_query=Hyderabadi+Chicken+Biryani',
    strInstructions:
      'Marinate chicken with yogurt and spices. Layer partially cooked basmati rice over masala chicken. Add saffron milk, mint, and fried onions. Dum-cook on low heat until fragrant and fully cooked.',
    spiceSignature: ['Saffron', 'Mint', 'Fried Onions'],
    strIngredient1: 'Chicken',
    strMeasure1: '700 g',
    strIngredient2: 'Basmati Rice',
    strMeasure2: '2 cups',
    strIngredient3: 'Yogurt',
    strMeasure3: '3/4 cup',
    strIngredient4: 'Biryani Masala',
    strMeasure4: '2 tbsp'
  },
  {
    idMeal: 'bir-002',
    strMeal: 'Kolkata Biryani',
    strCategory: 'Biryani',
    strArea: 'Indian',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/xrttsx1487339558.jpg',
    strYoutube: 'https://www.youtube.com/results?search_query=Kolkata+Biryani',
    strInstructions:
      'Cook mutton with aromatic spices until tender. Layer rice with mutton gravy, boiled potatoes, and boiled eggs. Finish with rose water, kewra water, and ghee for a subtle floral aroma.',
    spiceSignature: ['Potato', 'Kewra', 'Rose Water'],
    strIngredient1: 'Mutton',
    strMeasure1: '600 g',
    strIngredient2: 'Basmati Rice',
    strMeasure2: '2 cups',
    strIngredient3: 'Potato',
    strMeasure3: '2 large',
    strIngredient4: 'Eggs',
    strMeasure4: '2 boiled'
  },
  {
    idMeal: 'bir-003',
    strMeal: 'Malabar Thalassery Biryani',
    strCategory: 'Biryani',
    strArea: 'Indian',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/xrttsx1487339558.jpg',
    strYoutube: 'https://www.youtube.com/results?search_query=Malabar+Thalassery+Biryani',
    strInstructions:
      'Prepare chicken masala with onions, tomatoes, and spices. Cook jeerakasala rice separately with whole spices. Layer masala and rice, garnish with nuts and raisins, and finish on dum.',
    spiceSignature: ['Jeerakasala Rice', 'Ghee', 'Raisins'],
    strIngredient1: 'Chicken',
    strMeasure1: '700 g',
    strIngredient2: 'Jeerakasala Rice',
    strMeasure2: '2 cups',
    strIngredient3: 'Raisins',
    strMeasure3: '2 tbsp',
    strIngredient4: 'Cashews',
    strMeasure4: '2 tbsp'
  },
  {
    idMeal: 'bir-004',
    strMeal: 'Sindhi Biryani',
    strCategory: 'Biryani',
    strArea: 'Pakistani',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/xrttsx1487339558.jpg',
    strYoutube: 'https://www.youtube.com/results?search_query=Sindhi+Biryani',
    strInstructions:
      'Cook spiced meat curry with potatoes and yogurt. Layer with parboiled basmati rice. Add mint, coriander, green chilies, and lemon slices, then cook on dum for bold heat and aroma.',
    spiceSignature: ['Green Chili', 'Lemon', 'Yogurt'],
    strIngredient1: 'Beef or Mutton',
    strMeasure1: '700 g',
    strIngredient2: 'Basmati Rice',
    strMeasure2: '2 cups',
    strIngredient3: 'Potatoes',
    strMeasure3: '2 medium',
    strIngredient4: 'Green Chilies',
    strMeasure4: '4 to 6'
  },
  {
    idMeal: 'bir-005',
    strMeal: 'Ambur Star Biryani',
    strCategory: 'Biryani',
    strArea: 'Indian',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/xrttsx1487339558.jpg',
    strYoutube: 'https://www.youtube.com/results?search_query=Ambur+Star+Biryani',
    strInstructions:
      'Slow-cook meat with onion, curd, and red chili paste. Mix with seeraga samba rice and cook until absorbed. Serve with brinjal dalcha and onion raita.',
    spiceSignature: ['Seeraga Samba', 'Red Chili Paste', 'Curd'],
    strIngredient1: 'Mutton',
    strMeasure1: '650 g',
    strIngredient2: 'Seeraga Samba Rice',
    strMeasure2: '2 cups',
    strIngredient3: 'Curd',
    strMeasure3: '1/2 cup',
    strIngredient4: 'Dry Red Chilies',
    strMeasure4: '8'
  },
  {
    idMeal: 'bir-006',
    strMeal: 'Dindigul Biryani',
    strCategory: 'Biryani',
    strArea: 'Indian',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/xrttsx1487339558.jpg',
    strYoutube: 'https://www.youtube.com/results?search_query=Dindigul+Biryani',
    strInstructions:
      'Cook meat with curd, ginger-garlic, and black pepper-forward masala. Add seeraga samba rice directly to the stock and cook until fluffy and tangy.',
    spiceSignature: ['Black Pepper', 'Seeraga Samba', 'Lemony Tang'],
    strIngredient1: 'Chicken or Mutton',
    strMeasure1: '700 g',
    strIngredient2: 'Seeraga Samba Rice',
    strMeasure2: '2 cups',
    strIngredient3: 'Black Pepper',
    strMeasure3: '1 tbsp',
    strIngredient4: 'Lemon Juice',
    strMeasure4: '2 tbsp'
  }
];

const BIRYANI_SHOWCASE = [
  {
    idMeal: '52805',
    strMeal: 'Lamb Biryani',
    strArea: 'Indian',
    spiceSignature: ['Saffron', 'Cardamom', 'Crisp Onions']
  },
  {
    idMeal: 'bir-001',
    strMeal: 'Hyderabadi Chicken Biryani',
    strArea: 'Indian',
    spiceSignature: ['Saffron', 'Mint', 'Fried Onions']
  },
  {
    idMeal: 'bir-002',
    strMeal: 'Kolkata Biryani',
    strArea: 'Indian',
    spiceSignature: ['Potato', 'Kewra', 'Rose Water']
  },
  {
    idMeal: 'bir-003',
    strMeal: 'Malabar Thalassery Biryani',
    strArea: 'Indian',
    spiceSignature: ['Jeerakasala Rice', 'Ghee', 'Raisins']
  },
  {
    idMeal: 'bir-004',
    strMeal: 'Sindhi Biryani',
    strArea: 'Pakistani',
    spiceSignature: ['Green Chili', 'Lemon', 'Yogurt']
  },
  {
    idMeal: 'bir-005',
    strMeal: 'Ambur Star Biryani',
    strArea: 'Indian',
    spiceSignature: ['Seeraga Samba', 'Red Chili Paste', 'Curd']
  },
  {
    idMeal: 'bir-006',
    strMeal: 'Dindigul Biryani',
    strArea: 'Indian',
    spiceSignature: ['Black Pepper', 'Seeraga Samba', 'Lemony Tang']
  }
];

const SRI_LANKAN_SPECIALS = [
  {
    idMeal: 'sri-001',
    strMeal: 'Sri Lankan Chicken Kottu',
    strCategory: 'Street Food',
    strArea: 'Sri Lankan',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/utqnjv1763598650.jpg',
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
    strMealThumb: 'https://www.themealdb.com/images/media/meals/9bl20p1763248192.jpg',
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
    strMealThumb: 'https://www.themealdb.com/images/media/meals/4er7mj1598733193.jpg',
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
  },
  {
    idMeal: 'sri-004',
    strMeal: 'Egg Hoppers',
    strCategory: 'Breakfast',
    strArea: 'Sri Lankan',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/0s80wo1764374393.jpg',
    strYoutube: 'https://www.youtube.com/results?search_query=Sri+Lankan+Egg+Hoppers',
    strInstructions:
      'Ferment hopper batter overnight. Pour into a small wok-shaped pan, crack an egg in the center, cover, and cook until edges are crisp and the center is set.',
    spiceSignature: ['Fermented Rice Batter', 'Coconut Milk', 'Black Pepper'],
    strIngredient1: 'Rice Flour',
    strMeasure1: '2 cups',
    strIngredient2: 'Coconut Milk',
    strMeasure2: '1.5 cups',
    strIngredient3: 'Eggs',
    strMeasure3: '4',
    strIngredient4: 'Yeast',
    strMeasure4: '1 tsp'
  },
  {
    idMeal: 'sri-005',
    strMeal: 'Parippu (Dhal Curry)',
    strCategory: 'Curry',
    strArea: 'Sri Lankan',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/wuxrtu1483564410.jpg',
    strYoutube: 'https://www.youtube.com/results?search_query=Sri+Lankan+Parippu+Dhal+Curry',
    strInstructions:
      'Simmer red lentils with turmeric and water until soft. Temper onion, garlic, chili, mustard seeds, and curry leaves, then combine with coconut milk for a creamy finish.',
    spiceSignature: ['Red Lentils', 'Curry Leaves', 'Mustard Seeds'],
    strIngredient1: 'Red Lentils',
    strMeasure1: '1 cup',
    strIngredient2: 'Coconut Milk',
    strMeasure2: '1 cup',
    strIngredient3: 'Onion',
    strMeasure3: '1 small',
    strIngredient4: 'Curry Leaves',
    strMeasure4: '1 sprig'
  },
  {
    idMeal: 'sri-006',
    strMeal: 'Devilled Chicken',
    strCategory: 'Stir Fry',
    strArea: 'Sri Lankan',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/4pqimk1683207418.jpg',
    strYoutube: 'https://www.youtube.com/results?search_query=Sri+Lankan+Devilled+Chicken',
    strInstructions:
      'Fry chicken pieces and toss with onion, bell pepper, tomato sauce, soy sauce, chili paste, and vinegar until sticky, spicy, and caramelized.',
    spiceSignature: ['Chili Paste', 'Soy Sauce', 'Vinegar'],
    strIngredient1: 'Chicken',
    strMeasure1: '600 g',
    strIngredient2: 'Bell Pepper',
    strMeasure2: '1 large',
    strIngredient3: 'Onion',
    strMeasure3: '1 medium',
    strIngredient4: 'Chili Paste',
    strMeasure4: '2 tbsp'
  },
  {
    idMeal: 'sri-007',
    strMeal: 'Kiribath (Milk Rice)',
    strCategory: 'Traditional',
    strArea: 'Sri Lankan',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/mlchx21564916997.jpg',
    strYoutube: 'https://www.youtube.com/results?search_query=Sri+Lankan+Kiribath',
    strInstructions:
      'Cook rice until very soft, then stir in thick coconut milk and salt. Press into a tray while hot, let it set, and cut into diamond shapes for serving.',
    spiceSignature: ['Coconut Milk', 'Short Grain Rice', 'Lunu Miris'],
    strIngredient1: 'White Rice',
    strMeasure1: '2 cups',
    strIngredient2: 'Thick Coconut Milk',
    strMeasure2: '1 cup',
    strIngredient3: 'Salt',
    strMeasure3: '1 tsp',
    strIngredient4: 'Lunu Miris',
    strMeasure4: 'To serve'
  },
  {
    idMeal: 'sri-008',
    strMeal: 'Sri Lankan Prawn Curry',
    strCategory: 'Seafood Curry',
    strArea: 'Sri Lankan',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
    strYoutube: 'https://www.youtube.com/results?search_query=Sri+Lankan+Prawn+Curry',
    strInstructions:
      'Saute onion, garlic, ginger, and curry leaves. Add prawns with roasted curry powder, chili, and coconut milk, then simmer gently until prawns are just cooked.',
    spiceSignature: ['Roasted Curry Powder', 'Coconut Milk', 'Curry Leaves'],
    strIngredient1: 'Prawns',
    strMeasure1: '500 g',
    strIngredient2: 'Coconut Milk',
    strMeasure2: '1.25 cups',
    strIngredient3: 'Roasted Curry Powder',
    strMeasure3: '1.5 tbsp',
    strIngredient4: 'Garlic',
    strMeasure4: '4 cloves'
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
      setRecipes([...biryaniMeals, ...CUSTOM_BIRYANI_TYPES]);
    } catch (error) {
      console.error('Error loading biryani recipes:', error);
      setRecipes(CUSTOM_BIRYANI_TYPES);
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
    const customBiryani = CUSTOM_BIRYANI_TYPES.find((recipe) => recipe.idMeal === mealId);
    if (customBiryani) {
      setSelectedRecipe(customBiryani);
      return;
    }

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