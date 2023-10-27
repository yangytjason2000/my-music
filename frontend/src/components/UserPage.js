import { useExpand } from "../context/ExpandProvider";
import { IconContext } from "react-icons";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import ProfileInput from "./Inputs/ProfileInput";
import { useAuth } from "../context/AuthProvider";
import { useQueryClient } from "react-query";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import useUpdateUserMutation from "../hooks/useUpdateUserMutation";

const UserPage = () => {
    const {expand} = useExpand();
    const {setIsSignedIn,user_info} = useAuth();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [userEmail,setUserEmail] = useState("");
    const [initialState,setInitialState] = useState({});
    const [updateDisabled, setUpdateDisabled] = useState(true);

    useEffect(()=> {
        setUserEmail(user_info.email);
        setInitialState({
            email: user_info.email,
        });
    },[user_info]);

    useEffect(()=>{
        if (userEmail!==initialState.email){
            setUpdateDisabled(false);
        }
        else{
            setUpdateDisabled(true);
        }
    },[userEmail,initialState])

    const updateUserMutation = useUpdateUserMutation(queryClient);
    async function handleSaveFile(e){
        e.preventDefault();
        const requestBody = {
            email: userEmail,
        }
        updateUserMutation.mutate(requestBody);
    }
    async function logout(e) {
        e.preventDefault();
        const apiUrl =process.env.REACT_APP_API_URL+'logout/'; 
      
        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: "include",
            });
      
            if (!response.ok) {
                toast.error("Logout failed");
                throw new Error('Logout failed');
            }
            
            const responseData = await response.json();
            setIsSignedIn(false);
            toast.success("Logout Success!");
            queryClient.clear();
            return responseData;
        } 
        catch (error) {
            toast.error("Logout failed!");
            console.error('Logout Error', error);
            throw error;
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
                        <ProfileInput id='profileEmail' name='Email' type='email' autoComplete='on' 
                            value={userEmail} onChange={(e)=>setUserEmail(e.target.value)}/>
                        <div className="pt-4 flex flex-row justify-between items-center">
                            <button onClick={logout}
                                className="bg-red-600 text-white px-3 py-2 rounded-md">
                                Sign out
                            </button>
                            <button disabled={updateDisabled} 
                                onClick={handleSaveFile}
                                className=
                                {`bg-green-600 
                                text-white 
                                px-3 
                                py-2 
                                rounded-md
                                ${(updateDisabled) ? 'opacity-20' : ''}
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