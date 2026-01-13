import { React, useState } from 'react'
import { Link, useLocation } from 'react-router';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import logo from '../../assets/BookFront_white.png'
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import IconButton from '@mui/material/IconButton';

import Menu from './Menu';
import MiniMenu from './MiniMenu'

const drawerWidth = 240;
const miniDrawerWidth = 40;

export default function Navbar({ content }) {
  const [isLargeMenu, setIsLargeMenu] = useState(true)

  const location = useLocation()
  const path = location.pathname

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar className='!bg-rose-800 !flex'>
          <IconButton
            onClick={() => setIsLargeMenu(prev => !prev)}
            sx={{
              marginRight: '30px',
              color: 'white',
            }}>
            {isLargeMenu ? <MenuOpenIcon /> : <MenuIcon />}
          </IconButton>
          <img src={logo} />
          <Button variant="outlined" sx={{ color: 'white', borderColor: 'white', ml: 'auto' }} component={Link} to='/login' selected={path === "/login"}>Sign In</Button>
          <Button variant="contained" sx={{ color: 'red', borderColor: 'white', background: 'white', ml: '6px' }} component={Link} to='/register' selected={path === "/register"}>Sign Up</Button>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: isLargeMenu ? drawerWidth : miniDrawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: isLargeMenu ? drawerWidth : miniDrawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        {isLargeMenu ? <Menu /> : <MiniMenu />}
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {content}
      </Box>
    </Box>
  );
}
