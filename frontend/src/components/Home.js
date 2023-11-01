import { useState } from 'react';
import { MdAdd } from 'react-icons/md'
import { IconContext } from "react-icons";

import { useExpand } from '../context/ExpandProvider';
import AlbumRow from './RowComponent/AlbumRow';
import AddAlbumModal from './Modal/AddAlbumModal';
import { useQuery } from 'react-query';
import fetchAlbumList from '../fetchAPI/fetchAlbumList';
import { useAuth } from '../context/AuthProvider';

const Home = () => {
    const {isSignedIn} = useAuth();
    const [selectedAlbum, setSelectedAlbum] = useState(null);
    const [selectedAlbumImage,setSelectedAlbumImage] = useState(null);
    const {data: albums = []} = useQuery('albums',fetchAlbumList, {enabled: isSignedIn});
    const [modalVisible,setModalVisible] = useState(false);
    const [isAdd,setIsAdd] = useState(false);
    const {expand} = useExpand();
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
                <div className="bg-[#121212] h-full rounded-lg overflow-auto">
                    <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-2 mx-2'>
                        {albums.map((album,index)=>{
                            return (
                                <AlbumRow 
                                    key={index} 
                                    album={album} 
                                    handleUpdate={handleUpdate}
                                    setSelectedAlbum={setSelectedAlbum}
                                    setSelectedAlbumImage={setSelectedAlbumImage}
                                    isSignedIn={isSignedIn}/> 
                            )})
                        }
                        <AddAlbumModal 
                            visible={modalVisible} 
                            onClose={()=>setModalVisible(false)} 
                            album={selectedAlbum}
                            albumImage={selectedAlbumImage}
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
                                h-[200px]
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

export default Home;