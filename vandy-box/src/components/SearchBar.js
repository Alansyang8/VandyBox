function SearchBar(props) {
    return (
        <input data-testid="EmptyTest"
        type="search"
        className="bg-stone-10 border border-gray-300 text-gray-900 w-1/3 text-sm rounded-lg block p-2.5 searchBar mt-8 "
        placeholder="Search..."
        defaultValue={""}
        onChange={(event) => props.HandleSearch(event.target.value)}
      />
    )
}

export default SearchBar