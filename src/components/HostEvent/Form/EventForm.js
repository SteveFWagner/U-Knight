import React, { Component } from 'react';
import axios from 'axios'
import './eventform.css'
import { withRouter } from 'react-router-dom'

// ! Radio Button
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'

// ! Text Field 
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

// ! Date Picker
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// ! Dropzone
import S3Dropzone from '../../Dropzone/S3Dropzone'

// ! Paper
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button'


class EventForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            category: '',
            description: '',
            address: '',
            city: '',
            state: '',
            date: 0,
            dropzone: '',
            zipcode: '',
            multiline: 'Controlled',
            start_date: new Date(),
            end_date: new Date(),
            eventId: 0
        }
    }



    handleAllFormChanges = (props, val) => {
        this.setState({
            [ props ]: val
        })
    }

    handleOnlineRadio = () => {
        console.log('hit')
        this.setState({
            address: '',
            zipcode: ''
        })
    }

    handleDateStartChange = (date) => {
        this.setState({
            start_date: date
        });
    }
    handleDateEndChange = (date) => {
        this.setState({
            end_date: date
        });
    }

    handleDropzone = (value) => {
        this.setState({
            dropzone: value
        })
    }

    submitForm = (e) => {
        e.preventDefault()
        const { title, category, description, address, start_date, end_date, zipcode, dropzone, eventId } = this.state

        if (this.state.location === 'local') {
            axios.post('/api/submitForm', { title, category, description, address, start_date, end_date, zipcode, dropzone }).then(resp => {
                let eventId = resp.data[ 0 ].event_id
                this.props.history.push(`/event/${eventId}`)
            })

        } else if (this.state.location === 'online') {
            let obj = {
                zipcode: 1000,
                address: 'online'
            }
            const { address, zipcode } = obj
            axios.post('/api/submitForm', { title, category, description, address, start_date, end_date, zipcode, dropzone }).then(resp => {
                let eventId = resp.data[ 0 ].event_id
                this.props.history.push(`/event/${eventId}`)
            })
        }
    }


    render() {
        const categories = [ 'PC', 'VR', 'PlayStation', 'Xbox', 'Switch', 'LARP', 'Board Games', 'Retro' ]
        const mappedCategories = categories.map((cat, i) => {
            return <MenuItem value={ cat } key={ i }>{ cat }</MenuItem>
        })
        console.log(222222, this.state)
        return (
            <div className='the-everything-container'>
                <form className='form'>
                    <div className='header'>
                        <Typography variant='h3'>Create An Epic Event !!</Typography>
                    </div>
                    <div className='section1'>
                        <div className='categoryselect'>
                            <InputLabel>Category</InputLabel>
                            <Select

                                value={ this.state.category }
                                onChange={ (e) => this.handleAllFormChanges('category', e.target.value) }
                            >
                                { mappedCategories }
                            </Select>
                        </div>

                        <TextField
                            className='title'
                            id='standard-title'
                            label='Your epic event title'
                            value={ this.state.title }
                            onChange={ e => this.handleAllFormChanges('title', e.target.value) }
                            margin='normal'
                        />

                    </div>



                    <fieldset className='section2'>
                        <FormLabel component='legend'>Will your event be</FormLabel>
                        <RadioGroup

                            aria-label="position"
                            name="position"
                            value={ this.state.location }
                            onChange={ e => this.handleAllFormChanges('location', e.target.value) }
                            row={ true }
                            checked={ true }
                        >
                            <FormControlLabel
                                value='online'
                                control={ <Radio color="primary" /> }
                                label="Online"
                                labelPlacement="start"
                                onClick={ this.handleOnlineRadio }
                            />
                            <FormControlLabel
                                value='local'
                                control={ <Radio color="secondary" /> }
                                label="Local"
                                labelPlacement="start"
                            />
                        </RadioGroup>
                    </fieldset>



                    <div className='section3'>
                        <DatePicker
                            selected={ this.state.start_date }
                            selectsStart
                            startDate={ this.state.start_date }
                            onChange={ this.handleDateStartChange }
                            showTimeSelect={ true }
                            shouldCloseOnSelect={ true }
                            dateFormat={ 'MMMM d, yyyy h:mm aa' }
                        />

                        <DatePicker
                            selected={ this.state.end_date }
                            selectsEnd
                            endDate={ this.state.end_date }
                            onChange={ this.handleDateEndChange }
                            showTimeSelect={ true }
                            shouldCloseOnSelect={ true }
                            dateFormat={ 'MMMM d, yyyy h:mm aa' }
                        />
                    </div>

                    <div className='section4'>
                        <div className='addressinput'>
                            <FormControl>
                                <TextField
                                    className='address'
                                    id='standard-address'
                                    label='Address'
                                    disabled={ this.state.location === 'online' }
                                    value={ this.state.address }
                                    onChange={ e => this.handleAllFormChanges('address', e.target.value) }
                                    margin='normal'

                                />


                                <TextField
                                    id='standard-title'
                                    label='State'
                                    disabled={ this.state.location === 'online' }
                                    value={ this.state.state }
                                    onChange={ e => this.handleAllFormChanges('state', e.target.value) }
                                    margin='normal'


                                />
                            </FormControl>
                        </div>
                        <div className='addressinput'>
                            <FormControl>
                                <TextField
                                    id='standard-title'
                                    label='City'
                                    disabled={ this.state.location === 'online' }
                                    value={ this.state.city }
                                    onChange={ e => this.handleAllFormChanges('city', e.target.value) }
                                    margin='normal'


                                />
                                <TextField
                                    className='zipcodeInput'
                                    id='standard-title'
                                    label='Zipcode'
                                    disabled={ this.state.location === 'online' }
                                    value={ this.state.zipcode }
                                    onChange={ e => this.handleAllFormChanges('zipcode', e.target.value) }
                                    margin='normal'

                                />
                            </FormControl>
                        </div>
                    </div>
                    <div className='section5'>

                        <fieldset>
                            <TextField
                                fullWidth={ true }
                                id="standard-multiline-flexible"
                                label="Description"
                                multiline
                                rowsMax="11"
                                value={ this.state.description }
                                onChange={ e => this.handleAllFormChanges('description', e.target.value) }
                                margin="normal"
                            />

                        </fieldset>
                    </div>
                    <Button
                    onClick={this.submitForm}
                        className='formbutton'
                        variant='contained'
                        type='button'
                        color='primary'
                    >button</Button>




                </form>
                <div className='dropzone'>
                    <S3Dropzone handleDropzone={ this.handleDropzone } />
                </div>
            </div>


        )
    }
}

export default withRouter(EventForm)