import { useExpand } from "../context/ExpandProvider";
import { useNavigate, useParams } from "react-router-dom";
import { IconContext } from "react-icons";
import { AiOutlineArrowLeft } from 'react-icons/ai'
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
                    <span onClick={()=>navigate(-1)}className='fixed ml-1 mt-1 cursor-pointer'>
                        <IconContext.Provider 
                            value={{ size: "2em", color: "#27AE60" }}>
                            <AiOutlineArrowLeft/>
                        </IconContext.Provider>
                    </span>
                </div>
            </div>
        </div>
    );
}

export default Song;