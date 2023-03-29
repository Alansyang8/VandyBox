import SuzyBaePic from "../assets/SuzyBaePic.png";
import UserInfoGrid from "./UserInfoGrid";
import { useState, useEffect } from "react";
import MovieSlider from "./MovieSlider";
import { auth, db } from "../firebase";
import { modifyAddInfo, modifyName, modifyStatusMsg, addToFollowsMe, addToFriends, addTopThreeMovie, deleteTopThreeMovie, addToFollowed} from "../api/firebaseWriter";
import { doc, getDoc } from "firebase/firestore";

const IMG_PATH = "https://image.tmdb.org/t/p/w500";
const SEARCH_API_URL =
  'https://api.themoviedb.org/3/search/movie?api_key=75e05708188d5f5a0a191495cf4a48db&language=en-US&page=1&include_adult=false&query="';

const UserProfile = ({ userData }) => {
  const [movieObjects, setMovieObjects] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [userName, setUserName] = useState("");
  const [statusMsg, setStatusMsg] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [friendRequest, setFriendRequest] = useState([]);
  const [favMovie1, setFavMovie1] = useState("");
  const [favMovie2, setFavMovie2] = useState("");
  const [favMovie3, setFavMovie3] = useState("");

  async function get1Movie(url) {
    const res = await fetch(url);
    const data = await res.json();
    let first = getFirst(data.results);
    return Simplify(first[0]);
  }

  function getFirst(array) {
    return array.slice(0, 1);
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

  useEffect(() => {
    async function apiCall() {
      let movieObjectsArray = [];
      for (const movieName of userData.topThreeMovies) {
        const movieObject = await get1Movie(SEARCH_API_URL + movieName);
        movieObjectsArray.push(movieObject);
      }
      setMovieObjects(movieObjectsArray);
    }

    apiCall();
  }, []);

  const [selectedUserInfo, setSelectedUserInfo] = useState("Fav Movies");

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleUpdate = async () => {
    const userEmail = auth.currentUser.email;
    const userIdRef = doc(db, 'userIdMap', userEmail);
      const docSnap = await getDoc(userIdRef);

      if (docSnap.exists()) {
        const userId = docSnap.data().userId;
        if(userName != ""){
          modifyName(userId, userName);
        }
        if(statusMsg != ""){
          modifyStatusMsg(userId, statusMsg);
        }
        if(additionalInfo != ""){
          modifyAddInfo(userId, additionalInfo);
        }
        let list = userData.topThreeMovies.length;
        if(favMovie1 != ""){
          if(list == 3){
            deleteTopThreeMovie(userId, userData.topThreeMovies[0]);
            list-=1;
          }
          list +=1;
          addTopThreeMovie(userId, favMovie1);
        }
        if(favMovie2 != ""){
          if(list == 3){
            deleteTopThreeMovie(userId, userData.topThreeMovies[1]);
            list-=1;
          }
          list +=1;
          addTopThreeMovie(userId, favMovie2);
        }
        if(favMovie3 != ""){
          if(list == 3){
            deleteTopThreeMovie(userId, userData.topThreeMovies[2]);
            list-=1;
          }
          list +=1;
          addTopThreeMovie(userId, favMovie3);
        }
        setTimeout(() => {window.location.reload(true);}, 1000);
      } else {
        console.error("Could not find document.");
      }
  };

  const handleFollow = async () =>{
    const userEmail = auth.currentUser.email;
    const userIdRef = doc(db, 'userIdMap', userEmail);
      const docSnap = await getDoc(userIdRef);

      if (docSnap.exists()) {
        const userId = docSnap.data().userId;
        addToFollowsMe(userData.handle, userId);
        addToFollowed(userId, userData.handle);
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
          <div className="flex flex-col space-y-2 mb-8">
          <label className="font-bold">Top 3 Movies</label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Movie 1"
              value={favMovie1}
              onChange={(e) => {
                setFavMovie1(e.target.value);
              }}
            />
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Movie 2"
              value={favMovie2}
              onChange={(e) => {
                setFavMovie2(e.target.value);
              }}
            />
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Movie 3"
              value={favMovie3}
              onChange={(e) => {
                setFavMovie3(e.target.value);
              }}
            />
          </div>
          <div className="space-x-4">
            <button
              className="bg-gray-200 p-2 rounded-md"
              onClick={() => {
                setEditMode(false);
              }}
            >
              Cancel
            </button>
            <button className="bg-gray-200 p-2 rounded-md text-red-500" onClick={handleUpdate}>
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
                alt=""
              ></img>
              {/* <div className="absolute"></div> */}
            </div>
            <div className="flex flex-col space-y-1 justify-center items-left -mt-12 w-80">
              <span data-testid={"name"} className="font-bold text-xl text-center text-gray-800 hover:text-lime-500 hover:cursor-pointer ">
                {userData.name}
              </span>
              <p data-testid={"handle"} className="text-gray-600 text-sm text-center">
                @{userData.handle}
              </p>
              <p data-testid={"statusMsg"} className="text-black-600 text-sm text-center">
                {userData.statusMsg}
              </p>
              <p data-testid={"additionalInfo"} className="text-black-600 text-sm text-center">
                {userData.additionalInfo}
              </p>

              {/* Follow & Message Buttons */}
              <div className="flex flex-row justify-center font-semibold mx-auto my-4 w-40">
                <div data-testid="follow" className="my-auto text-white bg-lime-500 hover:bg-lime-600 hover:cursor-pointer rounded-3xl py-2 px-4 mx-2"
                  onClick={handleFollow}>
                  Follow
                </div>
                <div
                  data-testid="edit"
                  className="my-auto text-white bg-gray-400 hover:bg-gray-500 hover:cursor-pointer rounded-3xl py-2 px-4 mx-2"
                  onClick={handleEdit}
                >
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
            }}
          >
            <span
              data-testid="favMovies"
              className={
                selectedUserInfo == "Fav Movies"
                  ? "inline-block p-4 text-lime-600 border-b-2 border-lime-600 rounded-t-lg active dark:text-lime-500 dark:border-lime-500"
                  : "inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
              }
            >
              Fav Movies
            </span>
          </div>
          <div
            className="mr-2 w-1/4 flex justify-center"
            onClick={() => {
              setSelectedUserInfo("To Watch");
            }}
          >
            <span
              data-testid="toWatch"
              className={
                selectedUserInfo == "To Watch"
                  ? "inline-block p-4 text-lime-600 border-b-2 border-lime-600 rounded-t-lg active dark:text-lime-500 dark:border-lime-500"
                  : "inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
              }
            >
              To Watch
            </span>
          </div>
          <div
            className="mr-2 w-1/4 flex justify-center"
            onClick={() => {
              setSelectedUserInfo("Friends");
            }}
          >
            <span
              data-testid="friends"
              className={
                selectedUserInfo == "Friends"
                  ? "inline-block p-4 text-lime-600 border-b-2 border-lime-600 rounded-t-lg active dark:text-lime-500 dark:border-lime-500"
                  : "inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
              }
            >
              Friends
            </span>
          </div>
          <div
            className="mr-2 w-1/4 flex justify-center"
            onClick={() => {
              setSelectedUserInfo("Watch Groups");
            }}
          >
            <span
              className={
                selectedUserInfo == "Watch Groups"
                  ? "inline-block p-4 text-lime-600 border-b-2 border-lime-600 rounded-t-lg active dark:text-lime-500 dark:border-lime-500"
                  : "inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
              }
            >
              Watch Groups
            </span>
          </div>
        </div>
      </div>
      <UserInfoGrid userData={userData} selectedUserInfo={selectedUserInfo} />
    </div>
  );
};

export default UserProfile;
