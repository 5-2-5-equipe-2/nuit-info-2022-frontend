import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import {Link} from "react-router-dom";
import {useQuery} from "react-query";
import {getUserById} from "../auth/service";
import {useAppSelector} from "../../hooks";

export default function AccountMenu() {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const auth = useAppSelector(state => state.auth);

    const {data} = useQuery(['user', auth.id], () => getUserById(auth.id), {
        enabled: !!auth.id,
        refetchOnWindowFocus: false,
        retry: false,
    });
    return (
        <React.Fragment>
            <Box sx={{display: 'flex', alignItems: 'center', textAlign: 'center'}}>
                <Tooltip title="Account settings">
                    <IconButton
                        onClick={handleClick}
                        size="small"
                        sx={{ml: 2}}
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                    >
                        <Avatar sx={{
                            width: 32,
                            height: 32
                        }}>{data?.data.getUserById.firstName[0] + data?.data.getUserById.lastName[0]}</Avatar>
                    </IconButton>
                </Tooltip>
            </Box>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{horizontal: 'right', vertical: 'top'}}
                anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
            >
                {/*<MenuItem>*/}
                {/*    <Avatar/> Profile*/}
                {/*</MenuItem>*/}
                {/*<MenuItem>*/}
                {/*    <Avatar/> My account*/}
                {/*</MenuItem>*/}
                {/*<Divider/>*/}
                {/*<MenuItem>*/}
                {/*    <ListItemIcon>*/}
                {/*        <PersonAdd fontSize="small"/>*/}
                {/*    </ListItemIcon>*/}
                {/*    Add another account*/}
                {/*</MenuItem>*/}
                <Link to="/update" style={{textDecoration: 'none', color: 'white'}}>
                    <MenuItem>
                        <ListItemIcon>
                            <Settings fontSize="small"/>
                        </ListItemIcon>
                        Settings
                    </MenuItem>
                </Link>
                <Link to="/logout" style={{textDecoration: "none", color: "white"}}>
                    <MenuItem>
                        <ListItemIcon>
                            <Logout fontSize="small"/>
                        </ListItemIcon>
                        Logout
                    </MenuItem>
                </Link>
            </Menu>
        </React.Fragment>
    );
}
