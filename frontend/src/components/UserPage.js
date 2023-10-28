import { useExpand } from "../context/ExpandProvider";
import { IconContext } from "react-icons";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import ProfileInput from "./Inputs/ProfileInput";
import { useAuth } from "../context/AuthProvider";
import { useQueryClient } from "react-query";
import toast from "react-hot-toast";
import FileInput from "./Inputs/FileInput";
import { useEffect, useRef, useState } from "react";
import useUpdateUserMutation from "../hooks/useUpdateUserMutation";
import useUpdateUserImageMutation from "../hooks/useUpdateUserImageMutation";
import logout from "./Actions/Logout";

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
    // Handle image file upload
    const handleImageSubmit = (e) => {
        const file = e.target.files[0];

        if (!isSignedIn) {
            toast.error('You must sign in to upload image!');
            fileRef.current.value = "";
            return;
        }
        if (file) {
            const fileType = file['type'];
            const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];

            if (validImageTypes.includes(fileType)){
                const reader = new FileReader();
                reader.onloadend = () => {
                    setImagePreview(reader.result);
                }
                reader.readAsDataURL(file);

                setImage(file);
                setImageChanged(true);
            }
            else {
                if (fileRef.current) {
                    fileRef.current.value = "";
                }
                alert("Error: Please upload a valid image file (e.g., jpg, gif, png).");
            }
        }
    }

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
            updateUserMutation.mutate(requestBody);
            setInfoChanged(false);
        }
        if (imageChanged) {
            updateUserImageMutation.mutate(formData);
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
                w-[98%]
                h-screen
                pt-[120px]
                ${expand ? 'pb-[90px]' : ''}
                duration-300
                overflow-auto
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
                                {user_info.username}
                            </p>
                        </div>
                        <FileInput 
                            ref = {fileRef}
                            id='userimage'
                            name='User Avatar'
                            type='file'
                            onChange={handleImageSubmit}
                            imagePreview={imagePreview}
                        />
                        <ProfileInput id='profileEmail' name='Email' type='email' autoComplete='on' 
                            value={userEmail} onChange={(e)=>setUserEmail(e.target.value)}/>
                        <div className="pt-4 flex flex-row justify-between items-center">
                            <button onClick={(e)=>logout(e,setIsSignedIn,queryClient)}
                                className="bg-red-600 text-white px-3 py-2 rounded-md">
                                Sign out
                            </button>
                            <button disabled={infoChanged && imageChanged} 
                                onClick={handleSaveFile}
                                className=
                                {`bg-green-600 
                                text-white 
                                px-3 
                                py-2 
                                rounded-md
                                ${(!infoChanged && !imageChanged) ? 'opacity-20' : ''}
                                `}>
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