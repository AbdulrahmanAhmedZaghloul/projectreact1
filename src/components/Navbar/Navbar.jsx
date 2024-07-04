// import React, { useContext, useState, useEffect } from "react";
// import { Link, NavLink, useNavigate } from "react-router-dom";
// import { UserContext } from "../../Context/UserContext";
// import { create } from "../../Context/CartContext";
// import { useSpring, animated } from "@react-spring/web";
// import { ListContext } from "../../Context/ListContext";

// export default function Navbar() {
//     let { getItem, cartCount } = useContext(create);
//     let { getItemList, cartCountList } = useContext(ListContext);
//     const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//     let navigate = useNavigate();
//     let { userLogin, setUserLogin } = useContext(UserContext);

//     const [isShaking, setIsShaking] = useState(false);

//     const shake = useSpring({
//         transform: isShaking ? "translateX(4px)" : "translateX(5px)",
//         config: { tension: 300, friction: 10, duration: 100 },
//         loop: isShaking ? { reverse: true } : false,
//     });

//     function logOut() {
//         localStorage.removeItem('userToken');
//         setUserLogin(null);
//         navigate("/login");
//     }

//     const toggleMobileMenu = () => {
//         setIsMobileMenuOpen(!isMobileMenuOpen);
//     };

//     useEffect(() => {
//         getItem();
//         getItemList()
//     }, [getItem, getItemList]);

//     useEffect(() => {
//         if (cartCount > 0) {
//             setIsShaking(true);
//             const timeout = setTimeout(() => setIsShaking(false), 500);
//             return () => clearTimeout(timeout);
//         }
//     }, [cartCount]);
//     useEffect(() => {
//         const handleScroll = () => {
//             setIsMobileMenuOpen(false);
//         };

//         window.addEventListener("scroll", handleScroll);

//         return () => {
//             window.removeEventListener("scroll", handleScroll);
//         };
//     }, []);
//     return (
//         <React.Fragment>
//             <nav className="fixed top-0 left-0 right-0 z-[312] bg-[#fcfcfc] py-3">
//                 <div className="flex relative items-center mx-auto pt-0 justify-between">
//                     <div className="text-black w-fit items-center font-bold md:text-sm text-[15px]  mx-3">
//                         <Link className="items-center text-green-600 justify-center hover:text-green-600 md:text-lg" to="/home">
//                             <i className="fa-solid text-sm fa-cart-shopping mx-3"></i>
//                             flash Market
//                         </Link>
//                     </div>

//                     <div className="flex items-center justify-between lg:w-4/5 md:w-3/4">
//                         <ul className="md:flex hidden justify-center space-x-2">
//                             {userLogin !== null && (
//                                 <ul className="flex items-center justify-start ms-auto w-full">
//                                     <li>
//                                         <NavLink to="home" className={({ isActive }) => `hoverNav p-2 text-[16px] font-normal text-black ${isActive ? "border-b-1 border-black" : ""}`}>Home</NavLink>
//                                     </li>
//                                     <li>
//                                         <NavLink to="products" className={({ isActive }) => `hoverNav p-2 text-[16px] font-normal text-black ${isActive ? "border-b-1 border-black" : ""}`}>Products</NavLink>
//                                     </li>

