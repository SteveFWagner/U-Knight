import React, { Component } from 'react';
import axios from 'axios'
// import './form.css'

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
import InputBase from '@material-ui/core/InputBase'

// ! Date Picker
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// ! Dropzone
import S3Dropzone from '../../Dropzone/S3Dropzone'


class EventForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            category: '',
            description: '',
            address: '',
            date: 0,
            dropzone: '',
            zipcode: '',
            multiline: 'Controlled',
            start_date: new Date(),
            end_date: new Date(),
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
            dropzone:value
        })
    }

    submitForm = () => {
        const { title, category, description, address, start_date, end_date, zipcode, dropzone } = this.state

        if (this.state.location === 'local') {
            axios.post('/api/submitForm', { title, category, description, address, start_date, end_date, zipcode, dropzone })

        } else if (this.state.location === 'online') {
            let obj = {
                zipcode: 1000,
                address: 'online'
            }
            const { address, zipcode } = obj
            axios.post('/api/submitForm', { title, category, description, address, start_date, end_date, zipcode, dropzone})
        }
        // e.preventDefault()
    }


    render() {
        const categories = [ 'PC', 'VR', 'PlayStation', 'Xbox', 'Switch', 'LARP', 'Board Games', 'Retro' ]
        const mappedCategories = categories.map((cat, i) => {
            return <MenuItem value={ cat } key={ i }>{ cat }</MenuItem>
        })
        console.log(222222,this.state)
        return (

            <form >
                <fieldset>

        <S3Dropzone handleDropzone={this.handleDropzone}/>
            
                    <FormControl>

                        <InputLabel>Category</InputLabel>
                        <Select
                            value={ this.state.category }
                            onChange={ (e) => this.handleAllFormChanges('category', e.target.value) }
                        >
                            { mappedCategories }
                        </Select>
                        </FormControl>

                        <TextField
                        id='standard-title'
                        label='Title'
                        value={ this.state.title }
                        onChange={ e => this.handleAllFormChanges('title', e.target.value) }
                        margin='normal'
                    />
                        <br />

                        <FormLabel component='legend'>Will your event be</FormLabel>
                        <RadioGroup
                            aria-label="position"
                            name="position"
                            value={ this.state.location }
                            onChange={ e => this.handleAllFormChanges('location', e.target.value) }
                            row={true}
                            checked={true}
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
                        

                    <br />

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
<InputBase>
                    <TextField
                        fullWidth
                        id="standard-multiline-flexible"
                        label="Description"
                        multiline
                        rowsMax="11"
                        value={ this.state.description }
                        onChange={ e => this.handleAllFormChanges('description', e.target.value) }
                        margin="normal"
                    />
                    </InputBase>


                </fieldset>
                <button type='button' onClick={ () => this.submitForm() }>button</button>
            </form>


        )
    }
}

export default EventForm