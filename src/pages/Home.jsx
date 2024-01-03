import React, { useEffect, useState } from 'react';
import { MdOutlineCurrencyRupee } from "react-icons/md";
import { TiShoppingCart } from "react-icons/ti";
import { IoStar } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { Button } from '@material-tailwind/react'
import { RxCross1 } from "react-icons/rx";
import { TbShoppingCartOff } from "react-icons/tb";
const Home = () => {
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [filteredProducts, setFilterProducts] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 1800]);
  const [searchQuery, setSearchQuery] = useState('');
  const [applyFilter, setApplyFilter] = useState(false);
  const [dot, setDot] = useState(false)
  const [items, setItems] = useState([])
  const [click,setClick]=useState(false)

  const handleClick = () => {
    sessionStorage.removeItem('token')
    navigate("/")
  }

  const handleCart=(product)=>{
    console.log(product)
    setItems((prevItems) => [...prevItems, product]);
    setDot(true);
  }


  const handleDeleteItem = (productId) => {
    const updatedItems = items.filter((item) => item.id !== productId);
    setItems(updatedItems);

    if (updatedItems.length === 0) {
      setDot(false);
    }
  };

  const calculateTotal = () => {
    return items.reduce((total, item) => total + item.price, 0);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://dummyjson.com/products');
        const result = await response.json();
        setData(result);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

    const token = sessionStorage.getItem('token');
    if (!token) {
      navigate('/');
    }
  }, [navigate]);


  //for filteration
  useEffect(() => {
    const products = data.products
      ? data.products.filter(
        (product) =>
          (searchQuery
            ? product.title.toLowerCase().includes(searchQuery.toLowerCase())
            : true) &&
          (!applyFilter || parseFloat(product.price) <= priceRange[1])
      )
      : [];
    setFilterProducts(products);
  }, [data.products, searchQuery, applyFilter, priceRange]);

  const handleApplyFilter = () => {
    setApplyFilter(true);
  };

  const handleResetFilter = () => {
    setApplyFilter(false);
    setPriceRange([30, 1800]);
  };

  return (
    <div >
      <div className='fixed top-0 flex justify-between p-10 items-center w-full h-24 bg-gray-200 backdrop-blur-sm z-10 shadow-md bg-opacity-40 hover:bg-opacity-50 bg-clip-padding'>
        <h2 className="text-2xl font-bold ">Product Details</h2>
        <div className="mb-4 flex gap-1">
          <input
            type="text"
            placeholder="Search by title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border border-gray-500 rounded py-2 px-4"
          />

        </div>
        <div className='flex gap-10 items-center'>
          <div>
            {dot && <div className='relative top-3 left-4 rounded-full text-red-900 font-bold opacity-80 w-4 h-4'>{items.length}</div>}
            <Button variant='text' onClick={()=>setClick(!click)}>
            <TiShoppingCart className='text-3xl' />
            </Button>
          </div>

          <Button onClick={handleClick}>LogOut</Button>
        </div>

      </div>


      {/* DialougeBox */}

      { click && 
      <div className='w-102 h-96 absolute right-0 top-24  z-10 bg-gray-100'>
      {items.length>0?(
        <div className='flex flex-col justify-between h-full'>
        <table className="min-w-full bg-white border border-gray-300 table-auto">
        <tbody >
            {items.map((product, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                
                  <td className="py-2 px-10 border-b">{product.title}</td>
                  <td className="py-2 px-4 border-b">{product.brand}</td>
                  
                  <td className="py-2 px-4 border-b"><span className='flex justify-center items-center'><MdOutlineCurrencyRupee />{product.price}</span></td>
                  
                  <td className="py-2 px-4 border-b ">
                  <Button
                        className='flex gap-4 hover:text-red-900'
                        variant='text'
                        onClick={() => handleDeleteItem(product.id)}
                      >
                    <RxCross1 className='text-md' /></Button>
                  </td>
                </tr>
                
              ))}
      
          </tbody>
        </table>
        <div className="flex justify-between p-5 bg-gray-500">
            <span>
              Total : 
            </span>
            <span className='flex items-center'><MdOutlineCurrencyRupee /> {calculateTotal()}</span>
        </div>
        </div>
        
      ):
          <div className="p-4 text-center flex justify-center text-gray-600 relative top-20">
          <div className='flex justify-center items-center gap-2'>
            <TbShoppingCartOff className='text-4xl' />
            <span>Cart is empty</span>
          </div>
          </div>
      }
        
      </div>
      }


      <div className="container mx-auto my-40" onClick={()=>setClick(false)}>

        {/* price filter */}

        <div className="mb-6 flex flex-col gap-4 p-10 bg-gray-100 w-1/3">
          <label htmlFor="labels-range-input" className="text-gray-600">
            Price range:
          </label>
          <input
            id="labels-range-input"
            type="range"
            min="30"
            max="1800"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([30, parseFloat(e.target.value)])}
            className="w-52 h-2 bg-gray-200 rounded-lg cursor-pointer"
          />
          <div className="text-gray-600">
            Current Value: ₹ {priceRange[1]}
          </div>
          <div className='flex gap-2'>

            <Button onClick={handleApplyFilter} className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2 ">
              Apply Filter
            </Button>
            <Button onClick={handleResetFilter} className="bg-gray-500 text-white px-4 py-2 rounded-md">
              Reset Filter
            </Button>
          </div>
        </div>



        <table className="min-w-full bg-white border border-gray-300 table-auto">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">ID</th>
              <th className="py-2 px-4 border-b">Title</th>
              <th className="py-2 px-4 border-b">Brand</th>
              <th className="py-2 px-4 border-b">Description</th>
              <th className="py-2 px-4 border-b">Rating</th>
              <th className="py-2 px-4 border-b">Price</th>
              <th className="py-2 px-4 border-b">Category</th>
              <th className="py-2 px-4 border-b">Stock</th>
              <th className="py-2 px-4 border-b">Images</th>

            </tr>
          </thead>
          <tbody>
            {data.products &&
              filteredProducts.map((product, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                  <td className="py-2 px-4 border-b font-medium">{product.id}</td>
                  <td className="py-2 px-10 border-b">{product.title}</td>
                  <td className="py-2 px-4 border-b">{product.brand}</td>
                  <td className="py-2 px-4 border-b">{product.description}</td>
                  <td className="py-2 px-4 border-b"><span className='flex justify-center gap-2'>{product.rating}<IoStar /></span></td>
                  <td className="py-2 px-4 border-b"><span className='flex justify-center items-center'><MdOutlineCurrencyRupee />{product.price}</span></td>
                  <td className="py-2 px-4 border-b">{product.category}</td>
                  <td className="py-2 px-4 border-b">{product.stock}</td>
                  <td className="py-2 px-4 border-b">
                    <img src={product.thumbnail} alt={`Image ${index}`} className="max-w-full h-auto" />
                  </td>
                  <td className="py-2 px-4 border-b ">
                    <Button className='flex gap-4' variant='outlined' onClick={()=>handleCart(product)}><TiShoppingCart className='text-4xl' />Add to Cart</Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
