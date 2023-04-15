import { useRef, useEffect, useState } from "react";
import { fetchCurrentUserData } from "../auth/auth";
import {
  addToFavorites,
  addToToWatch,
  deleteFromFavorites,
  deleteFromToWatch,
  dislikeMovie,
  likeMovie,
  undislikeMovie,
  unlikeMovie,
} from "../api/firebaseWriter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp as faThumbsUpSolid } from "@fortawesome/free-solid-svg-icons";
import { faThumbsUp as faThumbsUpOutline } from "@fortawesome/free-regular-svg-icons";
import { faThumbsDown as faThumbsDownSolid } from "@fortawesome/free-solid-svg-icons";
import { faThumbsDown as faThumbsDownOutline } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartOutline } from "@fortawesome/free-regular-svg-icons";
import { faClipboardList } from "@fortawesome/free-solid-svg-icons";
import { faClipboard } from "@fortawesome/free-regular-svg-icons";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../firebase";

function MovieInfoPopUp(props) {
  const ref = useRef();
  const [userData, setUserData] = useState();
  const [totalLikes, setTotalLikes] = useState(0);
  const [totalDislikes, setTotalDislikes] = useState(0);
  const [totalToWatch, setTotalToWatch] = useState(0);
  const [forceUpdate, setForceUpdate] = useState(0);

  const getUserData = async () => {
    const userData = await fetchCurrentUserData();
    setUserData(userData);
  };

  const updateLikeDislike = async () => {
    let numLikes = 0;
    let numDislikes = 0;
    let numToWatch = 0;
    const usersCollection = query(collection(db, "users"));
    const querySnapshot = await getDocs(usersCollection);
    querySnapshot.forEach((doc) => {
      if (doc.data().Likes.includes(props.id)) {
        numLikes++;
      } else if (doc.data().Dislikes.includes(props.id)) {
        numDislikes++;
      } else if (doc.data().toWatch.includes(props.id)) {
        numToWatch++;
      }
    });
    setTotalLikes(numLikes);
    setTotalDislikes(numDislikes);
    setTotalToWatch(numToWatch);
  };

  useEffect(() => {
    ref.current.style.top = `${document.documentElement.scrollTop}px`;
    getUserData();
    updateLikeDislike();
  }, [forceUpdate]);

  return (
    <>
      <div className="fixed w-[calc(100vw-16.5px)] h-full left-0 top-0 bg-neutral-900/80 overflow-auto pointer-events-none"></div>
      <div
        className="MovieInfoPopUp absolute inset-0  ml-auto mr-auto mt-[25vh] w-fit h-fit max-w-[90vw] bg-neutral-800 rounded-3xl p-6 flex justify-evenly"
        ref={ref}>
        <div className="MovieInfo flex flex-col">
          <div className="text-white  pb-8 flex items-center">
            <span className="font-bold text-4xl">{props.title}</span>
            {userData && (
              <div className="ml-auto flex gap-2">
                {!userData.favorites.includes(props.id) && (
                  <button
                    className="AddToFavoritesButton ml-auto text-black bg-lime-100 hover:bg-lime-200 active:bg-lime-300 pl-3 pr-3 pt-2 pb-2 rounded-xl"
                    onClick={() => {
                      addToFavorites(userData.handle, props.id);
                      setForceUpdate((prev) => prev + 1);
                    }}>
                    <FontAwesomeIcon
                      icon={faHeartOutline}
                      style={{ color: "#fe6cdf" }}
                    />
                  </button>
                )}
                {userData.favorites.includes(props.id) && (
                  <button
                    className="RemoveFromFavoritesButton ml-auto text-black bg-fuchsia-700 hover:bg-fuchsia-800 active:bg-fuchsia-900 pl-3 pr-3 pt-2 pb-2 rounded-xl"
                    onClick={() => {
                      deleteFromFavorites(userData.handle, props.id);
                      setForceUpdate((prev) => prev + 1);
                    }}>
                    <FontAwesomeIcon
                      icon={faHeartSolid}
                      beat
                      style={{ color: "#fe6cdf" }}
                    />
                  </button>
                )}

                {!userData.Likes.includes(props.id) && (
                  <button
                    className="AddToFavoritesButton ml-auto text-black bg-lime-100 hover:bg-lime-200 pl-3 pr-3 pt-2 pb-2 rounded-xl"
                    onClick={() => {
                      likeMovie(userData.handle, props.id);
                      setForceUpdate((prev) => prev + 1);
                    }}>
                    <span className="text-green-900 font-bold mr-2">
                      {totalLikes}
                    </span>
                    <FontAwesomeIcon
                      icon={faThumbsUpOutline}
                      style={{ color: "#16da47" }}
                    />
                  </button>
                )}
                {userData.Likes.includes(props.id) && (
                  <button
                    className="AddToFavoritesButton ml-auto text-black bg-green-600 hover:bg-green-700 active:bg-green-900 pl-3 pr-3 pt-2 pb-2 rounded-xl"
                    onClick={() => {
                      unlikeMovie(userData.handle, props.id);
                      setForceUpdate((prev) => prev + 1);
                    }}>
                    <span className="text-green-900 font-bold mr-2">
                      {totalLikes}
                    </span>
                    <FontAwesomeIcon
                      icon={faThumbsUpSolid}
                      bounce
                      style={{ color: "#16da47" }}
                    />
                  </button>
                )}
                {!userData.Dislikes.includes(props.id) && (
                  <button
                    className="AddToFavoritesButton ml-auto text-black bg-lime-100 hover:bg-lime-200 pl-3 pr-3 pt-2 pb-2 rounded-xl"
                    onClick={() => {
                      dislikeMovie(userData.handle, props.id);
                      setForceUpdate((prev) => prev + 1);
                    }}>
                    <span className="text-red-900 font-bold mr-2">
                      {totalDislikes}
                    </span>
                    <FontAwesomeIcon
                      icon={faThumbsDownOutline}
                      style={{ color: "#da1616" }}
                    />
                  </button>
                )}
                {userData.Dislikes.includes(props.id) && (
                  <button
                    className="AddToFavoritesButton ml-auto text-black bg-red-800 hover:bg-red-900 active:bg-red-1000 pl-3 pr-3 pt-2 pb-2 rounded-xl"
                    onClick={() => {
                      undislikeMovie(userData.handle, props.id);
                      setForceUpdate((prev) => prev + 1);
                    }}>
                    <span className="text-red-500 font-bold mr-2">
                      {totalDislikes}
                    </span>
                    <FontAwesomeIcon
                      icon={faThumbsDownSolid}
                      shake
                      style={{ color: "#da1616" }}
                    />
                  </button>
                )}
                {!userData.toWatch.includes(props.id) && (
                  <button
                    className="AddToFavoritesButton ml-auto text-black bg-lime-100 hover:bg-lime-200 active:bg-lime-300 pl-3 pr-3 pt-2 pb-2 rounded-xl"
                    onClick={() => {
                      addToToWatch(userData.handle, props.id);
                      setForceUpdate((prev) => prev + 1);
                    }}>
                    <span className="text-cyan-900 font-bold mr-2">
                      {totalToWatch}
                    </span>
                    <FontAwesomeIcon
                      icon={faClipboard}
                      style={{ color: "blue" }}
                    />
                  </button>
                )}
                {userData.toWatch.includes(props.id) && (
                  <button
                    className="RemoveFromFavoritesButton ml-auto text-black bg-cyan-500 hover:bg-cyan-600 active:bg-cyan-700 pl-3 pr-3 pt-2 pb-2 rounded-xl"
                    onClick={() => {
                      deleteFromToWatch(userData.handle, props.id);
                      setForceUpdate((prev) => prev + 1);
                    }}>
                    <span className="text-cyan-900 font-bold mr-2">
                      {totalToWatch}
                    </span>
                    <FontAwesomeIcon
                      icon={faClipboardList}
                      flip
                      style={{
                        color: "blue",
                        animationDuration: "2s",
                        animationTimingFunction: "linear",
                      }}
                    />
                  </button>
                )}
              </div>
            )}
          </div>
          <div className="text-white pb-8">
            <span className="text-2xl">{props.description}</span>
          </div>
          <div className="text-white mt-auto text-xl">
            <span className="font-bold text-xl">Release Date: &nbsp;</span>
            {props.release_date}
          </div>
          <div className="text-white text-xl">
            <span className="font-bold text-xl">IMDB Rating: &nbsp;</span>
            {props.vote_average}
          </div>
        </div>
        <img src={props.image} className="w-[300px] pl-8"></img>

        <div>
          <button
            type="button"
            className="bg-grey rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            onClick={() => {
              props.handleOnClose();
            }}>
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}

export default MovieInfoPopUp;
