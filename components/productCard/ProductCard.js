import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/router';
import { calculateDiscountedPrice } from '@/utlities/calculateDiscountPrice';

function ProductCard({ product }) {
  const router = useRouter()

  function handleCardClick() {
    router.push(`/product/${product.id}`)
  }


  return (
    <div className='flex justify-center mt-6'>
      {/* <Card style={{ width: '100%', maxWidth: '413px', maxHeight: '536px', margin: '0 auto' }}
        className='cursor-pointer'
        onClick={handleCardClick}
      >
        <CardMedia
          component="img"
          height="412"
          maxHeight="412"
          width="413"
          image={product.thumbnail}
          alt={product.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {product.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {product.brand}
          </Typography>
          <Typography variant="body1" color="text.primary">
            ${product.price}
          </Typography>
        </CardContent>
      </Card> */}
      <section className="w-[413px] md:h-[436px] h-auto cursor-pointer  flex md:flex-col xs:flex-row xs:items-start rounded-2xl xs:gap-x-4 md:gap-0"
        onClick={handleCardClick}
      >
        <div
          className="w-full md:h-[296px] h-[180px] flex items-center justify-center overflow-hidden rounded-2xl relative"
          onClick={handleCardClick}
        >
          <img src={product.thumbnail} alt={product.title} className="object-cover w-full h-full" />
          <div className="absolute left-[14px] bottom-[14px] xs:hidden  px-4 py-1 rating text-white rounded-[26px] md:flex gap-x-2">
            <img src="./rating_icon.svg" alt="rating" />
            <p>{product.rating}</p>
          </div>
        </div>
        <div className=" flex flex-col justify-center">
          <h2 className="md:text-2xl md:font-bold font-semibold text-base md:mt-4">{product.title}</h2>
          <h3 className="md:text-xl text-gray-600 mt-2 text-sm font-normal">{product.brand}</h3>
          <p className='flex gap-x-1 items-center font-semibold text-sm mt-2 md:hidden'><img src='./rating_icon.svg' alt='rating' className='w-[16px] h-[16px] md:hidden' /> {product.rating}</p>
          <h3 className="text-[8px] font-normal md:text-xl mt-2"><span className='md:text-[32px] md:font-bold font-semibold text-xl'>
            ${calculateDiscountedPrice(product.price, product.discountPercentage)}
          </span>   M.R.P: <s>${product.price}</s> ({product.discountPercentage}% off)</h3>
        </div>
      </section>
    </div>
  )
}

export default ProductCard

