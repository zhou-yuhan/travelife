import React, { useState } from "react";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import makeStyles from "@mui/styles/makeStyles";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
    root: {
        borderBottomRightRadius: "10%",
        borderBottomLeftRadius: "10%",
    },
    title: {
        fontSize: 14,
    },
});

export const NavigationBar = () => {
    const classes = useStyles();

    return (
        <AppBar position="sticky" className={classes.root} enableColorOnDark>
            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                >
                    <MenuIcon />
            
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    My Money Management
                </Typography>
                <Link to={"journey"}>
                    <Typography  variant="h6" component="div" sx={{ flexGrow: 1}}>
                        Journey
                    </Typography>
                </Link>
            </Toolbar>
        </AppBar>
    )
}