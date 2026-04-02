# WTWR React App

This project is a small React weather-based clothing recommendation app.

## Features

- Fetches current weather on app mount using OpenWeather API.
- Displays the current weather in a `WeatherCard`.
- Filters and renders clothing `ItemCard`s based on current temperature type (`hot`, `warm`, `cold`).
- Includes reusable layout components: `Header`, `Main`, and `Footer`.
- Supports modal flows:
- `ModalWithForm` for adding a garment.
- `ItemModal` for previewing a selected clothing item.

## Tech Stack

- React
- Vite
- JavaScript (ES Modules)
- CSS

## Scripts

- `npm install` - install dependencies
- `npm run dev` - run development server
- `npm run build` - build for production
- `npm run preview` - preview production build

## Project Structure

- `src/components` - UI components
- `src/utils` - constants and weather API utilities
- `src/assets` - app images/icons
- `src/vendor` - normalize and font styles
