import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { getProducts, deleteLead } from '../../actions/leads'
import EditProduct from './EditProduct'
import BuyProduct from './BuyProduct'

class Leads extends Component {
    constructor(props) {
        super(props);
        this.state = {selected: {}};
    }
    // cal the get leads reducer
    componentDidMount(){
        this.props.getProducts()
    }

    selectedProduct = product => {
        this.setState({
            selected: product
        });
    }
    render() {
        // this.props.getProducts()
        return (
            <Fragment>
                <h1>Products List</h1>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Number</th>
                            <th>Price</th>
                            <th>Coin Type</th>
                            <th/>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.products?.map(lead=>(
                            <tr key={lead.id}>
                                <td>{lead.id}</td>
                                <td>{lead.name}</td>
                                <td>{lead.number}</td>
                                <td>{lead.price}</td>
                                <td>{lead.coin_type}</td>
                                {this.props.instance === "users" && <td><button className='btn btn-danger btn-small' data-toggle="modal" data-target="#buyModal" onClick={() => this.selectedProduct(lead)}>Buy</button></td> }
                                {this.props.instance === "maintainance" && <td><button className='btn btn-primary btn-small' data-toggle="modal" data-target="#exampleModal" onClick={() => this.selectedProduct(lead)}>Edit</button></td> }
                            </tr>
                        ))}
                    </tbody>
                </table>
                <EditProduct selected={this.state.selected}/>
                <BuyProduct selected={this.state.selected}/>
            </Fragment>
        )
    }
}

const mapStateToProps =state=>({
    products:state.leads.products
})

export default connect(mapStateToProps,{getProducts, deleteLead})(Leads)
