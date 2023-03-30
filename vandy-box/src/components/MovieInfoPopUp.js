import { useRef, useEffect } from 'react';


function MovieInfoPopUp(props) {
  const ref = useRef(); 

  useEffect(() => {
    ref.current.style.top = `${document.documentElement.scrollTop}px`
    console.log(props.listOfFavorites)
  }, []);
  
  return (
    <>
      <div className="fixed w-[calc(100vw-16.5px)] h-full left-0 top-0 bg-neutral-900/80 overflow-auto pointer-events-none"></div>
      <div className="MovieInfoPopUp absolute inset-0  ml-auto mr-auto mt-[25vh] w-fit h-fit max-w-[90vw] bg-neutral-800 rounded-3xl p-6 flex justify-evenly" ref={ref}>
      <div className="MovieInfo flex flex-col">
         <div className="text-white  pb-8 flex items-center">
         <span className="font-bold text-4xl">{props.title}</span>
         <div className='ml-auto flex gap-2'>
          {!props.listOfFavorites.includes(props.id) && <button className="AddToFavoritesButton ml-auto text-black bg-lime-100 pl-3 pr-3 pt-2 pb-2 rounded-xl" onClick={() => {props.handleAddToFavorites(props.userID, props.id)
          console.log("Adding " + props.id + " to " + props.userID) }} >Add to Favorites</button>}
          {props.listOfFavorites.includes(props.id) && <button className="RemoveFromFavoritesButton ml-auto text-black bg-lime-100 pl-3 pr-3 pt-2 pb-2 rounded-xl" onClick={() => {props.handleRemoveFromFavorites(props.userID, props.id)
          console.log("Remove " + props.id + " from " + props.userID) }} >Remove from Favorites</button>}
          {!props.toWatchList.includes(props.id) && <button className="AddToFavoritesButton ml-auto text-black bg-lime-100 pl-3 pr-3 pt-2 pb-2 rounded-xl" onClick={() => {props.handleAddToWatch(props.userID, props.id)
          console.log("Adding " + props.id + " to " + props.userID) }} >Add to Watch List</button>}
          {props.toWatchList.includes(props.id) && <button className="RemoveFromFavoritesButton ml-auto text-black bg-lime-100 pl-3 pr-3 pt-2 pb-2 rounded-xl" onClick={() => {props.handleRemoveFromWatch(props.userID, props.id)
          console.log("Remove " + props.id + " from " + props.userID) }} >Remove from Watch List</button>}
          {!props.seenList.includes(props.id) && <button className="AddToFavoritesButton ml-auto text-black bg-lime-100 pl-3 pr-3 pt-2 pb-2 rounded-xl" onClick={() => {props.handleAddToSeen(props.userID, props.id)
          console.log("Adding " + props.id + " to " + props.userID) }} >Add to Seen</button>}
          {props.seenList.includes(props.id) && <button className="RemoveFromFavoritesButton ml-auto text-black bg-lime-100 pl-3 pr-3 pt-2 pb-2 rounded-xl" onClick={() => {props.handleRemoveFromSeen(props.userID, props.id)
          console.log("Remove " + props.id + " from " + props.userID) }} >Remove from Seen</button>}
        </div>
        
        </div>
        <div className="text-white pb-8">
          <span className="text-2xl">{props.description}</span>
          
          {/* <button class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
          Add Rating
          </button> */}


  
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
        
        
        
        {/* <div className="text-white">
          <span className="font-bold text-xl">Synopsis: &nbsp;</span>
          {props.description}
        </div>
        <div className="text-white">
          <span className="font-bold text-xl">Release Date: &nbsp;</span>
          {props.release_date}
        </div>
        <div className="text-white">
          <span className="font-bold text-xl">Rating: &nbsp;</span>
          {props.vote_average}
        </div> */}
        <div>
          <button type="button" class="bg-grey rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500" onClick={()=> {props.handleOnClose()}}>
            <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}

export default MovieInfoPopUp;
