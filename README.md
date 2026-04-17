# ReciPick

ReciPick is a recipe discovery web app built with React and Vite. It helps users search meals, filter by categories, open full recipe details, and save favorite recipes in the browser.

## Live App Experience

ReciPick is designed for quick recipe browsing:

- Fast keyword search
- Category-based filtering
- Detailed recipe view with ingredients and instructions
- Favorite recipes saved with localStorage
- Clean responsive layout for desktop and mobile

## Screenshot Demos

Add your screenshots to the `screenshots` folder with the filenames below and they will render automatically in this section.

### Home View

![Home View](./screenshots/home-view.png)

### Search Results

![Search Results](./screenshots/search-results.png)

### Recipe Details

![Recipe Details](./screenshots/recipe-details.png)

### Favorites

![Favorites](./screenshots/favorites.png)

## Tech Stack

- React
- Vite
- Axios
- React Icons
- CSS

## Project Structure

```text
ReciPick/
  components/
    Favorite.jsx
    Filter.jsx
    Header.jsx
    RecipeCard.jsx
    RecipeDetail.jsx
    Searchbar.jsx
  Src/
    App.css
    App.jsx
    main.jsx
  screenshots/
  index.html
  package.json
  vite.config.js
```

## Getting Started

### 1) Install dependencies

```bash
npm install
```

### 2) Start development server

```bash
npm run dev
```

Open the local URL shown in the terminal, usually http://localhost:5173.

### 3) Build production bundle

```bash
npm run build
```

### 4) Preview production build

```bash
npm run preview
```

## API

This project uses TheMealDB API:

- Documentation: https://www.themealdb.com/api.php
- Base URL: https://www.themealdb.com/api/json/v1/1/
- API key: Not required for the endpoints used in this app

## Notes

- Favorites are stored in localStorage under the key favorites.
- Folder name is currently `Src` (capital S). Keep import paths consistent with this naming.

## License

This project is for learning and personal use.
