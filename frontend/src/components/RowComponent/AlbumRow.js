import { Link } from "react-router-dom";
import { IconContext } from "react-icons";
import { IoIosAlbums } from "react-icons/io";

const AlbumRow = ({album, image}) => {
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
                    {image ? 
                    <img src={image} alt="album logo" className="w-[140px] h-[140px]"></img> :
                    <span>
                        <IconContext.Provider 
                            value={{ size: "5em", color: "#27AE60" }}>
                            <IoIosAlbums/>
                        </IconContext.Provider>
                    </span>
}
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
        </Link>
    )
}

export default AlbumRow;