import React, { Component } from 'react';
import axios from 'axios'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import TextField from '@material-ui/core/TextField'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Radio from '@material-ui/core/Radio'
import Button from '@material-ui/core/Button'

import EventsContainer from './EventsContainer'

class Search extends Component{
    constructor(props){
        super(props)
        this.state={
            events:[],
            category:'',
            location:'',
            zipcode:null,
            distance:null,
            searchString:''
        }
    }

    componentDidMount(){
        this.getData()
    }

    getData(){
        axios.get('/events')
        .then( res =>{
            this.setState({
                events:res.data
            })
        }
        )
    }

    handleUserInput(prop, val){
        this.setState({
            [prop]:val
        })
    }


    render(){
        console.log(this.state)
        //categories
        const categories = ['PC', 'VR', 'PlayStation', 'Xbox', 'Switch', 'LARP', 'Board Games', 'Retro']
        const mappedCategories = categories.map((cat, i) =>{
           return <MenuItem value={cat} key={i}>{cat}</MenuItem>
        })
        
        //locations
        const locations = ['Online', 'Local']

        //If 'Local' is selected as the Location - display Zip Code and Distance
        let localDisplay = null

        const distances = [5,10,25,50,'Any Distance']
        const mappedDistances = distances.map((dist,i)=>{
            if(dist !== 'Any Distance'){
                return <MenuItem value={dist} key={i}>{dist}</MenuItem>
            }else if(dist === 'Any Distance'){
                return <MenuItem value={null} key={i}>{dist}</MenuItem>
            }
        })

        if(this.state.location === 'local'){
            localDisplay = (
            <div>
                <TextField label='Zip Code'/>
                <FormControl>
                    <InputLabel>Location</InputLabel>
                    <Select
                        value={this.state.location}
                        onChange={(e)=>this.handleUserInput('distance',e.target.value)}
                        >
                        {mappedDistances}
                    </Select>
                </FormControl>
            </div>
            )
        }



        return(
            <div>
                <h1>Search for an Event!</h1>
                    <form>
                        {/* Category input */}
                        <FormControl>
                            <InputLabel>Category</InputLabel>
                            <Select
                                value={this.state.category}
                                onChange={(e)=>this.handleUserInput('category',e.target.value)}
                            >
                                {mappedCategories}
                            </Select>
                        </FormControl>
                        {/* Location Input */}
                        <FormControl>
                            <RadioGroup
                                aria-label="position"
                                name="position"
                                value={ this.state.location }
                                onChange={e => this.handleUserInput('location',e.target.value) }
                            >
                                <FormControlLabel
                                    value='online'
                                    control={ <Radio color="primary" /> }
                                    label="Online"
                                    labelPlacement="start"
                                />
                                <FormControlLabel
                                    value='local'
                                    control={ <Radio color="primary" /> }
                                    label="Local"
                                    labelPlacement="start"
                                />
                        </RadioGroup>
                    </FormControl>
                        {localDisplay}
                        <TextField 
                            label='Search for an event...' 
                            onChange={e => this.handleUserInput('searchString',e.target.value)}
                        />
                        <Button 
                            variant='contained' 
                            color='primary'
                            // onClick={}
                        >
                            Find it!
                        </Button>
                    </form>                

                <EventsContainer data={this.state.events}/>
            </div>
        )
    }
}

export default Search