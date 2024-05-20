import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import ProductCard from '../productCard/ProductCard';
import ProductTable from '../productTable/ProductTable';
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

function ProductList() {

  const [view, setView] = useState('card');
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState('rating');
  const [sortOrder, setSortOrder] = useState('desc');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [categories, setCategories] = useState([])
  const [brands, setBrands] = useState([])



  useEffect(() => {
    requestProducts()
    fetchCategories();
  }, [])

  useEffect(() => {
    fetchBrands()
  }, [products])

  async function requestProducts() {
    try {
      setLoading(true);
      let url = 'https://dummyjson.com/products';
      const queryParams = [];
      // if (searchQuery) {
      //   queryParams.push(`/search?q=${searchQuery.toLowerCase()}`);
      // }

      // if (queryParams.length > 0) {
      //   url += `${queryParams.join('&')}`;
      // }
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error('Failed to fetch product');
      }
      const data = await res.json();
      let filteredProducts = data.products;

      if (selectedCategory) {
        filteredProducts = filteredProducts.filter(product =>
          product.category.toLowerCase() === selectedCategory.toLowerCase()
        );
      }

      if (selectedBrand) {
        filteredProducts = filteredProducts.filter(product =>
          product.brand.toLowerCase() === selectedBrand.toLowerCase()
        );
      }
      setProducts(filteredProducts);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }


  async function fetchCategories() {
    try {
      const res = await fetch('https://dummyjson.com/products/categories');
      if (!res.ok) {
        throw new Error('Failed to fetch categories');
      }
      const data = await res.json();

      setCategories(data);
    } catch (err) {
      console.error(err);
    }
  }


  async function fetchBrands() {
    try {
      const brands = products.map((product) => product.brand);
      const uniqueBrands = [...new Set(brands)];
      setBrands(uniqueBrands);
    } catch (err) {
      console.error(err);
    }
  }


  const handleSortChange = (value) => {
    setSortBy(value);
  };

  const handleSortOrderChange = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleBrandChange = (brand) => {
    setSelectedBrand(brand);
  };

  const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === 'rating') {
      return sortOrder === 'asc' ? a.rating - b.rating : b.rating - a.rating;
    } else if (sortBy === 'price') {
      return sortOrder === 'asc' ? a.price - b.price : b.price - a.price;
    }
    return 0;
  });

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

  if (!products) {
    return null;
  }

  const handleSearch = () => {
    requestProducts();
  };

  function filterItems(products, query) {
    query = query.toLowerCase();
    return products.filter(product =>
      product.title.split(' ').some(word =>
        word.toLowerCase().startsWith(query)
      )
    );
  }

  function handleInputChange(e) {
    const inputValue = e.target.value
    setSearchQuery(inputValue);
    const filteredProducts = filterItems(products, inputValue);
    setProducts(filteredProducts);
    if (!inputValue) {
      requestProducts()
    }
  }

  return (
    <div>
      <Button variant="contained" onClick={() => setView('card')}>
        Card View
      </Button>
      <Button variant="contained" onClick={() => setView('table')}>
        Table View
      </Button>
      <div>
        <input
          type="text"
          value={searchQuery}
          onChange={handleInputChange}
          placeholder="Search product..."
        />
        <Button variant="contained" onClick={handleSearch} style={{ marginLeft: '8px' }}>
          Search
        </Button>
      </div>

      <div style={{ marginTop: '16px' }}>
        <h3>Filter by Category:</h3>
        <select value={selectedCategory} onChange={(e) => handleCategoryChange(e.target.value)}>
          <option value="">All</option>
          {categories?.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div style={{ marginTop: '16px' }}>
        <h3>Filter by Brand:</h3>
        <select value={selectedBrand} onChange={(e) => handleBrandChange(e.target.value)}>
          <option value="">All</option>
          {brands?.map((brand) => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </select>
      </div>


      <div style={{ marginTop: '16px' }}>
        <Button variant="contained" onClick={() => handleSortChange('rating')} style={{ marginRight: '8px' }}>
          Sort by Rating
        </Button>
        <Button variant="contained" onClick={() => handleSortChange('price')} style={{ marginRight: '8px' }}>
          Sort by Price
        </Button>
        <Button variant="contained" onClick={handleSortOrderChange}>
          {sortOrder === 'asc' ? 'Ascending' : 'Descending'}
        </Button>
      </div>

      {view === 'card' ? (
        <Grid container spacing={2} justifyContent="center" style={{ marginTop: '16px' }}>
          {sortedProducts.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <div style={{ marginTop: '16px' }}>
          <ProductTable products={sortedProducts} />
        </div>
      )}
    </div>
  )
}

export default ProductList