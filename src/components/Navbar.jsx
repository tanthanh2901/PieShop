import React, { useContext, useState, useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom'
import {assets} from '../assets/assets'
import { CartContext } from '../context/CartContext';
import { UserInfoContext } from '../context/UserInfoContext';
import ModalComponent from './ModalComponent';
screen
const Navbar = () => {
    const { numberOfCartProducts } = useContext(CartContext);
    const { isLoggedIn, handleLogout, isAdmin } = useContext(UserInfoContext);

    const [open, setOpen] = useState(false)

    return (
    <div className='flex items-center justify-between py-5 font-medium'>        
        <Link to="/" ><img src={assets.logo} className='w-36' alt="" /></Link>
       
        <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
            <NavLink to='/' className='flex flex-col items-center gap-1'>
                <p>HOME</p>           
                <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
            </NavLink>
            <NavLink to="/collection" className='flex flex-col items-center gap-1'>
                <p>COLLECTION</p>           
                <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
            </NavLink>
            <NavLink to="/about" className='flex flex-col items-center gap-1'>
                <p>ABOUT</p>           
                <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
            </NavLink>
            <NavLink to="/contact" className='flex flex-col items-center gap-1'>
                <p>CONTACT</p>           
                <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
            </NavLink>
        </ul>

        <div className='flex item-center gap-6'>
            <img src={assets.search_icon} className='w-5 cursor-pointer' alt="" />
        <div className="group relative">
        {/* Check if user is logged in */}
        {isLoggedIn ? (
          <div>
            <img src={assets.profile_icon} className="w-5 cursor-pointer" alt="" />
            <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
              <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded">
                {isAdmin && (
                  <Link to="/admin" className="cursor-pointer hover:text-black">
                    Dashboard
                  </Link>
                )}
                <Link to="/users" className="cursor-pointer hover:text-black">
                  My profile
                </Link>
                <Link to="/orders" className="cursor-pointer hover:text-black">
                  Orders
                </Link>
                <p className="cursor-pointer hover:text-black"
                  onClick={() => setOpen(true)}
                >
                  Log out
                </p>
                <ModalComponent 
                  open={open} 
                  onClose={() => setOpen(false)}
                  modal={{
                    message:"are u sure", 
                    handle: handleLogout}
                  }                 
                />
              </div>
            </div>
          </div>
        ) : (
          <Link to="/login">
            {/* <img src={assets.profile_icon} className="w-5 cursor-pointer" alt="" /> */}
            Login
          </Link>
        )}
      </div>

            <Link to='/cart' className='relative'>
                <img src={assets.cart_icon} className='w-5' alt="" />
                { numberOfCartProducts !== 0 && (
                    <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]'>
                        {numberOfCartProducts}
                    </p>
                )}
            </Link>           
        </div>
    </div>   
  )
}

export default Navbar
