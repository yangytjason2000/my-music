import { useExpand } from "../context/ExpandProvider";
import { useNavigate, useParams } from "react-router-dom";
import { IconContext } from "react-icons";
import { AiOutlineArrowLeft} from 'react-icons/ai'
import { MdAdd } from "react-icons/md";
import trackData from "../data/trackdata";
import Track from "./RowComponent/Track";
const Song = () => {
    const {expand} = useExpand();
    const {songid} = useParams();
    console.log(songid);
    const navigate = useNavigate();

    return (
        <div className=
            {`w-full 
            h-screen 
            flex
            justify-center
            bg-black
            text-black`}>
            <div className={`
                page-container
                ${expand ? 'pb-[90px]' : ''}
            `}>
                <div className="bg-[#121212] h-full rounded-lg overflow-auto relative">
                    <span onClick={()=>navigate(-1)} 
                        className='fixed top-[130px] left-6 cursor-pointer bg-black rounded-full'>
                        <IconContext.Provider 
                            value={{ size: "2em", color: "#27AE60" }}>
                            <AiOutlineArrowLeft/>
                        </IconContext.Provider>
                    </span>
                    <div className='grid grid-cols-1 gap-4 my-2 ml-12 w-[30%]'>
                        {trackData.map((track)=>{
                            return (
                                <Track key = {track.id} track={track}/>
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

export default Song;