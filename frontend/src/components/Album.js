import { BiSolidAlbum } from 'react-icons/bi';
import { MdAdd } from 'react-icons/md'
import { IconContext } from "react-icons";
import { useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { useExpand } from '../context/ExpandProvider';
const Album = () => {
    const songList = useSelector((state)=>state.songList.songList); 
    const {expand, setExpand} = useExpand();
    const {id} = useParams();
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
                    <div className='grid sm:grid-cols-1 md:grid-cols-1 gap-4 my-2 mx-4 w-[70%]'>
                        {songList.map((song)=>{
                            return (
                            <div
                                key = {song.id}
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
                                hover:scale-[102%]
                                duration-300
                                `}>
                                <span>
                                <IconContext.Provider 
                                    value={{ size: "5em", color: "#27AE60" }}>
                                    <BiSolidAlbum/>
                                </IconContext.Provider>
                                </span>
                            </div>
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