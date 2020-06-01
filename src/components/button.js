import React, { Component } from 'react';
import NumberFormat from 'react-number-format';



export default class Button extends Component { 
        
    Clear(){
        localStorage.clear()
        window.location.href = window.location.href; 
    }

    render() {     
     
        return (
            <button type="button" className="btn btn-danger btn-block" onClick={() => this.Clear()}>Delete</button>
        );    
    }
}