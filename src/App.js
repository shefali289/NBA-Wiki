import React, { useState } from 'react';
import { Typography, Toolbar, Grid, withStyles, Tabs, Tab, Paper } from '@material-ui/core';
import Team from "./components/Team";
import Game from "./components/Game";
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";

// Styling
const style = {
    title: {
      width: "100%",
      color: "#F86E1D",
      marginTop: "60px",
      textAlign: "center",
      fontWeight: "500"
    },

    tabs: {
      background: "#F86E1D",
      color: "#FFFFFF"
    }
};

// Change state of tab
function Main(props) {
  const { classes } = props;
  const [tabSelected, setTabSelected] = useState(0);
  
  function tabChange(e, values) {
    setTabSelected(values);
  }

  return (
    <div className="tab-page">
      <Toolbar>
        <Grid container justify="center" className={classes.title}>
          <Typography variant="h4">
            NBA REPO
          </Typography>
        </Grid>
      </Toolbar>

      {/* Data container */}
      <Grid container justify="center" style={{marginTop: "85px"}}>
        <Grid item xs={12} lg={9} md={10}>
          <Paper>
            <Tabs value={tabSelected} onChange={tabChange} variant="fullWidth">
              <Tab label="NBA Teams" classes={{ selected: classes.tabs }} style={{fontWeight:"500", boxShadow: "0 2px 2px #ccc", border: "1px solid #eee"}} />
              <Tab label="NBA Games" classes={{ selected: classes.tabs }} style={{fontWeight:"500", boxShadow: "0 2px 2px #ccc", border: "1px solid #eee"}} />
            </Tabs>
          </Paper>

          <Grid container justify="center" style={{marginTop: "25px", boxShadow: "0 2px 2px #ccc", border: "1px solid #eee"}}>
            <Grid item xs={12} lg={9} md={10}>
            </Grid>
          </Grid>
        </Grid>

        {/* Tab selection */}
        <Grid item xs={12} lg={9} md={10} style={{marginTop: "20px"}}>
          {
            tabSelected == 0 ? <Team></Team> : <Game></Game>
          }
        </Grid>
      </Grid>
    </div>
  );
}

export default withStyles(style)(Main);
