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
import { updateUser, clearUser, modalOneOpen, modalOneClose, modalTwoOpen, modalTwoClose } from "../../../ducks/reducer";
import { connect } from 'react-redux';
//validation
import zxcvbn from 'zxcvbn';
import * as EmailValidator from 'email-validator'
import io from 'socket.io-client';
import Snackbar from "@material-ui/core/Snackbar";
import { withRouter } from 'react-router-dom'

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
    backgroundColor: "#F50357",
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
      emailError: false,
      emailValidation: false,
      emailErrorMessage: '',
      emailErrorMessageColor: '',

      username: '',
      usernameError: false,
      usernameErrorMessageColor: '',
      usernameErrorMessage: '',

      password: '',
      passwordError: false,
      goodEnough: '',
      crackTime: 'less than a second',
      score: '',
      pas: '',

      snack: false,
      snackMessage: '',



    }

    this.usernameTimeout = null
  }

  componentDidMount() {
    this.setSocketListeners()
  }

  setSocketListeners = () => {
    this.socket = io()
    this.socket.on('username', (takenUsername) => {
      if (takenUsername === false) {
        this.setState({
          usernameError: false,
          usernameErrorMessage: 'This user name is yours friend',
          usernameErrorMessageColor: '#33FF33'
        })
      } else {
        this.setState({
          usernameError: true,
          usernameErrorMessage: 'This username has been taken',
          usernameErrorMessageColor: '#F34436'
        })
      }
    })
  }

  handleModalOneOpen = () => {
    this.props.modalOneOpen()
  }
  handleModalOneClose = () => {
    this.props.modalOneClose()
  }
  handleModalTwoOpen = () => {
    this.props.modalTwoOpen()
  }
  handleModalTwoClose = () => {
    this.props.modalTwoClose()
  }
  async login() {
    console.log('login hit')
    let user = {
      email: this.state.email,
      password: this.state.password,

    }
    try {
      let res = await axios.post('/auth/login', user)
      this.props.updateUser(res.data)
      this.handleModalOneClose()
      this.setState({
        snackMessage: 'Logged in!'
      })
      return this.snackOpen()
    } catch (err) {
      this.setState({
        snackMessage: 'Could not be logged in'
      })
      return this.snackOpen()
    }
  }
  async register() {
    let user = {
      email: this.state.email,
      username: this.state.username,
      password: this.state.password,
      image: 'https://vectr.com/stevewagner/c3BocqDepf.png?width=320&height=320&select=c3BocqDepfpage0'
    }
    if (this.state.emailValidation === false) {
      this.setState({
        snackMessage: 'Your account could not be created'
      })
      return this.snackOpen()
    }
    if (this.state.score < 3) {
      this.setState({
        snackMessage: 'Your account could not be created'
      })
      return this.snackOpen()
    }
    if (this.state.usernameError === true || this.state.username === '') {
      this.setState({
        snackMessage: 'Your account could not be created'
      })
      return this.snackOpen()
    }
    try {
      let res = await axios.post('/auth/register', user)
      this.props.updateUser(res.data)
      this.handleModalTwoClose()
      this.setState({
        snackMessage: 'User created!'
      })
      return this.snackOpen()
    } catch (err) {
      this.setState({
        snackMessage: 'Email already in use'
      })
      return this.snackOpen()
    }

  }
   logout = async () => {
     console.log('logout hit', 'impossible')
     this.snackClose()
    await axios.post('/auth/logout')
    this.props.clearUser()
    this.props.history.push('/')
  }
  handleChange(prop, val) {
    this.setState({
      [prop]: val
    })
  }
  handlePasswordChange(val) {
    const password = val
    const evaluation = zxcvbn(password)
    if (this.state.score >= 3) {
      this.setState({
        pas: '#33FF33',
        goodEnough: 'which is good enough',
        passwordError: false
      })
    } else {
      this.setState({
        pas: '#F34436',
        goodEnough: 'which is no good:(',
        passwordError: true
      })
    }
    this.setState({
      password: val,
      crackTime: evaluation.crack_times_display.online_no_throttling_10_per_second,
      score: evaluation.score
    })
  }
  handleEmailValidation(val) {
    const email = val
    const emailValidation = EmailValidator.validate(email)
    this.setState({
      email: email,
      emailValidation: emailValidation,
    })
    if (emailValidation === true) {
      this.setState({
        emailError: false,
        emailErrorMessageColor: '#33FF33',
        emailErrorMessage: 'Valid email address'

      })
    } else {
      this.setState({
        emailError: true,
        emailErrorMessageColor: '#F34436',
        emailErrorMessage: 'must be a valid email address'
      })
    }
  }

  handleUsernameCheck(val) {
    const username = val
    this.setState({
      username: username
    })
    clearTimeout(this.usernameTimeout)
    this.usernameTimeout = setTimeout(() => {
      this.socket.emit('username', username)
    }, 500);

  }
  snackOpen = () => {
    this.setState({
      snack: true
    })
  }
  snackClose = () => {
    this.setState({
      snack: false
    })
  }


  render() {
    const { classes } = this.props
    let passwordErrorMessage = null
    if (this.state.password !== '') {
      passwordErrorMessage = <Typography style={{ color: this.state.pas }}>It would take {this.state.crackTime} to crack this password {this.state.goodEnough}</Typography>
    }
    if (this.props.user_id !== 0) {
      return (
        <div>
          <Button
            onClick={() => this.logout()}
            variant="contained"
            color="secondary"
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
            color="secondary"
          >
            Login
            </Button>
          <Modal
            open={this.props.open || false}
            onClose={() => this.handleModalOneClose()}
          >
            <main className={classes.main}>
              <CssBaseline />
              <Paper className={classes.paper}>
                <Avatar className={classes.avatar}>
                  <LockOutlinedIcon
                    color="secondary"
                    style={{ color: 'white' }}
                  />
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
                    color="secondary"
                    className={classes.submit}
                    onClick={() => { this.login() }}
                  >
                    Sign in
          </Button>
                  <Button
                    onClick={() => this.handleModalTwoOpen()}
                    variant="contained"
                    color="secondary"
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
            open={this.props.openTwo || false}
            onClose={() => this.handleModalTwoClose()}
          >
            <main className={classes.main}>
              <CssBaseline />
              <Paper className={classes.paper}>
                <Avatar className={classes.avatar}>
                  <LockOutlinedIcon
                    style={{ color: 'white' }}
                  />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Create user
                                </Typography>
                <form className={classes.form}>
                  <FormControl margin="normal" required fullWidth>
                    <InputLabel htmlFor="email">Email Address</InputLabel>
                    <Input required={true} error={this.state.emailError} onChange={e => this.handleEmailValidation(e.target.value)} autoFocus />
                    <Typography style={{ color: this.state.emailErrorMessageColor }}>{this.state.emailErrorMessage}</Typography>
                  </FormControl>
                  <FormControl margin="normal" required fullWidth>
                    <InputLabel htmlFor="email">User name </InputLabel>
                    <Input required={true} error={this.state.usernameError} onChange={e => this.handleUsernameCheck(e.target.value)} />
                    <Typography style={{ color: this.state.usernameErrorMessageColor }}>{this.state.usernameErrorMessage}</Typography>
                  </FormControl>
                  <FormControl margin="normal" required fullWidth>
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <Input required={true} type="password" error={this.state.passwordError} onChange={e => this.handlePasswordChange(e.target.value)} />
                    {passwordErrorMessage}
                  </FormControl>
                  <Button
                    fullWidth
                    variant="contained"
                    color="secondary"
                    className={classes.submit}
                    onClick={() => { this.register() }}
                  >
                    create
                                  </Button>

                </form>
              </Paper>
            </main>
          </Modal>
          <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            autoHideDuration={3000}
            open={this.state.snack || false}
            onClose={this.snackClose}
            ContentProps={{
              "aria-describedby": "message-id"
            }}
            message={<span >{this.state.snackMessage}</span>}
          />
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
    image: state.image,
    open: state.open,
    openTwo: state.openTwo,
    snack: state.snack
  }
}

const mapDispatchToProps = {
  updateUser,
  clearUser,
  modalOneOpen,
  modalOneClose,
  modalTwoOpen,
  modalTwoClose
}




export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withStyles(styles)(Auth)))