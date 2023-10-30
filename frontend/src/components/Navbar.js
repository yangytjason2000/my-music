import { useState } from 'react';
import {FaBars, FaTimes} from 'react-icons/fa';
import { AiOutlineHome } from 'react-icons/ai';
import { MdOutlineContactSupport } from 'react-icons/md';
import { FiUpload } from 'react-icons/fi';
import placeHolder from '../assets/placeholder.png'
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';
const Navbar = () => {
    const {isSignedIn,user_image} = useAuth();
    const [navVisible,setNavVisible] = useState(false);
    const handleClick = () => {
        setNavVisible(navVisible=>!navVisible);
    }
    return (
        <div className={`
            left-1/2 transform -translate-x-1/2
            fixed 
            w-[98%]
            h-[80px] 
            flex 
            justify-between 
            items-center 
            px-4
            mt-3
            bg-[#121212] 
            text-white
            font-poppings
            rounded-lg
            `}
            >
            <div>
                {isSignedIn ?
                <Link to='/user_page'>
                    {user_image ? 
                        <img 
                        src={user_image} 
                        alt="user_avatar"
                        className='cursor-pointer rounded-full hover:scale-110 duration-300'
                        style={{width:'70px'}}>
                        </img> :
                        <img 
                            src={placeHolder} 
                            alt="placehoder"
                            className='cursor-pointer rounded-full hover:scale-110 duration-300'
                            style={{width:'70px'}}>
                        </img>
                    }
                </Link> :
                <Link to='/login'>
                    {
                    <img 
                        src={placeHolder} 
                        alt="placehoder"
                        className='cursor-pointer rounded-full hover:scale-110 duration-300'
                        style={{width:'70px'}}>
                    </img>
                    }
                </Link>
                }
            </div>
            {/* menu */}
            <ul className='hidden md:flex font-poppins'>
                <Link to='/'>
                    <li className='flex gap-1 items-center cursor-pointer px-5'>
                        <AiOutlineHome/>
                        Home
                    </li>
                </Link>
                <li className='flex gap-1 items-center cursor-pointer px-5'>
                    <FiUpload/>
                    Upload
                </li>
                <Link to='/contact'>
                    <li className='flex gap-1 items-center cursor-pointer px-5'>
                        <MdOutlineContactSupport/>
                        Contact
                    </li>
                </Link>
            </ul>
            {/* hamburger */}
            <div onClick={handleClick} className='md:hidden z-10'>
                {!navVisible ? <FaBars/> : <FaTimes/>}
            </div>
            {/* mobile menu */}
            <ul className={navVisible ? `
                absolute 
                top-0 
                left-0 
                w-full 
                h-screen 
                bg-black
                flex 
                flex-col
                justify-center
                items-center` : `hidden`}>
                <li className='py-6 text-4xl'>
                    Home
                </li>
            </ul>
        </div>
    );
}

export default Navbar;