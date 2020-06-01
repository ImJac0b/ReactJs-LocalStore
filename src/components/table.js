import React, { Component } from 'react';
import NumberFormat from 'react-number-format';



export default class Table extends Component {

    render() {
        let data = []
        let contador = 0;
        let estado = false;
        while (estado == false) {

            let local = localStorage.getItem('user' + contador)

            if (local == null) {

                estado = true;

            } else {
                local = JSON.parse(local)
                data.push(local)
                contador++
            }
        }
        let colum = null;
        let cont = 0;
        
        if (data != null) {
            colum = data.map((local) => (                
                    <tr key={++cont}>
                        <th scope="row">{cont}</th>
                        <td>{local.Valor}</td>
                        <td>{local.Option}</td>
                        <td>{local.Trm}</td>
                    </tr>                
            ));
        }

        return (
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Valor</th>
                        <th scope="col">Option</th>
                        <th scope="col">TRM</th>
                    </tr>
                </thead>
                <tbody>
                    {colum}
                </tbody>
            </table>
        );
    }
}