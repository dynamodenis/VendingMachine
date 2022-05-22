import React, {Fragment} from 'react'
// import Form from './Form'
import Leads from './Leads'

function Dashboard() {
    return (
        <Fragment>
            <Leads instance="users"></Leads>
        </Fragment>
    )
}

export default Dashboard
