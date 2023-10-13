import { useSelector } from "react-redux";
import { IconContext } from "react-icons";
import { BiBarChart } from "react-icons/bi"
import { AiFillPlayCircle} from "react-icons/ai";
import {BsThreeDots} from "react-icons/bs";
import React from "react";
const MusicPlayerList = ({isOpen,currentIndex,changeSong}) => {
    const songList = useSelector((state)=>state.songList.songList); 
    return (
        <div className={`
            ${isOpen ? 'h-[360px]' : 'h-0 pt-0'}
            bottom-[60px] 
            w-1/3 fixed right-0 
            duration-300
            rounded-lg
            flex
            flex-col
            justify-start
            items-center
            pt-3
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
                        bg-white
                        shadow-lg   
                        rounded-md 
                        flex 
                        px-1
                        justify-between
                        items-center
                        text-center
                        h-[40px]
                        w-full
                        duration-300
                        `}>
                        <div className="ml-1">
                            <h2 className='text-black font-serif font-bold text-sm cursor-pointer'>
                                {song.name}
                            </h2>
                            {song.author &&
                                <p className='text-black font-serif text-xs cursor-pointer'>
                                    {song.author}
                                </p>
                            }
                        </div>
                        <div className="flex justify-center items-center gap-1">
                            {currentIndex===songId? 
                                <button>
                                    <IconContext.Provider value={{ size: "2.5em", color: "#27AE60" }}>
                                        <BiBarChart/>
                                    </IconContext.Provider>
                                </button>
                                :
                                <button onClick={()=>changeSong(songId)}>
                                    <IconContext.Provider value={{ size: "2.5em", color: "#27AE60" }}>
                                        <AiFillPlayCircle />
                                    </IconContext.Provider>
                                </button>
                            }   
                            <button>
                                <IconContext.Provider value={{ size: "1em", color: "black" }}>
                                    <BsThreeDots/>
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