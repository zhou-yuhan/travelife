import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Appbar } from './appbar';
import { Grid } from '@mui/material';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from '@mui/material/styles';
import { themeDefault, themeGanyu, themeGrey } from './theme';

function App() {
    return (
        <ThemeProvider theme={themeGanyu}>
            <BrowserRouter>
                <Appbar />
                <Grid item xs={12}
                    md={10}
                    lg={9}
                    xl={8}
                    style={{ margin: "auto" }}>
                </Grid>
            </BrowserRouter>
        </ThemeProvider>
    )
}

export default App;
