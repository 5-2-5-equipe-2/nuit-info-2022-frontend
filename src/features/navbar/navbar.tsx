import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import AccountMenu from "./AccountMenu";
import {useAppSelector} from "../../hooks";
import {isAuthenticated} from "../auth/utils";
import {Button, Divider} from "@mui/material";
import {Link} from "react-router-dom";

function ResponsiveAppBar() {
    let auth = useAppSelector(state => state.auth);

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static"
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center"

                }}
            >
                <Toolbar>
                    <Typography variant="h6" component="div">
                        5+2=5
                    </Typography>
                    <Divider orientation="vertical" sx={{height: "2rem", margin: "0 1rem"}}/>
                    <Button color="inherit" component={Link} to="/">Home</Button>
                    <Button color="inherit" component={Link} to="/start">Game</Button>
                    <Button color="inherit" component={Link} to="/ts">Blockchain</Button>
                    <Divider orientation="vertical" sx={{height: "2rem", margin: "0 1rem"}}/>
                    {isAuthenticated(auth) ?
                        <AccountMenu/> :
                        <Link to="/login">
                            <Button color="inherit">Login</Button>
                        </Link>

                    }


                </Toolbar>
            </AppBar>
        </Box>
    );
}


export default ResponsiveAppBar;
