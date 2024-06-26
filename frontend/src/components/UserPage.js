import { useExpand } from "../context/ExpandProvider";
import { IconContext } from "react-icons";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import ProfileInput from "./Inputs/ProfileInput";
import { useAuth } from "../context/AuthProvider";
import { useQueryClient } from "react-query";
import ImageInput from "./Inputs/ImageInput";
import { useEffect, useRef, useState } from "react";
import useUpdateUserMutation from "../hooks/UserHook/useUpdateUserMutation";
import useUpdateUserImageMutation from "../hooks/UserHook/useUpdateUserImageMutation";
import logout from "./Actions/Logout";
import handleImageSubmit from "./Actions/HandleImageSubmit";

const UserPage = () => {
    const fileRef = useRef();
    const {expand} = useExpand();
    const {isSignedIn,setIsSignedIn,user_info,user_image} = useAuth();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [userEmail,setUserEmail] = useState("");
    const [initialState,setInitialState] = useState({});
    const [infoChanged, setInfoChanged] = useState(false);

    const [imageChanged,setImageChanged] = useState(false);
    const [imagePreview,setImagePreview] = useState(user_image);
    const [image,setImage] = useState(null);

    // Initialize user info and user image
    useEffect(()=> {
        setUserEmail(user_info.email);
        setInitialState({
            email: user_info.email,
        });
    },[user_info.email]);

    // Check whether the info has been changed
    useEffect(()=>{
        if (userEmail!==initialState.email){
            setInfoChanged(true);
        }
        else{
            setInfoChanged(false);
        }
    },[userEmail,initialState])

    const updateUserMutation = useUpdateUserMutation(queryClient);
    const updateUserImageMutation = useUpdateUserImageMutation(queryClient);

    async function handleSaveFile(e){
        e.preventDefault();
        const requestBody = {
            email: userEmail,
        }
        const formData = new FormData();
        formData.append('image',image);
        if (infoChanged){
            updateUserMutation(requestBody);
            setInfoChanged(false);
        }
        if (imageChanged) {
            updateUserImageMutation(formData);
            setImageChanged(false);
            fileRef.current.value="";
        }
    }

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
                page-container
                ${expand ? 'pb-[90px]' : ''}
            `}>
                <div className="bg-[#121212] h-full rounded-lg overflow-auto flex justify-center items-start pt-10 relative">
                    <span onClick={()=>navigate(-1)} 
                        className='fixed top-[130px] left-6 cursor-pointer bg-black rounded-full'
                    >
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
                                {user_info.username}
                            </p>
                        </div>
                        <ImageInput 
                            ref = {fileRef}
                            id='userimage'
                            name='User Avatar'
                            type='file'
                            onChange={(e)=>handleImageSubmit(
                                e,
                                isSignedIn,
                                setImagePreview,
                                setImage,
                                setImageChanged,
                                fileRef
                            )}
                            imagePreview={imagePreview}
                        />
                        <ProfileInput id='profileEmail' name='Email' type='email' autoComplete='on' 
                            value={userEmail} onChange={(e)=>setUserEmail(e.target.value)}/>
                        <div className="pt-4 flex flex-row justify-between items-center">
                            <button onClick={(e)=>logout(e,setIsSignedIn,queryClient)}
                                className="bg-red-600 text-white px-3 py-2 rounded-md">
                                Sign out
                            </button>
                            <button disabled={!infoChanged && !imageChanged} 
                                onClick={handleSaveFile}
                                className={`
                                    bg-green-600 
                                    text-white 
                                    px-3 
                                    py-2 
                                    rounded-md
                                    ${(!infoChanged && !imageChanged) ? 'opacity-20' : ''}
                                `}
                            >
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