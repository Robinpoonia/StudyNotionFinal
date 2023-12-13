import React, { useEffect } from 'react'
import logo from "../../assets/Logo/Logo-Full-Light.png"
import { Link, matchPath } from 'react-router-dom'
import {NavbarLinks} from "../../data/navbar-links"
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {AiOutlineShoppingCart} from "react-icons/ai"
import ProfileDropDown from '../core/Auth/ProfileDropdown'
import { apiConnector } from '../../services/apiConnector'
import { categories } from '../../services/apis'
import { useState } from 'react'
import {IoIosArrowDropdownCircle} from "react-icons/io"

const subLinks = [
    {
        title: "python",
        link:"/catalog/python"
    },
    {
        title: "web dev",
        link:"/catalog/web-development"
    },
];


const Navbar = () => {
    console.log("Printing base url: ",process.env.REACT_APP_BASE_URL);
    const {token} = useSelector( (state) => state.auth );
    // const token
    const {user} = useSelector( (state) => state.profile );
    const {totalItems} = useSelector( (state) => state.cart )
    const location = useLocation();

    const [ssubLinks, setSsubLinks]  = useState([]);

    const fetchSublinks = async() => {
        try{
            const result = await apiConnector("GET", categories.CATEGORIES_API);
            console.log("Printing Sublinks result:" , result);
            setSsubLinks(result.data.data);
        }
        catch(error) {
            console.log("Could not fetch the category list");
        }
    }


    useEffect( () => {
        console.log("PRINTING TOKEN", token);
        fetchSublinks();
    },[] )

    

    const matchRoute = (route) => {
        return matchPath({path:route}, location.pathname);
    }

  return (
    <div className='flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700'>
      <div className='flex w-11/12 max-w-maxContent items-center justify-between'>
        {/* Image */}
      <Link to="/">
        <img src={logo} width={160} height={42} loading='lazy'/>
      </Link>

      {/* Nav Links */}
      <nav>
        <ul className='flex gap-x-6 text-richblack-25'>
        {
            NavbarLinks.map( (link, index) => (
                 <li key={index}>
                    {
                        link.title === "Catalog" ? (
                            <div className='relative flex items-center gap-2 group'>
                                <p>{link.title}</p>
                                <IoIosArrowDropdownCircle/>

                                <div className='invisible absolute left-[50%]
                                    translate-x-[-50%] translate-y-[80%]
                                 top-[50%]
                                flex flex-col rounded-md bg-richblack-5 p-4 text-richblack-900
                                opacity-0 transition-all duration-200 group-hover:visible
                                group-hover:opacity-100 lg:w-[300px]'>

                                <div className='absolute left-[50%] top-0
                                translate-x-[80%]
                                translate-y-[-45%] h-6 w-6 rotate-45 rounded bg-richblack-5'>
                                </div>

                                {
                                    subLinks.length ? (
                                            subLinks.map( (subLink, index) => (
                                                <Link to={`${subLink.link}`} key={index}>
                                                    <p>{subLink.title}</p>
                                                </Link>
                                            ) )
                                    ) : (<div></div>)
                                }

                                </div>


                            </div>

                        ) : (
                            <Link to={link?.path}>
                                <p className={`${ matchRoute(link?.path) ? "text-yellow-25" : "text-richblack-25"}`}>
                                    {link.title}
                                </p>
                                
                            </Link>
                        )
                    }
                </li>
             ) )
        }

        </ul>
      </nav>


        {/* Login/SignUp/Dashboard */}
        <div className='flex gap-x-4 items-center'>

            {
                user && user?.accountType != "Instructor" && (
                    <Link to="/dashboard/cart" className='relative'>
                        <AiOutlineShoppingCart />
                        {
                            totalItems > 0 && (
                                <span>
                                    {totalItems}
                                </span>
                            )
                        }
                    </Link>
                )
            }
            {
                token === null && (
                    <Link to="/login">
                        <button className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md'>
                            Log in
                        </button>
                    </Link>
                )
            }
            {
                token === null && (
                    <Link to="/signup">
                        <button  className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md'>
                            Sign Up
                        </button>
                    </Link>
                )
            }
            {
                token !== null && <ProfileDropDown />
            }
            
        </div>


      </div>
    </div>
  )
}

export default Navbar


