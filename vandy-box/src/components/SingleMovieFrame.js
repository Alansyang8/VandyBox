import React from "react";
import MovieInfoPopUp from "./MovieInfoPopUp";
import { useState, useEffect } from "react";

const SingleMovieFrame = ({ movie }) => {
  const [movieDescription, setMovieDescription] = useState("Test");
  const [movieRelease, setMovieRelease] = useState("Test");
  const [movieRating, setMovieRating] = useState("Test");
  const [moviePoster, setMoviePoster] = useState("Test");
  const [movieTitle, setMovieTitle] = useState("Test");
  const [movieID, setMovieID] = useState("Test");
  const [showingPopup, setShowingPopup] = useState(false);
  function handleOnMouseLeave(){
    setShowingPopup(false)
  }


  return (
    <>
      {showingPopup && (
        <MovieInfoPopUp description={movieDescription} title={movieTitle} release_date={movieRelease} vote_average={movieRating} image={moviePoster} id={movieID} handleOnMouseLeave={handleOnMouseLeave}></MovieInfoPopUp>
      )}
      <div className="">
          <div className="flex flex-col items-center">
            <img
            className="cursor-pointer w-3/5"
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
      </div>
    </>
  );
};
export default SingleMovieFrame;
