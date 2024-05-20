import ProductDetails from "@/components/productDetails/ProductDetails"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';


function SingleProduct() {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      requestSingleProduct();
    }
  }, [id]);

  async function requestSingleProduct() {
    try {
      setLoading(true);
      const res = await fetch(`https://dummyjson.com/products/${id}`);
      if (!res.ok) {
        throw new Error('Failed to fetch product');
      }
      const data = await res.json();
      setProduct(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  if (!product) {
    return null;
  }



  return (
    <div>
      <ProductDetails product={product} />
    </div>
  )
}

export default SingleProduct