import { useExpand } from "../context/ExpandProvider";
import { useNavigate, useParams } from "react-router-dom";
import { IconContext } from "react-icons";
import { AiOutlineArrowLeft, AiFillPlayCircle} from 'react-icons/ai'
import { MdAdd } from "react-icons/md";
import trackData from "../data/trackdata";
import TrackLabel from "./TrackLabel";
const Song = () => {
    const {expand} = useExpand();
    const {songid} = useParams();
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
                        className='grid grid-cols-1 items-end gap-4 my-2 ml-12 w-[30%]'
                    >
                        {trackData.map((track)=>{
                            return (
                            <div
                                key = {track.id}
                                className={`
                                bg-white
                                shadow-lg 
                                container 
                                rounded-md 
                                flex 
                                justify-start
                                items-center
                                text-center
                                h-[100px]
                                hover:scale-[102%]
                                duration-300
                                cursor-pointer
                                gap-2
                            `}>
                                <TrackLabel track={track}/>
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

export default Song;