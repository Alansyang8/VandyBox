import React from "react";
import Container from "../components/Container";
import sampleMovieImage from "../assets/sample-movie-poster.jpeg";
import Header from "../components/Header";
import MovieSlider from "./MovieSlider";
import { useState, useEffect } from "react";
import { fetchCurrentUserData } from "../auth/auth";
const TRENDING_API_URL =
  "http://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=75e05708188d5f5a0a191495cf4a48db&page=1";
const REVENUE_API_URL =
  "http://api.themoviedb.org/3/discover/movie?sort_by=revenue.desc&api_key=75e05708188d5f5a0a191495cf4a48db&page=1";
const RATINGS_API_URL =
  "http://api.themoviedb.org/3/discover/movie?sort_by=vote_average.desc&vote_count.gte=3000&api_key=75e05708188d5f5a0a191495cf4a48db&page=1";
const IMG_PATH = "https://image.tmdb.org/t/p/w780";
const SEARCH_API_URL =
  'https://api.themoviedb.org/3/search/movie?api_key=75e05708188d5f5a0a191495cf4a48db&language=en-US&page=1&include_adult=false&query="';

async function get10Movies(url) {
  const res = await fetch(url);
  const data = await res.json();
  let firstTenTrending = getFirstTen(data.results);
  return addMoviesToArray(firstTenTrending);
}

function getFirstTen(array) {
  return array.slice(0, 10);
}

function addMoviesToArray(movies) {
  let array = [];
  movies.forEach((movie) => {
    const { title, poster_path, overview, release_date, vote_average, id } = movie;
      array.push({
        title: title,
        image: `${IMG_PATH}${poster_path}`,
        overview: overview,
        release_date: release_date,
        vote_average: vote_average,
        id: id
      });
  });
  return array;
}

const trendingMovies = [
  {
    title: "Movie 1",
    image: sampleMovieImage,
  },
  {
    title: "Movie 2",
    image: sampleMovieImage,
  },
  {
    title: "Movie 3",
    image: sampleMovieImage,
  },
];

const trendingMoviesVanderbilt = [
  {
    title: "Movie 1",
    image: sampleMovieImage,
  },
  {
    title: "Movie 2",
    image: sampleMovieImage,
  },
  {
    title: "Movie 3",
    image: sampleMovieImage,
  },
  {
    title: "Movie 4",
    image: sampleMovieImage,
  },
  {
    title: "Movie 5",
    image: sampleMovieImage,
  },
];

// const favoriteMovies = [
//   {
//     title: "Movie 1",
//     image: sampleMovieImage
//   },
//   {
//     title: "Movie 2",
//     image: sampleMovieImage
//   }
// ];

function Body({handleAddToFavorites, handleRemoveFromFavorites, handleAddToWatch, handleRemoveFromWatch, handleAddToSeen, handleRemoveFromSeen }) {
  const [trendingMovieAPI, setTrendingMovieAPI] = useState();
  const [revenueMovieAPI, setRevenueMovieAPI] = useState();
  const [ratingMovieAPI, setRatingMovieAPI] = useState();
  const [showingPopup, setShowingPopup] = useState(false);

  function handleOnClick() {
    if(showingPopup==true)
      setShowingPopup(false);
  }
  const [userData, setUserData] = useState();

  const getUserData = async () => {
    const userData = await fetchCurrentUserData();
    setUserData(userData)
  }

  useEffect(() => {
    getUserData()
  }, [])



  useEffect(() => {
    async function apiCall() {
      const apiResponse = await get10Movies(TRENDING_API_URL);
      setTrendingMovieAPI(apiResponse);
    }
    async function apiCall2() {
      const apiResponse3 = await get10Movies(REVENUE_API_URL);
      setRevenueMovieAPI(apiResponse3);
    }
    async function apiCall3() {
      const apiResponse3 = await get10Movies(RATINGS_API_URL);
      setRatingMovieAPI(apiResponse3);
    }

    getUserData()

    apiCall();
    apiCall2();
    apiCall3();
  }, []);
  return (
    <div className="space-y-4 pb-20" onClick={handleOnClick}>
      <Header userId={userId} />
      <Container containerTitle="Trending this week">
        {trendingMovieAPI && userData && (
          <MovieSlider movies={trendingMovieAPI} listOfFavorites={userData.favorites} handleAddToFavorites={handleAddToFavorites} handleRemoveFromFavorites={handleRemoveFromFavorites} userID = {userData.handle} handleAddToWatch={handleAddToWatch} handleRemoveFromWatch={handleRemoveFromWatch} toWatchList={userData.toWatch} handleAddToSeen={handleAddToSeen} handleRemoveFromSeen={handleRemoveFromSeen} seenList={userData.seen} setShowingPopup={setShowingPopup} showingPopup={showingPopup}></MovieSlider>
        )}
      </Container>
      <Container containerTitle="Trending at Vanderbilt">
        {revenueMovieAPI && userData && (
          <MovieSlider movies={revenueMovieAPI} listOfFavorites={userData.favorites} handleAddToFavorites={handleAddToFavorites} handleRemoveFromFavorites={handleRemoveFromFavorites} userID = {userData.handle} handleAddToWatch={handleAddToWatch} handleRemoveFromWatch={handleRemoveFromWatch} toWatchList={userData.toWatch} handleAddToSeen={handleAddToSeen} handleRemoveFromSeen={handleRemoveFromSeen} seenList={userData.seen} setShowingPopup={setShowingPopup} showingPopup={showingPopup}></MovieSlider>
        )}
      </Container>
      <Container containerTitle="Favorites">
        {ratingMovieAPI && userData && <MovieSlider movies={ratingMovieAPI} listOfFavorites={userData.favorites} handleAddToFavorites={handleAddToFavorites} handleRemoveFromFavorites={handleRemoveFromFavorites} userID = {userData.handle} handleAddToWatch={handleAddToWatch} handleRemoveFromWatch={handleRemoveFromWatch} toWatchList={userData.toWatch} handleAddToSeen={handleAddToSeen} handleRemoveFromSeen={handleRemoveFromSeen} seenList={userData.seen} setShowingPopup={setShowingPopup} showingPopup={showingPopup}></MovieSlider>}
      </Container>

      {/* <Container containerTitle={"Search"}>
        {searchMovieAPI && searchMovieAPI.length > 0 ? (
          <MovieSlider movies={searchMovieAPI}></MovieSlider>
        ) : (
          "No Results"
        )}
      </Container> */}
    </div>
  );
}

export default Body;
