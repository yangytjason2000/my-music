import { useState, useEffect } from "react";
import { IconContext } from "react-icons";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import Button from "./Buttons/button";
import Input from "./Input";

const Login = () => {
    const navigate = useNavigate();
    const [signIn, setSignIn] = useState(true);
    const [isLoading,setIsLoading] = useState(false);
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [message,setMessage] = useState('');

    useEffect(()=>{
        async function fetchStatus(){
            const apiUrl =process.env.REACT_APP_API_URL+'userstatus/';
            try {
                const response = await fetch(apiUrl, {
                    method: 'GET',
                });
          
                if (!response.ok) {
                    throw new Error('Fetch status failed');
                }
          
                const responseData = await response.json();
                setIsSignedIn(responseData['status']);
                } 
            catch (error) {
            }
        }
        fetchStatus();
    },[message]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        setIsLoading(true);

        try {
            const responseData = await signInUser(email, password);
            console.log(responseData);
            setMessage(responseData);
        } catch (error) {
            console.error('Error signing in:', error);
        } finally {
            setIsLoading(false);
        }
    }
    async function signInUser(email, password) {
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
                throw new Error('Sign-in failed');
            }
      
            const responseData = await response.json();
            return responseData;
        } 
        catch (error) {
            console.error('Error signing in:', error);
            throw error;
        }
    }

    return (
    <div className='w-full h-screen bg-black flex flex-col justify-center text-white items-center'>
        <span onClick={()=>navigate(-1)} className='fixed top-0 left-0 ml-1 mt-1 cursor-pointer'>
            <IconContext.Provider 
                value={{ size: "2em", color: "#27AE60" }}>
                <AiOutlineArrowLeft/>
            </IconContext.Provider>
        </span>
        <div className="text-center">
            {signIn ?
                <p className="py-4 text-3xl font-bold font-serif">Sign in to your account</p> :
                <p className="py-4 text-3xl font-bold font-serif">Sign Up</p>
            }   
        </div>
        <div className="bg-gray-700 px-4 py-4 shadow rounded-lg max-w-md w-full">
            <form onSubmit={handleSubmit} className='flex flex-col w-full text-white'>
                {!signIn && <Input id='username' name='Username' type='text' autoComplete="on"/>}
                <Input id='email' name='Email Address' type='email' autoComplete="on"/>
                <Input id='password' name='Password' type='password' autoComplete="on"/>
                <Button disabled={isLoading} fullWidth type='submit'>
                    Sign in
                </Button>
                <div className="flex gap-2 justify-center text-sm mt-6 px-2 text-white">
                    <div>
                        {signIn ? 'New to MusicGit?' : 'Already have an account?'}
                    </div>
                    <div
                        onClick={()=>setSignIn(signIn=>!signIn)}
                        className="underline cursor-pointer"
                    >
                        {signIn ? 'Create an account' : 'Sign In'}
                    </div>
                </div>
            </form>
        </div>
    </div>
    )
}

export default Login;