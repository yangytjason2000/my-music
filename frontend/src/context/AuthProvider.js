import { createContext,useContext,useState, useEffect} from "react";

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);    
}

export const AuthProvider = ({children}) => {
    const [isSignedIn,setIsSignedIn] = useState(false);
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
        <AuthContext.Provider value = {{isSignedIn,setIsSignedIn}}>
            {children}
        </AuthContext.Provider>
    )
}