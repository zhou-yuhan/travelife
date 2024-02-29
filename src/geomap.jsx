import { ComposableMap, Geographies, Geography, ZoomableGroup, Marker } from "react-simple-maps";
import { styled, alpha } from '@mui/material/styles';

const StyledGeography = styled(Geography)(({ theme }) => ({
    fill: theme.palette.secondary.main,
    stroke: theme.palette.primary.light,
    strokeWidth: 0.3,
    '&:hover': {
        fill: theme.palette.primary.main,
    },
}))

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

function MarkerHover(event) {
    var id = parseInt(event.target.id.split('-')[1])
    const children = document.getElementById('marker-' + id.toString()).children;
    for (let i = 0; i < children.length; i++) {
        children[i].setAttribute('stroke', '#FFFFFF');
    }
}

export const GeoMap = () => {
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
                            {spots.map((spot, index) => {
                                console.log(index.toString())
                                return (
                                    <Marker coordinates={spot.coordinates}>
                                        <g
                                            id={"marker-" + index.toString()}
                                            fill="none"
                                            stroke="#FF5533"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            transform="translate(-12, -24)"
                                            onMouseEnter={MarkerHover}
                                        >
                                            <circle id={"circle-" + index.toString()} cx="12" cy="10" r="3" />
                                            <path id={"path-" + index.toString()} d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z" />
                                        </g>
                                    </Marker>
                                )
                            })}
                        </>
                    )
                    }
                </Geographies>
            </ZoomableGroup>
        </ComposableMap>
    )
}