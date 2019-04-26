import React, { Component } from 'react';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import HostList from './HostList';
import AttendList from './AttendList';
import Settings from "@material-ui/icons/Settings";
import { connect } from "react-redux";
import { updateUser } from "../../ducks/reducer";
import Dropzone from '../Dropzone/S3Dropzone'
import { Input, InputLabel, Avatar, Modal, IconButton, CardMedia, Typography, Paper, FormControl, Button } from '@material-ui/core';
import './Account.css'


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
class Account extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            image: 'http://urly.fi/1cRl',
            bio: '',
            hosted: [],
            attended: [],
            openEdit: false,
            imageTwo: ''
        }
    }

    componentDidMount() {
        this.accountData()
    }
    componentDidUpdate(prevProps, prevState){
        if(prevProps.match.params.id !== this.props.match.params.id){
            this.accountData()
        }
    }
    accountData = async () => {
        if (this.props.user_id === Number(this.props.match.params.id)) {
            this.setState({
                username: this.props.username,
                image: this.props.image,
                bio: this.props.bio,
            })
             
            let host = await axios.get(`/api/hosted/${this.props.match.params.id}`)
            let attend = await axios.get(`/api/attended/${this.props.match.params.id}`)
             this.setState(prevState => ({
                attended: attend.data,
                hosted: host.data
            }))
        } else {
            try {
                let account = await axios.get(`/api/account/${this.props.match.params.id}`)
                let host = await axios.get(`/api/hosted/${this.props.match.params.id}`)
                let attend = await axios.get(`/api/attended/${this.props.match.params.id}`)
                this.setState(prevState => ({
                    username: account.data[0].username,
                    image: account.data[0].image,
                    bio: account.data[0].bio,
                    attended: attend.data,
                    hosted: host.data
                }))
            } catch (err) {

            }
        }
    }
    editAccount = async () => {
        let profile = {
            username: this.state.username,
            bio: this.state.bio,
        }
        if (this.state.imageTwo !== '') {

            profile.image = this.state.imageTwo
        } else {
            profile.image = this.props.image
        }
        try {
            let edits = await axios.put(`/api/user/${this.props.match.params.id}`, profile)
            this.props.updateUser(edits.data[0])

            this.accountData()
            this.editClose()
        } catch (err) {
            console.log(err)
        }
    }
    editOpen() {
        this.setState({
            openEdit: true
        })
    }
    editClose() {
        this.setState({
            openEdit: false
        })
    }
    handleDropzone = (value) => {
        this.setState({
            imageTwo: value
        })
    }
    handleChange(prop, val) {
        this.setState({
            [prop]: val
        })
    }
    render() {
        const { classes } = this.props;
        let varButton =
            <IconButton onClick={() => this.editOpen()} style={{ postition: 'relative', left: '45%' }}>
                <Settings color='secondary' style={{ height: 40, width: 40 }} />
            </IconButton>
        if (this.props.user_id !== Number(this.props.match.params.id)) {
            varButton = null
        }
        return (
            <div className="accountbody" >
            <div className="accountcontent">
                <div className="listheader">
                        <Typography color='secondary' style={{ fontSize: 60 }}>
                            Events hosted
                        </Typography>
                <div className="listbox">
                        <HostList
                            hosted={this.state.hosted}
                            classes={classes}
                        />
                </div>
                </div>
                <div className='profileinfo'>
                    <Paper className={classes.paper}id="profilepaper">
                        {varButton}
                        <CardMedia
                            image={this.state.image}
                            title="profile picture"
                            style={{ borderRadius: "50%", width: 200, height: 200 }}
                        />
                        <Typography color='secondary' style={{ fontSize: 80 }}>
                            {this.state.username}
                        </Typography>
                        <Typography style={{ fontSize: 30 }}>
                            {this.state.bio}
                        </Typography>
                    </Paper>
                </div>
                <div className="listheader">
                        <Typography color='secondary' style={{ fontSize: 60 }}>
                            Events attended
                        </Typography>
                <div className='listbox'>
                        <AttendList
                            attended={this.state.attended}
                            classes={classes}
                        />
                </div>
                </div>
                </div>
                <div>
                    <Modal open={this.state.openEdit || false} onClose={() => { this.editClose() }}>



                        <Paper className={classes.paper} style={{ position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%, -50%)', width: '60vw' }}>
                            <Avatar className={classes.avatar}>
                                <Settings
                                    color="secondary"
                                    style={{ color: 'white' }}
                                />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Edit user
            </Typography>
                            <form className={classes.form}>
                                <FormControl margin="normal" required fullWidth>
                                    <InputLabel >username</InputLabel>
                                    <Input value={this.state.username} onChange={e => this.handleChange('username', e.target.value)} autoFocus />
                                </FormControl>
                                <FormControl margin="normal" required fullWidth>
                                    <InputLabel >Edit Bio</InputLabel>
                                    <Input value={this.state.bio} onChange={e => this.handleChange('bio', e.target.value)} />
                                </FormControl>
                                <Dropzone handleDropzone={this.handleDropzone} image_url_placeholder={this.props.image} />
                                <Button
                                    fullWidth
                                    variant="contained"
                                    color="secondary"
                                    className={classes.submit}
                                    onClick={() => { this.editAccount() }}
                                >
                                    Save Changes
          </Button>

                            </form>
                        </Paper>
                    </Modal>
                </div>
            </div>
        )

    }
}

const mapStateToProps = state => {
    return {
        user_id: state.user_id,
        username: state.username,
        image: state.image,
        bio: state.bio
    };
};

const mapDispatchToProps = {
    updateUser
};
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Account));