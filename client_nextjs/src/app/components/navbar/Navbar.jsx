import React from 'react'
import './Navbar.css'
import Link from 'next/link'
const Navbar = () => {
  return (
    <>
     <nav>
      <div className="navbar">
        <div className='logo'>
          SOME LOGO
        </div>
          <div className="login_button">
            <button>
            <Link href={'./routes/choose'}>Login</Link>
              </button>
          </div>
      </div>
    </nav>
    </>
  )
}

export default Navbar