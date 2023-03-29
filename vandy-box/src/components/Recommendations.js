import Container from "./Container";
import MovieSliderGrid from "./MovieSliderGrid";



function Recommendations(props) {
    return(
        
        <Container containerTitle={"Recommended"}><MovieSliderGrid movies={props.movies} userID={props.userID} handleAddToFavorites={props.handleAddToFavorites} handleRemoveFromFavorites={props.handleRemoveFromFavorites} listOfFavorites={props.listOfFavorites}></MovieSliderGrid> </Container>
    )
}

export default Recommendations