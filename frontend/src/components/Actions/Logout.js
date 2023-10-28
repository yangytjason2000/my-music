import toast from "react-hot-toast";

async function logout(e,setIsSignedIn,queryClient) {
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

export default logout;