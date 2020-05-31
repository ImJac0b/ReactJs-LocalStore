import React, { Component } from 'react';
import NumberFormat from 'react-number-format';

let user;
export default class FormDataComponent extends Component {
    userData;

    constructor(props) {
        super(props);

        this.onChangeValor = this.onChangeValor.bind(this);
        this.onChangeOption = this.onChangeOption.bind(this);
        this.onChangeTrm = this.onChangeTrm.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            valor: '',
            option: '',
            trm: ''
        }
    }

    // Form Values
    onChangeValor(e) {
        let number = document.getElementById("Valor").value
        let input = new Intl.NumberFormat("ES-CL", {
            style: "currency",
            currency: "COL"
        }).format(number)
        input = input.replace("COL", "")
        this.setState({ valor: input })
    }

    onChangeOption(e) {
        this.setState({ option: e.target.value })
    }

    onChangeTrm(e) {
        let number = document.getElementById("TRM").value
        let input = new Intl.NumberFormat("ES-CL", {
            style: "currency",
            currency: "COL"
        }).format(number)

        input = input.replace("COL", "")
        this.setState({ trm: input })
    }


    // React Life Cycle
    componentDidMount() {
        let input = localStorage.getItem('user')
        input = JSON.parse(input)
        this.setState({
            valor: input.valor,
            option: input.option,
            trm: input.trm
        });
    }

    componentWillUpdate(nextProps, nextState) {
        localStorage.setItem('user', JSON.stringify(nextState));
    }

    onSubmit(e) {
        let data = new FormData();
        data.append("Valor", this.state.valor);
        data.append("Option", this.state.option);
        data.append("Trm", this.state.trm);
        fetch("https://httpbin.org/post", {
            method: "POST",
            body: data,
        })
            .then((res) => res.json())
            .then(
                (result) => {
                    console.log(result.form);
                    this.setState({
                        valor: result.form.Valor,
                        option: result.form.Option,
                        trm: result.form.Trm
                    });
                    localStorage.setItem('user', JSON.stringify(this.state))
                    let input = localStorage.getItem('user')
                    input = JSON.parse(input)
                    console.log(input)
                },
                (error) => {
                    console.log(error);
                }
            );
        e.preventDefault();

    }





    render() {
        return (


            <div className="container">
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Valor</label>
                        <input type="number" className="form-control" id="Valor" onChange={this.onChangeValor} />
                    </div>
                    <div className="form-group">
                        <label>Option</label>

                        <select type="option" className="form-control" value={this.state.option} onChange={this.onChangeOption} >

                            <option value="0" id="0">Selection</option>

                            <option value="1" id="1">Option 1</option>

                            <option value="2" id="2">Option 2</option>

                            <option value="3" id="3">Option 3</option>

                        </select>
                    </div>
                    <div className="form-group">
                        <label>TRM</label>
                        <input type="number" className="form-control" id="TRM" onChange={this.onChangeTrm} />
                    </div>
                    <button type="submit" className="btn btn-primary btn-block">Submit</button>
                </form>
                <br>
                </br>
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Valor</th>
                            <th scope="col">Option</th>
                            <th scope="col">TRM</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">1</th>
                            <td>{this.state.valor}</td>
                            <td>{this.state.option}</td>
                            <td>{this.state.trm}</td>
                        </tr>
                        <tr>
                            <th scope="row">2</th>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )

    }
}