import { Link } from "react-router-dom";
import { IconContext } from "react-icons";
import { IoIosAlbums } from "react-icons/io";
import { BsThreeDotsVertical } from "react-icons/bs";
import fetchAlbumImageById from "../../fetchAPI/fetchAlbumImageById";
import { useQuery } from "react-query";
import { useState } from "react";

const AlbumRow = ({album,handleUpdate,setSelectedAlbum,isSignedIn}) => {
    const {data: album_image = null, isLoading,isError} = useQuery(
        ['album_image',album.id],
        ()=>fetchAlbumImageById(album.id),
        {
            enabled: isSignedIn,
        }
    );

    const noAlbumImage = isLoading || isError || !album_image;
    const [isImageLoaded,setIsImageLoaded] = useState(false);

    const handleClick = () => {
        setSelectedAlbum(album);
        handleUpdate();
    } 
    return (
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
            relative
            `}>    
            <div className='flex flex-col justify-center items-center'>
                <Link key={album.id} to={`/album/${album.id}`}>
                {!noAlbumImage ?
                    <img src={album_image} 
                        onLoad={()=>setIsImageLoaded(true)}
                        alt="album logo" 
                        className={`
                            w-[140px]
                            h-[140px]
                            ${isImageLoaded ? 'opacity-100' : 'opacity-0'}
                            duration-1000
                        `}>
                    </img> :
                    <span>
                        <IconContext.Provider 
                            value={{ size: "140px", color: "#27AE60" }}>
                            <IoIosAlbums/>
                        </IconContext.Provider>
                    </span>}
                </Link>
                <button onClick={handleClick} type='button' 
                    className="absolute top-0 right-0 pt-2 pr-2">
                    <IconContext.Provider 
                        value={{ size: "1.5em", color: 'black' }}>
                        <BsThreeDotsVertical/>
                    </IconContext.Provider>
                </button>   
                <h2 className='text-black font-serif font-bold text-md'>
                    {album.name}
                </h2>
                {album.owner_name &&
                    <p className='text-black font-serif text-sm border-black hover:border-b-2'>
                        {album.owner_name}
                    </p>
                }
            </div>
        </div>
    )
}

export default AlbumRow;