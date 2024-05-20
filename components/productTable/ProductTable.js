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
              <TableCell>Name</TableCell>
              {!isSmallScreen && <TableCell>Description</TableCell>}
              <TableCell>Brand</TableCell>
              <TableCell>Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}
                onClick={() => router.push(`/product/${product.id}`)}
                className='cursor-pointer'
              >
                <TableCell>{product.title}</TableCell>
                {!isSmallScreen && <TableCell>{product.description}</TableCell>}
                <TableCell>{product.brand}</TableCell>
                <TableCell>${product.price}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default ProductTable