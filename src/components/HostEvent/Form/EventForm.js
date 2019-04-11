import React, { Component } from 'react';
import axios from 'axios'

// Text Field 
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

// Radio Button
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';


class EventForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            category: '',
            description: '',
            start_time: '',
            end_time: '',
            address: '',
            date: 0,
            dropzone: '',
            zipcode: '',
            multiline: 'Controlled',
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

    submitForm = () => {
        const { title, category, description, address, start_time, end_time, date, zipcode } = this.state

        if (this.state.location === 'local') {
            axios.post('/api/submitForm', { title, category, description, address, start_time, end_time, date, zipcode })

        } else if (this.state.location === 'online') {
            let obj = {
                zipcode: 1000,
                address: 'online'
            }
            const { address, zipcode } = obj
            axios.post('/api/submitForm', { title, category, description, address, start_time, end_time, date, zipcode })
        }
        // e.preventDefault()
    }

    
    render() {
        return (

            <form >
                <fieldset>

                    {/** Radio Buttons */ }
                    <FormControl>
                        <FormLabel component='legend'>Will your event be</FormLabel>
                        <RadioGroup
                            aria-label="position"
                            name="position"
                            value={ this.state.location }
                            onChange={ e => this.handleAllFormChanges('location', e.target.value) }
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
                                control={ <Radio color="primary" /> }
                                label="Local"
                                labelPlacement="start"
                            />
                        </RadioGroup>
                    </FormControl>

                    <br />

                    <TextField
                        id='standard-title'
                        label='Title'
                        value={ this.state.title }
                        onChange={ e => this.handleAllFormChanges('title', e.target.value) }
                        margin='normal'
                    />

                    <TextField
                        id='standard-title'
                        label='Category'
                        value={ this.state.category }
                        onChange={ e => this.handleAllFormChanges('category', e.target.value) }
                        margin='normal'
                    />
                    {/**
* ! add new option to select local vs online --- will need ternary !!!! if online is selected then the address textfield does not show up... if local is selected then address will show up with zipcode... if online setstate zipcode to 1000
*/}
                    <TextField
                        id="standard-multiline-flexible"
                        label="Description"
                        multiline
                        rowsMax="4"
                        value={ this.state.description }
                        onChange={ e => this.handleAllFormChanges('description', e.target.value) }
                        margin="normal"
                    />
                    <br />

                    <TextField
                        id='standard-address'
                        label='Address'
                        disabled={ this.state.location === 'online' }
                        value={ this.state.address }
                        onChange={ e => this.handleAllFormChanges('address', e.target.value) }
                        margin='normal'
                    />
                    <TextField
                        id='standard-title'
                        label='Zipcode'
                        disabled={ this.state.location === 'online' }
                        value={ this.state.zipcode }
                        onChange={ e => this.handleAllFormChanges('zipcode', e.target.value) }
                        margin='normal'
                    />
                    <br />
                    {/** Date & Time */ }
                    <TextField
                        id="datetime-local"
                        label="Start Time"
                        type="datetime-local"
                        InputLabelProps={ {
                            shrink: true,
                        } }
                        onChange={ e => this.handleAllFormChanges('start_time', e.target.value) }
                    />
                    <TextField
                        id="datetime-local"
                        label="End Time"
                        type="datetime-local"
                        InputLabelProps={ {
                            shrink: true,
                        } }
                        onChange={ e => this.handleAllFormChanges('end_time', e.target.value) }
                    />

                </fieldset>
                <button type='button' onClick={ () => this.submitForm() }>button</button>
            </form>


        )
    }
}

export default EventForm