import React from 'react';
import logo from './logo.svg';
import './App.css';
import { NavigationBar } from './navigation';
import Journey from './pages/journey';
import { Grid } from '@mui/material';
import { BrowserRouter, Routes, Route} from "react-router-dom";

function App() {
    return (
        <BrowserRouter>
            <NavigationBar />
            <Grid item xs={12}
                md={10}
                lg={9}
                xl={8}
                style={{ margin: "auto" }}>

                <Routes>
                    <Route path='/journey' element={<Journey/>} />
                </Routes>
            </Grid>
        </BrowserRouter>
    )
}

export default App;
