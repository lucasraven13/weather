import React from 'react';
import logo from '../images/klipartz.png';
import { Grid, Button } from "@material-ui/core";

function UserConsent(props){
    return(
        <React.Fragment>
          <img src={logo} className="App-logo" alt="logo" />
          <h1>Can we use your location?</h1>
          <Grid container>
            <Grid item lg={4} />
            <Grid item lg={2} xs={6}>
              <Button variant="contained" color="primary" onClick={() => props.setUserAgreed(true)}>Okay mate</Button>
            </Grid>
            <Grid item lg={2} xs={6}>
              <Button variant="contained" color="secondary" onClick={() => props.setUserAgreed(false)}>No way</Button>
            </Grid>
          </Grid>
        </React.Fragment>
    );
}

export default UserConsent;