/**
 * Basic Navbar component 
 */

import React, { Component, useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, } from "@material-ui/core";

export default class NavBar extends Component {


    render() {
        return (
            < AppBar position="static" >
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                    </IconButton>
                    <Typography variant="h6" >
                        NOT Coder One
    </Typography>
                </Toolbar>
            </AppBar >
        );
    }
}