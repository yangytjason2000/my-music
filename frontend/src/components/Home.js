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
                            <Link key={album.id} to={`/album/${album.id}`}>
                            <div
                                className={`
                                bg-white
                                shadow-lg 
                                container 
                                rounded-md 
                                flex
                                flex-col
                                mx-auto
                                justify-center 
                                items-center
                                text-center
                                h-[200px]
                                hover:scale-[102%]
                                duration-300
                                `}>
                                <div className='flex flex-col justify-center items-center'>
                                    <span>
                                    <IconContext.Provider 
                                        value={{ size: "5em", color: "#27AE60" }}>
                                        <IoIosAlbums/>
                                    </IconContext.Provider>
                                    </span>
                                    <h2 className='text-black font-serif font-bold text-md'>
                                        {album.name}
                                    </h2>
                                    {album.author &&
                                        <p className='text-black font-serif text-sm border-black hover:border-b-2'>
                                            {album.author}
                                        </p>
                                    }
                                </div>
                            </div>
                            </Link>
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