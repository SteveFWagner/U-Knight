import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout'
import { Typography, Button, Select, InputLabel, MenuItem, FormControl } from '@material-ui/core/'
import Axios from 'axios';

class PayNow extends Component {
    constructor(props){
        super(props)
        this.state={
            payAmount:0
        }
    }

    handleUserInput = (prop,val) => {
        this.setState({
            [prop]:val
        })
    }

    handleToken = (token) => {
        console.log('hit')
        token.card = void 0
        const {eventId, userId} = this.props
        Axios.post('/api/payment', {token, amount:this.state.payAmount, eventId, userId})
        .then(res => {
            this.props.closeModal('paymentModal',false)
        })
        .catch(err => console.log(err))
    }

    render() {
        console.log(this.state.payAmount)
        return (
            <div id='paynow-wrapper'>
                <Typography variant='h4'>
                    Pitch in for this Event!
                </Typography>
                    <FormControl id='paynow-amount-select'>
                    <InputLabel>Amount</InputLabel>
                    <Select
                        value={this.state.payAmount}
                        onChange={(e)=>this.handleUserInput('payAmount',e.target.value)}>
                            <MenuItem value={500}>$ 5</MenuItem>
                            <MenuItem value={1000}>$ 10</MenuItem>
                            <MenuItem value={1500}>$ 15</MenuItem>
                            <MenuItem value={2500}>$ 25</MenuItem>
                            <MenuItem value={5000}>$ 50</MenuItem>
                    </Select>
                    </FormControl>
                    <StripeCheckout
                        name="U-Knight Event"
                        description='Event Name Here'
                        billingAddress
                        zipCode
                        stripeKey={'pk_test_frkLvxGy3rG4fSrU4bgNwrL400v7e8YpQ8'}
                        amount={this.state.payAmount}
                        token={this.handleToken}
                        >
                        <Button variant='contained' color='secondary'>Pay</Button>
                    </StripeCheckout>
                
            </div>
        );
    }
}

export default PayNow;