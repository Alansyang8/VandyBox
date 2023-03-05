
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home'
import Search from './pages/Search';
import Profile from './pages/Profile';
import LoginPage from './pages/LoginPage';


import Header from './components/ProfileHeader'
import Body from './components/UserProfile';

function App() {
  return (
    <>
       <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/search" element={<Search />} />
    <Route path="/profile" element={<Profile />} />
    <Route path="/login" element={<LoginPage />} />
    </Routes>
    </>

  );
}

export default App;
