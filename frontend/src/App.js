import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Contact from './components/ContactMe';
import Album from './components/Album';
import MusicPlayer from './components/MusicPlayer';
import { Route, Routes } from "react-router-dom";
import Song from './components/Song';
import Login from './components/Login';

function MainLayout() {
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route exact path='/' element={<Home/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/album/:id' element={<Album/>}/>
        <Route path='album/:id/:songid' element={<Song/>}/>
      </Routes>
      <MusicPlayer/>
    </div>
  )
}

function App() {
  return (
    <div>
      <Routes>
        <Route path='*' element={<MainLayout/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
    </div>
  );
}

export default App;
