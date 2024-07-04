import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { create } from "../../Context/CartContext";
import toast from 'react-hot-toast';
import Slider from "react-slick"; // Importing react-slick
import Loadimg from '../Loading/Loadimg';
import { ListContext } from '../../Context/ListContext';

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, zIndex: "100", width: "30px", height: "30px", display: "flex", alignItems: "center ", justifyContent: "center", margin: "auto", color: "white", borderRadius: '5%' }}
            onClick={onClick}
        />
    );
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, zIndex: "100", width: "30px", height: "30px", display: "flex", alignItems: "center ", justifyContent: "center", margin: "auto", color: "white", borderRadius: '5%' }}
            onClick={onClick}
        />
    );
}

let settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1200,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
                infinite: true,
                dots: false
            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                initialSlide: 2
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }
    ]
};

export default function RecentProduct() {
    let { addCart } = useContext(create);
    let { addList } = useContext(ListContext);

    async function addProductCart(productId) {
        localStorage.getItem('userToken')
        toast.promise(
            addCart(productId),
            {
                loading: 'Adding product to your cart...',
                success: (response) => {
                    if (response.data.status === "success") {
                        return 'Product added successfully to your cart.';
                    } else {
                        throw new Error("This didn't success.");
                    }
                },
                error: () => `Error: This didn't work`,
            }
        );
    }

    async function addProductlist(productId) {
        localStorage.getItem('userToken')
        toast.promise(
            addList(productId),
            {
                loading: 'Adding product to your Wishlist...',
                success: (response) => {
                    if (response.data.status === "success") {
                        return 'Product added successfully to your Wishlist.';
                    } else {
                        throw new Error("This didn't success.");
                    }
                },
                error: () => `Error: This didn't work`,
            }
        );
    }

    async function getApi() {
        return await axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
    }

    let { data, isError, isLoading } = useQuery({
        queryKey: ["productQuery"],
        queryFn: getApi,
        staleTime: 20000,
    });

    const [loadingImages, setLoadingImages] = useState({});

    // loading All image products

    const handleImageLoad = (productId) => {
        setLoadingImages((prev) => ({ ...prev, [productId]: false }));
    };

    const handleImageError = (productId) => {
        setLoadingImages((prev) => ({ ...prev, [productId]: false }));
    };

    // show All 10 products
    const chunkArray = (array, size) => {
        const chunkedArr = [];
        for (let i = 0; i < array.length; i += size) {
            chunkedArr.push(array.slice(i, i + size));
        }
        return chunkedArr;
    };



    if (isLoading) {
        return (
            <div className='flex justify-center items-center'>
                <Loadimg></Loadimg>
            </div>
        );
    }

    if (isError) {
        return (
            <div className='flex justify-center items-center'>
                <p>Error loading data</p>
            </div>
        );
    }

    const chunkedProducts = chunkArray(data?.data?.data, 10);

    return (
        <React.Fragment>
            <div className='container mx-auto py-10 my-4 px-4'>
                {chunkedProducts.map((chunk, index) => (
                    <Slider {...settings} className="relative group py-8" key={index}>
                        {chunk.map((product) => (
                            <div key={product.id} className='lg:w-1/6 md:w-1/3 sm:w-1/2 w-full group/item transition-all overflow-hidden p-4'>
                                <div className='product relative overflow-hidden'>
                                    <span className='md:flex hidden'>
                                           <i onClick={() => addProductCart(product.id)} className='producthover transition-transform opacity-0 group-hover/item:opacity-100  my-4 text-[14px] border bg-green-500 p-2 mx-auto rounded-full border-white left-[75%] md:flex hidden text-center justify-center items-center text-white fa-solid fa-cart-shopping'></i>
                                    </span>
                                    <span className='md:flex hidden'>
                                        <i onClick={() => addProductlist(product.id)} className='producthover-2 transition-transform opacity-0 group-hover/item:opacity-100  my-4 text-[14px] border bg-green-500 p-2 mx-auto rounded-full border-white left-[75%] md:flex hidden text-center justify-center items-center text-white fa-solid fa-heart'></i>
                                    </span>
                                    <span className='md:flex hidden'>
                                        <Link to={`/productdetails/${product.id}/${product?.category?.name}`}>
                                            <i className='producthover-1 my-4 text-[14px] border p-2 mx-auto rounded-full border-white bg-green-500 transition-transform opacity-0 group-hover/item:opacity-100  left-[75%] md:flex hidden text-center justify-center items-center text-white fa-solid fa-asterisk px-[0.65rem]'></i>
                                        </Link>
                                    </span>
                                    <span className='flex md:hidden'>
                                        <i onClick={() => addProductCart(product.id)} className='producthover  my-4 text-[14px] border bg-green-500 p-2 mx-auto rounded-full border-white left-[80%]  md:flex hidden text-center justify-center items-center text-white fa-solid fa-cart-shopping'></i>
                                    </span>
                                    <span className='flex md:hidden'>
                                        <i onClick={() => addProductlist(product.id)} className='producthover-2  my-4 text-[14px] border bg-green-500 p-2 mx-auto rounded-full border-white left-[80%]  md:flex hidden text-center justify-center items-center text-white fa-solid fa-heart'></i>
                                    </span>
                                    <span className='flex md:hidden'>
                                        <Link to={`/productdetails/${product.id}/${product?.category?.name}`}>
                                            <i className='producthover-1 my-4 text-[14px] border p-2 mx-auto rounded-full border-white bg-green-500  left-[80%] md:flex hidden text-center justify-center items-center text-white fa-solid fa-asterisk px-[0.65rem]'></i>
                                        </Link>
                                    </span>
                                    <Link to={`/productdetails/${product?.id}/${product?.category?.name}`}>
                                        {loadingImages[product.id] !== false && (
                                            <div className='flex justify-center items-center h-[30vh] bg-gray-200'>
                                                <ClipLoader size={30} color='black' />
                                            </div>
                                        )}
                                        <img
                                            className={`object-contain w-full ${loadingImages[product.id] === false ? 'block' : 'hidden'}`}
                                            src={product?.imageCover}
                                            alt={product?.title}
                                            onLoad={() => handleImageLoad(product.id)}
                                            onError={() => handleImageError(product.id)}
                                        />
                                        <span className='flex justify-start text-green-600'>{product?.category?.name}</span>
                                        <h3 className='text-start my-2 text-gray-600'>{product?.title?.split(' ')?.slice(0, 2)?.join(' ')}</h3>
                                        <div className='flex justify-between items-center'>
                                            <span className='text-black font-semibold'>{product?.price} EGP</span>
                                            <span className='text-black font-semibold'>{product?.ratingsAverage} <i className='fas fa-star text-yellow-300'></i></span>
                                        </div>
                                    </Link>
                                    <button onClick={() => addProductCart(product.id)} className='bg-green-700 p-0 md:hidden flex justify-center items-center w-10/12 my-5 mx-auto rounded-sm py-1 text-white'>Add to cart</button>
                                    <button onClick={() => addProductCart(product.id)} className='bg-green-700 p-0 md:flex hidden justify-center items-center opacity-0 translate-y-40 group-hover/item:opacity-100 group-hover/item:translate-y-0 transition-all w-10/12 my-3 mx-auto rounded-sm py-1 text-white'>Add to cart</button>
                                </div>
                            </div>
                        ))}
                    </Slider>
                ))}
            </div>
        </React.Fragment>
    );
}
