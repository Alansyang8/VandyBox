import React from "react";
import MovieInfoPopUp from "./MovieInfoPopUp";
import { useState, useEffect } from "react";

const MovieSlider = ({ movies }) => {
  const [movieDescription, setMovieDescription] = useState("Test");
  const [movieRelease, setMovieRelease] = useState("Test");
  const [movieRating, setMovieRating] = useState("Test");
  const [showingPopup, setShowingPopup] = useState(false);

  return (
    <>
      {showingPopup && (
        <MovieInfoPopUp description={movieDescription} release_date={movieRelease} vote_average={movieRating}></MovieInfoPopUp>
      )}
      <div className="flex space-x-5">
        {movies.map((movie) => (
          <div>
            <img
            className="cursor-pointer"
              src={movie.image}
              alt={movie.title}
              onClick={() => {
                setMovieDescription(movie.overview)
                setMovieRelease(movie.release_date)
                setMovieRating(movie.vote_average)
                setShowingPopup(true)}}
              onMouseOut={() => setShowingPopup(false)}
            />
            <span>{movie.title}</span>
          </div>
        ))}
      </div>
    </>
  );
};
export default MovieSlider;
