/**
 * Card containing basic user information and profile picture
 */
import React, { Component, useState } from 'react';
import { Card, CardMedia, CardContent, CardHeader, Grid, Paper, Typography } from "@material-ui/core";

//Pretend this is dynamic along with user
import pfp from "../assets/pfp.png";

export default class UserCard extends Component {

    render() {

        const section = {
            height: "100%",
            paddingTop: 0,
            backgroundColor: "#fff"
        };

        return (
            <Grid item xs={3} height="50%">
                <Card style={section}>

                    <CardMedia
                        image={pfp}
                        title={JSON.stringify(this.props.user.name)}
                        style={{
                            height: "200px",
                            backgroundSize: "contain",
                            spacing: 10
                        }}
                    />
                    <CardContent p={8}>
                        <Typography variant="h4" p="20px" gutterbottom>
                            {this.props.user.username}
                        </Typography>
                        <Typography m="200px" p="200px">
                            {this.props.user.name}
                        </Typography>
                        <Typography>
                            {this.props.user.website}
                        </Typography>
                        <Typography>
                            {this.props.user.phone}
                        </Typography>
                        <Typography>
                            {this.props.user.email}
                        </Typography>

                    </CardContent>
                </Card>
            </Grid>
        );
    }
}