import { createContext,useContext,useState, useEffect} from "react";
import { useQuery } from "react-query";
import fetchUserInfo from "../fetchAPI/fetchUserInfo";
import fetchUserImage from "../fetchAPI/fetchUserImage";

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);    
}

export const AuthProvider = ({children}) => {
    const [isSignedIn,setIsSignedIn] = useState(false);
    const { data: user_info = {username: "", email: ""}} = useQuery('user_info', fetchUserInfo, {enabled: isSignedIn});
    const { data: user_image = null} = useQuery('user_image',fetchUserImage,{enabled: isSignedIn});
    useEffect(()=>{
        async function fetchStatus(){
            const apiUrl =process.env.REACT_APP_API_URL+'user_status/';
            try {
                const response = await fetch(apiUrl, {
                    method: 'GET',
                    credentials: "include",
                });
          
                if (!response.ok) {
                    throw new Error('Fetch status failed');
                }
                const responseData = await response.json();
                setIsSignedIn(responseData['status']);
                } 
            catch (error) {
                console.error(error);
                setIsSignedIn(false);
            }
        }
        fetchStatus();
    },[]);
    return (
        <AuthContext.Provider value = {{isSignedIn,setIsSignedIn,user_info,user_image}}>
            {children}
        </AuthContext.Provider>
    )
}