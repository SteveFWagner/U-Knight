import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import Modal from '@material-ui/core/Modal';
import axios from 'axios';
import { updateUser, clearUser } from "../../../ducks/reducer";
import { connect } from 'react-redux';

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: "#313F9F",
  },
  form: {
    width: '100%',
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});

class Auth extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      username: '',
      password: '',
      open: false,
      openTwo: false
    }
  }
  handleModalOneOpen = () => {
    this.setState({
      open: true
    })
  }
  handleModalOneClose = () => {
    this.setState({
      open: false
    })
  }
  handleModalTwoOpen = () => {
    this.setState({
      open: false,
      openTwo: true
    })
  }
  handleModalTwoClose = () => {
    this.setState({
      openTwo: false
    })
  }
  async login() {

    let user = {
      email: this.state.email,

      password: this.state.password,

    }
    try {
      let res = await axios.post('/auth/login', user)
      this.props.updateUser(res.data)
      console.log(4545454, res.data)
      this.handleModalOneClose()
      alert('logged in')
    } catch (err) {
      alert(err)
    }
  }
  async register() {
    let user = {
      email: this.state.email,
      username: this.state.username,
      password: this.state.password
    }
    try {
      let res = await axios.post('/auth/register', user)
      console.log(res.data)
      this.props.updateUser(res.data)
      this.handleModalTwoClose()
      alert('user created')
    } catch (err) {
      alert(err)
    }

  }
  async logout() {
    await axios.post('/auth/logout')
    this.props.clearUser()
  }
  handleChange(prop, val) {
    this.setState({
      [prop]: val
    })
  }


  render() {
    console.log(3333, this.props)
    const { classes } = this.props

    if (this.props.user_id !== 0) {
      return (
        <div>
          <Button
            onClick={() => this.logout()}
            variant="contained"
            color="primary"
          >
            Logout
          </Button>
        </div>
      )
    } else {

      return (

        <div>
          <Button
            onClick={() => this.handleModalOneOpen()}
            variant="contained"
            color="primary"
          >
            Login
            </Button>
          <Modal
            open={this.state.open}
            onClose={() => this.handleModalOneClose()}
          >
            <main className={classes.main}>
              <CssBaseline />
              <Paper className={classes.paper}>
                <Avatar className={classes.avatar}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Sign in
        </Typography>
                <form className={classes.form}>
                  <FormControl margin="normal" required fullWidth>
                    <InputLabel htmlFor="email">Email Address</InputLabel>
                    <Input onChange={e => this.handleChange('email', e.target.value)} autoFocus />
                  </FormControl>
                  <FormControl margin="normal" required fullWidth>
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <Input type="password" onChange={e => this.handleChange('password', e.target.value)} />
                  </FormControl>
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={() => { this.login() }}
                  >
                    Sign in
          </Button>
                  <Button
                    onClick={() => this.handleModalTwoOpen()}
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    fullWidth
                  >
                    Create a user
            </Button>
                </form>
              </Paper>
            </main>
          </Modal>

          <Modal
            open={this.state.openTwo}
            onClose={() => this.handleModalTwoClose()}
          >
            <main className={classes.main}>
              <CssBaseline />
              <Paper className={classes.paper}>
                <Avatar className={classes.avatar}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Create user
                                </Typography>
                <form className={classes.form}>
                  <FormControl margin="normal" required fullWidth>
                    <InputLabel htmlFor="email">Email Address</InputLabel>
                    <Input onChange={e => this.handleChange('email', e.target.value)} autoFocus />
                  </FormControl>
                  <FormControl margin="normal" required fullWidth>
                    <InputLabel htmlFor="email">User name </InputLabel>
                    <Input onChange={e => this.handleChange('username', e.target.value)} />
                  </FormControl>
                  <FormControl margin="normal" required fullWidth>
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <Input type="password" onChange={e => this.handleChange('password', e.target.value)} />
                  </FormControl>
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={() => { this.register() }}
                  >
                    create
                                  </Button>

                </form>
              </Paper>
            </main>
          </Modal>

        </div>
      )
    }
  }
}
const mapStateToProps = (state) => {
  return {
    user_id: state.user_id,
    email: state.email,
    username: state.username,
    image: state.image
  }
}





export default connect(mapStateToProps, { updateUser, clearUser })(withStyles(styles)(Auth))