import * as React from 'react';
import { ComposableMap, Geographies, Geography, ZoomableGroup, Marker } from "react-simple-maps";
import { styled, alpha } from '@mui/material/styles';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

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
        maxWidth: 220,
        fontSize: theme.typography.pxToRem(12),
        border: '1px solid #dadde9',
    },
}));

const projectionChina = {
    center: [103.8342, 36.0614], // The geometrical center of China is the city of Lanzhou, 103.8342 E, 36.0614 N
    scale: 500
}

const projectionWorld = {
    center: [0, 0],
}

const spots = [
    { coordinates: [103.8342, 36.0614], name: "Lanzhou" },
    { coordinates: [116.4074, 39.9042], name: "Beijing" },
]

const TripMarkers = ({ changeFilePath, tripsMeta }) => {
    function MarkerHover(event) {
        var id = parseInt(event.target.id.split('-')[1])
        const children = document.getElementById('marker-' + id.toString()).children;
        for (let i = 0; i < children.length; i++) {
            children[i].setAttribute('stroke', '#FFFFFF');
        }
    }

    function MarkerLeave(event) {
        var id = parseInt(event.target.id.split('-')[1]);
        const children = document.getElementById('marker-' + id.toString()).children;
        for (let i = 0; i < children.length; i++) {
            children[i].setAttribute('stroke', 'none');
        }
    }

    function MarkerClick(event) {
        var id = parseInt(event.target.id.split('-')[1]);
        let trip = tripsMeta[id];
        if ("notes" in trip) {
            changeFilePath(trip.notes);
        } else {
            changeFilePath('')
        }
    }

    return (
        tripsMeta.map((trip, index) => {
            console.log(index.toString())
            if (!("coordinates" in trip)) {
                return <></>;
            }
            let date = "date" in trip ? trip.date : "some time ago";
            let title = "title" in trip ? trip.title : "A nice trip";
            let location = "location" in trip ? trip.location : "Somewhere";
            let tags = "tags" in trip ? trip.tags.map(tag => '#' + tag).join(' ') : "";

            return (
                <HtmlTooltip
                    title={
                        <React.Fragment>
                            <Typography color="inherit" variant='h6' gutterBottom>{title}</Typography>
                            <Typography color="inherit" variant='subtitle1' gutterBottom>{location} {date}</Typography>
                            <Typography color="inherit" variant='subtitle2' gutterBottom>{tags}</Typography>
                        </React.Fragment>
                    }
                >
                    <Marker coordinates={trip.coordinates}>
                        <g
                            id={"marker-" + index.toString()}
                            fill="#FF5533"
                            stroke="none"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            transform="translate(-12, -24)"
                            onMouseEnter={MarkerHover}
                            onMouseLeave={MarkerLeave}
                            onClick={MarkerClick}
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


export const GeoMap = ({ changeFilePath, tripsMeta }) => {

    return (
        <ComposableMap
            projection="geoMercator"
            projectionConfig={projectionChina}
        >
            <ZoomableGroup zoom={1} maxZoom={20}>
                <Geographies geography="/china.json">
                    {({ geographies }) => (
                        <>
                            {geographies.map((geo) => (
                                <StyledGeography key={geo.rsmKey} geography={geo} style={{ default: { outline: "none" }, pressed: { outline: "none" }, hover: { outline: "none" }, }} />
                            ))}
                        </>
                    )
                    }
                </Geographies>
                <TripMarkers changeFilePath={changeFilePath} tripsMeta={tripsMeta} />
            </ZoomableGroup>
        </ComposableMap>
    )
}