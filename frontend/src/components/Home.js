import { useState } from 'react';
import { MdAdd } from 'react-icons/md'
import { IconContext } from "react-icons";

import { useExpand } from '../context/ExpandProvider';
import AlbumRow from './RowComponent/AlbumRow';
import AddAlbumModal from './Modal/AddAlbumModal';
import { useQuery } from 'react-query';
import fetchAlbumList from '../fetchAPI/fetchAlbumList';

const Home = () => {
    const [selectedAlbum, setSelectedAlbum] = useState(null);
    const {data: albums = []} = useQuery('albums',fetchAlbumList);
    const [addAlbumVisible,setAddAlbumVisible] = useState(false);
    const [changeAlbumVisible,setChangeAlbumVisible] = useState(false);
    const {expand} = useExpand();

    return (
        <div className=
            {`w-full 
            h-screen 
            flex
            justify-center
            bg-black
            text-black`}>
            <div className={`
                w-[98%]
                h-screen
                pt-[120px]
                ${expand ? 'pb-[90px]' : ''}
                duration-300
            `}>
                <div className="bg-[#121212] h-full rounded-lg overflow-auto">
                    <div className='grid sm:grid-cols-1 md:grid-cols-4 gap-4 my-2 mx-2'>
                        {albums.map((album,index)=>{
                            return (
                                <AlbumRow 
                                    key={index} 
                                    album={album} 
                                    setAlbumDetailsVisible={setChangeAlbumVisible}
                                    setSelectedAlbum={setSelectedAlbum}/> 
                            )})
                        }
                        <AddAlbumModal 
                            visible={changeAlbumVisible} 
                            onClose={()=>setChangeAlbumVisible(false)} 
                            album={selectedAlbum}
                            isAdd={false}
                        />
                        <AddAlbumModal 
                            visible={addAlbumVisible} 
                            onClose={()=>setAddAlbumVisible(false)}
                            isAdd={true}
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
                            <span onClick={()=>setAddAlbumVisible(!addAlbumVisible)} 
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