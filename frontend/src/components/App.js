import React, {Component, Fragment} from 'react'
import ReactDOM from 'react-dom'
import { Provider,connect } from 'react-redux'
import { transitions, positions,Provider as AlertProvider} from 'react-alert'
import AlertTemplate from 'react-alert-template-basic' 
import {HashRouter as Router, Route, Switch, Redirect} from 'react-router-dom'
// Components
import store from '../store'
import Header from './layout/Header'
import Dashboard from './leads/Dashboard'
import Alert from './layout/Alert'
import Maintainance from './leads/Maintainance';
import CoinMaintainance from './leads/coins-maintainance/CoinMaintainance';

// react-alert tempalates settings
const options = {
    timeout: 3000,
    position: positions.TOP_RIGHT,
    
  };
  

class App extends Component {
    render() {
        return (

            <Provider store={store}>
                 <AlertProvider template={AlertTemplate} {...options} >
                     <Router>
                        <Fragment>
                        <Header></Header>
                        <Alert></Alert>
                        <div className="container">
                            <Switch>
                                <Route exact path="/" component={Dashboard}/>
                                <Route exact path="/maintainance" component={Maintainance}/>
                                <Route exact path="/coins-maintainance" component={CoinMaintainance}/>
                            </Switch>
                        </div>
                        </Fragment>
                     </Router>
                 </AlertProvider>
            </Provider>
            
        )
    }
}


ReactDOM.render(<App/>, document.getElementById('app'));
