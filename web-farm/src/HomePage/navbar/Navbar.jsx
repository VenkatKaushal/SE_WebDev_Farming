// @ts-ignore
import React from 'react'
import './Navbar.css'
// @ts-ignore
import logo from './logo.png'
// @ts-ignore
import search_icon from './search.png'

function Navbar () {
  return (
    <div className='navbar'>
      <img src={logo} alt="" className='logo' />
       <ul>
        <li>Home</li>
        <li>Settings</li>
        <li>Contact us</li>
       </ul>

       <div className='search-box'> 
        <input type="text" placeholder='Search' />
        <img src={search_icon} alt=""  />
       </div>

      


       <button className='logout-button'>Logout</button>

    </div>
  );
}

export default Navbar