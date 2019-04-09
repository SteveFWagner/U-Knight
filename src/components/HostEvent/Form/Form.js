import React, { Component } from 'react';
import axios from 'axios'

class Form extends Component {


    onSubmitHandler = () => {
        axios.post('/api/submitForm')
    }


    render() {
        return (
            <form onSubmit={this.onSubmitHandler}>
                <fieldset>
                    <legend>Create an Event:</legend>
                    <label>Title: </label> <br />
                    <input placeholder='Title'></input> <br />
                    <label>Category: </label> <br />
                    <input placeholder='Category'></input> <br />
                    <label>Description</label> <br />
                    <textarea placeholder='Description'></textarea> <br />
                    <label>Start Time: </label>
                    <select>
                        <option>1:00</option>
                        <option>2:00</option>
                        <option>3:00</option>
                        <option>4:00</option>
                        <option>5:00</option>
                        <option>6:00</option>
                        <option>7:00</option>
                        <option>8:00</option>
                        <option>9:00</option>
                        <option>10:00</option>
                        <option>11:00</option>
                        <option>12:00</option>
                    </select>
                    <select>
                        <option>AM</option>
                        <option>PM</option>
                    </select> <br />
                    <label>End Time: </label>
                    <select>
                        <option>1:00</option>
                        <option>2:00</option>
                        <option>3:00</option>
                        <option>4:00</option>
                        <option>5:00</option>
                        <option>6:00</option>
                        <option>7:00</option>
                        <option>8:00</option>
                        <option>9:00</option>
                        <option>10:00</option>
                        <option>11:00</option>
                        <option>12:00</option>
                    </select>
                    <select>
                        <option>AM</option>
                        <option>PM</option>
                    </select> <br />
                    <label>react date picker</label> <br/>
                    <label>how should we do location</label> <br />
                    <label>react dropzone</label> <br />
                    <label>Zipcode:</label> <br />
                    <input placeholder='Zipcode'></input>
                </fieldset>

            </form>
        )
    }
}

export default Form