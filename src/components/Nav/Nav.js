import React, { Component } from "react";
import Auth from "./Auth/Auth";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Drawer from '@material-ui/core/Drawer';
import MenuItem from "@material-ui/core/MenuItem";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import { snackOpen, snackClose, modalOneOpen } from "../../ducks/reducer";
import { connect } from "react-redux";
import Snackbar from "@material-ui/core/Snackbar";
import Logo from '../../media/Logo.svg'
import './../../App.css'

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
    if (this.props.user_id === 0 && val === `/account/${this.props.user_id}`) {
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
        <AppBar position="static" color='default' style={{maxHeight:'8vh'}}>
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
                style={{ width: 40, height: 40 }} />
            </IconButton>
            <IconButton
              onClick={() => this.route("/")}
              style={{ marginLeft: 30, marginRight: 20 }}
            >
              <img src={Logo} alt="ukinght" style={{ width: 100, height: 'auto' }} />
            </IconButton>
            <Drawer
              id="simple-menu"
              menu={menu}
              open={menu}
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
                  <MenuItem onClick={() => this.route(`/account/${this.props.user_id}`)}>
                    Account
                  </MenuItem>
                </div>
              </ClickAwayListener>
            </Drawer>
            <Typography variant="h6" color="inherit" className={classes.grow} style={{fontFamily:`'East Sea Dokdo', cursive`, fontSize:60, margin:0, padding:0}}>
              U-KNIGHT
            </Typography>
            <Button onClick={() => this.route(`/account/${this.props.user_id}`)}>
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
