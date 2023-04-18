import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../firebase';

const IMG_PATH = "https://image.tmdb.org/t/p/w500";

const SEARCH_BY_ID_URL_FIRST_HALF = "https://api.themoviedb.org/3/movie/";
const SEARCH_BY_ID_URL_SECOND_HALF =
  "?api_key=75e05708188d5f5a0a191495cf4a48db&language=en-US";

const TopThreeEditPopUp = ({ closePopUp, editIndex, userData }) => {

    const [currentMovieId, setCurrentMovieId] = useState("");
    const [favoriteMovieObject, setFavoriteMovieObject] = useState([]);
    const [loading, setLoading] = useState(false);

    const formatObject = (movie) => {
        const { title, poster_path, overview, release_date, vote_average, id } = movie;
        return {
          title: title,
          image: `${IMG_PATH}${poster_path}`,
          overview: overview,
          release_date: release_date,
          vote_average: vote_average,
          id: id,
        };
      }

    async function fetchMovieById(url) {
        const res = await fetch(url);
        const data = await res.json();
        return formatObject(data);
    }

    const fetchFavoriteMovieObjects = async () => {
        let movieObjectsArray = [];
        for (const movieID of userData.favorites) {
            const movieObject = await fetchMovieById(SEARCH_BY_ID_URL_FIRST_HALF + movieID + SEARCH_BY_ID_URL_SECOND_HALF);
            movieObjectsArray.push(movieObject);
        }
        setFavoriteMovieObject(movieObjectsArray);
    }
    
    const handleSelectMovie = (id) => {
        setCurrentMovieId(id);
    }

    const handleSubmit = async () => {
        setLoading(true);
        const userDoc = doc(db, "users", userData.handle);
        let currentUserTopThree = userData.topThreeMovies;
        if (editIndex > currentUserTopThree.length + 1) {
            await updateDoc(userDoc, {
                topThreeMovies: arrayUnion(currentMovieId)
            });
        } else {
            if (editIndex == 0) {
                if (currentUserTopThree.length < 1) {
                    currentUserTopThree.push(currentMovieId);
                } else {
                    currentUserTopThree[0] = currentMovieId;
                }
            } else if (editIndex == 1) {
                if (currentUserTopThree.length < 2) {
                    currentUserTopThree.push(currentMovieId);
                } else {
                    currentUserTopThree[1] = currentMovieId;
                }
            } else {
                if (currentUserTopThree.length < 3) {
                    currentUserTopThree.push(currentMovieId);
                } else {
                    currentUserTopThree[2] = currentMovieId;
                }
            }
            await updateDoc(userDoc, { topThreeMovies: currentUserTopThree });
        }
        setLoading(false);
        closePopUp();
        setTimeout(() => {
            window.location.reload(true);
          }, 200);
    }

    useEffect(() => {
        fetchFavoriteMovieObjects();
    }, []);

  return (
    <>
    <div onClick={closePopUp} className="fixed top-0 left-0 right-0 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-full max-h-full bg-black opacity-50 z-0"></div>
    <div className="absolute top-0 left-0 flex items-center justify-center h-screen w-screen">
    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 opacity-100 max-w-5xl z-10">
            <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Choose your Top {editIndex + 1} movie</h3>
                <button onClick={closePopUp} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="defaultModal">
                    <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    <span className="sr-only">Close modal</span>
                </button>
            </div>
            <div className="grid grid-cols-6 gap-6 w-full p-4">
                {favoriteMovieObject.map((movie) => (
                    <div className={`w-36 transition duration-150 transform hover:scale-105 cursor-pointer ${(currentMovieId == movie.id) && "border-2 border-yellow-500"}`} onClick={() => { handleSelectMovie(movie.id); }}>
                    <img
            className="cursor-pointer"
            src={movie.image}
            alt={movie.title}
          />
          <div className={`text-center dark:text-white ${(currentMovieId == movie.id) && "font-semibold"}`}>{movie.title}</div>
                </div>
                ))}
            </div>
            <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                <button onClick={handleSubmit} data-modal-hide="defaultModal" type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    {!loading ? (
                        <span className='font-medium text-sm text-center text-white'>Add to Top {editIndex + 1}</span>
                    ) : (
                        <span className='font-medium text-sm text-center text-white'>Adding...</span>
                    )}
                    
                </button>
                <button onClick={closePopUp} data-modal-hide="defaultModal" type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Cancel</button>
            </div>
    </div>
    </div>
    </>
  )
}

export default TopThreeEditPopUp;