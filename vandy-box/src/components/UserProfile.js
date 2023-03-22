import SuzyBaePic from "../assets/SuzyBaePic.png";
import UserInfoGrid from "./UserInfoGrid";
import { useState, useEffect } from "react";
import MovieSlider from "./MovieSlider";
import { auth, db } from "../firebase";
import {
  modifyAddInfo,
  modifyName,
  modifyStatusMsg,
} from "../api/firebaseWriter";
import { doc, getDoc } from "firebase/firestore";
import Recommendations from "./Recommendations";


const IMG_PATH = "https://image.tmdb.org/t/p/w500";
const SEARCH_API_URL =
  'https://api.themoviedb.org/3/search/movie?api_key=75e05708188d5f5a0a191495cf4a48db&language=en-US&page=1&include_adult=false&query="';

const SEARCH_BY_ID_URL_FIRST_HALF = "https://api.themoviedb.org/3/movie/";
const SEARCH_BY_ID_URL_SECOND_HALF =
  "?api_key=75e05708188d5f5a0a191495cf4a48db&language=en-US";
let tangled =
  "https://api.themoviedb.org/3/movie/38757/similar?api_key=75e05708188d5f5a0a191495cf4a48db&language=en-US&page=1";

let GET_SIMILAR_MOVIES_URL_FIRST_THIRD = "https://api.themoviedb.org/3/movie/";
let GET_SIMILAR_MOVIES_URL_SECOND_THIRD =
  "/similar?api_key=75e05708188d5f5a0a191495cf4a48db&language=en-US&page=";

let GET_RECOMMENDED_MOVIES_URL_FIRST_THIRD =
  "https://api.themoviedb.org/3/movie/";
let GET_RECOMMENDED_MOVIES_URL_SECOND_THIRD =
  "/recommendations?api_key=75e05708188d5f5a0a191495cf4a48db&language=en-US&page=";

