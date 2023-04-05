import React from "react";
import MovieInfoPopUp from "./MovieInfoPopUp";
import { useState, useEffect } from "react";

const MovieSliderGrid = ({ movies, userID, handleAddToFavorites, listOfFavorites, handleRemoveFromFavorites, handleAddToWatch, handleRemoveFromWatch, toWatchList, handleAddToLikes, handleAddToDislikes , seenList }) => {
  const [movieDescription, setMovieDescription] = useState("Test");
  const [movieRelease, setMovieRelease] = useState("Test");
  const [movieRating, setMovieRating] = useState("Test");
  const [moviePoster, setMoviePoster] = useState("Test");
  const [movieTitle, setMovieTitle] = useState("Test");
  const [movieID, setMovieID] = useState("Test");
  const [showingPopup, setShowingPopup] = useState(false);

  function handleOnClose(){
    setShowingPopup(false);
  }

  console.log("sildergrid render")


  return (
    <>
      {showingPopup && (
        <MovieInfoPopUp description={movieDescription} title={movieTitle} release_date={movieRelease} vote_average={movieRating} image={moviePoster} id={movieID} handleOnClose={handleOnClose} userID={userID} handleAddToFavorites={handleAddToFavorites} handleRemoveFromFavorites={handleRemoveFromFavorites} listOfFavorites={listOfFavorites} handleAddToWatch={handleAddToWatch} handleRemoveFromWatch={handleRemoveFromWatch} toWatchList={toWatchList} handleAddToLikes={handleAddToLikes} handleAddToDislikes={handleAddToDislikes}></MovieInfoPopUp>
      )}
      <div className="flex flex-wrap gap-5 w-full justify-center">
        {movies.map((movie) => (
          <div className="w-1/12">
            <img
            className="cursor-pointer"
              src={movie.image}
              alt={movie.title}
              onClick={() => {
                setMovieDescription(movie.overview)
                setMovieRelease(movie.release_date)
                setMovieRating(movie.vote_average)
                setMoviePoster(movie.image)
                setMovieTitle(movie.title)
                setMovieID(movie.id)
                setShowingPopup(true)}}
            />
            <div className="text-center">{movie.title}</div>
          </div>
        ))}
      </div>
    </>
  );
};
export default MovieSliderGrid;
