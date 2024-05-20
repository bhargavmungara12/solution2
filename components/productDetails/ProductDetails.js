
import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export default function ProductDetails({ product }) {

  return (
    <Card className="w-full max-w-4xl mx-auto  shadow-lg rounded-lg overflow-hidden flex justify-center items-center mt-24">
      <div className="flex flex-col md:flex-row ">
        <div className="md:w-1/2">
          <Carousel infiniteLoop showStatus={false}>
            {product.images.map((image, index) => (
              <div key={index}>
                <img src={image} alt={`Product Image ${index + 1}`} className="w-full h-auto" />
              </div>
            ))}
          </Carousel>
        </div>
        <div className="md:w-1/2 p-4">
          <CardContent>
            <Typography gutterBottom variant="h2">
              {product.title}
            </Typography>
            <Typography gutterBottom variant="h4">
              {product.brand}
            </Typography>
            <Typography variant="body1" className="mb-4">
              {product.description}
            </Typography>
            <Typography variant="h5" className="mb-4">
              ${product.price}
            </Typography>
            <Typography variant="subtitle1" >
              {product.rating}
            </Typography>

          </CardContent>
        </div>
      </div>
    </Card>
  );
};