const UserProfile = ({ userData }) => {
  const [movieObjects, setMovieObjects] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [userName, setUserName] = useState("");
  const [statusMsg, setStatusMsg] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const[thirtyMovieRec, setThirtyMovieRec] = useState([])

  async function get1MovieByID(url) {
    const res = await fetch(url);
    const data = await res.json();
    return Simplify(data);
  }

  function Simplify(movie) {
    const { title, poster_path, overview, release_date, vote_average } = movie;

    return {
      title: title,
      image: `${IMG_PATH}${poster_path}`,
      overview: overview,
      release_date: release_date,
      vote_average: vote_average,
    };
  }

  async function apiCall() {
    let movieObjectsArray = [];
    for (const movieID of userData.topThreeMovies) {
      const movieObject = await get1MovieByID(
        SEARCH_BY_ID_URL_FIRST_HALF + movieID + SEARCH_BY_ID_URL_SECOND_HALF
      );
      movieObjectsArray.push(movieObject);
    }
    setMovieObjects(movieObjectsArray);
  }

  async function getRecommendedMovies() {
    let movieObjectsArray = [];
    let totalRecommendedMovies = [];
    let totalRecommendedMoviesNames = [];

    // for (const movieID of userData.favorites) {
    //   for (let i = 1; i < 100; i++) {
    //     totalRecommendedMovies.push(...await getSimilarMovies(GET_RECOMMENDED_MOVIES_URL_FIRST_THIRD + movieID + GET_RECOMMENDED_MOVIES_URL_SECOND_THIRD + i))
    //   }
    // }

    // for(const i in totalRecommendedMovies){
    //   let movieCount = 0
    //   for(const j in totalRecommendedMovies){
    //     if(j!= i && totalRecommendedMovies[j].title == totalRecommendedMovies[i].title){
    //       movieCount++
    //       if(movieCount>=4){
    //       movieObjectsArray.push(totalRecommendedMovies[j].title)
    //       }
    //     }
    //   }
    // }

    for (const movieID of userData.favorites) {
      totalRecommendedMovies.push(
        ...(await APIRecommended(
          GET_RECOMMENDED_MOVIES_URL_FIRST_THIRD +
            movieID +
            GET_RECOMMENDED_MOVIES_URL_SECOND_THIRD +
            1
        ))
      );
      totalRecommendedMovies.push(
        ...(await APIRecommended(
          GET_RECOMMENDED_MOVIES_URL_FIRST_THIRD +
            movieID +
            GET_RECOMMENDED_MOVIES_URL_SECOND_THIRD +
            2
        ))
      );
    }

    for (let i = userData.favorites.length; i >= 1; i--){
      totalRecommendedMovies.splice(i * 41 - 21, 1)
    }

    for (const movieObject of totalRecommendedMovies) {
      totalRecommendedMoviesNames.push(movieObject.title);
    }

    // for(const i in totalRecommendedMovies){
    //   let movieCount = 0
    //   for(const j in totalRecommendedMovies){
    //     if(j!= i && totalRecommendedMovies[j].title == totalRecommendedMovies[i].title){
    //       movieCount++
    //       if(movieCount>=1){
    //       movieObjectsArray.push(totalRecommendedMovies[j].title)
    //       }
    //     }
    //   }
    // }

    var dictMovies = {};
    var movieCount = 0;
    let totalRecommendedMoviesNamesSET = new Set(totalRecommendedMoviesNames);
    for (const movieObjectFromTotal of totalRecommendedMovies) {
      movieCount = 0;
      for (const movieName of totalRecommendedMoviesNamesSET) {
        if (movieObjectFromTotal.title === movieName) {
          movieCount += 1;
        }
      }
      if (!Object.hasOwn(dictMovies, `${movieObjectFromTotal.title}`)) {
        dictMovies[`${movieObjectFromTotal.title}`] = [
          movieCount,
          movieObjectFromTotal.id
        ];
      } else {
        dictMovies[`${movieObjectFromTotal.title}`] = [
          dictMovies[`${movieObjectFromTotal.title}`][0] + 1,
          movieObjectFromTotal.id
        ];
      }
    }
    console.log(dictMovies);
    let dictMoviesSorted = []

    for(let i = userData.favorites.length; i >= 1; i--){
      for(const [key, value] of Object.entries(dictMovies)) {
        if(value[0] == i){
          dictMoviesSorted.push(value[1])
        }
      }
    }

    console.log(dictMoviesSorted)

    let best30RecommendedMovieIDS = dictMoviesSorted.slice(0, 30)
    let best30RecommendedMovieObjects = []
    for(const MovieID of best30RecommendedMovieIDS) {
      best30RecommendedMovieObjects.push(await get1MovieByID(SEARCH_BY_ID_URL_FIRST_HALF + MovieID +SEARCH_BY_ID_URL_SECOND_HALF ))
    }

    setThirtyMovieRec(best30RecommendedMovieObjects)

    console.log(best30RecommendedMovieObjects)


 
    // for(const movie of totalRecommendedMovies){
    //   totalRecommendedMoviesNames.push(movie.title)
    // }
    // console.log(totalRecommendedMoviesNames.length)
    // console.log(new Set(totalRecommendedMoviesNames).size)
  }

  async function getSimilarMovies(url) {
    const res = await fetch(url);
    const data = await res.json();
    return data.results;
  }

  async function APIRecommended(url) {
    const res = await fetch(url);
    const data = await res.json();
    return data.results;
  }

  useEffect(() => {
    apiCall();
    getRecommendedMovies();
  }, []);

  const [selectedUserInfo, setSelectedUserInfo] = useState("Fav Movies");

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleUpdate = async () => {
    const userEmail = auth.currentUser.email;
    const userIdRef = doc(db, "userIdMap", userEmail);
    const docSnap = await getDoc(userIdRef);

    if (docSnap.exists()) {
      const userId = docSnap.data().userId;
      modifyName(userId, userName);
      modifyStatusMsg(userId, statusMsg);
      modifyAddInfo(userId, additionalInfo);
    } else {
      console.error("Could not find document.");
    }
  };

  return (
    <div>
      {editMode && (
        <div className="MovieInfoPopUp absolute inset-0 m-auto w-fit h-fit max-w-screen-xl bg-white  rounded-3xl p-6 flex justify-evenly border-2 flex-col">
          <div className="flex flex-col space-y-2 mb-8">
            <label className="font-bold">Name</label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Your name"
              value={userName}
              onChange={(e) => {
                setUserName(e.target.value);
              }}
            />
            <label className="font-bold">Status Message</label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Status message"
              value={statusMsg}
              onChange={(e) => {
                setStatusMsg(e.target.value);
              }}
            />
            <label className="font-bold">Additional Info</label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Additional info"
              value={additionalInfo}
              onChange={(e) => {
                setAdditionalInfo(e.target.value);
              }}
            />
          </div>
          <div className="space-x-4">
            <button
              className="bg-gray-200 p-2 rounded-md"
              onClick={() => {
                setEditMode(false);
              }}>
              Cancel
            </button>
            <button
              className="bg-gray-200 p-2 rounded-md text-red-500"
              onClick={handleUpdate}>
              Update
            </button>
          </div>
        </div>
      )}

      <div className="flex items-center p-4 w-full">
        <div className="flex  flex-col">
          {/* User Information Section */}
          <div className="relative flex flex-col items-center w-80 h-60 -translate-y-12">
            <div className="h-40 w-40 md rounded-full relative avatar flex items-end justify-end text-purple-600 min-w-max absolute -top-16 flex bg-purple-200 text-purple-100 row-start-1 row-end-3 text-purple-650 ring-1 ring-white">
              <img
                className="h-40 w-40 md rounded-full relative"
                src={SuzyBaePic}
                alt=""></img>
              {/* <div className="absolute"></div> */}
            </div>
            <div className="flex flex-col space-y-1 justify-center items-left -mt-12 w-80">
              <span
                data-testid={"name"}
                className="font-bold text-xl text-center text-gray-800 hover:text-lime-500 hover:cursor-pointer ">
                {userData.name}
              </span>
              <p
                data-testid={"handle"}
                className="text-gray-600 text-sm text-center">
                @{userData.handle}
              </p>
              <p
                data-testid={"statusMsg"}
                className="text-black-600 text-sm text-center">
                {userData.statusMsg}
              </p>
              <p
                data-testid={"additionalInfo"}
                className="text-black-600 text-sm text-center">
                {userData.additionalInfo}
              </p>

              {/* Follow & Message Buttons */}
              <div className="flex flex-row justify-center font-semibold mx-auto my-4 w-40">
                <div
                  data-testid="follow"
                  className="my-auto text-white bg-lime-500 hover:bg-lime-600 hover:cursor-pointer rounded-3xl py-2 px-4 mx-2">
                  Follow
                </div>
                <div
                  data-testid="edit"
                  className="my-auto text-white bg-gray-400 hover:bg-gray-500 hover:cursor-pointer rounded-3xl py-2 px-4 mx-2"
                  onClick={handleEdit}>
                  Edit
                </div>
                {/* <div class="my-auto text-gray-800 py-1 px-4 border-2 border-lime-500 hover:bg-lime-500 hover:cursor-pointer hover:text-white rounded-3xl mx-2">Add to Box</div> */}
              </div>
            </div>
          </div>
        </div>
        {/* User TOP 3 Favorite Movies Display */}
        <div className="flex flex-row w-full justify-end">
          <div className="flex flex-row bg-lime-100 justify-center my-6 w-2/5 h-4/5 rounded-xl mr-8 p-8">
            {movieObjects && <MovieSlider movies={movieObjects} />}
            {/* {movieObjects.length == 3 && <MovieSlider movies={movieObjects} />} */}
          </div>
        </div>
      </div>
      {/* Bottom Tabs Section */}
      {/* Fav Movies, To Watch, Friends, Watch Groups */}
      <div className="text-sm flex flex-row w-full justify-center font-medium text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700 mt-20 mb-8">
        <div className="flex -mb-px w-full justify-center">
          <div
            className="mr-2 w-1/4 flex justify-center"
            onClick={() => {
              setSelectedUserInfo("Fav Movies");
            }}>
            <span
              data-testid="favMovies"
              className={
                selectedUserInfo == "Fav Movies"
                  ? "inline-block p-4 text-lime-600 border-b-2 border-lime-600 rounded-t-lg active dark:text-lime-500 dark:border-lime-500"
                  : "inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
              }>
              Fav Movies
            </span>
          </div>
          <div
            className="mr-2 w-1/4 flex justify-center"
            onClick={() => {
              setSelectedUserInfo("To Watch");
            }}>
            <span
              data-testid="toWatch"
              className={
                selectedUserInfo == "To Watch"
                  ? "inline-block p-4 text-lime-600 border-b-2 border-lime-600 rounded-t-lg active dark:text-lime-500 dark:border-lime-500"
                  : "inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
              }>
              To Watch
            </span>
          </div>
          <div
            className="mr-2 w-1/4 flex justify-center"
            onClick={() => {
              setSelectedUserInfo("Friends");
            }}>
            <span
              data-testid="friends"
              className={
                selectedUserInfo == "Friends"
                  ? "inline-block p-4 text-lime-600 border-b-2 border-lime-600 rounded-t-lg active dark:text-lime-500 dark:border-lime-500"
                  : "inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
              }>
              Friends
            </span>
          </div>
          <div
            className="mr-2 w-1/4 flex justify-center"
            onClick={() => {
              setSelectedUserInfo("Watch Groups");
            }}>
            <span
              className={
                selectedUserInfo == "Watch Groups"
                  ? "inline-block p-4 text-lime-600 border-b-2 border-lime-600 rounded-t-lg active dark:text-lime-500 dark:border-lime-500"
                  : "inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
              }>
              Watch Groups
            </span>
          </div>
        </div>
      </div>
      <UserInfoGrid userData={userData} selectedUserInfo={selectedUserInfo} />
     <Recommendations movies={thirtyMovieRec}></Recommendations>
    </div>
  );
};

export default UserProfile;
