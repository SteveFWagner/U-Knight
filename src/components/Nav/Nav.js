import React, { Component } from 'react';
import Auth from './Auth/Auth'
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

const styles = {
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
};

class Nav extends Component {
    constructor() {
        super()
        this.state = {
            menu: null
        }
    }
    handleMenuClick = event => {
        this.setState({ menu: event });
    };

    handleMenuClose = () => {
        this.setState({ menu: null });
    };
    route = (val) => {
        this.handleMenuClose()
        this.props.history.push(val)
    }


    render() {
        console.log(444, this.props.history)
        const { classes } = this.props;
        const { menu } = this.state;
        return (
            <div>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton className={classes.menuButton} color="inherit" aria-label="Menu" onClick={this.handleMenuClick} aria-owns={menu ? 'simple-menu' : undefined}
                            aria-haspopup="true">
                            <MenuIcon />
                        </IconButton>

                        <Menu
                            id="simple-menu"
                            menu={menu}
                            open={Boolean(menu)}
                            onClose={this.handleClose}
                        >
                            <ClickAwayListener onClickAway={this.handleMenuClose}>
                                <div>
                                    <MenuItem onClick={() => this.route('/')}>Home</MenuItem>
                                    <MenuItem onClick={() => this.route('/search')}>Search</MenuItem>
                                    <MenuItem onClick={() => this.route('/hostevent')}>Host an Event</MenuItem>
                                    <MenuItem onClick={() => this.route('/account')}>Account</MenuItem>
                                </div>
                            </ClickAwayListener>
                        </Menu>
                        <Typography variant="h6" color="inherit" className={classes.grow}>
                            LOGO
          </Typography>
                        <Auth />
                    </Toolbar>
                </AppBar>

            </div>
        )
    }
}

export default withStyles(styles)(Nav);
