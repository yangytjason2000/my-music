import { useState } from "react";
import { IconContext } from "react-icons";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import Button from "./Buttons/button";
import Input from "./Input"

const Login = () => {
    const navigate = useNavigate();
    const [signIn, setSignIn] = useState(true);
    const [isLoading,setIsLoading] = useState(false);
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
            <form className='flex flex-col w-full text-white'>
                {!signIn && <Input id='username' name='Username' type='text'/>}
                <Input id='email' name='Email Address' type='email'/>
                <Input id='password' name='Password' type='password'/>
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