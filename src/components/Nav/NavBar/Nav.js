import React, { Component } from "react";
import Auth from "../Auth/Auth";
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
import { snackOpen, snackClose, modalOneOpen, updateUser, clearUser } from "../../../ducks/reducer"
import { connect } from "react-redux";
import Snackbar from "@material-ui/core/Snackbar";
// import PersonalChat from '../PersonalChat/PersonalChat';
import Logo from '../../../media/Logo.svg';
import Axios from "axios";

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
      menu: false
    };
  }
  componentDidMount(){
    Axios.get('/auth/checkuser').then(res => {
      this.props.updateUser(res.data[0])
    }).catch(err => {
      this.props.clearUser()
    })
  }
  handleMenuClick = () => {
    this.setState({ menu: true });
  };

  handleMenuClose = () => {
    this.setState({ menu: false });
  };
  route = val => {
    if (this.props.user_id === 0 && val === `/account/${this.props.user_id}`) {
      this.props.snackOpen();
      this.props.modalOneOpen();
    } else if (this.props.user_id === 0 && val === `/hostevent`) {
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
                style={{ width: 40, height: 40 }} 
                />
            </IconButton>
            
              <img onClick={() => this.route("/")} src={Logo} alt="ukinght" style={{ width: 100, height: 'auto', marginRight: 20, marginTop: 10, marginBottom: 10 }} />
            
            <Drawer
              id="simple-menu"
              
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
            
              <CardMedia
                onClick={() => this.route(`/account/${this.props.user_id}`)}
                className={classes.media}
                image={this.props.image || 'https://vectr.com/stevewagner/c3BocqDepf.png?width=320&height=320&select=c3BocqDepfpage0'}
                title="Contemplative Reptile"
                style={{ borderRadius: "50%", marginRight: 30, width: 60, height: 60 }}
              />
            
            <Auth />
          </Toolbar>
        </AppBar>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          autoHideDuration={3000}
          open={snack || false}
          onClose={this.handleSnackClose}
          ContentProps={{
            "aria-describedby": "message-id"
          }}
          message={<span > You must log in to proceed </span>}
        />
        {/* <PersonalChat /> */}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user_id: state.user_id,
    image: state.image,
    snack: state.snack
  };
};

const mapDispatchToProps = {
  updateUser,
  modalOneOpen,
  snackOpen,
  snackClose,
  clearUser
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Nav));
