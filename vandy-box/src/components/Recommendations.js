import Container from "./Container";
import MovieSliderGrid from "./MovieSliderGrid";

{/* Movie recommendation grid */}
function Recommendations(props) {
  return (
    <Container containerTitle={"You might like these..."}>
      <MovieSliderGrid movies={props.movies}></MovieSliderGrid>{" "}
    </Container>
  );
}

export default Recommendations;
