function MovieInfoPopUp(props) {
  return (
    <>
      <div className="darken absolute inset-0 m-auto bg-neutral-900/80 pointer-events-none"></div>
      <div className="MovieInfoPopUp absolute inset-0 m-auto w-fit h-fit max-w-screen-xl bg-neutral-100/90 pointer-events-none rounded-3xl p-6 flex flex-col justify-evenly">
        <div><span className="font-bold text-xl">Synopsis: &nbsp;</span>{props.description}</div>
        <div><span className="font-bold text-xl">Release Date: &nbsp;</span>{props.release_date}</div> 
        <div><span className="font-bold text-xl">Rating: &nbsp;</span>{props.vote_average}</div> 
      </div>
    </>
  );
}

export default MovieInfoPopUp;
