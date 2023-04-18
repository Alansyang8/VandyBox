import React from "react";
import Container from "../components/Container";
import Header from "../components/Header";
import MovieSlider from "./MovieSlider";
import { useState, useEffect } from "react";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../firebase";
const TRENDING_API_URL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=75e05708188d5f5a0a191495cf4a48db&page=1";

const IMG_PATH = "https://image.tmdb.org/t/p/w780";

const SEARCH_BY_ID_URL_FIRST_HALF = "https://api.themoviedb.org/3/movie/";
const SEARCH_BY_ID_URL_SECOND_HALF =
  "?api_key=75e05708188d5f5a0a191495cf4a48db&language=en-US";

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
    const { title, poster_path, overview, release_date, vote_average, id } =
      movie;
    array.push({
      title: title,
      image: `${IMG_PATH}${poster_path}`,
      overview: overview,
      release_date: release_date,
      vote_average: vote_average,
      id: id,
    });
  });
  return array;
}

async function get1MovieByID(url) {
  const res = await fetch(url);
  const data = await res.json();
  return Simplify(data);
}

function Simplify(movie) {
  const { title, poster_path, overview, release_date, vote_average, id } =
    movie;

  return {
    title: title,
    image: `${IMG_PATH}${poster_path}`,
    overview: overview,
    release_date: release_date,
    vote_average: vote_average,
    id: id,
  };
}

function Body() {
  const [trendingMovieAPI, setTrendingMovieAPI] = useState();
  const [mostLikedMovies, setMostLikedMovies] = useState();
  const [mostToWatchMovies, setMostToWatchMovies] = useState();

  async function getTrendingMovies() {
    const apiResponse = await get10Movies(TRENDING_API_URL);
    setTrendingMovieAPI(apiResponse);
  }
  //compiles list of all users' Liked Lists as dictionaries and displays the top 10
  const get10MostLikedMovies = async () => {
    let LikedMoviesDict = {};
    const usersCollection = query(collection(db, "users"));
    const querySnapshot = await getDocs(usersCollection);
    querySnapshot.forEach((doc) => {
      for (const movieid of doc.data().Likes) {
        if (movieid !== "") {
          if (Object.hasOwn(LikedMoviesDict, `${movieid}`)) {
            LikedMoviesDict[`${movieid}`] = LikedMoviesDict[`${movieid}`] + 1;
          } else {
            LikedMoviesDict[`${movieid}`] = 1;
          }
        }
      }
    });

    let LikedMoviesSorted = [];
    let mostLikedNum = 1;
    for (const [key, value] of Object.entries(LikedMoviesDict)) {
      if (value > mostLikedNum) {
        mostLikedNum = value;
      }
    }

    let COUNTER_TO_TEN = 0;
    for (let i = mostLikedNum; i >= 1; i--) {
      for (const [key, value] of Object.entries(LikedMoviesDict)) {
        if (value == i) {
          LikedMoviesSorted.push(key);
          COUNTER_TO_TEN++;
          if (COUNTER_TO_TEN >= 10) {
            break;
          }
        }
      }
    }

    let LikedMoviesSortedObjects = [];

    for (const movieid of LikedMoviesSorted) {
      LikedMoviesSortedObjects.push(
        await get1MovieByID(
          SEARCH_BY_ID_URL_FIRST_HALF + movieid + SEARCH_BY_ID_URL_SECOND_HALF
        )
      );
    }

    setMostLikedMovies(LikedMoviesSortedObjects);
  };
  //compiles list of all users' To Watch Lists as dictionaries and displays the top 10
  const get10MostToWatchMovies = async () => {
    let ToWatchMoviesDict = {};
    const usersCollection = query(collection(db, "users"));
    const querySnapshot = await getDocs(usersCollection);
    querySnapshot.forEach((doc) => {
      for (const movieid of doc.data().toWatch) {
        if (movieid !== "") {
          if (Object.hasOwn(ToWatchMoviesDict, `${movieid}`)) {
            ToWatchMoviesDict[`${movieid}`] =
              ToWatchMoviesDict[`${movieid}`] + 1;
          } else {
            ToWatchMoviesDict[`${movieid}`] = 1;
          }
        }
      }
    });

    let ToWatchMoviesSorted = [];
    let mostLikedNum = 1;
    for (const [key, value] of Object.entries(ToWatchMoviesDict)) {
      if (value > mostLikedNum) {
        mostLikedNum = value;
      }
    }

    let COUNTER_TO_TEN = 0;
    for (let i = mostLikedNum; i >= 1; i--) {
      for (const [key, value] of Object.entries(ToWatchMoviesDict)) {
        if (value == i) {
          ToWatchMoviesSorted.push(key);
          COUNTER_TO_TEN++;
          if (COUNTER_TO_TEN >= 10) {
            break;
          }
        }
      }
    }

    let ToWatchMoviesSortedObjects = [];

    for (const movieid of ToWatchMoviesSorted) {
      ToWatchMoviesSortedObjects.push(
        await get1MovieByID(
          SEARCH_BY_ID_URL_FIRST_HALF + movieid + SEARCH_BY_ID_URL_SECOND_HALF
        )
      );
    }

    setMostToWatchMovies(ToWatchMoviesSortedObjects);
  };

  useEffect(() => {
    getTrendingMovies();
    get10MostLikedMovies();
    get10MostToWatchMovies();
  }, []);
  return (
    <div className="space-y-4 pb-20">
      <Header />
      <Container containerTitle="Trending This Week">
        {trendingMovieAPI && (
          <MovieSlider movies={trendingMovieAPI}></MovieSlider>
        )}
      </Container>
      <Container containerTitle="Vandy's Highest Rated">
        {mostLikedMovies && (
          <MovieSlider movies={mostLikedMovies}></MovieSlider>
        )}
      </Container>
      <Container containerTitle="Vandy's Watch List">
        {mostToWatchMovies && (
          <MovieSlider movies={mostToWatchMovies}></MovieSlider>
        )}
      </Container>
    </div>
  );
}

export default Body;