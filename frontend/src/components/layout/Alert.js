import React, { Component, Fragment } from 'react'
import { withAlert, useAlert } from 'react-alert'
import {connect} from 'react-redux'


class Alert extends Component {
    

    componentDidUpdate(prevProps){
        const {error,message,alert} = this.props;
        if (error !== prevProps.error){
            if(error.msg.name) alert.error(`Name:${error.msg.name.join()}`)
            if(error.msg.email) alert.error(`Email:${error.msg.email.join()}`)
            if(error.msg.non_field_errors) alert.error(error.msg.non_field_errors.join())
            if(error.msg.username) alert.error(error.msg.username.join())
        }

        // alert for addind lead and deleting lead
        if (message !==  prevProps.message){
            // alert for addind lead
            if(message.leadAdded){
                alert.success(message.leadAdded)
            }
            // alert for deleting lead
            if(message.leadDelete){
                alert.success(message.leadDelete)
            }
            // creates a message if passwords dont match
            if(message.passwordNotMatch){
                alert.error(message.passwordNotMatch)
            }
        }
       
    }
    render() {
        return (
                <Fragment>
                </Fragment>
        )
    }
}

const mapStateToProps = state =>({
    error:state.errors,
    message: state.messages
})

export default connect(mapStateToProps)(withAlert()(Alert))

