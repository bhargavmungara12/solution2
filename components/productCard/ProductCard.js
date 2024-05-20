import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/router';


function ProductCard({ product }) {
  const router = useRouter()

  function handleCardClick() {
    router.push(`/product/${product.id}`)
  }

  return (
    <div>
      <Card style={{ width: '100%', maxWidth: '300px', margin: '0 auto' }}
        className='cursor-pointer'
        onClick={handleCardClick}
      >
        <CardMedia
          component="img"
          height="140"
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
      </Card>
    </div>
  )
}

export default ProductCard