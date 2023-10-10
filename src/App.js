import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import MusicPlayer from './components/MusicPlayer';
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path='/' element={<div><Navbar/><Home/><MusicPlayer/></div>}/>
    </Routes>
  );
}

export default App;
