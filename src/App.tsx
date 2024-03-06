import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { Appbar } from './appbar';
import { Grid, Paper, Theme } from '@mui/material';
import Box from '@mui/material/Box';
import { ThemeProvider } from '@mui/material/styles';
import { themeDefault, themeGanyu, themeGrey } from './theme';
import { makeStyles } from '@mui/styles';
import SplitPane, { Pane } from 'split-pane-react';
import 'split-pane-react/esm/themes/default.css'
import { GeoMap } from './geomap';
import { TripBoard } from './tripboard';
import { GeoConfig, geoSettings } from './appbar';


interface TripMetaData {
    coordinates: [number, number];
    title: string;
    date: string;
    location: string;
    tags: string[];
    notes: string;
}

interface MarkerProps {
    coordinates: [number, number];
    location: string;
    trips: Array<TripMetaData>;
}

const transformTripMeta = (tripMeta: Array<TripMetaData>): Array<MarkerProps> => {
    // console.log("tripMeta: " + tripMeta);
    return tripMeta.reduce((acc, trip) => {
        const existingGroup = acc.find(group => group.coordinates[0] === trip.coordinates[0] && group.coordinates[1] === trip.coordinates[1]);
        if (existingGroup) {
            existingGroup.trips.push(trip);
        } else {
            acc.push({ coordinates: trip.coordinates, location: trip.location, trips: [trip] });
        }
        return acc;
    }, [] as Array<MarkerProps>);
}

function App() {
    const [sizes, setSizes] = useState([
        500, // TODO: set default size
        '50%',
        '50%',
    ]);

    const [markerProps, setMarkerProps] = useState<Array<MarkerProps>>(Array<MarkerProps>());
    const [geoConfig, setGeoConfig] = useState<GeoConfig>(geoSettings[1]); // default China
    const [paletteConfig, setPaletteConfig] = useState<Theme>(themeGanyu);

    useEffect(() => {
        const fetchTripMeta = async () => {
            try {
                const response = await fetch('examples/trips.json');
                // console.log("response: " + response);
                const data = await response.json();
                const markerData = transformTripMeta(data);
                setMarkerProps(markerData);
            } catch (error) {
                alert("Error fetching trip JSON data: " + error);
            }
        };

        fetchTripMeta();
    }, []);

    const [filePath, setFilePath] = useState<string>('');

    const changeFilePath = (newFilePath: string) => {
        setFilePath(newFilePath);
    };

    // console.log(markerProps);

    return (
        <ThemeProvider theme={paletteConfig}>
            <Box
                sx={{
                    width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column'
                }}
            >
                <Appbar 
                    handleGeoConfigChange={(value: GeoConfig) => { setGeoConfig(value); }} 
                    handlePaletteConfigChange={(value: Theme) => { setPaletteConfig(value); }}
                />
                <SplitPane
                    sashRender={() => null}
                    split='vertical'
                    sizes={sizes}
                    onChange={setSizes}
                    resizerSize={10}
                >
                    <Pane minSize={'10%'} maxSize='90%'>
                        <Paper sx={{ width: '99%', height: '99%', mx: 1 }} elevation={3}
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                flexDirection: "column",
                            }}>
                            <GeoMap changeFilePath={changeFilePath} markerProps={markerProps} geoConfig={geoConfig}/>
                        </Paper>
                    </Pane>

                    <Paper sx={{ width: '96%', height: '99%', mx: 1, pt: 0.1, px: 3 }} style={{ overflowY: 'scroll' }} elevation={3}>
                        <TripBoard fileName={filePath} />
                    </Paper>
                </SplitPane>
            </Box>
        </ThemeProvider>
    )
}

export default App;
