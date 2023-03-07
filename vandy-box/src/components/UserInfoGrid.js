import React from 'react'


function UserInfoGrid({ userData, selectedUserInfo }) {
  return (
    <div className="grid grid-cols-4 gap-2">
        {selectedUserInfo == "Fav Movies" && userData.favorites.map((movie) => (
            <div className='flex justify-center items-center h-80'>
                <span className='h-full w-64 flex justify-center items-center border border-yellow-500'>
                    <span className='text-lg font-bold italic'>{movie}</span>
                    </span>
            </div>
        ))}
        {selectedUserInfo == "To Watch" && userData.toWatch.map((movie) => (
            <div className='flex justify-center items-center h-80'>
                <span className='h-full w-64 flex justify-center items-center border border-yellow-500'>
                    <span className='text-lg font-bold italic'>{movie}</span>
                    </span>
            </div>
        ))}
        {selectedUserInfo == "Friends" && userData.friends.map((friend) => (
            <div className='flex justify-center items-center h-80'>
                <span className='h-full w-64 flex justify-center items-center border border-yellow-500'>
                    <span className='text-lg font-bold italic'>{friend}</span>
                    </span>
            </div>
        ))}
        {selectedUserInfo == "Watch Groups" && userData.watchGroups.map((group) => (
            <div className='flex justify-center items-center h-80'>
                <span className='h-full w-64 flex justify-center items-center border border-yellow-500'>
                    <span className='text-lg font-bold italic'>{group}</span>
                    </span>
            </div>
        ))}
    </div>
  )
}

export default UserInfoGrid;