import Header from "../components/Header"
import SearchBar from "../components/SearchBar"
import Container from "../components/Container"
import MovieSlider from "../components/MovieSlider"
import { useState, useEffect } from "react";

const IMG_PATH = "https://image.tmdb.org/t/p/w500";
const SEARCH_API_URL =
  'https://api.themoviedb.org/3/search/movie?api_key=75e05708188d5f5a0a191495cf4a48db&language=en-US&page=1&include_adult=false&query="';

function Search() {
    const [searchMovieAPI, setSearchMovieAPI] = useState();
    const [searchBarValue, setSearchBar] = useState("BlackPink");
    async function get10Movies(url) {
        const res = await fetch(url);
        const data = await res.json();
        let firstTenTrending = getFirstTen(data.results);
        return addMoviesToArray(firstTenTrending);
      }
      
      function getFirstTen(array) {
        return array.slice(0, 10);
      }
      
      function addMoviesToArray(movies) {
        let array = [];
        movies.forEach((movie) => {
          const { title, poster_path } = movie;
          array.push({
            title: title,
            image: `${IMG_PATH}${poster_path}`,
          });
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
    
      useEffect(() => {
        apiCall4();
      }, []);
    return (
        <div className="flex flex-col justify-center items-center">
        <Header></Header>
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
    )}

    export default Search






