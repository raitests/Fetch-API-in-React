import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);

  const movieRequestHandler = () => {
    fetch("https://swapi.dev/api/films/").then((res) =>
      res.json().then((response) => setMovies(response.results))
    );
  };

  const prettyMovies = movies.map((movie) => {
    return {
      id: movie.episode_id,
      title: movie.title,
      releaseDate: movie.release_date,
      openingText: movie.opening_crawl,
    };
  });

  return (
    <React.Fragment>
      <section>
        <button onClick={movieRequestHandler}>Fetch Movies</button>
      </section>
      <section>
        <MoviesList movies={prettyMovies} />
      </section>
    </React.Fragment>
  );
}

export default App;
