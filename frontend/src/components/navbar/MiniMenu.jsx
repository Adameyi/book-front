import * as React from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import {Link, useLocation} from 'react-router';

export default function MiniMenu() {

    const location = useLocation()
    const path = location.pathname

    return (
        <>
            <List
                sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                component="nav"
                aria-labelledby="nested-list-subheader"
            >
                <ListItemButton component={Link} to = '/' selected={path === "/"} sx={{display:'flex', justifyContent:'center'}}>
                    <ListItemIcon sx={{display:'flex', justifyContent:'center'}}>
                        <LocalLibraryIcon />
                    </ListItemIcon>
                </ListItemButton>
                <ListItemButton component={Link} to = '/addbook' selected={path === "/addbook"} sx={{display:'flex', justifyContent:'center'}}>
                    <ListItemIcon>
                        <NoteAddIcon />
                    </ListItemIcon>
                </ListItemButton>
                <ListItemButton component={Link} to = '/addbook' selected={path === "/addbook"} sx={{display:'flex', justifyContent:'center'}}>
                    <ListItemIcon>
                        <NoteAddIcon />
                    </ListItemIcon>
                </ListItemButton>
            </List>
        </>
    );
}
