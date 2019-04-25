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
import zipcodes from 'zipcodes'

import EventsContainer from './EventsContainer'
import { Typography } from '@material-ui/core';
import './Search.css'

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      category: "",
      location: "",
      zipcode: "",
      distance: "",
      searchString: "",
      searchResults: []
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData() {
    axios.get("/api/events").then(res => {   
      this.setState({
        events: res.data,
        searchResults: res.data
      });
    });
  }

  handleUserInput = async (prop, val) => {
    if (prop === "searchString" || prop === "location" || prop === "distance" || prop === "category") {
      await this.setState({
        [prop]: val
      });
      this.handleSearch();
    } else {
      this.setState({
        [prop]: val
      });
    }
  };

  handleSearch = () => {
    const { searchString, events, zipcode, location, distance, category } = this.state;

    let results = [];
    events.forEach(event => {
      if (
        event.title.toUpperCase().includes(searchString.toUpperCase()) ||
        event.description
          .toUpperCase()
          .includes(searchString.toUpperCase()) ||
        event.category.toUpperCase().includes(searchString.toUpperCase())
      ) {
          if(category === event.category || category === ''){
            if (location === "local") {
            let miles = zipcodes.distance(zipcode, event.zipcode);
            if(!distance){
                if(event.zipcode !== 1000){
                  results.push(event);
                }
            } else if (miles <= distance && miles !== null) {
                results.push(event);
            } else if (Number(zipcode) === event.zipcode) {
                results.push(event);
            } else {
                return null;
            }
            } else if (location === "online") {
              if (event.zipcode === 1000) {
                results.push(event);
              }
            } else {
              results.push(event);
            }
        }
      }
    });
    this.setState({
      searchResults: results
    });
  };

  render() {
    //categories
    const categories = [
      "Any",
      "PC",
      "VR",
      "PlayStation",
      "Xbox",
      "Switch",
      "LARP",
      "Board Games",
      "Retro"
    ];
    const mappedCategories = categories.map((cat, i) => {
      if(cat === 'Any'){
        return (
          <MenuItem value='' key={i}>
            {cat}
          </MenuItem>
        );
      }else{
        return (
          <MenuItem value={cat} key={i}>
            {cat}
          </MenuItem>
        );
      }
    });

    //If 'Local' is selected as the Location - display Zip Code and Distance
    let localDisplay = null;

    const distances = [5, 10, 25, 50, "Any Distance"];
    const mappedDistances = distances.map((dist, i) => {
      if (dist !== "Any Distance") {
        return (
          <MenuItem value={dist} key={i}>
            {dist}
          </MenuItem>
        );
      } else {
        return (
          <MenuItem value={""} key={i}>
            {dist}
          </MenuItem>
        );
      }
    });

    if (this.state.location === "local") {
      localDisplay = (
        <div>
          <TextField
            label="Zip Code"
            defaultValue={this.state.zipcode}
            onChange={e => this.handleUserInput("zipcode", e.target.value)}
          />
          <FormControl>
            <InputLabel>Distance</InputLabel>
            <Select
              value={this.state.distance}
              onChange={e => this.handleUserInput("distance", e.target.value)}
            >
              {mappedDistances}
            </Select>
          </FormControl>
        </div>
      );
    }

    return (
      <div id='search-wrapper'>
        <Typography variant='h1' id='search-title'>Search for an Event!</Typography>
        <form>
          {/* Search Bar */}
          <TextField
            id='search-bar'
            label="Search for an event..."
            onChange={e => this.handleUserInput("searchString", e.target.value)}
          />
          {/* Category input */}
          <FormControl id='search-category-select'>
            <InputLabel>Category</InputLabel>
            <Select
              value={this.state.category}
              onChange={e => this.handleUserInput("category", e.target.value)}
            >
              {mappedCategories}
            </Select>
          </FormControl>
          {/* Location Input */}
          <FormControl>
            <RadioGroup
              aria-label="position"
              name="position"
              value={this.state.location}
              onChange={e => this.handleUserInput("location", e.target.value)}
              row={true}
              id='radio-group'
            >
              <FormControlLabel
                value="online"
                control={<Radio color="secondary" />}
                label="Online"
                labelPlacement="start"
              />
              <FormControlLabel
                value="local"
                control={<Radio color="secondary" />}
                label="Local"
                labelPlacement="start"
              />
              <FormControlLabel
                value=""
                control={<Radio color="secondary" />}
                label="Any"
                labelPlacement="start"
              />
            </RadioGroup>
          </FormControl>
          {localDisplay}
        </form>
        <div id='your-mom'>
          <EventsContainer data={this.state.searchResults} />
        </div>
      </div>
    );
  }
}

export default Search