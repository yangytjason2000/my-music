import { useState } from 'react';
import {FaBars, FaTimes} from 'react-icons/fa';
import logo from '../assets/logo2.png'
import { Link } from 'react-router-dom';
const Navbar = () => {
    const [navVisible,setNavVisible] = useState(false);
    const handleClick = () => {
        setNavVisible(navVisible=>!navVisible);
    }
    return (
        <div className={`
            left-1/2 transform -translate-x-1/2
            fixed 
            w-[98%]
            h-[100px] 
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
                <img 
                    src={logo} 
                    alt="logo"
                    className='cursor-pointer'
                    style={{width:'150px'}}>
                </img>
            </div>
            {/* menu */}
            <ul className='hidden md:flex font-poppins'>
                <Link to='/'>
                    <li className='cursor-pointer px-5'>
                        Home
                    </li>
                </Link>
                <li className='cursor-pointer px-5'>
                    Upload
                </li>
                <Link to='/contact'>
                    <li className='cursor-pointer px-5'>
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