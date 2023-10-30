import { MdAdd } from 'react-icons/md'
import { AiOutlineArrowLeft} from 'react-icons/ai'
import { IconContext } from "react-icons";
import { useNavigate, useParams } from 'react-router-dom';
import { useExpand } from '../context/ExpandProvider';
import SongRow from './RowComponent/SongRow';
import { useState } from 'react';
import AddSongModal from './Modal/AddSongModal';
import fetchSongList from '../fetchAPI/fetchSongList';
import { useQuery } from 'react-query';
import { useAuth } from '../context/AuthProvider';
import fetchAlbumById from '../fetchAPI/fetchAlbumById';
const Album = () => {
    const [modalVisible,setModalVisible] = useState(false);
    const {expand} = useExpand();
    const {id} = useParams();
    const [selectedSong,setSelectedSong] = useState(null);
    const [isAdd,setIsAdd] = useState(false)
    //fetch song list based on id
    const {isSignedIn} = useAuth();
    const {data: album = []} = useQuery(['album',id],()=>fetchAlbumById(id), {enabled: isSignedIn});
    const {data: songList = []} = useQuery(['songs',id],()=>fetchSongList(id), {enabled: isSignedIn});
    const navigate = useNavigate();

    const handleAdd = () => {
        setIsAdd(true);
        setModalVisible(true);
    }

    const handleUpdate = () => {
        setIsAdd(false);
        setModalVisible(true);
    }

    return (
        <div className=
            {`w-full 
            h-screen 
            flex
            justify-center
            bg-black
            text-black`}>
            <div className={`
                page-container
                ${expand ? 'pb-[90px]' : ''}
            `}>
                <div className="bg-[#121212] h-full rounded-lg overflow-auto relative">
                    <span onClick={()=>navigate(-1)} 
                        className='fixed top-[130px] left-6 cursor-pointer bg-black rounded-full'
                    >
                        <IconContext.Provider 
                            value={{ size: "2em", color: "#27AE60" }}>
                            <AiOutlineArrowLeft/>
                        </IconContext.Provider>
                    </span>
                    <h1 className='text-white py-2 text-5xl text-center font-serif'>
                        {album ? album.name : ''}
                    </h1>
                    <div 
                        className='grid grid-cols-1 items-end gap-3 my-2 mx-auto w-[70%]'
                    >
                        {songList.map((song)=>{
                            return (
                                <SongRow key={song.id} 
                                    albumId={id} 
                                    song={song} 
                                    handleUpdate={handleUpdate}
                                    setSelectedSong={setSelectedSong}/>
                            )})
                        }
                        <AddSongModal 
                            visible={modalVisible} 
                            onClose={()=>setModalVisible(false)} 
                            id={Number(id)} 
                            song={selectedSong}
                            isAdd={isAdd}
                        />
                        <div
                            className={`
                                bg-white
                                shadow-lg 
                                container 
                                rounded-md 
                                flex 
                                mx-auto
                                justify-center 
                                items-center
                                text-center
                                h-[100px]
                            `}>
                            <span onClick={handleAdd} 
                                className='hover:scale-[110%] duration-300 cursor-pointer'>
                                <IconContext.Provider value={{ size: "5em", color: "gray" }}>
                                    <MdAdd />
                                </IconContext.Provider>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Album;