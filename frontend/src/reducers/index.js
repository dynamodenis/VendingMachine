import { combineReducers } from 'redux'
import leads from './leads'
import errors from './errors'
import messages from './messages'
import auth from './auth'

const rootReducer = combineReducers({
    leads:leads,
    errors:errors,
    messages:messages,
    auth:auth
})

export default rootReducer