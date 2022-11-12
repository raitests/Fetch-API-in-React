import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const movieRequestHandler = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("https://swapi.dev/api/film/");

      if (!res.ok) {
        throw new Error("Something went wrong");
      }

      const data = await res.json();

      const prettyMovies = data.results.map((movie) => {
        return {
          id: movie.episode_id,
          title: movie.title,
          releaseDate: movie.release_date,
          openingText: movie.opening_crawl,
        };
      });
      setMovies(prettyMovies);
    } catch (error) {
      setError(error);
    }
    setIsLoading(false);
  };

  return (
    <React.Fragment>
      <section>
        <button onClick={movieRequestHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && error && <p>{error}</p>}
        {!isLoading && movies.length !== 0 && !error && (
          <MoviesList movies={movies} />
        )}
        {!isLoading && movies.length === 0 && (
          <p>No movies available, Click Fetch to load movies</p>
        )}
        {isLoading && !error && <p> Is Loading.....</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