//                                     <li>
//                                         <NavLink to="brands" className={({ isActive }) => `hoverNav p-2 text-[16px] font-normal text-black ${isActive ? "border-b-1 border-black" : ""}`}>Brands</NavLink>
//                                     </li>
//                                     <li>
//                                         <NavLink to="categories" className={({ isActive }) => `hoverNav p-2 text-[16px] font-normal text-black ${isActive ? "border-b-1 border-black" : ""}`}>Categories</NavLink>
//                                     </li>
//                                     <li>
//                                         <NavLink to="allorders" className={({ isActive }) => `hoverNav p-2 text-[16px] font-normal text-black ${isActive ? "border-b-1 border-black" : ""}`}>Orders</NavLink>
//                                     </li>
//                                 </ul>
//                             )}
//                         </ul>
//                         {userLogin !== null ? (
//                             <div className="hidden md:flex items-center justify-end w-1/3">
//                                 <animated.div style={shake} className="relative flex">
//                                     <Link to={`/wishlist`} className="mx-2 text-sm relative flex">
//                                         <span className="text-green-600 absolute bottom-3/4 p-1 py-0 right-1/2 translate font-bold rounded-full">{cartCountList}</span>
//                                         <i className="text-green-600 fa-solid fa-heart"></i>
//                                     </Link>
//                                 </animated.div>
//                                 <animated.div style={shake} className="relative flex">
//                                     <Link to={`cart`} className="mx-6 text-sm relative flex">
//                                         <span className="text-green-600 absolute bottom-3/4 p-1 py-0 right-1/2 translate font-bold rounded-full">{cartCount}</span>
//                                         <i className="text-green-600 fa-solid fa-cart-shopping"></i>
//                                     </Link>
//                                 </animated.div>
//                                 <li onClick={logOut} className="mx-3 cursor-pointer">
//                                     <span className="hoverNav p-2 text-base font-normal text-black">
//                                         <i className="text-sm text-gray-500 fa-solid fa-right-from-bracket"></i>
//                                     </span>
//                                 </li>
//                             </div>
//                         ) : (
//                             <ul className="hidden md:flex items-center list-none">
//                                 <li className="list-none">
//                                     <NavLink to="login" className={({ isActive }) => `hoverNav p-2 text-base font-normal text-black ${isActive ? "border-b-2 border-black" : ""}`}>Login</NavLink>
//                                 </li>
//                                 <li className="list-none">
//                                     <NavLink to="register" className={({ isActive }) => `hoverNav p-2 text-base font-normal text-black ${isActive ? "border-b-2 border-black" : ""}`}>Register</NavLink>
//                                 </li>
//                             </ul>
//                         )}
//                     </div>

//                     <div className="md:hidden flex items-center hoverNav mx-3">


//                         {userLogin !== null ? (<>
//                             <animated.div style={shake} className="relative flex">
//                                 <Link to={`/wishlist`} className="mx-2 relative flex">
//                                     <span className="text-green-600 absolute bottom-3/4 p-1 py-0 right-1/2 translate font-bold rounded-full">{cartCountList}</span>
//                                     <i className="text-sm text-green-600 fa-solid fa-heart"></i>
//                                 </Link>
//                             </animated.div>
//                             <animated.div style={shake} className="relative flex">
//                                 <Link to={`cart`} className="mx-6 relative flex">
//                                     <span className="text-green-600 absolute bottom-3/4 p-1 py-0 right-1/2 translate font-bold rounded-full">{cartCount}</span>
//                                     <i className="text-sm text-green-600 fa-solid fa-cart-shopping"></i>
//                                 </Link>
//                             </animated.div>
//                         </>
//                         ) : (
//                             <>
//                                 <li>
//                                     <NavLink to="login" className={({ isActive }) => `hoverNav p-2 text-base font-normal text-black ${isActive ? "border-b-2 border-black" : ""}`}>Login</NavLink>
//                                 </li>
//                                 <li>
//                                     <NavLink to="register" className={({ isActive }) => `hoverNav p-2 text-base font-normal text-black ${isActive ? "border-b-2 border-black" : ""}`}>Register</NavLink>
//                                 </li>
//                             </>
//                         )}
//                         <button onClick={toggleMobileMenu} className="outline-none p-2 mobile-menu-button">
//                             <svg className="w-6 hoverNav h-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                 <path d="M4 6h16M4 12h16M4 18h16"></path>
//                             </svg>
//                         </button>
//                     </div>
//                 </div>
//                 <div className={`mobile-menu ${isMobileMenuOpen ? "" : "hidden"} md:hidden`}>
//                     <ul className="mt-4 text-start space-y-7">
//                         {userLogin !== null ? (<>
//                             <li className="mt-5">
//                                 <NavLink to="home" className={({ isActive }) => `hoverNav p-2 text-base font-normal text-black ${isActive ? "border-b-2 border-black" : ""}`}>Home</NavLink>
//                             </li>
//                             <li>
//                                 <NavLink to="products" className={({ isActive }) => `hoverNav p-2 text-base font-normal text-black ${isActive ? "border-b-2 border-black" : ""}`}>Products</NavLink>
//                             </li>
//                             <li>
//                                 <NavLink to="brands" className={({ isActive }) => `hoverNav p-2 text-base font-normal text-black ${isActive ? "border-b-2 border-black" : ""}`}>Brands</NavLink>
//                             </li>
//                             <li>
//                                 <NavLink to="categories" className={({ isActive }) => `hoverNav p-2 text-base font-normal text-black ${isActive ? "border-b-2 border-black" : ""}`}>Categories</NavLink>
//                             </li>
//                             <li>
//                                 <NavLink to="allorders" className={({ isActive }) => `hoverNav p-2 text-base font-normal text-black ${isActive ? "border-b-2 border-black" : ""}`}>Orders</NavLink>
//                             </li>
//                             <li onClick={logOut} className="mx-3 flex justify-end cursor-pointer">
//                                 <span className="hoverNav p-2 text-base font-normal text-black">
//                                     <i className="text-sm text-[18px] text-gray-500 fa-solid fa-right-from-bracket"></i>
//                                 </span>
//                             </li>
//                         </>

