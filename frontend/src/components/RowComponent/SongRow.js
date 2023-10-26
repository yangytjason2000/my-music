import { Link } from "react-router-dom";
import { IconContext } from "react-icons";
import {AiFillPlayCircle } from "react-icons/ai";
import { BiSolidAlbum } from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Fragment } from "react";

const SongRow = ({albumId, song, handleUpdate, setSelectedSong}) => {
    const handleClick = () => {
        setSelectedSong(song);
        handleUpdate();
    }
    return (
        <div
            key = {song.id}
            className={`
                bg-white
                shadow-lg 
                container 
                rounded-md 
                flex 
                justify-between
                items-center
                text-center
                h-[80px]
                duration-300
                gap-2
            `}>
            <Link key={song.id} to={`/album/${albumId}/${song.id}`}>
                <div className='flex flex-row justify-center items-center'>
                    <span>
                        <IconContext.Provider 
                            value={{ size: "3em", color: "#27AE60" }}>
                            <BiSolidAlbum/>
                        </IconContext.Provider>
                    </span>
                    <div>
                        <h2 className='text-black font-serif font-bold text-md'>
                            {song.name}
                        </h2>
                        {song.artists &&
                            <div className="flex flex-row">
                                {(song.artists).map((artist,index)=> {return (
                                    <Fragment key={index}>
                                        <span className='text-black font-serif text-sm border-black hover:border-b-2'>
                                            {artist}
                                        </span>
                                        {index!==song.artists.length-1 && <span>,</span>}
                                    </Fragment>
                                    )}
                                )}
                            </div>
                        }
                    </div>
                </div>
            </Link>
            <div className="flex flex-row justify-center items-center">
                <button className='pr-4'>
                    <IconContext.Provider value={{ className: 'shadow-icon', size: "3em", color: "#27AE60" }}>
                        <AiFillPlayCircle className="hover:scale-110 duration-300"/>
                    </IconContext.Provider>
                </button>
                <button onClick={handleClick} type='button' 
                    className="">
                    <IconContext.Provider 
                        value={{ size: "1.5em", color: 'black' }}>
                        <BsThreeDotsVertical className="hover:scale-[130%] duration-300"/>
                    </IconContext.Provider>
                </button>   
            </div>
        </div>
    );
}

export default SongRow;
