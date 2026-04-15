# ReciPick

ReciPick is a React + Vite recipe discovery app where you can search meals, filter by category, open full recipe details, and save favorites locally.

## Features

- Search recipes by keyword
- Filter recipes by category (Beef, Chicken, Dessert, etc.)
- View recipe details with ingredients and instructions
- Save and remove favorites
- Favorites persist using browser localStorage
- Responsive UI for desktop and mobile

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
  index.html
  package.json
  vite.config.js
```

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Run development server

```bash
npm run dev
```

Open the local URL shown in terminal (usually `http://localhost:5173/`).

### 3. Build for production

```bash
npm run build
```

### 4. Preview production build

```bash
npm run preview
```

## API Source

This app uses [TheMealDB](https://www.themealdb.com/api.php):

- Base URL: `https://www.themealdb.com/api/json/v1/1/`
- No API key required for current endpoints used in this app.

## Notes

- Favorites are stored in the browser (`localStorage`) under the key `favorites`.
- If you rename `Src` to `src`, update imports only if needed and keep path consistency.

## License

This project is for learning and personal use.
