import {React, useState} from 'react'
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
const miniDrawerWidth = 80;

export default function Navbar({content}) {

  const [isLargeMenu, setIsLargeMenu] = useState(true)

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton 
          onClick={() => setIsLargeMenu(prev => !prev)}
          sx={{
            marginRight:'30px',
            color: 'white',
          }}>
            {isLargeMenu ? <MenuOpenIcon/> : <MenuIcon/>}
          </IconButton>
          <img src={logo}/>
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
        {isLargeMenu ? <Menu/> : <MiniMenu/> }
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {content}
      </Box>
    </Box>
  );
}
