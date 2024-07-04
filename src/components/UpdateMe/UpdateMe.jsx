// import React, { useContext, useEffect, useState } from "react";
// import { Helmet } from 'react-helmet-async';
// import iconimage from "../../image/avataaars.svg";
// import { useFormik } from "formik";
// import * as yup from "yup";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { UserContext } from "../../Context/UserContext";

// export default function UpdateMe() {
//     let { setUserLogin } = useContext(UserContext);
//     let navigate = useNavigate();
//     const [api, setApi] = useState('');
//     const [loading, setLoading] = useState(false);
//     let validationSchema = yup.object().shape({
//         currentPassword: yup.string().matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, "Password must start with an uppercase letter and be at least 8 characters long").required("Current password is required"),
//         password: yup.string().matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, "Password must start with an uppercase letter and be at least 8 characters long").required("New password is required"),
//         rePassword: yup.string().oneOf([yup.ref("password")], "Passwords must match").required("Re-enter your password")
//     });

//     let formik = useFormik({
//         initialValues: {
//             currentPassword: "",
//             password: "",
//             rePassword: "",
//         },
//         validationSchema,
//         onSubmit: handleUpdateMe,
//     });
//     async function handleUpdateMe(values) {
//         setLoading(true);
//         // const headers = localStorage.getItem("userToken");

//         let headers = {
//             token: localStorage.getItem("userToken")
//         }
//         try {
//             const response = await axios.put(`https://ecommerce.routemisr.com/api/v1/users/changeMyPassword`, values, {
//                 headers
//             });
//             // console.log(response.data.message);
//             if(response.data.message=='success'){
//                 //
//                 localStorage.setItem("userToken", response?.data?.token)

//                 setUserLogin(response.data.token);
//                 navigate("/login")
//                 localStorage.removeItem("userToken")

//                 setLoading(false);
//                 setUserLogin(null);
//             }
//             setLoading(false);
//             setApi(''); // Clear the error message on success
//         } catch (error) {
//             setLoading(false);
//             console.log(error);
//             if (error.response) {
//                 setApi(error.response.data.message); // Set the error message
//             } else {
//                 setApi("An error occurred while updating the password.");
//             }
//         }
//     }

  
// useEffect(() => {
//     setUserLogin()
// }, [])

//     return (
//         <React.Fragment>
//             <Helmet>
//                 <link rel="icon" href={iconimage} />
//                 <title>UpdateMe</title>
//             </Helmet>
//             <div className="bg-[#fff] container flex flex-col justify-start items-center py-6 mt-5 pt-11 w-full mx-auto">
//                 <div className="container">
//                     <h2 className="text-[#2C3E50] font-bold text-4xl">UpdateMe</h2>
//                     <div className="flex justify-center items-center py-5">
//                         <span className="bg-[#2C3E50] w-24 h-1 flex justify-center items-center mx-6"></span>
//                         <i className="text-[#2C3E50] fa-solid fa-star"></i>
//                         <span className="bg-[#2C3E50] w-24 h-1 flex justify-center items-center mx-6"></span>
//                     </div>
//                     <div className="container py-3">
//                         <form onSubmit={formik.handleSubmit} className="container relative py-5 mt-5">
//                             {api && <div className="absolute top-[50%] right-0 p-4 my-1 text-sm w-1/5 mx-auto text-red-800 rounded-lg bg-red-100 dark:text-red-400" role="alert">
//                                 <span className="font-extrabold mx-2">x</span>{api}<span className="mx-2 font-extrabold">x</span>
//                             </div>}

