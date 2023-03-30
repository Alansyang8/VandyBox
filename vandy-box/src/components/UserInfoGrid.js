import React from "react";
import { Link } from "react-router-dom";
import MovieSlider from "./MovieSlider";
import { useState, useEffect } from "react";
import SingleMovieFrame from "./SingleMovieFrame";
import FriendList from "./FriendList";
const SEARCH_BY_ID_URL_FIRST_HALF = "https://api.themoviedb.org/3/movie/";
const SEARCH_BY_ID_URL_SECOND_HALF =
  "?api_key=75e05708188d5f5a0a191495cf4a48db&language=en-US";
const IMG_PATH = "https://image.tmdb.org/t/p/w500";

function UserInfoGrid({ userData, selectedUserInfo, userID, handleAddToFavorites, listOfFavorites, handleRemoveFromFavorites, toWatchList, handleAddToWatch, handleRemoveFromWatch, seenList, handleAddToSeen, handleRemoveFromSeen}) {
  const [favoriteMoviesObjects, setFavoriteMoviesObjects] = useState([]);
  const [toWatchMoviesObjects, setToWatchMoviesObjects] = useState([]);
  const [seenMoviesObjects, setSeenMoviesObjects] = useState([]);
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

  async function PopulateSeenMovies() {
    let movieObjectsArray = [];
    for (const movieID of userData.seen) {
      const movieObject = await get1MovieByID(
        SEARCH_BY_ID_URL_FIRST_HALF + movieID + SEARCH_BY_ID_URL_SECOND_HALF
      );
      movieObjectsArray.push(movieObject);
    }
    setSeenMoviesObjects(movieObjectsArray);
  }

  useEffect(() => {
    PopulateFavoriteMovies();
    PopulateToWatchMovies();
    PopulateSeenMovies();
  }, []);

  return (
    <div className="grid grid-cols-4 gap-2">
      
      {(selectedUserInfo == "Fav Movies" && favoriteMoviesObjects.length != 0) && favoriteMoviesObjects.map((movieObject) => (
          <div className="flex justify-center items-center h-80">
            <div className="h-full w-64 flex justify-center items-center border border-lime-400">
              <SingleMovieFrame movie={movieObject} userID={userID} handleAddToFavorites={handleAddToFavorites} listOfFavorites={listOfFavorites} handleRemoveFromFavorites={handleRemoveFromFavorites} handleAddToWatch={handleAddToWatch} handleRemoveFromWatch={handleRemoveFromWatch} toWatchList={toWatchList} handleAddToSeen={handleAddToSeen} handleRemoveFromSeen={handleRemoveFromSeen} seenList={seenList}/>
            </div>
          </div>
        ))}
      {(selectedUserInfo == "To Watch" && toWatchMoviesObjects.length != 0) && toWatchMoviesObjects.map((movieObject) => (
          <div className="flex justify-center items-center h-80">
            <div className="h-full w-64 flex justify-center items-center border border-yellow-500">
              <SingleMovieFrame movie={movieObject} userID={userID} handleAddToFavorites={handleAddToFavorites} listOfFavorites={listOfFavorites} handleRemoveFromFavorites={handleRemoveFromFavorites} handleAddToWatch={handleAddToWatch} handleRemoveFromWatch={handleRemoveFromWatch} toWatchList={toWatchList} handleAddToSeen={handleAddToSeen} handleRemoveFromSeen={handleRemoveFromSeen} seenList={seenList}/>
            </div>
          </div>
        ))}
      {selectedUserInfo == "Friends" &&
        userData.friends.map((person) => (
          <div key={person} className="flex justify-center items-center h-80">
            <div className="h-full w-64 flex justify-center items-center border border-yellow-500">
              <FriendList friend={person}></FriendList>
            </div>
          </div>
        ))}
      {(selectedUserInfo == "Seen" && seenMoviesObjects.length != 0) && seenMoviesObjects.map((movieObject) => (
          <div className="flex justify-center items-center h-80">
            <div className="h-full w-64 flex justify-center items-center border border-yellow-500">
              <SingleMovieFrame movie={movieObject} userID={userID} handleAddToFavorites={handleAddToFavorites} listOfFavorites={listOfFavorites} handleRemoveFromFavorites={handleRemoveFromFavorites} handleAddToWatch={handleAddToWatch} handleRemoveFromWatch={handleRemoveFromWatch} toWatchList={toWatchList} handleAddToSeen={handleAddToSeen} handleRemoveFromSeen={handleRemoveFromSeen} seenList={seenList}/>
            </div>
          </div>
        ))}
    </div>
  );
}

export default UserInfoGrid;
