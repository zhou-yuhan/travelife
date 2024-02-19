import React from "react";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Divider } from "@mui/material";
import PublicIcon from '@mui/icons-material/Public';
import TourIcon from '@mui/icons-material/Tour';
import FlightIcon from '@mui/icons-material/Flight';
import SettingsIcon from '@mui/icons-material/Settings';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import makeStyles from "@mui/styles/makeStyles";
import { Link } from "react-router-dom";
import MenuItem from '@mui/material/MenuItem';
import Menu, { MenuProps } from '@mui/material/Menu';
import { styled, alpha } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles';
import * as Themes from './theme';

const useStyles = makeStyles({
    root: {
        borderBottomRightRadius: "10%",
        borderBottomLeftRadius: "10%",
    },
    title: {
        fontSize: 14,
    },
    appbar: {
        alignItems: 'center',
    }
});

const StyledMenu = styled((props: MenuProps) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        {...props}
    />
))(({ theme }) => ({
    '& .MuiPaper-root': {
        borderRadius: 6,
        marginTop: theme.spacing(1),
        minWidth: 180,
        color:
            theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
        boxShadow:
            'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        '& .MuiMenu-list': {
            padding: '4px 0',
        },
        '& .MuiMenuItem-root': {
            '& .MuiSvgIcon-root': {
                fontSize: 18,
                color: theme.palette.text.secondary,
                marginRight: theme.spacing(1.5),
            },
            '&:active': {
                backgroundColor: alpha(
                    theme.palette.primary.main,
                    theme.palette.action.selectedOpacity,
                ),
            },
        },
    },
}));

const TravelifeMenu = () => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                onClick={handleClick}
            // ref={anchorRef}
            >
                <MenuIcon />
            </IconButton>
            <ThemeProvider theme={Themes.themeGanyu}>
                <StyledMenu
                    id="demo-customized-menu"
                    MenuListProps={{
                        'aria-labelledby': 'demo-customized-button',
                    }}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                >
                    <MenuItem onClick={handleClose} disableRipple>
                        <PublicIcon />
                        Overview
                    </MenuItem>
                    <MenuItem onClick={handleClose} disableRipple>
                        <TourIcon />
                        Travels
                    </MenuItem>
                    <MenuItem onClick={handleClose} disableRipple>
                        <FlightIcon />
                        Routes
                    </MenuItem>
                    <Divider sx={{ my: 0.5 }} />
                    <MenuItem onClick={handleClose} disableRipple>
                        <SettingsIcon />
                        Settings
                    </MenuItem>
                </StyledMenu>
            </ThemeProvider>
        </div>
    )
}

export const NavigationBar = () => {
    const classes = useStyles();
    return (
        <AppBar position="sticky" className={classes.root} enableColorOnDark>
            <Toolbar>
                <TravelifeMenu />
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Travel Life
                </Typography>
                {/* <Link to={"journey"} color="secondary">
                    <Typography color="secondary" variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Journey
                    </Typography>
                </Link> */}
            </Toolbar>
        </AppBar>
    )
}