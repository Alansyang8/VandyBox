import React from 'react'
import Container from '../components/Container';
import sampleMovieImage from "../assets/sample-movie-poster.jpeg";
import MovieSlider from './MovieSlider';
import {useState, useEffect} from 'react'
const TRENDING_API_URL = 'http://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=75e05708188d5f5a0a191495cf4a48db&page=1'
const REVENUE_API_URL = 'http://api.themoviedb.org/3/discover/movie?sort_by=revenue.desc&api_key=75e05708188d5f5a0a191495cf4a48db&page=1'
const RATINGS_API_URL = 'http://api.themoviedb.org/3/discover/movie?sort_by=vote_average.desc&vote_count.gte=3000&api_key=75e05708188d5f5a0a191495cf4a48db&page=1'
const IMG_PATH = 'https://image.tmdb.org/t/p/w500'



async function get10Movies(url) {
  const res = await fetch(url)
  const data = await res.json()
  let firstTenTrending = getFirstTen(data.results)
  return addMoviesToArray(firstTenTrending)
}

function getFirstTen(array) {
  return array.slice(0,10)
}

function addMoviesToArray(movies){
  let array = []
  movies.forEach(movie => {
    const {title, poster_path} = movie
    array.push({
      title: title,
      image: `${IMG_PATH}${poster_path}`
    })

    
  });
  return array
}



const trendingMovies = [
  {
    title: "Movie 1",
    image: sampleMovieImage
  },
  {
    title: "Movie 2",
    image: sampleMovieImage
  },
  {
    title: "Movie 3",
    image: sampleMovieImage
  }
];

const trendingMoviesVanderbilt = [
    {
      title: "Movie 1",
      image: sampleMovieImage
    },
    {
      title: "Movie 2",
      image: sampleMovieImage
    },
    {
      title: "Movie 3",
      image: sampleMovieImage
    },
    {
      title: "Movie 4",
      image: sampleMovieImage
    },
    {
        title: "Movie 5",
        image: sampleMovieImage
    }
  ];

function Body() {
  const [trendingMovieAPI, setTrendingMovieAPI] = useState()
  const [revenueMovieAPI, setRevenueMovieAPI] = useState()
  const [ratingMovieAPI, setRatingMovieAPI] = useState()
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
    apiCall()
    apiCall2();
    apiCall3();
  }, []);
  return (
    <div className="space-y-4">
        <Container containerTitle="Trending this week">
          {trendingMovieAPI && <MovieSlider movies={trendingMovieAPI}></MovieSlider>}
        </Container>
        <Container containerTitle="Trending at Vanderbilt">
        {revenueMovieAPI && <MovieSlider movies={revenueMovieAPI}></MovieSlider>}
        </Container>
        <Container containerTitle="Favorites">
        {ratingMovieAPI && <MovieSlider movies={ratingMovieAPI}></MovieSlider>}
        </Container>
    </div>
  )
}

export default Body;