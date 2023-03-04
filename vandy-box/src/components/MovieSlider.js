import React from 'react'

const MovieSlider = ({movies}) => {
  return (
    <div className="flex space-x-5">
        {movies.map((movie) => (
            <div>
                <img src={movie.image} alt={movie.title} width="144" height="192" />
                <span>{movie.title}</span>
            </div>
        ))}
    </div>
  )
}
export default MovieSlider