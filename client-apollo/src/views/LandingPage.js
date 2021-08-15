import React, { Component } from 'react'

import Header from '../partials/Header'
import FormAdd from '../components/Add/FormAdd'
import TableHead from '../components/Table/TableHead'
import FormSearch from '../components/Search/FormSearch'
import Pagination from '../components/Pagination/Pagination'

export default class LandingPage extends Component {
    render() {
        return (
            <div>
                <Header></Header>
                <FormAdd></FormAdd>
                <FormSearch></FormSearch>
                <TableHead></TableHead>
                <Pagination></Pagination>
            </div>
        )
    }
}
