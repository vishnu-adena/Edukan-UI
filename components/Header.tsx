import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';
import useAuth from '../customhooks/useAuth';

const Header: React.FC = () => {
  const { isLoggedIn, logout, oauthLogin } = useAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <header className="bg-gray-800 text-white py-4">
      <nav className="container mx-auto flex items-center justify-between px-4">
        <div className="flex items-center space-x-4">
          <Link href="/" passHref>
            <div className="cursor-pointer flex items-center space-x-2">
              <Image src="/logo.jpg" alt="Logo" width={35} height={35} />
              <span className="text-xl font-bold">E-DUKAN</span>
            </div>
          </Link>
        </div>
        <div className="hidden md:flex items-center space-x-4">
          <Link href="/" passHref>
            <div className="cursor-pointer hover:text-gray-300">Home</div>
          </Link>
          <Link href="/about" passHref>
            <div className="cursor-pointer hover:text-gray-300">About Us</div>
          </Link>
          <Link href="/contact" passHref>
            <div className="cursor-pointer hover:text-gray-300">Contact Us</div>
          </Link>
          {isLoggedIn ? (
            <>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenuOpen}
                color="inherit"
              >
                <AccountCircleIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={handleMenuClose}>
                  <Link href="/user/dashboard">
                    <div className="cursor-pointer">My Account</div>
                  </Link>
                </MenuItem>
                <MenuItem onClick={logout}>Logout</MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <Link href="/login" passHref>
                <div className="cursor-pointer hover:text-gray-300">Login</div>
              </Link>
              <Link href="/registration" passHref>
                <div className="cursor-pointer hover:text-gray-300">Register</div>
              </Link>
            </>
          )}
          <Link href="/cart" passHref>
            <div className="cursor-pointer flex items-center">
              <Image src="/cart.png" alt="Cart" width={34} height={34} />
            </div>
          </Link>
        </div>
        <div className="md:hidden flex items-center">
          <IconButton onClick={handleDrawerToggle} color="inherit">
            <MenuIcon />
          </IconButton>
        </div>
      </nav>
      <Drawer anchor="right" open={drawerOpen} onClose={handleDrawerToggle}>
        <div className="w-64 py-4">
          <Link href="/" passHref>
            <div className="block px-4 py-2 cursor-pointer hover:bg-gray-700 hover:text-white">Home</div>
          </Link>
          <Link href="/about" passHref>
            <div className="block px-4 py-2 cursor-pointer hover:bg-gray-700 hover:text-white">About Us</div>
          </Link>
          <Link href="/contact" passHref>
            <div className="block px-4 py-2 cursor-pointer hover:bg-gray-700 hover:text-white">Contact Us</div>
          </Link>
          {isLoggedIn ? (
            <>
              <Link href="/user/dashboard" passHref>
                <div className="block px-4 py-2 cursor-pointer hover:bg-gray-700 hover:text-white">My Account</div>
              </Link>
              <div onClick={logout} className="block px-4 py-2 cursor-pointer hover:bg-gray-700 hover:text-white">
                Logout
              </div>
            </>
          ) : (
            <>
              <Link href="/login" passHref>
                <div className="block px-4 py-2 cursor-pointer hover:bg-gray-700 hover:text-white">Login</div>
              </Link>
              <Link href="/registration" passHref>
                <div className="block px-4 py-2 cursor-pointer hover:bg-gray-700 hover:text-white">Register</div>
              </Link>
              <button onClick={oauthLogin} className="block px-4 py-2 cursor-pointer hover:bg-gray-700 hover:text-white">
                E-Dukan OAuth2
              </button>
            </>
          )}
          <Link href="/cart" passHref>
            <div className="block px-4 py-2 cursor-pointer flex items-center hover:bg-gray-700 hover:text-white">
              <Image src="/cart.png" alt="Cart" width={34} height={34} />
              <span>Cart</span>
            </div>
          </Link>
        </div>
      </Drawer>
    </header>
  );
};

export default Header;
