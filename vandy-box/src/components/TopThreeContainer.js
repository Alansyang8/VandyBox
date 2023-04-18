import React from 'react'

{/* Container for Top 3 Movie List in user profile */}
const TopThreeContainer = ({ children }) => {
  return (
    <div className="flex flex-row bg-lime-100 justify-center my-6 w-2/5 h-4/5 rounded-xl mr-8 p-8">{children}</div>
  );
}

export default TopThreeContainer;