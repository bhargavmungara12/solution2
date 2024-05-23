import Grid from '@mui/material/Grid';
import ProductCard from '../productCard/ProductCard';
import ProductTable from '../productTable/ProductTable';
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Image from "next/image";
import { Pagination } from '@mui/material';
import Stack from '@mui/material/Stack';



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
  const [page, setPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const productsPerPage = 10;
  const pageCount = Math.ceil(totalProducts / productsPerPage);
  const [hoveredPage, setHoveredPage] = useState(null);



  useEffect(() => {
    requestProducts()
    fetchCategories();
  }, [])

  useEffect(() => {
    fetchBrands()
  }, [products])

  useEffect(() => {
    requestProducts()
  }, [page])

  useEffect(() => {
    const filteredItems = filterItems(products, searchQuery)

    setProducts(filteredItems)
  }, [searchQuery])


  const handlePageHover = (pageNumber) => {
    setHoveredPage(pageNumber);
  };

  const handlePageLeave = () => {
    setHoveredPage(null);
  };



  async function requestProducts() {
    try {
      setLoading(true);
      const skip = (page - 1) * productsPerPage;

      let url = `https://dummyjson.com/products?limit=${productsPerPage}&skip=${skip}`;
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
      setTotalProducts(data.total);


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


  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const handleSortOrderChange = (e) => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleBrandChange = (brand) => {
    setSelectedBrand(brand);
  };

  const handlePageChange = (e, value) => {
    setPage(value);
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
    query = query.toLowerCase().trim();
    if (!query) {
      return products;
    }
    const filteredProducts = products.filter(product => {
      const productTitleWords = product.title.toLowerCase().split(' ');
      return productTitleWords.some(word => word.startsWith(query));
    });
    return filteredProducts;
  }



  function handleInputChange(e) {
    const inputValue = e.target.value;
    setSearchQuery(inputValue);
    if (!inputValue) {
      requestProducts()
    } else {
      const copyProducts = [...products]
      const filteredProducts = filterItems(copyProducts, inputValue);
      if (filteredProducts.length > 0) {
        setProducts(filteredProducts)
      }
    }
  }



  return (
    <div className=''>
      <div className="py-4 px-2 bg-grey-350 flex items-center justify-center xs:flex-col md:flex-row">
        <div className="relative flex w-full items-center ml-4 mb-4 md:mb-0">
          <Image src="./search_icon.svg" alt="search" width={20} height={20} className="absolute left-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={handleInputChange}
            placeholder="Search for product..."
            className="mr-auto rounded-[20px] bg-grey-450 px-24 pl-10 py-1 outline-none xs:w-full md:w-auto "
          />
        </div>

        <div className="flex flex-col space-y-2 items-center">
          <div className="flex flex-col w-full xs:space-y-4 md:space-y-0 md:flex-row md:justify-between md:items-center">

            <div className="flex flex-col w-full xs:flex-row xs:justify-center xs:items-center xs:space-x-4 md:flex-row md:justify-center md:items-center md:space-x-4">
              <p className="whitespace-nowrap md:block xs:hidden">Filter By:</p>
              <select
                value={selectedBrand}
                onChange={(e) => handleBrandChange(e.target.value)}
                className="px-4 py-2 rounded-[14px] font-medium text-base w-full xs:w-auto bg-white"
              >
                <option value="">Select brand</option>
                {brands?.map((brand) => (
                  <option key={brand} value={brand}>
                    {brand}
                  </option>
                ))}
              </select>
              <select
                value={selectedCategory}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="px-2 py-2 rounded-[14px] font-medium text-base w-full xs:w-auto bg-white"
              >
                <option value="">Select Category</option>
                {categories?.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col w-full xs:flex-col xs:gap-x-16 md:flex-row md:justify-center md:items-center md:space-x-2 md:gap-x-2  xs:space-x-4">
              <div className="border-l-2 border-gray-300 h-6 xs:hidden md:block ml-2"></div>

              <select value={sortBy}
                onChange={handleSortChange}
                className="px-2 py-2 rounded-[14px] font-medium text-base w-full xs:w-auto bg-white"
              >
                <option value='price'>Price</option>
                <option value='rating'>Rating</option>
              </select>

              <select
                value={sortOrder}
                onChange={handleSortOrderChange}
                className="px-2 py-2 rounded-[14px] mt-2 md:mt-0 font-medium text-base w-full xs:w-auto  bg-white"
              >
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>

              <button onClick={handleSearch} className="px-8 py-2 mt-4 md:mt-0 border border-black-500  rounded-[14px] w-full xs:w-auto">
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className='w-[96%] mx-auto flex flex-col'>

        <div className='flex items-center gap-x-4 justify-end mt-10 md:mr-[1.3rem]'>

          <h3>View</h3>
          <div className="bg-[#D9F1FF] w-[9rem] h-[3rem] rounded-[36px] flex justify-center gap-x-4 items-center">
            <button
              className={` w-[44px] h-[44px] flex justify-center items-center rounded-[15px] ${view === 'card' && 'bg-[white] border border-[#D9F1FF] shadow-lg'}`}
              onClick={() => setView('card')}
              title="Card"
            >
              <Image src="./list_icon.svg" width={20} height={20} alt="list icon" />
            </button>
            <div className="border-l-[1px] h-6"></div>
            <button
              className={` w-[44px] h-[44px] flex justify-center items-center rounded-[15px] ${view === 'table' && 'bg-white border border-[#D9F1FF] shadow-lg'}`}
              onClick={() => setView('table')}
              title="Table"
            >
              <Image src="./table_icon.svg" width={20} height={20} alt="table icon" />
            </button>
          </div>
        </div>

        {view === 'card' ? (
          <Grid container spacing={3} justifyContent="flex-start" style={{ marginTop: '16px' }}>
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

        {sortedProducts.length === 0 && (
          <div className='mt-4 flex justify-center items-center flex-col h-[50vh]'>
            <img src="./noproducts_found_icon.svg" alt='no products' className='w-[70vw] h-[70vh] md:w-[40vw] md:h-[40vh]' />
            <p>No products were found, please try searching for another product!</p>
          </div>
        )}


        <div className='mt-6 mb-8 flex justify-center items-center'>
          {!searchQuery && (
            <Stack spacing={2}>
              <Pagination
                count={pageCount}
                page={page}
                onChange={handlePageChange}
                onMouseEnter={(event) => handlePageHover(event.target.innerText)}
                onMouseLeave={handlePageLeave}
                sx={{ backgroundColor: '#F3F3F3', borderRadius: '8px', paddingTop: '8px' }}
              />
            </Stack>
          )}

        </div>
      </div>
    </div>
  )
}

export default ProductList