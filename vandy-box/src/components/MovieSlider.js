import React from "react";
import MovieInfoPopUp from "./MovieInfoPopUp";
import { useState } from "react";

const MovieSlider = ({ movies }) => {
  const [movieDescription, setMovieDescription] = useState("Test");
  const [movieRelease, setMovieRelease] = useState("Test");
  const [movieRating, setMovieRating] = useState("Test");
  const [moviePoster, setMoviePoster] = useState("Test");
  const [movieTitle, setMovieTitle] = useState("Test");
  const [movieID, setMovieID] = useState("Test");
  const [showingPopup, setShowingPopup] = useState(false);

  function handleOnClose() {
    setShowingPopup(false);
  }

  return (
    <>
      {showingPopup && (
        <MovieInfoPopUp
          description={movieDescription}
          title={movieTitle}
          release_date={movieRelease}
          vote_average={movieRating}
          image={moviePoster}
          id={movieID}
          handleOnClose={handleOnClose}></MovieInfoPopUp>
      )}
      <div className="flex space-x-5">
        {movies.map((movie) => (
          <div>
            <img
              className="cursor-pointer"
              src={movie.image}
              alt={movie.title}
              onClick={() => {
                setMovieDescription(movie.overview);
                setMovieRelease(movie.release_date);
                setMovieRating(movie.vote_average);
                setMoviePoster(movie.image);
                setMovieTitle(movie.title);
                setMovieID(movie.id);
                setShowingPopup(true);
              }}
            />
            <div className="text-center">{movie.title}</div>
          </div>
        ))}
      </div>
    </>
  );
};
export default MovieSlider;
