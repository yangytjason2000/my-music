import { MdAdd } from 'react-icons/md'
import { AiOutlineArrowLeft} from 'react-icons/ai'
import { IconContext } from "react-icons";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from 'react-router-dom';
import { useExpand } from '../context/ExpandProvider';
import SongRow from './RowComponent/SongRow';
const Album = () => {
    const songList = useSelector((state)=>state.songList.songList); 
    const {expand} = useExpand();
    const {id} = useParams();
    const navigate = useNavigate();
    // Retrieve the data for the ablum by id
    // const [ablum,setAlbum] = useState([]);
    
    // useEffect(() => {
    //     const fetchAlbum = async () => {
    //         try {
    //             const res = await getAlbumById(id); 
    //             if (!res.ok){
    //                 throw new Error('Internal Server Error');
    //             }
    //             const albumData = await res.json(); 
    //             setAlbum(albumData);
    //         } catch (error) {
    //             console.error("Failed to fetch album:", error);
    //         }
    //     };

    //     fetchAlbum();
    // }, [id]);

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
                    <span onClick={()=>navigate(-1)} className='fixed ml-1 mt-1 cursor-pointer'>
                        <IconContext.Provider 
                            value={{ size: "2em", color: "#27AE60" }}>
                            <AiOutlineArrowLeft/>
                        </IconContext.Provider>
                    </span>
                    <div 
                        className='grid grid-cols-1 items-end gap-4 my-2 mx-auto w-[70%]'
                    >
                        {songList.map((song)=>{
                            return (
                                <SongRow key={song.id} albumId={id} song={song}/>
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
                                h-[100px]
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

export default Album;