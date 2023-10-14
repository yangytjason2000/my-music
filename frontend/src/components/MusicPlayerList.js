import { useSelector } from "react-redux";
import { IconContext } from "react-icons";
import { BiBarChart } from "react-icons/bi"
import { AiFillPlayCircle} from "react-icons/ai";
import {BsThreeDots} from "react-icons/bs";
import React from "react";
import { Link } from "react-router-dom";
const MusicPlayerList = ({isOpen,currentIndex,changeSong}) => {
    const songList = useSelector((state)=>state.songList.songList); 
    return (
        <div className={`
            ${isOpen ? 'h-[360px] pt-3' : 'h-0 pt-0'}
            bottom-[60px] 
            w-1/3 fixed right-0 
            duration-300
            rounded-lg
            flex
            flex-col
            justify-start
            items-center
            px-4 
            mb-4
            bg-gray-700
            overflow-x-hidden
            overflow-y-auto`
        }>
            <div className='grid grid-cols-1 gap-2 my-2 mx-2 w-full'>
                {songList.map((song,songId)=>{
                    return (
                    <div
                        key = {songId}
                        className={`
                        shadow-lg   
                        rounded-md 
                        flex 
                        px-1
                        justify-between
                        items-center
                        text-center
                        h-[40px]
                        w-full
                        hover:scale-[102%]
                        duration-300
                        `}>
                        <div className="ml-1">
                            <Link to={`album/${song.album}`}>
                                <h2
                                    className='text-white font-serif font-bold text-sm cursor-pointer inline hover:border-b-2'>
                                    {song.name}
                                </h2>
                            </Link>
                            {song.author &&
                                <p className='text-white font-serif text-xs cursor-pointer hover:border-b-2'>
                                    {song.author}
                                </p>
                            }
                        </div>
                        <div className="flex justify-center items-center gap-1">
                            {currentIndex===songId? 
                                <button>
                                    <IconContext.Provider value={{ size: "1.5em", color: "#27AE60" }}>
                                        <BiBarChart/>
                                    </IconContext.Provider>
                                </button>
                                :
                                <button onClick={()=>changeSong(songId)}>
                                    <IconContext.Provider value={{ size: "1.5em", color: "#27AE60" }}>
                                        <AiFillPlayCircle />
                                    </IconContext.Provider>
                                </button>
                            }   
                            <button>
                                <IconContext.Provider value={{ size: "1em", color: "white" }}>
                                    <BsThreeDots />
                                </IconContext.Provider>
                            </button>        
                        </div>
                    </div>
                    )})
                }
            </div>
        </div>
    );
}

export default React.memo(MusicPlayerList);