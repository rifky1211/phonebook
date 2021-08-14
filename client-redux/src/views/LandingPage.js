import React, { Component } from 'react'

import Header from '../partials/Header'
import FormAdd from '../components/Add/FormAdd'
import TableHead from '../components/Table/TableHead'

export default class LandingPage extends Component {
    render() {
        return (
            <div>
                <Header></Header>
                <FormAdd></FormAdd>
                <TableHead></TableHead>
            </div>
        )
    }
}
