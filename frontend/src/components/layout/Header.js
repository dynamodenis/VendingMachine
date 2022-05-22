import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {connect} from 'react-redux'
import {logout} from '../../actions/auth'

class Header extends Component {
    render() {
        // for logged in user
        const authLinks = (
            
            <ul className="navbar-nav mr-auto">
                <button className="btn btn-primary mr-2 btn-sm">
                    <Link to="/maintainance" className="nav-link">Maintainance</Link> 
                </button>
            </ul>
        )
        return (
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
                <a className="navbar-brand" href="#">Vending Machine</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto float-right">
                        {authLinks}
                    </ul>
                </div>
            </nav>

        )
    }
}
const mapStateToProps= state=>({
    auth:state.auth
})

export default connect(mapStateToProps,{logout})(Header)
