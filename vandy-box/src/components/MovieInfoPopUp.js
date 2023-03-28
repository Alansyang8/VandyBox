import { useRef, useEffect } from 'react';


function MovieInfoPopUp(props) {
  const ref = useRef(); 
  const ref2 = useRef(); 

  useEffect(() => {
    ref.current.style.top = `${document.documentElement.scrollTop}px`
    ref2.current.style.top = `${document.documentElement.scrollTop}px`
    console.log(props.listOfFavorites)
    // ref2.current.style.marginTop = "500px"
  }, []);
  
  return (
    <>
      <div className="absolute w-[calc(100vw-16.5px)] h-screen left-0 top-0 bg-neutral-900/80 pointer-events-none" ref={ref2}></div>
      <div className="MovieInfoPopUp absolute inset-0  ml-auto mr-auto mt-[25vh] w-fit h-fit max-w-[90vw] bg-neutral-800 pointer-events-none rounded-3xl p-6 flex justify-evenly" ref={ref}>
        <div className="MovieInfo flex flex-col">
         <div className="text-white  pb-8">
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
          
        </div>
        
        </div>
        <div className="text-white pb-8">
          <span className="text-2xl">{props.description}</span>
          
          <button class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
          Add Rating
          </button>


  
        </div>
        <div className="text-white mt-auto text-xl">
          <span className="font-bold text-xl">Release Date: &nbsp;</span>
          {props.release_date}
        </div>
        <div className="text-white text-xl">
          <span className="font-bold text-xl">Rating: &nbsp;</span>
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
      </div>
    </>
  );
}

export default MovieInfoPopUp;
