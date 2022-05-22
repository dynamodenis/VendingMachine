import React,{Fragment} from 'react'
import Form from './Form'
import Leads from './Leads'

function Maintainance() {
  return (
    <Fragment>
        <Form/>
        <Leads instance="maintainance"></Leads>
    </Fragment>
  )
}

export default Maintainance