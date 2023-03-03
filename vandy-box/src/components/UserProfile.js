import SuzyBaePic from "../assets/SuzyBaePic.png";

function UserProfile() {
    return (
      <div>
      <div class="flex items-center p-4 w-full">
        <div className="flex  flex-col">
          {/* User Information Section */}
          <div class="relative flex flex-col items-center w-80 h-60">
            <div class="h-40 w-40 md rounded-full relative avatar flex items-end justify-end text-purple-600 min-w-max absolute -top-16 flex bg-purple-200 text-purple-100 row-start-1 row-end-3 text-purple-650 ring-1 ring-white">
            <img class="h-40 w-40 md rounded-full relative" src={SuzyBaePic} alt=""></img>
            <div class="absolute"></div>
          </div>
        <div class="flex flex-col space-y-1 justify-center items-left -mt-12 w-80">
          <span class="font-bold text-xl text-center text-gray-800 hover:text-lime-500 hover:cursor-pointer ">Suzy Bae</span>
          <p class="text-gray-600 text-sm text-center">@baee_2024</p>
          <p class="text-black-600 text-sm text-center">Class of 2024, Computer Science</p>
          <p class="text-black-600 text-sm text-center">horror movie enthusiast 👻</p>
          
        {/* Follow & Message Buttons */}
        <div class="flex flex-row justify-center font-semibold mx-auto my-4 w-40">
          <div class="my-auto text-white bg-lime-500 hover:bg-lime-600 hover:cursor-pointer rounded-3xl py-2 px-4 mx-2">Follow</div>
          <div class="my-auto text-gray-800 py-1 px-4 border-2 border-lime-500 hover:bg-lime-500 hover:cursor-pointer hover:text-white rounded-3xl mx-2">Message</div>
        </div>
        </div>
      </div> 
       
      </div>
      {/* User TOP 3 Favorite Movies Display */}
      <div class="flex flex-row h-60 w-full justify-end"> 
            <div class="flex flex-row bg-lime-100 justify-center my-6 w-2/5 h-4/5 rounded-xl mr-8">
              <div class="my-auto text-gray-800 border-2 border-yellow-500 py-12 px-8 mx-2">m1</div>
              <div class="my-auto text-gray-800 border-2 border-yellow-500 py-12 px-8 mx-2">m2</div>
              <div class="my-auto text-gray-800 border-2 border-yellow-500 py-12 px-8 mx-2">m3</div>
            </div>
      </div>
    </div>  

    {/* Bottom Tabs Section */}
    {/* Fav Movies, To Watch, Friends, Watch Groups */}
    <div class="text-sm flex flex-row w-full justify-center font-medium text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700 mt-20">
              <div class="flex -mb-px w-full">
                  <div class="mr-2 w-1/4">
                      <a href="#" class="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300">Fav Movies</a>
                  </div>
                  <div class="mr-2 w-1/4">
                      <a href="#" class="inline-block p-4 text-lime-600 border-b-2 border-lime-600 rounded-t-lg active dark:text-lime-500 dark:border-lime-500" aria-current="page">To Watch</a>
                  </div>
                  <div class="mr-2 w-1/4">
                      <a href="#" class="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300">Friends</a>
                  </div>
                  <div class="mr-2 w-1/4">
                      <a href="#" class="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300">Watch Groups</a>
                  </div>
              </div>
          </div>
     </div>
         
 );

}

export default UserProfile;