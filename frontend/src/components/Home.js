import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { changeSongList } from '../reducers/songListReducer';
import data from '../data/data';
import { IoIosAlbums } from 'react-icons/io';
import { MdAdd } from 'react-icons/md'
import { IconContext } from "react-icons";
import albumData from '../data/albumdata';
import { Link } from 'react-router-dom';
import { useExpand } from '../context/ExpandProvider';
import AlbumRow from './RowComponent/AlbumRow';

const Home = () => {
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(changeSongList(data))
    },[dispatch])

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
                        {albumData.map((album)=>{
                            return (
                                <AlbumRow key={album.id} album={album}/> 
                            )})
                        }
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
                            <span className='hover:scale-[110%] duration-300 cursor-pointer'>
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