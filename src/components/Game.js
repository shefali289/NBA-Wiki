import React, { useState } from 'react';
import { Paper, Grid, Typography, Button } from '@material-ui/core';
import GameList from './GameList';
import axios from "axios";

// Loading function
function Load() {
    return (
        <Grid team lg={3} md={4} xs={12} style={{ margin: "0 auto", textAlign: "center" }}>
            <Typography style={{ margin:"80px 80px 80px 80px", textAlign: "center" }} variant="h2">
                Loading...
            </Typography>
        </Grid>
    )
}

// Function to convert date into suitable format
function convertDate(string){
    var options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(string).toLocaleDateString([],options);
}

// Function to convert time into suitable format
function convertTime(string){
    return new Date(string).toLocaleTimeString([]);
}

function Game() {
    const [data, setData] = useState(["Loading"]);

    // Retrieving first 20 data items from API
    let [openModal, setOpenModal] = useState(() => {
        let temp = {};
        for (let i=0; i<20; i++)
            temp = {...temp, [i]: false};
        return temp;
    });

    // Function to open modal 
    function openModalBox(e, idx) {
        e.stopPropagation();
        console.log("openModalBox");
        const temp = {...openModal, [idx]: true};
        setOpenModal(temp);
    }
    
    // Function to close modal
    function closeModal(idx) {
        console.log("closeModal");
        const temp = {...openModal, [idx]: false};
        setOpenModal(temp);
    }

    // API call
    if (data[0] == "Loading")
        axios.get("https://www.balldontlie.io/api/v1/games?per_page=20")
            .then(res => setData(res.data.data));
    return (
        <Paper>
            {/* Data container */}
            <Grid container wrap="wrap" style={{ textAlign: "center" }} spacing={800}>
                {
                    data[0] == "Loading" ? <Load /> :
                        data.map((gameitems, idx) => {
                            return (
                                <Grid team md={4} lg={3} xs={12} key={idx} onClick={(e) => {return openModalBox(e, idx)}}>
                                    <Typography variant="title">
                                        <h2><b>{convertDate(gameitems.date)}</b></h2>
                                        <Typography variant="subtitle1">
                                            <p>{convertTime(gameitems.date)} ET</p>
                                        </Typography>
                                    </Typography>
                                    <GameList data={gameitems} open={openModal[idx]} close={() => {return closeModal(idx)}}/>
                                </Grid>
                            );
                        })
                }
            </Grid>

            {/* Next and previous buttons */}
            <Grid container spacing={40} justify="center" style={{ textAlign: "center" , marginTop: "30px" }}>
                <Grid item md={6} lg={6} xs={12}>
                    <Button size="large" style={{ background: "#60cb5c", color: "white" }}>Previous</Button>
                </Grid>
                <Grid item md={6} lg={6} xs={12}>
                    <Button size="large" style={{ background: "#60cb5c", color: "white" }}>Next</Button>
                </Grid>
            </Grid>
        </Paper>
    )
}

export default Game;