import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { addProduct } from '../../actions/leads'

class Form extends Component {

    state={
        name:'',
        price:'',
        number:'',
        coin_type:''
    }
    // on change method
    onChange = e => this.setState({[e.target.name]:e.target.value})

    // on submit
    onSubmit = e =>{
        e.preventDefault()
        const {name, price, number,coin_type} = this.state
        const product =  {name, price , number,coin_type}
        this.props.addProduct(product)
        // clear the inputs after submission
        this.setState({
            name:'',
            price:'',
            number:'',
            coin_type:'' 
        })
    }
    render() {
        const {name, price, number,coin_type} = this.state
        return (
            <div className="card card-body mt-4 mb-4">
                <h1>Add Vending Product</h1>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Product</label><br/>
                        <input type="text" name="name" className="form-group" onChange={this.onChange} value={name} required/>
                    </div>
                    <div className="form-group">
                        <label>Number/Packets</label><br/>
                        <input type="number" name="number" className="form-group" onChange={this.onChange} value={number} required/>
                    </div>
                    <div className="form-group">
                        <label>Coin Type</label><br/>
                        <select className="form-group" name="coin_type" id="" onChange={this.onChange} value={coin_type} required>
                            <option value="" disabled>Select Coin Type</option>
                            <option value="CENTS">Cents</option>
                            <option value="KSH">Shillings</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Amount per packet</label><br/>
                        <input type="number" name="price" className="form-group" onChange={this.onChange} value={price} required/>
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary btn-sm">Add Product</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default connect(null, {addProduct})(Form)
