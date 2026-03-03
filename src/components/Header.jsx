// import React from 'react';
// import { MdShoppingBasket } from "react-icons/md";
// import { motion } from "framer-motion";
// import Logo from "../components/img/logo.png";
// import Avatar from "../components/img/avatar.png";
// import { json, Link } from 'react-router-dom';
// import { useStateValue } from '../context/StateProvider.js';
// import { actionType } from '../reducer.js';



// const Header = () => {
//   return (
// <header className='w-screen fixed z-50 p-6 px-16  bg-primary'>
//         {/* deskto and tablet */}
//         <div className= "hidden md:flex w-full h-full items-center justify-between">
           
//             <div className='flex items-center gap-2 '>
//                 <img src={Logo} className="w-20 object-cover" alt="logo" />
//                 </div>

//             <div className='flex items-center gap-8'>
//             <ul className='flex items-center gap-8 '>
//                 <li className='text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer'>Home</li>
//                 <li className='text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer'>Menu</li>
//                 <li className='text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer'>About Us</li>
//                 <li className='text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer'>Services</li>
//             </ul>
           
//                 <motion.img 
//                 whileTap={{scale: 0.6}} 
//                 src={Avatar} 
//                 className="w-10 min-w-[40px] drop-shadow-xl cursor-pointer" 
//                 alt="" />
            
//             </div>
//         </div>

//         {/* mobile */}
//         <div className='flex md:hidden w-full h-full  p-4'>
//         <Link to={"/"} className='flex items-center gap-2'>
//         <img src={Logo} className="w-20 object-cover" alt="logo" />
//                 {/* <p className='text-headingColor text-xl font-bold'>City</p> */}
//             </Link>
//         </div>
//     </header>  )
// }

// export default Header