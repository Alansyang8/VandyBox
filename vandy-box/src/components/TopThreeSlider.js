import React, { useState } from 'react';
import MovieInfoPopUp from './MovieInfoPopUp';

const TopThreeSlider = ({ movies }) => {
    const [movieDescription, setMovieDescription] = useState("Test");
    const [movieRelease, setMovieRelease] = useState("Test");
    const [movieRating, setMovieRating] = useState("Test");
    const [moviePoster, setMoviePoster] = useState("Test");
    const [movieTitle, setMovieTitle] = useState("Test");
    const [movieID, setMovieID] = useState("Test");
    const [showingPopup, setShowingPopup] = useState(false);
  
    const handleOnClose = () => {
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
          {movies.map((movie, index) => (
            <div className="transition duration-150 transform hover:scale-105 z-0">
                <div className="flex justify-center items-center mb-1">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-yellow-400">
  <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clipRule="evenodd" />
</svg>
                </div>
                {movie ? (
                    <>
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
              <div className="text-center font-semibold">{movie.title}</div>
                    </>
                ) : (
                    <div className="bg-white w-44 h-60 flex justify-center items-center font-semibold text-4xl text-gray-600">{index + 1}</div>
                )}
            </div>
          ))}
        </div>
      </>
    )
}

export default TopThreeSlider;