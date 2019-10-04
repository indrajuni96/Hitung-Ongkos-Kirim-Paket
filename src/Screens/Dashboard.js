import React, { Component } from 'react'
import axios from 'axios'
import ProductList from '../Components/Content'

class Menu extends Component {
    constructor(props) {
        super()
        this.state = {
            data: []
        }
    }

    async componentDidMount() {
        await this.getAll()
        console.log('ComponentDidMount', this.state.data)
    }

    getAll = async () => {
        await axios.get('http://localhost:4000/api/v1/products')
            .then(result => {
                console.log(result.data.data)
                this.setState({ data: result.data.data })
            })
            .catch(err => {
                console.log(err)
            })
    }

    render() {
        return <>
            <ProductList />
        </>

    }
}

export default Menu