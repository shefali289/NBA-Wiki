import React, { useState } from 'react';
import { Paper, Grid, Typography, Tooltip } from '@material-ui/core';
import axios from "axios";
import { withStyles } from '@material-ui/core/styles';

// Loading function
function Loads() {
    return (
        <Grid team lg={3} md={4} xs={12} style={{ margin: "0 auto", textAlign: "center" }}>
            <Typography style={{ margin:"80px 80px 80px 80px", textAlign: "center" }} variant="h2">
                Loading...
            </Typography>
        </Grid>
    )
}

// Tooltip styling
const Tooltips = withStyles(theme => ({
    tooltip: {
      backgroundColor: '#000000',
      color: '#FFFFFF'
    },
  }))(Tooltip);
  
function Team() {
    const [data, setData] = useState(["Loading"]);

    // API call
    if (data[0] == "Loading")
        axios.get("https://www.balldontlie.io/api/v1/teams")
            .then(res => setData(res.data.data));
    return (
        <Paper>
            <Grid container wrap="wrap" style={{ textAlign: "center" }} spacing={50}>
                {
                    data[0] == "Loading" ? <Loads /> :
                        data.map((teamitems, idx) => {
                            return (
                                // Data container
                                <Grid team md={4} lg={3} xs={12} key={idx}>
                                    <Tooltips title={
                                        <React.Fragment>
                                            <p>{teamitems.full_name} ({teamitems.abbreviation})</p>
                                            <p>City: {teamitems.city}</p>
                                            <p>Conference: {teamitems.conference}</p>
                                            <p>Division: {teamitems.division}</p>
                                        </React.Fragment>
                                    } placement="right-start" type="dark" arrow>
                                        <Typography variant="title">
                                            <h2><b>{teamitems.name}</b></h2>
                                            <Typography variant="subtitle1">
                                                <p>{teamitems.division}</p>
                                            </Typography>
                                        </Typography>
                                    </Tooltips>
                                </Grid>
                            );
                        })
                }
            </Grid>
        </Paper>
    )
}

export default Team;