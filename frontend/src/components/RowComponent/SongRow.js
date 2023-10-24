import { Link } from "react-router-dom";
import { IconContext } from "react-icons";
import {AiFillPlayCircle } from "react-icons/ai";
import { BiSolidAlbum } from "react-icons/bi";
import { Fragment } from "react";

const SongRow = ({albumId, song}) => {
    return (
        <Link key={song.id} to={`/album/${albumId}/${song.id}`}>
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
                    hover:scale-[102%]
                    duration-300
                    cursor-pointer
                    gap-2
                `}>
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
                <button className='pr-4'>
                    <IconContext.Provider value={{ size: "3em", color: "#27AE60" }}>
                        <AiFillPlayCircle />
                    </IconContext.Provider>
                </button>
            </div>
        </Link>
    );
}

export default SongRow;
