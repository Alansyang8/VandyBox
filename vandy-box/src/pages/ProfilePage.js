import React, { useState } from 'react'
import { useLoaderData } from "react-router-dom";

const ProfilePage = () => {
    const userData = useLoaderData();
    const [userName, setUserName] = useState();
    const [userImage, setUserImage] = useState();
    const [userFavorites, setUserFavorites] = useState([]);

  return (
    <div className='flex flex-col justify-center items-center'>
        <div className='flex flex-col p-4 border border-black space-y-4'>
            <span className='font-bold text-xl'>Pulled user info</span>
            <hr/>
            <span className='font-bold'>Name: {userData.name}</span>
            <span className='font-bold'>Friends: {userData.friends.map((friend) => (
                <div className='font-normal'>{friend}</div>
            ))}</span>
            <hr/>
            <span className='font-bold'>Favorites: {userData.favorites.map((movie) => (
                <div className='font-normal'>{movie}</div>
            ))}</span>
            <hr/>
            <span className='font-bold'>To-watch: {userData.toWatch.map((movie) => (
                <div className='font-normal'>{movie}</div>
            ))}</span>
        </div>
        
        
        <div className='mt-10 space-x-4'>
            <input className='border border-black p-2 rounded-md' type="text" placeholder="add to favorites" required></input>
            <button className='bg-gray-200 border-black border rounded-md p-2'>Add</button>
        </div>
        <div className=' space-x-4'>
            <input className='border border-black p-2 rounded-md' type="text" placeholder="add to friends" required></input>
            <button className='bg-gray-200 border-black border rounded-md p-2'>Add</button>
        </div>
        <div className=' space-x-4'>
            <input className='border border-black p-2 rounded-md' type="text" placeholder="add to to-watch" required></input>
            <button className='bg-gray-200 border-black border rounded-md p-2'>Add</button>
        </div>
    </div>
  )
}

export default ProfilePage;