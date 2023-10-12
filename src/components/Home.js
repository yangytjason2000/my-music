import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { changeSongList } from '../reducers/songListReducer';
import data from '../data/data';
import { BiSolidAlbum } from 'react-icons/bi';
import { MdAdd } from 'react-icons/md'
import { IconContext } from "react-icons";
import albumData from '../data/albumdata';
const Home = () => {
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(changeSongList(data))
    },[dispatch])

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
                pb-[90px]
            `}>
                <div className="bg-[#121212] h-full rounded-lg overflow-auto">
                    <div className='grid sm:grid-cols-1 md:grid-cols-4 gap-4 my-2 mx-2'>
                        {albumData.map((album)=>{
                            return (
                            <div
                                key={album.id}
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
                                <span>
                                <IconContext.Provider value={{ size: "5em", color: "#27AE60" }}>
                                    <BiSolidAlbum />
                                </IconContext.Provider>
                                </span>
                            </div>)})
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
                            <span>
                                <IconContext.Provider value={{ size: "3em", color: "gray" }}>
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