// import React, { useEffect, useState } from 'react'
// import { AiOutlineShoppingCart} from "react-icons/ai";
// import { Link, matchPath } from 'react-router-dom'
// import logo from "../../assets/Logo/Logo-Full-Light.png"
// import { NavbarLinks } from '../../data/navbar-links'
// import { useLocation } from 'react-router-dom'
// import { useSelector } from 'react-redux'
// import  ProfileDropDown from '../../components/core/Auth/ProfileDropDown'
// import { apiConnector } from '../../services/apiconnector'
// import { categories }  from '../../services/apis';

// import {AiOutlineCaretDown} from 'react-icons/ai'


// const sublinks = [
//     {
//         title: "python",
//         link: "catalog/python"
//     },
//     {
//         title: "c++",
//         link: "catalog/c++"
//     }
// ]

// const Navbar = () => {

//     console.log("Printing base url: ",process.env.REACT_APP_BASE_URL);
//     const {token} = useSelector( (state) => state.auth );
//     const {user} = useSelector( (state) => state.profile );
//     const {totalItems} = useSelector( (state) => state.cart )
//     const location = useLocation();

//     const [subLinks, setSsubLinks]  = useState([]);

//     const fetchSublinks = async() => {
//         try{
//             const result = await apiConnector("GET", categories.CATEGORIES_API);
//             console.log("Printing Sublinks result:" , result);
//             setSsubLinks(result.data.data);
//         }
//         catch(error) {
//             console.log("Could not fetch the category list");
//         }
//     }


//     useEffect( () => {
//         fetchSublinks();
//     },[] )


//     const matchroute = (route) =>{
//         return matchPath({path:route}, location.pathname);
//     }

//   return (
//     <div className='flex h-14 items-center justify-center border-b-[1px] bordeborder-b-richblue-400'> 
//         <div  className='w-11/12 flex max-w-maxContent items-center justify-between'>
//             <Link to="/">
//                 <img src={logo}  width={160} height={42} loading='lazy'/>
//             </Link>

//             {/* nav link */}
//             <nav>
//                 <ul className='flex gap-x-6 text-richblack-25'>
//                 {
//                     NavbarLinks.map((link, index) => (
//                        <li key={index}>
//                             {
//                                 link.title === "Catalog" ? (
//                                     <div className='flex relative items-center gap-2 group'>
//                                         <p>
//                                             {link.title}
//                                         </p>
//                                         <AiOutlineCaretDown/>
//                                         <div className='invisible absolute left-[50%] top-[50%]
//                                         translate-x-[-50%] translate-y-[30%] flex flex-col rounded-md bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 lg:w-[300%]'>
//                                         <div className=' absolute left-[50%] top-0 translate-x-[80%] translate-y-[-45%] h-6 w-6 rounded bg-richblack-5 rotate-45'>
//                                         </div>
//                                             {
//                                                 sublinks.length ? (
                                                    
//                                                     sublinks.map( (sublinks, index) => (
//                                                         <Link to={`${sublinks.link}`} key={index}>
//                                                          <p>{sublinks.title}</p>
//                                                         </Link>
//                                                     ))
                                                    
//                                                 ) : (<div></div>)
//                                             }

//                                         </div>
                             
//                                     </div>
//                                     ) : (<Link to={link.path}>
//                                     <p className={`${matchroute(link.path) ? "text-yellow-25": "text-richblack-25"}`}>
//                                         {link.title}
                 
//                                     </p>
//                                 </Link>  
//                                 )
//                             }
//                         </li>
//                     ))
//                 }
//                 </ul>
//             </nav>

//             {/* login/signup/dashboard */}
//             <div className='flex gap-x-4 items-center'>
//                 {
//                     user && user.accoutType != "Instructor" && (
//                         <Link to="/dashboard/cart" className='relative'>
//                             <AiOutlineShoppingCart/>
//                             {
//                                 totalItems > 0 && (
//                                     <spam>
//                                         {totalItems}
//                                     </spam>
//                                 )
//                             }
//                         </Link>
//                     )
//                 }    
//                 {
//                     token === null && (
//                         <Link to="/login">
//                             <button className=' border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md'>Login</button>
//                         </Link>
//                     )
//                 }
//                 {
//                     token === null && (
//                         <Link to="/signup">
//                             <button className=' border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md'>signup</button>
//                         </Link>
//                     )
//                 }
//                 {
//                     token !== null && <ProfileDropDown/>
//                 }
                

//             </div>
//         </div>
//     </div>
//   )
// }

// export default Navbar