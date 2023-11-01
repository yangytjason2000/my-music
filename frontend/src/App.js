import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Contact from './components/ContactMe';
import Album from './components/Album';
import MusicPlayer from './components/MusicPlayer';
import { Route, Routes } from "react-router-dom";
import Song from './components/Song';
import LoginPage from './components/LoginPage';
import UserPage from './components/UserPage';
import ProtectedRoute from './ProtectedRoute';
import { Toaster } from 'react-hot-toast';

function MainLayout() {
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route index element={<Home/>}/>
        <Route path='/user_page' 
          element={<ProtectedRoute redirectTo='/' authenticated={true}><UserPage/></ProtectedRoute>}
        />
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
      <Toaster
        position='top-center'
        toastOptions={{
          style: {
            zIndex: 9999,
          },
        }}
      />
      <Routes>
        <Route path='*' element={<MainLayout/>}/>
        <Route path='/login' 
          element={<ProtectedRoute redirectTo='/' authenticated={false}><LoginPage/></ProtectedRoute>}
        />
      </Routes>
    </div>
  );
}

export default App;
