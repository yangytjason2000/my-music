import { Link } from "react-router-dom";
import { IconContext } from "react-icons";
import { IoIosAlbums } from "react-icons/io";

const AlbumRow = ({album}) => {
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
    )
}

export default AlbumRow;