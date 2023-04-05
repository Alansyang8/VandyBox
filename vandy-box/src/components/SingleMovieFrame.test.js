import SingleMovieFrame from "./SingleMovieFrame";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

describe(SingleMovieFrame, () => {
    const userData = {
      id: 13,
      topThreeMovies: [324, 19, 30],
      favorites: [10],
      seen: [10],
      toWatch: [10],
      UserProfile: "richardli",
      name: "Richard",
      handle: "@richardli",
      statusMsg: "I like animated movies.",
      additionalInfo: ""
    };

    const movies = [{"adult":false,"backdrop_path":"/cWczNud8Y8i8ab0Z4bxos4myWYO.jpg","genre_ids":[16,10751],"id":38757,"original_language":"en","original_title":"Tangled","overview":"When the kingdom's most wanted-and most charming-bandit Flynn Rider hides out in a mysterious tower, he's taken hostage by Rapunzel, a beautiful and feisty tower-bound teen with 70 feet of magical, golden hair. Flynn's curious captor, who's looking for her ticket out of the tower where she's been locked away for years, strikes a deal with the handsome thief and the unlikely duo sets off on an action-packed escapade, complete with a super-cop horse, an over-protective chameleon and a gruff gang of pub thugs.","popularity":140.462,"poster_path":"/ym7Kst6a4uodryxqbGOxmewF235.jpg","release_date":"2010-11-24","title":"Tangled","video":false,"vote_average":7.585,"vote_count":10111}]
    const handleAddToFavorites = jest.fn()
    const handleRemoveFromFavorites = jest.fn()
    const handleAddToWatch = jest.fn()
    const handleRemoveFromWatch = jest.fn()
    const handleAddToLikes = jest.fn()
    const  = jest.fn()
    const setShowingPopup = jest.fn()
    const showingPopup = false

    
    it("MovieSlider displays movies", () => {
        const { getByTestId = "slider" } = render(
          <SingleMovieFrame  movies={movies} listOfFavorites={userData.favorites} handleAddToFavorites={handleAddToFavorites} handleRemoveFromFavorites={handleRemoveFromFavorites} userID = {userData.handle} handleAddToWatch={handleAddToWatch} handleRemoveFromWatch={handleRemoveFromWatch} toWatchList={userData.toWatch} handleAddToLikes={handleAddToLikes} handleAddToDislikes={handleAddToDislikes}  seenList={userData.seen} setShowingPopup={setShowingPopup} showingPopup={showingPopup}/>,
          { wrapper: MemoryRouter }
        );
         const test = getByTestId("name").textContent;
         expect(test).toBe("");
      });

})