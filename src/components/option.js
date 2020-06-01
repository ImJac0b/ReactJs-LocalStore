import React, { Component } from 'react';
import NumberFormat from 'react-number-format';



export default class Option extends Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);         
    }

    handleChange(e) {                  
        let opt = e.target.value; 
        this.props.onOptChange(opt);      
    }

    render() {
        const opt = this.props.opt;
        return (
            
            <div className="form-group">
                        <label>Option</label>
                        <select type="option" className="form-control" value={opt} onChange={this.handleChange}>

                            <option value="0" id="0"></option>

                            <option value="1" id="1">Option 1</option>

                            <option value="2" id="2">Option 2</option>

                            <option value="3" id="3">Option 3</option>

                        </select>
            </div>
        );
    }
}