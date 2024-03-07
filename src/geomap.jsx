import * as React from 'react';
import { ComposableMap, Geographies, Geography, ZoomableGroup, Marker } from "react-simple-maps";
import { styled, alpha } from '@mui/material/styles';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { Box, Grid, Icon, Paper } from '@mui/material';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

const StyledGeography = styled(Geography)(({ theme }) => ({
    fill: theme.palette.secondary.main,
    stroke: theme.palette.primary.light,
    strokeWidth: 0.3,
    '&:hover': {
        fill: theme.palette.primary.main,
    },
}))

const HtmlTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: '#f5f5f9',
        color: 'rgba(0, 0, 0, 0.87)',
        maxWidth: "450",
        fontSize: theme.typography.pxToRem(10),
        border: '1px solid #dadde9',
    },
}));

const TripMarkers = ({ changeFilePath, markerProps }) => {
    function markerHover(event) {
        var id = parseInt(event.target.id.split('-')[1])
        const children = document.getElementById('marker-' + id.toString()).children;
        for (let i = 0; i < children.length; i++) {
            children[i].setAttribute('stroke', '#FFFFFF');
        }
    }

    function markerLeave(event) {
        var id = parseInt(event.target.id.split('-')[1]);
        const children = document.getElementById('marker-' + id.toString()).children;
        for (let i = 0; i < children.length; i++) {
            children[i].setAttribute('stroke', 'none');
        }
    }

    function markerClick(event) {
        var id = parseInt(event.target.id.split('-')[1]);
        let marker = markerProps[id];
        if (marker.trips.length != 1) {
            return; // multiple trips in the same location, handle it in the tooltip
        }
        if ("notes" in marker.trips[0]) {
            changeFilePath(marker.trips[0].notes);
        } else {
            changeFilePath('')
        }
    }

    return (
        markerProps.map((marker, index) => {
            if (!("coordinates" in marker)) {
                return <></>;
            }

            let coordinates = marker.coordinates;
            let location = "location" in marker ? marker.location : "Somewhere";

            const Item = styled(Paper)(({ theme }) => ({
                backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
                ...theme.typography.body2,
                padding: theme.spacing(1),
                textAlign: 'center',
                color: theme.palette.text.secondary,
                overflowX: 'auto'
            }));

            // console.log(marker.trips);

            return (
                <HtmlTooltip
                    title={
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <Grid container spacing={1} sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignContent: 'center' }}>
                                <Grid item xs={12}>
                                    <Item>
                                        <Typography color="inherit" variant='subtitle1'>{location + " " + coordinates[0] + "°E " + coordinates[1] + "°N"}</Typography>
                                    </Item>
                                </Grid>
                                {marker.trips.map((trip) => {
                                    const titleClick = (event) => {
                                        if ("notes" in trip) {
                                            changeFilePath(trip.notes)
                                        } else {
                                            changeFilePath('')
                                        }
                                    }

                                    let date = "date" in trip ? trip.date : "some time ago";
                                    let title = "title" in trip ? trip.title : "A nice trip";
                                    let tags = "tags" in trip ? trip.tags.map(tag => '#' + tag) : [];

                                    return (
                                        <Grid item xs={12}>
                                            <Item onClick={titleClick}>
                                                <Typography color="inherit" variant='subtitle1' gutterBottom>{title} {date}</Typography>
                                                <Stack direction="row" spacing={1}>
                                                    {tags.map((tag) => <Chip label={tag} />)}
                                                </Stack>
                                            </Item>
                                        </Grid>
                                    )
                                })}
                            </Grid>
                        </Box>
                    }
                >
                    <Marker coordinates={marker.coordinates}>
                        <g
                            id={"marker-" + index.toString()}
                            fill="#FF5533"
                            stroke="none"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            transform={"translate(-12, -24) scale(1)"}
                            onMouseEnter={markerHover}
                            onMouseLeave={markerLeave}
                            onClick={markerClick}
                        >
                            <path id={"path-" + index.toString()} d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z" />
                            <circle id={"circle-" + index.toString()} cx="12" cy="10" r="3.5" fill='#FFFFFF' />
                        </g>
                    </Marker>
                </HtmlTooltip>
            )
        })
    )
}


export const GeoMap = ({ changeFilePath, markerProps, geoConfig }) => {
    return (
        <ComposableMap
            projection={geoConfig.projection}
            projectionConfig={{ center: geoConfig.center, scale: geoConfig.scale }}
        >
            <ZoomableGroup zoom={1} maxZoom={20}>
                <Geographies geography={geoConfig.filepath}>
                    {({ geographies }) => (
                        <>
                            {geographies.map((geo) => (
                                <StyledGeography key={geo.rsmKey} geography={geo} style={{ default: { outline: "none" }, pressed: { outline: "none" }, hover: { outline: "none" }, }} />
                            ))}
                        </>
                    )
                    }
                </Geographies>
                <TripMarkers changeFilePath={changeFilePath} markerProps={markerProps} />
            </ZoomableGroup>
        </ComposableMap>
    )
}