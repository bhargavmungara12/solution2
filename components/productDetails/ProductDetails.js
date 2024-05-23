import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { calculateDiscountedPrice } from '@/utlities/calculateDiscountPrice';
import { useMediaQuery } from '@mui/material';
import Rating from '@mui/material/Rating';
import { styled } from '@mui/system';

export default function ProductDetails({ product }) {
  const router = useRouter();
  const isSmallScreen = useMediaQuery('(max-width:600px)');

  const carouselStyles = {
    height: isSmallScreen ? '60vh' : '70vh',
    display: 'flex',
    alignItems: 'center',
  };

  const imgStyles = {
    width: '100%',
    height: '90%',
    objectFit: 'cover',
  };

  const CustomIcon = styled((props) => (
    <Image src={props.src} alt="rating icon" width={30} height={20} {...props} />
  ))(({ theme }) => ({
    marginTop: '16px',
    padding: '2px'
  }));

  return (
    <>
      <div className="flex flex-col w-[90%] mx-auto md:w-auto md:mx-0">
        <button
          onClick={() => router.back()}
          className='cursor-pointer flex md:ml-40 md:mt-16 '
        >
          <img src="../../back_icon.svg" alt='backicon' /> Products
        </button>
        <div className="flex justify-center mt-8 gap-x-6 flex-col md:flex-row md:items-start items-center">
          <div className="md:w-[40%] w-full bg-secondary rounded-2xl">
            <div className="w-[90%] mx-auto md:h-[70vh] h-auto">
              <Carousel infiniteLoop showStatus={false} showArrows={false} showThumbs={!isSmallScreen}>
                {product.images.map((image, index) => (
                  <div key={index} style={carouselStyles}>
                    <img src={image} alt={`Product Image ${index + 1}`} style={imgStyles} className='rounded-xl' />
                  </div>
                ))}
              </Carousel>
            </div>
          </div>

          <div className="w-full md:w-auto md:mx-0">
            <h2 className="md:text-[32px] font-semibold xs:text-xl md:mt-0 xs:mt-3">{product.title}</h2>
            <p className="md:text-2xl font-normal xs:text-xl">{product.brand}</p>
            <div className='flex items-center gap-x-2 flex-row'>

              <Rating
                value={product.rating}
                readOnly
                icon={<CustomIcon src="../../rating_icon.svg" />}
                emptyIcon={<CustomIcon src="../../empty_rating_icon.svg" />}
              />
              <p className='mt-3'>{product.rating}</p>
            </div>

            <h3 className="mt-4">
              <span className="text-[32px] font-bold">
                ${calculateDiscountedPrice(product.price, product.discountPercentage)}
              </span>
              {' '} M.R.P: <s>${product.price}</s> ({product.discountPercentage}% off)
            </h3>
            <p className="font-medium text-base w-full md:w-[500px] mt-6">{product.description}</p>
          </div>
        </div>
      </div>
    </>
  );
}
