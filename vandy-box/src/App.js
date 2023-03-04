
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home'
import Search from './pages/Search';
import Profile from './pages/Profile';


import Header from './components/ProfileHeader'
import Body from './components/UserProfile';

function App() {
  return (
    <>
       <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/search" element={<Search />} />
    <Route path="/profile" element={<Profile />} />
    </Routes>
    </>

  );
}

export default App;
