import React, { Component } from 'react';
import NumberFormat from 'react-number-format';
import Input from '../components/input';
import Table from '../components/table';
import Option from '../components/option';
import Button from '../components/button';
import { AlertList, Alert, AlertContainer } from "react-bs-notifier";

export default class FormDataComponent extends Component {


    constructor(props) {
        super(props);

        this.onChangeValor = this.onChangeValor.bind(this);
        this.onChangeOption = this.onChangeOption.bind(this);
        this.onChangeTrm = this.onChangeTrm.bind(this);


        this.state = {
            valor: '',
            option: '',
            trm: ''
        }
    }

    // Form Values
    onChangeValor(e) {
        this.setState({ valor: e })
    }

    onChangeOption(e) {
        this.setState({ option: e })
    }

    onChangeTrm(e) {
        this.setState({ trm: e })
    }


    Send() {
        if (this.state.valor != null, this.state.option != null, this.state.trm != null) {
            let data = new FormData();
            data.append("Valor", this.state.valor);
            data.append("Option", this.state.option);
            data.append("Trm", this.state.trm);
            fetch("https://httpbin.org/post", {
                method: "POST",
                body: data
            })
                .then((res) => res.json())
                .then(
                    (result) => {


                        let estado = false;
                        let contador = 0;
                        while (estado == false) {
                            let local = localStorage.getItem('user' + contador)

                            if (local == null) {

                                localStorage.setItem('user' + contador, JSON.stringify(result.form))
                                estado = true;
                                window.location.href = window.location.href;

                            } else {
                                contador++
                            }

                        }
                    },
                    (error) => {
                        console.log(error);
                    }
                );
        } else {
            Alert.alert(
                'Error',
                'Complete the information'                
            )
        }
    }


    render() {
        return (

            <div className="container">
                <form className="mb-4">
                    <div className="form-group">
                        <label>Valor</label>
                        <Input onNumberChange={this.onChangeValor}></Input>
                    </div>
                    <Option onOptChange={this.onChangeOption}></Option>
                    <div className="form-group">
                        <label>TRM</label>
                        <Input onNumberChange={this.onChangeTrm}></Input>
                    </div>
                    <button type="button" className="btn btn-primary btn-block" onClick={() => this.Send()}>Submit</button>

                    <Button></Button>
                </form>
                <Table></Table>

            </div>
        );

    }
}