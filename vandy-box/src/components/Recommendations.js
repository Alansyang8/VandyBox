import Container from "./Container";
import MovieSliderGrid from "./MovieSliderGrid";



function Recommendations(props) {
    return(
        <Container containerTitle={"You might like these..."}><MovieSliderGrid movies={props.movies} userID={props.userID} handleAddToFavorites={props.handleAddToFavorites} handleRemoveFromFavorites={props.handleRemoveFromFavorites} listOfFavorites={props.listOfFavorites} handleAddToWatch={props.handleAddToWatch} handleRemoveFromWatch={props.handleRemoveFromWatch} toWatchList={props.toWatchList} handleAddToLikes={props.handleAddToLikes} handleAddToDislikes={props.handleAddToDislikes}></MovieSliderGrid> </Container>
    )
}

export default Recommendations