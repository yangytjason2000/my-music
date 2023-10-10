import { useState } from 'react';
import {FaBars, FaTimes} from 'react-icons/fa';
import logo from '../assets/logo.png'

const Navbar = () => {
    const [navVisible,setNavVisible] = useState(false);
    const handleClick = () => {
        setNavVisible(navVisible=>!navVisible);
    }
    return (
        <div className={`
            fixed 
            w-full 
            h-[100px] 
            flex 
            justify-between 
            items-center 
            px-4 
            bg-[#3f80e1] 
            text-gray-800`}>
            <div>
                <img 
                    src={logo} 
                    alt="logo"
                    className='cursor-pointer'
                    style={{width:'150px'}}>
                </img>
            </div>
            {/* menu */}
            <ul className='hidden md:flex'>
                <li className='cursor-pointer px-5'>
                    Home
                </li>
                <li className='cursor-pointer px-5'>
                    Upload
                </li>
                <li className='cursor-pointer px-5'>
                    Contact
                </li>
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
                bg-[#3f80e1] 
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