//                             <div className="relative z-0 md:w-1/2 w-11/12 mx-auto py-7 group">
//                                 <input
//                                     type="password"
//                                     name="currentPassword"
//                                     id="currentPassword"
//                                     className="text-start block px-0 w-full text-base font text-black-900 bg-transparent border-0 border-b-2 appearance-none dark:text-black dark:focus:border-dark-500 focus:outline-none focus:ring-0 focus:border-dark-600 peer"
//                                     placeholder=""
//                                     onBlur={formik.handleBlur}
//                                     onChange={formik.handleChange}
//                                     value={formik.values.currentPassword}
//                                 />
//                                 <label
//                                     htmlFor="currentPassword"
//                                     className="peer-focus: absolute text-lg text-gray-500 dark:text-gray-400 duration-300 scale-75 top-3 -z-10 origin-[0] left-0 peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-dark-600 peer-focus:dark:text-dark-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
//                                 >
//                                     Current Password:
//                                 </label>
//                                 {formik.errors.currentPassword && formik.touched.currentPassword ? (
//                                     <div className="p-4 my-4 text-sm text-red-800 rounded-lg bg-red-100 dark:text-red-400" role="alert">
//                                         <span className="font-semibold text-start flex justify-start">{formik.errors.currentPassword}</span>
//                                     </div>
//                                 ) : null}
//                             </div>
//                             <div className="relative z-0 md:w-1/2 w-11/12 mx-auto py-7 group">
//                                 <input
//                                     type="password"
//                                     name="password"
//                                     id="password"
//                                     className="text-start block px-0 w-full text-base font text-black-900 bg-transparent border-0 border-b-2 appearance-none dark:text-black dark:focus:border-dark-500 focus:outline-none focus:ring-0 focus:border-dark-600 peer"
//                                     placeholder=""
//                                     onBlur={formik.handleBlur}
//                                     onChange={formik.handleChange}
//                                     value={formik.values.password}
//                                 />
//                                 <label
//                                     htmlFor="password"
//                                     className="peer-focus: absolute text-lg text-gray-500 dark:text-gray-400 duration-300 scale-75 top-3 -z-10 origin-[0] left-0 peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-dark-600 peer-focus:dark:text-dark-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
//                                 >
//                                     New Password:
//                                 </label>
//                                 {formik.errors.password && formik.touched.password ? (
//                                     <div className="p-4 my-4 text-sm text-red-800 rounded-lg bg-red-100 dark:text-red-400" role="alert">
//                                         <span className="font-semibold text-start flex justify-start">{formik.errors.password}</span>
//                                     </div>
//                                 ) : null}
//                             </div>
//                             <div className="relative z-0 md:w-1/2 w-11/12 mx-auto py-7 group">
//                                 <input
//                                     type="password"
//                                     name="rePassword"
//                                     id="rePassword"
//                                     className="text-start block px-0 w-full text-base font text-black-900 bg-transparent border-0 border-b-2 appearance-none dark:text-black dark:focus:border-dark-500 focus:outline-none focus:ring-0 focus:border-dark-600 peer"
//                                     placeholder=""
//                                     onBlur={formik.handleBlur}
//                                     onChange={formik.handleChange}
//                                     value={formik.values.rePassword}
//                                 />
//                                 <label
//                                     htmlFor="rePassword"
//                                     className="peer-focus: absolute text-lg text-gray-500 dark:text-gray-400 duration-300 scale-75 top-3 -z-10 origin-[0] left-0 peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-dark-600 peer-focus:dark:text-dark-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
//                                 >
//                                     Confirm New Password:
//                                 </label>
//                                 {formik.errors.rePassword && formik.touched.rePassword ? (
//                                     <div className="p-4 my-4 text-sm text-red-800 rounded-lg bg-red-100 dark:text-red-400" role="alert">
//                                         <span className="font-semibold text-start flex justify-start">{formik.errors.rePassword}</span>
//                                     </div>
//                                 ) : null}
//                             </div>

//                             {loading ? (
//                                 <button className="btn bg-[#1abc9c] text-white font-bold py-2 px-5 text-lg rounded-lg" disabled>
//                                     <i className="fa-solid fa-spinner fa-spin"></i>
//                                 </button>
//                             ) : (
//                                 <button type="submit" className="btn bg-[#1abc9c] text-white font-bold py-2 px-5 text-lg rounded-lg">
//                                     Update Password
//                                 </button>
//                             )}
//                         </form>
//                     </div>
//                 </div>
//             </div>
//         </React.Fragment>
//     );
// }






















