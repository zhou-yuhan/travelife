import { ComposableMap, Geographies, Geography, ZoomableGroup, Marker } from "react-simple-maps";


export const GeoMap = () => {
    return (
        <ComposableMap>
            <ZoomableGroup center={[0, 0]} zoom={1}>
                <Geographies geography="/world.json">
                    {({ geographies }) =>
                        geographies.map((geo) => (
                            <Geography key={geo.rsmKey} geography={geo} />
                        ))
                    }
                </Geographies>
                <Marker coordinates={[0, 0]}>
                    <g
                        fill="none"
                        stroke="#FF5533"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        transform="translate(-12, -24)"
                    >
                        <circle cx="12" cy="10" r="3" />
                        <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z" />
                    </g>
                </Marker>
            </ZoomableGroup>
        </ComposableMap>
    )
}