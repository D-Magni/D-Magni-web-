import React, { useState, useEffect } from "react";
import { PuffLoader } from 'react-spinners';

const LazyImage = ({ src, alt }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const image = new Image();
    image.src = src;
    image.onload = () => {
      setLoaded(true);
    };
  }, [src]);

  return loaded ? <img src={src} alt={alt} className='w-full h-24 md:h-40 object-cover' /> : <div className=" flex justify-center items-center bg-gray-100">
    <PuffLoader color="gray" size={100}/></div>;
};

export default LazyImage;