import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Appbar } from './appbar';
import { Grid, Paper } from '@mui/material';
import Box from '@mui/material/Box';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from '@mui/material/styles';
import { themeDefault, themeGanyu, themeGrey } from './theme';
import { makeStyles } from '@mui/styles';
import SplitPane, { Pane } from 'split-pane-react';
import 'split-pane-react/esm/themes/default.css'

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
                        <Paper sx={{ height: '100%' }} variant='outlined'>
                            pane1
                        </Paper>
                    </Pane>
                    <Paper sx={{ height: '100%' }} variant="outlined">
                        pane2
                    </Paper>
                </SplitPane>
            </Box>
        </ThemeProvider>
    )
}

export default App;
