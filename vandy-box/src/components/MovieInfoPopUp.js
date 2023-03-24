import { useRef, useEffect } from 'react';

function MovieInfoPopUp(props) {
  const ref = useRef(); 
  const ref2 = useRef(); 

  useEffect(() => {
    ref.current.style.top = `${document.documentElement.scrollTop}px`
    ref2.current.style.top = `${document.documentElement.scrollTop}px`
    // ref2.current.style.marginTop = "500px"
  }, []);
  
  return (
    <>
      <div className="absolute w-[calc(100vw-16.5px)] h-screen left-0 top-0 bg-neutral-900/80 pointer-events-none" ref={ref2}></div>
      <div className="MovieInfoPopUp absolute inset-0  ml-auto mr-auto mt-[25vh] w-fit h-fit max-w-[90vw] bg-neutral-800 pointer-events-none rounded-3xl p-6 flex justify-evenly" ref={ref}>
        <div className="MovieInfo flex flex-col">
         <div className="text-white  pb-8">
         <span className="font-bold text-4xl">{props.title}</span>
          
        </div>
        <div className="text-white pb-8">
          <span className="text-2xl">{props.description}</span>
  
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
