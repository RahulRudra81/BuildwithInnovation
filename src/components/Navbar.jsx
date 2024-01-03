import React from 'react'
import { Button } from '@material-tailwind/react'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
    const navigate=useNavigate();
    const handleClick=()=>{
        sessionStorage.removeItem('token')
        navigate("/")
    }
  return (
    <div className='fixed top-0 flex justify-end p-10 items-center w-full h-24 bg-gray-200 backdrop-blur-sm z-10 shadow-md bg-opacity-40 hover:bg-opacity-50 bg-clip-padding'>
        <Button onClick={handleClick}>LogOut</Button>
      
    </div>
  )
}

export default Navbar