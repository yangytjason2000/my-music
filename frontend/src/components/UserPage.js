import { useExpand } from "../context/ExpandProvider";
import { IconContext } from "react-icons";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import ProfileInput from "./Inputs/ProfileInput";

const UserPage = () => {
    const {expand} = useExpand();
    const navigate = useNavigate();
    return (
        <div className=
            {`w-full 
            h-screen 
            flex
            justify-center
            items-center
            bg-black
            text-black`}>
            <div className={`
                w-[98%]
                h-screen
                pt-[120px]
                ${expand ? 'pb-[90px]' : ''}
                duration-300
            `}>
                <div className="bg-[#121212] h-full rounded-lg overflow-auto flex justify-center items-start pt-10 relative">
                    <span onClick={()=>navigate(-1)} 
                        className='absolute top-2 left-4 cursor-pointer bg-black rounded-full'>
                        <IconContext.Provider 
                            value={{ size: "2em", color: "#27AE60" }}>
                            <AiOutlineArrowLeft/>
                        </IconContext.Provider>
                    </span>
                    <form className='flex flex-col max-w-[600px] w-full text-white'>
                        <div>
                            <p className="text-4xl font-bold font-serif pb-4">Profile</p>
                        </div>
                        <div>
                            <label
                                className="
                                    block
                                    pt-2
                                    font-bold
                                    text-white
                                    font-serif
                                "
                            >
                                Username
                            </label>
                            <p className="block pt-2 text-sm text-white pb-4">
                                username
                            </p>
                        </div>
                        <ProfileInput id='profileEmail' name='Email' type='email' autoComplete='on' 
                            value='test@test.com'/>
                        <div className="pt-4 flex flex-row justify-between items-center">
                            <button className="bg-red-600 text-white px-3 py-2 rounded-md">
                                Sign out
                            </button>
                            <button className="bg-green-600 text-white px-3 py-2 rounded-md">
                                Save Profile
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default UserPage;