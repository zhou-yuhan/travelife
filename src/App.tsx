import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Appbar } from './appbar';
import { Grid, Paper } from '@mui/material';
import Box from '@mui/material/Box';
import { ThemeProvider } from '@mui/material/styles';
import { themeDefault, themeGanyu, themeGrey } from './theme';
import { makeStyles } from '@mui/styles';
import SplitPane, { Pane } from 'split-pane-react';
import 'split-pane-react/esm/themes/default.css'
import { GeoMap } from './geomap';
import { TripBoard } from './tripboard';

function App() {
    const [sizes, setSizes] = useState([
        500, // TODO: set default size
        '50%',
        '50%',
    ]);

    return (
        <ThemeProvider theme={themeGanyu}>
            <Box
                sx={{
                    width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column'
                }}
            >
                <Appbar />
                <SplitPane
                    sashRender={() => null}
                    split='vertical'
                    sizes={sizes}
                    onChange={setSizes}
                    resizerSize={10}
                >
                    <Pane minSize={'10%'} maxSize='90%'>
                        <Paper sx={{ width: '99%', height: '99%', mx: 1 }} elevation={3}>
                            <GeoMap />
                        </Paper>
                    </Pane>

                    <Paper sx={{ width: '97%', height: '99%', mx: 1, pt: 0.1, pl: 3}} style={{overflowY: 'scroll'}} elevation={3}>
                        <TripBoard />
                    </Paper>
                </SplitPane>
            </Box>
        </ThemeProvider>
    )
}

export default App;
