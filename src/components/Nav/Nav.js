import React, { Component } from "react";
import Auth from "./Auth/Auth";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import { snackOpen, snackClose, modalOneOpen } from "../../ducks/reducer";
import { connect } from "react-redux";
import Snackbar from "@material-ui/core/Snackbar";
import Games from '@material-ui/icons/VideogameAsset';

const styles = {
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
};

class Nav extends Component {
  constructor() {
    super();
    this.state = {
      menu: null
    };
  }
  handleMenuClick = event => {
    this.setState({ menu: event });
  };

  handleMenuClose = () => {
    this.setState({ menu: null });
  };
  route = val => {
    if (this.props.user_id === 0 && val === "/account") {
      this.props.snackOpen();
      this.props.modalOneOpen();
    } else {
      this.handleMenuClose();
      this.props.history.push(val);
    }
  };
  handleSnackClose = () => {
    this.props.snackClose();
  };

  render() {
    const { classes, snack } = this.props;
    const { menu } = this.state;
    return (
      <div>
        <AppBar position="static" color='dark'>
          <Toolbar>
            <IconButton
              className={classes.menuButton}
              color="inherit"
              aria-label="Menu"
              onClick={this.handleMenuClick}
              aria-owns={menu ? "simple-menu" : undefined}
              aria-haspopup="true"
              
            >
              <MenuIcon
              style={{width: 40, height: 40 }} />
            </IconButton>
            <IconButton
            onClick={() => this.route("/")}
            style={{marginLeft: 30, marginRight: 20}}
            >
              <Games
              color='primary'
              
              style={{ width: 60, height: 60 }}
              /> 
              </IconButton>
            <Menu
              id="simple-menu"
              menu={menu}
              open={Boolean(menu)}
              onClose={this.handleClose}
              
            >
              <ClickAwayListener onClickAway={this.handleMenuClose}>
                <div>
                  <MenuItem onClick={() => this.route("/")}>Home</MenuItem>
                  <MenuItem onClick={() => this.route("/search")}>
                    Search
                  </MenuItem>
                  <MenuItem onClick={() => this.route("/hostevent")}>
                    Host an Event
                  </MenuItem>
                  <MenuItem onClick={() => this.route("/account")}>
                    Account
                  </MenuItem>
                </div>
              </ClickAwayListener>
            </Menu>
            <Typography variant="h6" color="inherit" className={classes.grow}>
             U-KNIGHT
            </Typography>
            <Button onClick={() => this.route("/account")}>
              <CardMedia
                className={classes.media}
                image="http://urly.fi/1cw4"
                title="Contemplative Reptile"
                style={{ borderRadius: "50%", marginRight: 30, width: 60, height: 60 }}
              />
            </Button>
            <Auth />
          </Toolbar>
        </AppBar>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          autoHideDuration={3000}
          open={snack}
          onClose={this.handleSnackClose}
          ContentProps={{
            "aria-describedby": "message-id"
          }}
          message={<span > You must log in to proceed </span>}
        />
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    user_id: state.user_id,
    snack: state.snack
  };
};

const mapDispatchToProps = {
  modalOneOpen,
  snackOpen,
  snackClose
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Nav));
