import React from 'react'

const MovieSlider = ({movies}) => {
  return (
    <div className="flex text-center justify-between gap-5">
        {movies.map((movie) => (
            <div className=''>
                <img src={movie.image} alt={movie.title} />
                <span className=''>{movie.title}</span>
            </div>
        ))}
    </div>
  )
}

export default MovieSlider