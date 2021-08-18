import { combineReducers } from 'redux'
import users from './users'
import pageFilter from './pageFilter'

export default combineReducers({
    users,
    pageFilter
})