import toast from "react-hot-toast";

async function registerUser(username, email, password, setSignIn) {
    const apiUrl =process.env.REACT_APP_API_URL+'register/'; 
    const requestBody = {
        username: username,
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
            toast.error('Failed to register');
            throw new Error('Register failed');
        }
        
        const responseData = await response.json();
        setSignIn(true);
        toast.success('Register Success');
        return responseData;
    } 
    catch (error) {
        toast.error('Failed to register');
        console.error('Error register:', error);
        throw error;
    }
}

export default registerUser;