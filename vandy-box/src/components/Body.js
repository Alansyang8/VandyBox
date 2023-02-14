import React from 'react'
import Container from '../components/Container';
import sampleMovieImage from "../assets/sample-movie-poster.jpeg";
import MovieSlider from './MovieSlider';

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

  const favoriteMovies = [
    {
      title: "Movie 1",
      image: sampleMovieImage
    },
    {
      title: "Movie 2",
      image: sampleMovieImage
    }
  ];

function Body() {
  return (
    <div className="space-y-4">
        <Container containerTitle="Trending this week">
            <MovieSlider movies={trendingMovies}></MovieSlider>
        </Container>
        <Container containerTitle="Trending at Vanderbilt">
            <MovieSlider movies={trendingMoviesVanderbilt}></MovieSlider>
        </Container>
        <Container containerTitle="Favorites">
            <MovieSlider movies={favoriteMovies}></MovieSlider>
        </Container>
    </div>
  )
}

export default Body;