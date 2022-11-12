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
      const res = await fetch("https://swapi.dev/api/films/");

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

  var content = <p>No movies available, Click Fetch to load movies</p>;

  if (movies.length > 0) content = <MoviesList movies={movies} />;
  if (error) content = <p>{error.message}</p>;
  if (isLoading) content = <p>.....is Loading</p>;

  return (
    <React.Fragment>
      <section>
        <button onClick={movieRequestHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
