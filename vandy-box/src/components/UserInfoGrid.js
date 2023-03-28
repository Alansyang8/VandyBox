import React from "react";
import MovieSlider from "./MovieSlider";
import { useState, useEffect } from "react";
import SingleMovieFrame from "./SingleMovieFrame";
const SEARCH_BY_ID_URL_FIRST_HALF = "https://api.themoviedb.org/3/movie/";
const SEARCH_BY_ID_URL_SECOND_HALF =
  "?api_key=75e05708188d5f5a0a191495cf4a48db&language=en-US";
const IMG_PATH = "https://image.tmdb.org/t/p/w500";

function UserInfoGrid({ userData, selectedUserInfo, userID, handleAddToFavorites, listOfFavorites, handleRemoveFromFavorites, toWatchList, handleAddToWatch, handleRemoveFromWatch}) {
  const [favoriteMoviesObjects, setFavoriteMoviesObjects] = useState([]);
  const [toWatchMoviesObjects, setToWatchMoviesObjects] = useState([]);
  async function get1MovieByID(url) {
    const res = await fetch(url);
    const data = await res.json();
    return Simplify(data);
  }

  function Simplify(movie) {
    const { title, poster_path, overview, release_date, vote_average, id } = movie;

    return {
      title: title,
      image: `${IMG_PATH}${poster_path}`,
      overview: overview,
      release_date: release_date,
      vote_average: vote_average,
      id: id
    };
  }

  async function PopulateFavoriteMovies() {
    let movieObjectsArray = [];
    for (const movieID of userData.favorites) {
      const movieObject = await get1MovieByID(
        SEARCH_BY_ID_URL_FIRST_HALF + movieID + SEARCH_BY_ID_URL_SECOND_HALF
      );
      movieObjectsArray.push(movieObject);
    }
    setFavoriteMoviesObjects(movieObjectsArray);
  }

  async function PopulateToWatchMovies() {
    let movieObjectsArray = [];
    for (const movieID of userData.toWatch) {
      const movieObject = await get1MovieByID(
        SEARCH_BY_ID_URL_FIRST_HALF + movieID + SEARCH_BY_ID_URL_SECOND_HALF
      );
      movieObjectsArray.push(movieObject);
    }
    setToWatchMoviesObjects(movieObjectsArray);
  }

  useEffect(() => {
    PopulateFavoriteMovies();
    PopulateToWatchMovies();
  }, []);

  return (
    <div className="grid grid-cols-4 gap-2">
      {(selectedUserInfo == "Fav Movies" && favoriteMoviesObjects.length != 0) && favoriteMoviesObjects.map((movieObject) => (
          <div className="flex justify-center items-center h-80">
            <div className="h-full w-64 flex justify-center items-center border border-yellow-500">
              <SingleMovieFrame movie={movieObject} userID={userID} handleAddToFavorites={handleAddToFavorites} listOfFavorites={listOfFavorites} handleRemoveFromFavorites={handleRemoveFromFavorites} handleAddToWatch={handleAddToWatch} handleRemoveFromWatch={handleRemoveFromWatch} toWatchList={toWatchList}/>
            </div>
          </div>
        ))}
      {(selectedUserInfo == "To Watch" && toWatchMoviesObjects.length != 0) && toWatchMoviesObjects.map((movieObject) => (
          <div className="flex justify-center items-center h-80">
            <div className="h-full w-64 flex justify-center items-center border border-yellow-500">
              <SingleMovieFrame movie={movieObject} userID={userID} handleAddToFavorites={handleAddToFavorites} listOfFavorites={listOfFavorites} handleRemoveFromFavorites={handleRemoveFromFavorites} handleAddToWatch={handleAddToWatch} handleRemoveFromWatch={handleRemoveFromWatch} toWatchList={toWatchList}/>
            </div>
          </div>
        ))}
      {selectedUserInfo == "Friends" &&
        userData.friends.map((friend) => (
          <div className="flex justify-center items-center h-80">
            <span className="h-full w-64 flex justify-center items-center border border-yellow-500">
              <span className="text-lg font-bold italic">{friend}</span>
            </span>
          </div>
        ))}
      {selectedUserInfo == "Watch Groups" &&
        userData.watchGroups.map((group) => (
          <div className="flex justify-center items-center h-80">
            <span className="h-full w-64 flex justify-center items-center border border-yellow-500">
              <span className="text-lg font-bold italic">{group}</span>
            </span>
          </div>
        ))}
    </div>
  );
}

export default UserInfoGrid;
