# Glutenfilm

Glutenfilm is a web application that allows users to search for movies using the OMDB API and add their favorite movies to a watchlist. The application is built using HTML, CSS, JavaScript, and Node.js with Express for the backend. It also uses MongoDB to store the watchlist data. I made this just for fun so that me and my friends can decide on what to watch on movie nigths.

## Features

- Search for movies using the OMDB API
- Display movie details including poster, title, year, rating, and plot
- Add movies to a personal watchlist
- View the watchlist

## Installation

1. Clone the repository:
   git clone https://github.com/thonems/movie-night-site.git
2. Make sure you have .env variables "collection_name", "connection_string (Mongodb connection string)" and "OMDB_API_KEY".
3. run npm install
4. start the app with npm run dev

## Usage

Search for movies in the omdb database
Add said movies to a watchlist
Delete already watched movies
