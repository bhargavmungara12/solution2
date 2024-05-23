import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useMediaQuery } from '@mui/material';
import { useRouter } from 'next/router';



function ProductTable({ products }) {
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const router = useRouter()



  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className='text-center text-base'>Name of the Product</TableCell>
              {!isSmallScreen && <TableCell className='text-center text-base'>Description</TableCell>}
              <TableCell className='text-center text-base'>Category</TableCell>
              <TableCell className='text-center text-base'>Brand</TableCell>
              <TableCell className='text-center text-base'>Rating</TableCell>
              <TableCell className='text-center text-base'>Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}
                onClick={() => router.push(`/product/${product.id}`)}
                className='cursor-pointer'
              >
                <TableCell className='w-[270px] text-center font-medium text-base'>{product.title}</TableCell>
                {!isSmallScreen && <TableCell className='text-pretty max-w-[400px] font-medium text-base'>{product.description}</TableCell>}
                <TableCell className='text-center w-[170px] font-medium text-base'>{product.category}</TableCell>
                <TableCell className='text-center w-[170px] font-medium text-base'>{product.brand}</TableCell>
                <TableCell className='text-center w-[170px] font-medium text-base'>{product.rating}</TableCell>
                <TableCell className='text-center w-[170px] font-medium text-base'>${product.price}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default ProductTable