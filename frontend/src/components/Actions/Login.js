import toast from "react-hot-toast";

async function signInUser(email, password,setIsSignedIn) {
    const apiUrl =process.env.REACT_APP_API_URL+'login/'; 
    const requestBody = {
      email: email,
      password: password,
    };
    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: "include",
            body: JSON.stringify(requestBody),
        });
  
        if (!response.ok) {
            toast.error(`Failed to sign in`);
            throw new Error('Sign-in failed');
        }
  
        const responseData = await response.json();
        setIsSignedIn(true);
        toast.success('Sign In Success');
        return responseData;
    } 
    catch (error) {
        toast.error(`Failed to sign in`);
        console.error('Error signing in:', error);
        throw error;
    }
}

export default signInUser;