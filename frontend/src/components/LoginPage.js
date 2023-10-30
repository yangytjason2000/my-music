import { useState } from "react";
import { IconContext } from "react-icons";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import Button from "./Buttons/button";
import Input from "./Inputs/Input";
import { useAuth } from "../context/AuthProvider";
import signInUser from "./Actions/Login";
import registerUser from "./Actions/Register";

const LoginPage = () => {
    const navigate = useNavigate();
    const [username,setUsername] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    const [signIn, setSignIn] = useState(true);
    const [isLoading,setIsLoading] = useState(false);
    const {setIsSignedIn} = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            if (signIn){
                const responseData = await signInUser(email,password,setIsSignedIn);
                console.log(responseData);
                navigate(-1);
            }
            else {
                const responseData = await registerUser(username, email, password,setSignIn);
                console.log(responseData);
            }
        } catch (error) {
            console.error('Error signing in:', error);
        } finally {
            setIsLoading(false);
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
                {!signIn && 
                <Input 
                    id='username' 
                    name='Username' 
                    type='text' 
                    autoComplete="on"
                    value={username}
                    onChange={(e)=>setUsername(e.target.value)}
                    />
                }
                <Input 
                    id='email' 
                    name='Email Address' 
                    type='email' 
                    autoComplete="email"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}/>
                <Input 
                    id='password' 
                    name='Password' 
                    type='password' 
                    autoComplete={signIn ? "current-password" : "new-password"}
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    />
                <Button disabled={isLoading} fullWidth type='submit'>
                    {signIn ? 'Sign in' : 'Register'}
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

export default LoginPage;