import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import Container from "../components/Container";
import MovieSlider from "../components/MovieSlider";
import GenreCheckBox from "../components/GenreCheckBox";
import { useState, useEffect } from "react";

const IMG_PATH = "https://image.tmdb.org/t/p/w500";
const SEARCH_API_URL =
  'https://api.themoviedb.org/3/search/movie?api_key=75e05708188d5f5a0a191495cf4a48db&language=en-US&page=1&include_adult=false&query="';

const genreID= [{"id":28,"name":"Action"},{"id":12,"name":"Adventure"},{"id":16,"name":"Animation"},{"id":35,"name":"Comedy"},{"id":80,"name":"Crime"},{"id":99,"name":"Documentary"},{"id":18,"name":"Drama"},{"id":10751,"name":"Family"},{"id":14,"name":"Fantasy"},{"id":36,"name":"History"},{"id":27,"name":"Horror"},{"id":10402,"name":"Music"},{"id":9648,"name":"Mystery"},{"id":10749,"name":"Romance"},{"id":878,"name":"Science Fiction"},{"id":10770,"name":"TV Movie"},{"id":53,"name":"Thriller"},{"id":10752,"name":"War"},{"id":37,"name":"Western"}]
function Search() {
  console.log("hi")
  const [searchMovieAPI, setSearchMovieAPI] = useState();
  const [searchBarValue, setSearchBar] = useState("Blackpink");
  const [genreIDFilters, setGenreIDFilters] = useState([]);
  async function get10Movies(url) {
    const res = await fetch(url);
    const data = await res.json();
    console.log(data)
    let filteredMovies = filterGenres(data.results);
    let firstTen = getFirstTen(filteredMovies);
    return addMoviesToArray(firstTen);
  }

  function getFirstTen(array) {
    return array.slice(0, 10);
  }

  function addMoviesToArray(movies) {
    let array = [];
    movies.forEach((movie) => {
      const { title, poster_path, overview, release_date, vote_average } = movie;
      array.push({
        title: title,
        image: `${IMG_PATH}${poster_path}`,
        overview: overview,
        release_date: release_date,
        vote_average: vote_average
      });
    });
    return array;
  }

  function filterGenres(movies) {
    let array = [];
    movies.forEach((movie) => {
      let acceptMovie = true;
      genreIDFilters.forEach((genre) => {
        if (!movie.genre_ids.includes(genre)) {
          acceptMovie = false;
        }
      });
      if (acceptMovie) {
        array.push(movie);
      }
    });
    return array;
  }

  async function apiCall4() {
    let apiResponse4 = await get10Movies(SEARCH_API_URL + searchBarValue);
    setSearchMovieAPI(apiResponse4);
  }

  function HandleSearch(searchValue) {
    setSearchBar(searchValue);
    apiCall4();
  }

  function HandleCheckBox(checked, ID) {
    if (checked) {
      setGenreIDFilters((prev) => [...prev, ID]);
    } else {
      setGenreIDFilters((prev) => {
        return prev.filter((ID) => ID != ID);
      });
    }
  }

  useEffect(() => {
    apiCall4();
  }, [apiCall4]);
  return (
    <div className="flex flex-col justify-center items-center">
      <Header></Header>
      <div className="genreCheckBoxContainer grid grid-cols-5 gap-1 mt-4">
        {/* <label>
          <input
            type="checkbox"
            onChange={(event) => {
              if (event.target.checked) {
                setGenreIDFilters(prev => [...prev, 28]);
              }
              else {
                setGenreIDFilters(prev => {
                  return prev.filter(ID => ID != 28)
                  })
              }
            }}
          />{" "}
          Action
        </label> */}
        <GenreCheckBox
          genre={"Action"}
          HandleCheckBox={HandleCheckBox}
          ID={28}
        />
        <GenreCheckBox
          genre={"Adventure"}
          HandleCheckBox={HandleCheckBox}
          ID={12}
        />
        <GenreCheckBox
          genre={"Animation"}
          HandleCheckBox={HandleCheckBox}
          ID={16}
        />
        <GenreCheckBox
          genre={"Comedy"}
          HandleCheckBox={HandleCheckBox}
          ID={35}
        />
        <GenreCheckBox
          genre={"Crime"}
          HandleCheckBox={HandleCheckBox}
          ID={80}
        />
        <GenreCheckBox
          genre={"Documentary"}
          HandleCheckBox={HandleCheckBox}
          ID={99}
        />
        <GenreCheckBox
          genre={"Drama"}
          HandleCheckBox={HandleCheckBox}
          ID={18}
        />
        <GenreCheckBox
          genre={"Family"}
          HandleCheckBox={HandleCheckBox}
          ID={10751}
        />
        <GenreCheckBox
          genre={"Fantasy"}
          HandleCheckBox={HandleCheckBox}
          ID={14}
        />
        <GenreCheckBox
          genre={"History"}
          HandleCheckBox={HandleCheckBox}
          ID={36}
        />
        <GenreCheckBox
          genre={"Horror"}
          HandleCheckBox={HandleCheckBox}
          ID={27}
        />
        <GenreCheckBox
          genre={"Music"}
          HandleCheckBox={HandleCheckBox}
          ID={10402}
        />
        <GenreCheckBox
          genre={"Mystery"}
          HandleCheckBox={HandleCheckBox}
          ID={9648}
        />
        <GenreCheckBox
          genre={"Romance"}
          HandleCheckBox={HandleCheckBox}
          ID={10749}
        />
        <GenreCheckBox
          genre={"Science Fiction"}
          HandleCheckBox={HandleCheckBox}
          ID={878}
        />
        <GenreCheckBox
          genre={"TV Movie"}
          HandleCheckBox={HandleCheckBox}
          ID={10770}
        />
        <GenreCheckBox
          genre={"Thriller"}
          HandleCheckBox={HandleCheckBox}
          ID={53}
        />
        <GenreCheckBox
          genre={"War"}
          HandleCheckBox={HandleCheckBox}
          ID={10752}
        />
        <GenreCheckBox
          genre={"Western"}
          HandleCheckBox={HandleCheckBox}
          ID={37}
        />
        {/* <label>
          Sort by:
          <select>
            <option>Relevant</option>
            <option>Rating+</option>
            <option>Rating-</option>
            <option>Release Date+</option>
            <option>Release Date-</option>
          </select>
        </label> */}
      </div>
      <SearchBar HandleSearch={HandleSearch}></SearchBar>
      <Container containerTitle={"Search"}>
        {searchMovieAPI && searchMovieAPI.length > 0 ? (
          <MovieSlider movies={searchMovieAPI}></MovieSlider>
        ) : (
          "No Results"
        )}
      </Container>
    </div>
    //     <input
    //     type="search"
    //     className="bg-stone-10 border border-gray-300 text-gray-900 w-1/3 text-sm rounded-lg block p-2.5 searchBar"
    //     placeholder="Search..."
    //     defaultValue={""}
    //     onClick={window.scrollTo
    //         ({
    //       top: document.body.scrollHeight,
    //       behavior: "smooth",
    //     })}
    //     onChange={(event) => props.HandleSearch(event.target.value)}
    //   />
  );
}

export default Search;
