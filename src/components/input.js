import React, { Component } from 'react';
import NumberFormat from 'react-number-format';



export default class Input extends Component { 

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);         
    }

    handleChange(e) {                  
        let number = e.target.value;
        let input = new Intl.NumberFormat("ES-CL", {
            style: "currency",
            currency: "COL"
        }).format(number)
        input = input.replace("COL", "")
        this.props.onNumberChange(input);
             
    }

    render() {
        const number = this.props.number;
        return (
            <input type="number" className="form-control" value={number} onChange={this.handleChange}/>
        )
    }
}