//                         ) : null}
//                     </ul>

//                 </div>
//             </nav>
//         </React.Fragment>
//     );
// }













import React, { useContext, useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import { create } from "../../Context/CartContext";
import styled, { keyframes, css } from "styled-components";
import { ListContext } from "../../Context/ListContext";

const wiggle = keyframes`
  0%, 7% {
    transform: rotateZ(0);
  }
  15% {
    transform: rotateZ(-15deg);
  }
  20% {
    transform: rotateZ(10deg);
  }
  25% {
    transform: rotateZ(-10deg);
  }
  30% {
    transform: rotateZ(6deg);
  }
  35% {
    transform: rotateZ(-4deg);
  }
  40%, 50% {
    transform: rotateZ(-3deg);
  }
  60%, 70% {
    transform: rotateZ(-1deg);
  }
  90%, 100% {
    transform: rotateZ(0);
  }
`;

const ShakingIcon = styled.div`
  display: inline-block;
  animation: ${props => props.isShaking ? css`${wiggle} 0.5s ease` : 'none'};
`;

export default function Navbar() {
    let { getItem, cartCount } = useContext(create);
    let { getItemList, cartCountList } = useContext(ListContext);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    let navigate = useNavigate();
    let { userLogin, setUserLogin } = useContext(UserContext);

    const [isShaking, setIsShaking] = useState(false);

    function logOut() {
        localStorage.removeItem('userToken');
        setUserLogin(null);
        navigate("/login");
    }

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    useEffect(() => {
        getItem();
        getItemList();
    }, [getItem, getItemList]);

    useEffect(() => {
        if (cartCount > 0) {
            setIsShaking(true);
            const timeout = setTimeout(() => setIsShaking(false), 500);
            return () => clearTimeout(timeout);
        }
    }, [cartCount]);

    useEffect(() => {
        const handleScroll = () => {
            setIsMobileMenuOpen(false);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <React.Fragment>
            <nav className="fixed top-0 left-0 right-0 z-[312] bg-[#fcfcfc] py-3">
                <div className="flex relative items-center mx-auto pt-0 justify-between">
                    <div className="text-black w-fit items-center font-bold md:text-sm text-[15px] mx-3">
                        <Link className="items-center text-green-600 justify-center hover:text-green-600 md:text-lg" to="/home">
                            <i className="fa-solid text-sm fa-cart-shopping mx-3"></i>
                            flash Market
                        </Link>
                    </div>

                    <div className="flex items-center justify-between lg:w-4/5 md:w-3/4">
                        <ul className="md:flex hidden justify-center space-x-2">
                            {userLogin !== null && (
                                <ul className="flex items-center justify-start ms-auto w-full">
                                    <li>
                                        <NavLink to="home" className={({ isActive }) => `hoverNav p-2 text-[16px] font-normal text-black ${isActive ? "border-b-1 border-black" : ""}`}>Home</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="products" className={({ isActive }) => `hoverNav p-2 text-[16px] font-normal text-black ${isActive ? "border-b-1 border-black" : ""}`}>Products</NavLink>
                                    </li>

                                    <li>
                                        <NavLink to="brands" className={({ isActive }) => `hoverNav p-2 text-[16px] font-normal text-black ${isActive ? "border-b-1 border-black" : ""}`}>Brands</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="categories" className={({ isActive }) => `hoverNav p-2 text-[16px] font-normal text-black ${isActive ? "border-b-1 border-black" : ""}`}>Categories</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="allorders" className={({ isActive }) => `hoverNav p-2 text-[16px] font-normal text-black ${isActive ? "border-b-1 border-black" : ""}`}>Orders</NavLink>
                                    </li>
                                </ul>
                            )}
                        </ul>
                        {userLogin !== null ? (
                            <div className="hidden md:flex items-center justify-end w-1/3">
                                <ShakingIcon>
                                    <Link to={`/wishlist`} className="mx-2 text-sm relative flex">
                                        <span className="text-green-600 absolute bottom-3/4 p-1 py-0 right-1/2 translate font-bold rounded-full">{cartCountList}</span>
                                        <i className="text-green-600 fa-solid fa-heart"></i>
                                    </Link>
                                </ShakingIcon>
                                <ShakingIcon isShaking={isShaking}>
                                    <Link to={`cart`} className="mx-6 text-sm relative flex">
                                        <span className="text-green-600 absolute bottom-3/4 p-1 py-0 right-1/2 translate font-bold rounded-full">{cartCount}</span>
                                        <i className="text-green-600 fa-solid fa-cart-shopping"></i>
                                    </Link>
                                </ShakingIcon>
                                <li onClick={logOut} className="mx-3 cursor-pointer">
                                    <span className="hoverNav p-2 text-base font-normal text-black">
                                        <i className="text-sm text-gray-500 fa-solid fa-right-from-bracket"></i>
                                    </span>
                                </li>
                            </div>
                        ) : (
                            <ul className="hidden md:flex items-center list-none">
                                <li className="list-none">
                                    <NavLink to="login" className={({ isActive }) => `hoverNav p-2 text-base font-normal text-black ${isActive ? "border-b-2 border-black" : ""}`}>Login</NavLink>
                                </li>
                                <li className="list-none">
                                    <NavLink to="register" className={({ isActive }) => `hoverNav p-2 text-base font-normal text-black ${isActive ? "border-b-2 border-black" : ""}`}>Register</NavLink>
                                </li>
                            </ul>
                        )}
                    </div>

                    <div className="md:hidden flex items-center hoverNav mx-3">
                        {userLogin !== null ? (
                            <>
                                <ShakingIcon>
                                    <Link to={`/wishlist`} className="mx-2 relative flex">
                                        <span className="text-green-600 absolute bottom-3/4 p-1 py-0 right-1/2 translate font-bold rounded-full">{cartCountList}</span>
                                        <i className="text-sm text-green-600 fa-solid fa-heart"></i>
                                    </Link>
                                </ShakingIcon>
                                <ShakingIcon isShaking={isShaking}>
                                    <Link to={`cart`} className="mx-6 relative flex">
                                        <span className="text-green-600 absolute bottom-3/4 p-1 py-0 right-1/2 translate font-bold rounded-full">{cartCount}</span>
                                        <i className="text-sm text-green-600 fa-solid fa-cart-shopping"></i>
                                    </Link>
                                </ShakingIcon>
                            </>
                        ) : (
                            <>
                                <li>
                                    <NavLink to="login" className={({ isActive }) => `hoverNav p-2 text-base font-normal text-black ${isActive ? "border-b-2 border-black" : ""}`}>Login</NavLink>
                                </li>
                                <li>
                                    <NavLink to="register" className={({ isActive }) => `hoverNav p-2 text-base font-normal text-black ${isActive ? "border-b-2 border-black" : ""}`}>Register</NavLink>
                                </li>
                            </>
                        )}
                        <button onClick={toggleMobileMenu} className="outline-none p-2 mobile-menu-button">
                            <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                <path d="M4 6h16M4 12h16m-7 6h7"></path>
                            </svg>
                        </button>
                    </div>
                </div>
                <div className={`mobile-menu ${isMobileMenuOpen ? "" : "hidden"} md:hidden`}>
                    <ul className="mt-4 text-start space-y-7">
                        {userLogin !== null && (
                            <>
                                <li className="mt-5">
                                    <NavLink to="home" className={({ isActive }) => `hoverNav p-2 text-base font-normal text-black ${isActive ? "border-b-2 border-black" : ""}`}>Home</NavLink>
                                </li>
                                <li>
                                    <NavLink to="products" className={({ isActive }) => `hoverNav p-2 text-base font-normal text-black ${isActive ? "border-b-2 border-black" : ""}`}>Products</NavLink>
                                </li>
                                <li>
                                    <NavLink to="brands" className={({ isActive }) => `hoverNav p-2 text-base font-normal text-black ${isActive ? "border-b-2 border-black" : ""}`}>Brands</NavLink>
                                </li>
                                <li>
                                    <NavLink to="categories" className={({ isActive }) => `hoverNav p-2 text-base font-normal text-black ${isActive ? "border-b-2 border-black" : ""}`}>Categories</NavLink>
                                </li>
                                <li>
                                    <NavLink to="allorders" className={({ isActive }) => `hoverNav p-2 text-base font-normal text-black ${isActive ? "border-b-2 border-black" : ""}`}>Orders</NavLink>
                                </li>
                                <li onClick={logOut} className="mx-3 flex justify-end cursor-pointer">
                                    <span className="hoverNav p-2 text-base font-normal text-black">
                                        <i className="text-sm text-[18px] text-gray-500 fa-solid fa-right-from-bracket"></i>
                                    </span>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </nav>
        </React.Fragment>
    );
}
