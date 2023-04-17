import Header from "../components/Header";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../firebase";

function Users() {

  const navigate = useNavigate();

  const [searchBarValue, setSearchBarValue] = useState("");
  const [listOfUsers, setListOfUsers] = useState([]);
  const [showIsNotFound, setShowIsNotFound] = useState(false)
  const [oldSearch, setOldSearch] = useState("")

  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = async () => {
    let usersArray = []
    const usersCollection = query(collection(db, "users"));
    const querySnapshot = await getDocs(usersCollection);
    querySnapshot.forEach((doc) => {
      usersArray.push(doc.data().handle)
    })
    setListOfUsers(usersArray)
  }
  function handleSearch(){
    if(listOfUsers.includes(searchBarValue)){
        navigate('../profile', {state:{ userId: searchBarValue}});
    }
    else{
        setShowIsNotFound(true)
        setOldSearch(searchBarValue)
    }
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <Header></Header>
      <div className="w-full flex justify-center items-center mt-8">
        <input
          data-testid="EmptyTest"
          type="search"
          className="inline bg-stone-10 border border-gray-300 text-gray-900 w-1/3 text-sm rounded-lg p-2.5 searchBar mr-4"
          placeholder="Search..."
          defaultValue={""}
          onChange={(event) => setSearchBarValue(event.target.value)}
        />
        <button className="border-2 p-2"  onClick={() => {handleSearch()}} >Search!</button>
      </div>
      {showIsNotFound && <div>{oldSearch} is not a user.</div>}
    </div>
  );
}

export default Users;
