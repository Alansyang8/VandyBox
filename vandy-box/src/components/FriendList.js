import SuzyBaePic from "../assets/SuzyBaePic.png";

function FriendList() {
    return (
      <>  
      <div className="">
        <div className="flex justify-center items-center h-80">
            <div className="h-full w-64 flex justify-center items-center bg-lime-100 rounded-lg py-3">
            {/*}
            <div class="flex justify-center photo-wrapper mt-10 ml-100 p-2">
              <img class="w-20 h-20 rounded-full mx-auto" src={SuzyBaePic}/>
            </div>
            */}
              <div class="p-2">
                  <h3 class="text-center text-xl text-gray-900 font-medium leading-8">Elle Choi</h3>
                  <div class="text-center text-gray-400 text-xs font-semibold">
                      <p>@ellechoi</p>
                  </div>
                  <table class="text-xs my-3">
                      <tbody><tr>
                          <td class="px-2 py-2 text-gray-500 font-semibold">Status</td>
                          <td class="px-2 py-2">hi hello hola</td>
                      </tr>
                      <tr>
                          <td class="px-2 py-2 text-gray-500 font-semibold">Info</td>
                          <td class="px-2 py-2">movie enthusiast</td>
                      </tr>
                  </tbody></table>
                  {/* Click this to get to another friend's user profile */}
                  <div class="text-center my-3">
                      <a class="text-xs text-indigo-500 italic hover:underline hover:text-indigo-600 font-medium" href="#">View Profile</a>
                  </div>

              </div>
          </div>
                </div>
            </div>
            </>      
    );
  }

  export default FriendList; 