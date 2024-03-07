import React from "react";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import makeStyles from "@mui/styles/makeStyles";
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import ExploreIcon from '@mui/icons-material/Explore';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import PublicIcon from '@mui/icons-material/Public';
import PaletteIcon from '@mui/icons-material/Palette';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from "@mui/material/DialogActions";
import { Button, Grid, Theme, Tooltip } from "@mui/material";
import Box from "@mui/material/Box";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from "@mui/material/Divider";
import { themes } from "./theme";

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

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    // backgroundColor: alpha(theme.palette.common.white, 0.15),
    backgroundColor: alpha(theme.palette.secondary.main, 0.15),
    // TODO: set color theme with options in settings
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

interface InfoDiaglogProps {
    infoOpen: boolean;
    onClose: () => void;
}

export interface GeoConfig {
    name: string;
    filepath: string;
    center: [number, number];
    scale: number;
    projection: string;
}

interface GeoDialogProps {
    open: boolean;
    onClose: () => void;
    onChoose: (value: GeoConfig) => void;
}

interface PaletteDialogProps {
    open: boolean;
    onClose: () => void;
    onChoose: (value: Theme) => void;
}

export const geoSettings: Array<GeoConfig> = [
    {
        name: "World",
        filepath: "./world.json",
        center: [0, 0],
        scale: 150,
        projection: "geoMercator",
    },
    {
        name: "China",
        filepath: "./china.json",
        center: [103.8342, 36.0614], // The geometrical center of China is the city of Lanzhou, 103.8342 E, 36.0614 N
        scale: 500,
        projection: "geoMercator",
    },
    {
        name: "Beijing",
        filepath: "./beijing.json",
        center: [116.3916, 39.9033],
        scale: 3000,
        projection: "geoMercator",
    }
]


function GeoDialog(props: GeoDialogProps) {
    const { onChoose, open, onClose } = props;

    const handleListItemClick = (value: GeoConfig) => {
        onChoose(value);
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Geomap Scale</DialogTitle>
            <Divider />
            <List sx={{ pt: 0 }}>
                {geoSettings.map((geo) => (
                    <ListItem disableGutters key={geo.name}>
                        <ListItemButton onClick={() => handleListItemClick(geo)}>
                            <ListItemText primary={geo.name} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Dialog>
    );
}

function PaletteDialog(props: PaletteDialogProps) {
    const { onChoose, open, onClose } = props;

    const handleListItemClick = (value: Theme) => {
        onChoose(value);
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Color Theme</DialogTitle>
            <Divider />
            <List sx={{ pt: 0 }}>
                {themes.map((theme) => (
                    <ListItem disableGutters key={theme.name}>
                        <ListItemButton onClick={() => handleListItemClick(theme.theme)}>
                            <ListItemText primary={theme.name} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Dialog>
    );
}

function InfoDiaglog(props: InfoDiaglogProps) {
    const { infoOpen, onClose } = props;
    const handleClose = () => {
        onClose();
    };
    return (
        <Dialog open={infoOpen} onClose={handleClose}>
            <Grid container>
                <Grid item xs={10} >
                    <DialogTitle>Travel Life</DialogTitle>
                </Grid>
                <Grid item xs={2} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <Tooltip title="Learn more in new tab">
                        <IconButton onClick={() => window.open("https://github.com/zhou-yuhan/travelife", "_blank")}>
                            <OpenInNewIcon />
                        </IconButton>
                    </Tooltip>
                </Grid>
            </Grid>
            <DialogContent>
                <DialogContentText>
                    Life itself is a journey instead of a destination, and the footprints we've walked should be preserved. Our most precious memories hide within our exploration of this vast world ... all these memories would be lost in time ... like tears ... in rain.
                </DialogContentText>
            </DialogContent>
            <Box sx={{ display: "flex", justifyContent: "center" }} pb={1}>
                <DialogActions >
                    <Button onClick={handleClose} variant="contained">Start Travelife</Button>
                </DialogActions>
            </Box>
        </Dialog>
    )
}

export interface AppBarProps {
    handleGeoConfigChange: (value: GeoConfig) => void;
    handlePaletteConfigChange: (value: Theme) => void;
}


export const Appbar = ({ handleGeoConfigChange, handlePaletteConfigChange }: AppBarProps) => {
    const classes = useStyles();
    const [infoOpen, setInfoOpen] = React.useState(false);
    const [geoOpen, setGeoOpen] = React.useState(false);
    const [paletteOpen, setPaletteOpen] = React.useState(false);

    const handleInfoOpen = () => {
        setInfoOpen(true);
    };

    const handleInfoClose = () => {
        setInfoOpen(false);
    };

    const handleGeoOpen = () => {
        setGeoOpen(true);
    };

    const handlePaletteOpen = () => {
        setPaletteOpen(true);
    };

    const handleGeoClose = (value: GeoConfig) => {
        setGeoOpen(false);
        handleGeoConfigChange(value);
    };

    const handlePaletteClose = (value: Theme) => {
        setPaletteOpen(false);
        handlePaletteConfigChange(value);
    };

    return (
        <AppBar position="sticky" className={classes.root} enableColorOnDark sx={{ mb: 1 }}>
            <Toolbar>
                <IconButton
                    size="large"
                    edge="start" color="secondary"
                    onClick={handleInfoOpen}
                >
                    <ExploreIcon />
                </IconButton>
                <InfoDiaglog infoOpen={infoOpen} onClose={handleInfoClose} />
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Travel Life
                </Typography>
                <IconButton
                    size="large"
                    edge="start" color="secondary"
                    onClick={handleGeoOpen}
                >
                    <PublicIcon />
                </IconButton>
                <GeoDialog open={geoOpen} onChoose={handleGeoClose} onClose={() => { setGeoOpen(false) }} />
                <IconButton
                    size="large"
                    edge="start" color="secondary"
                    onClick={handlePaletteOpen}
                >
                    <PaletteIcon />
                </IconButton>
                <PaletteDialog open={paletteOpen} onChoose={handlePaletteClose} onClose={() => { setPaletteOpen(false) }} />
                <Search>
                    <SearchIconWrapper>
                        <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                        placeholder="Search Tag"
                        inputProps={{ 'aria-label': 'search' }}
                    />
                </Search>
            </Toolbar>
        </AppBar>
    )
}