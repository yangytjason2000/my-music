import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Contact from './components/ContactMe';
import MusicPlayer from './components/MusicPlayer';
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/contact' element={<Contact/>}/>
      </Routes>
      <MusicPlayer/>
    </div>
  );
}

export default App;
