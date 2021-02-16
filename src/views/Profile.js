/**
 * Profile Page view for coder one task.
 * 
 * Displays user information as a grid
 */

import React, { Component, useState } from 'react';
import axios from "axios";
import { Card, CardMedia, CardContent, CardHeader, Grid, Paper, Typography, Button, List, ListItem, ListItemText } from "@material-ui/core";
import { sizing } from '@material-ui/system';
import NavBar from "../components/Navbar";
import UserCard from "../components/UserCard";
import * as URLS from "../constants/urls";


const userUrl = URLS.USER_URL;
const section = {
    height: "100%",
    paddingTop: 0,
    backgroundColor: "#fff"
};

/**
 * Top level class for a profile page
 * 
 * Profile class: views/Profile.js
 */
class Profile extends Component {

    constructor(props) {
        super(props);

        //User is atomic in this design so no need to expand
        this.state = {
            user: [],
        }

    }



    componentDidMount() {
        this.fetchProfile(1, userUrl).then(response => {
            console.log(response.address)
            this.setState({ user: response });
            console.log(this.state)
        })
    }


    /**
     * 
     * @param {} id ID of the users profile
     * 
     * Gets all user details associated with <id> from <url>
     * 
     */
    fetchProfile = (id) => {
        const query = userUrl + '?id=' + id;
        return axios.get(query)
            .then(function (response) {
                // handle success
                console.log(response);
                return response.data[0];
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            });

    }
    /**
    * 
    * @param {*} increment Value to increment id by. May be negative/positive
    * 
    * Increments the profile ID and updates state to match
    */
    incrementProfile = (increment) => {
        console.log(this.state.user.id);
        this.fetchProfile(this.state.user.id + increment).then(response => {
            //Handle over/underflow somewhat hackily
            if (response) this.setState({ user: response });
        });
        //return null;
    }

    render() {
        const company = this.state.user.company;
        const addr = this.state.user.address
        let coords = [];
        if (this.state.user.address) coords = this.state.user.address.geo;
        const pos = [coords.lat, coords.lng];
        //if (this.state.user.company != null) company = this.state.user.company.name;
        return (
            <Grid container spacing={2} alignContent="center">
                <Grid item xs={12}>
                    <NavBar />
                </Grid>
                <Grid container item xs={12} spacing={2}>
                    <UserCard user={this.state.user} />
                    <Grid container item xs={9} spacing={2}>
                        <Grid container xs={7} spacing={4}>
                            <Grid item xs={12}>
                                <Card>
                                    <CardContent>
                                        <Typography variant="h4">
                                            Company Details
                                </Typography>
                                        <List>
                                            {company ? Object.keys(company).map((item, i) =>
                                                <ListItem key={i}>
                                                    <ListItemText>{company[item]}</ListItemText>
                                                </ListItem>) : ""}
                                        </List>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item spacing={2} xs={12}>
                                <Card>
                                    <CardContent m={8}>
                                        <Typography variant="h4" gutterbottom>
                                            Address
                                        </Typography>
                                        <Typography m={20} gutterbottom>
                                            {addr ? addr.suite + " " + addr.street + " " + addr.city + " " + addr.zipcode : ""}
                                        </Typography>


                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                        <Grid item xs={5}>
                            <Card style={section}>
                                <CardContent m={8}>
                                    <Typography m={20} gutterbottom>
                                        {addr ? "To avoid messing with API keys pretend this is googlemaps or open street maps centered on " +
                                            addr.geo.lat + "," + addr.geo.lng : ""}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Grid >
                <Grid container item xs={12} alignContent="center" justify="center">
                    <Grid item alignContent="center">
                        <Button onClick={() => {
                            this.incrementProfile(-1)
                        }}>
                            Previous Profile
                    </Button>
                    </Grid>
                    <Grid item>
                        <Button onClick={() => {
                            this.incrementProfile(1)
                        }}>
                            Next Profile
                    </Button>
                    </Grid>

                </Grid>
            </Grid >

        )
    }
}

export default Profile;