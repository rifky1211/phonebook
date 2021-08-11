import React, { Component } from 'react'

import Header from '../partials/Header'
import FormAdd from '../components/Add/FormAdd'

export default class Flux extends Component {
    render() {
        return (
            <div>
                <Header></Header>
                <FormAdd></FormAdd>
            </div>
        )
    }
}
