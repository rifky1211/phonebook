import {
    DRAW_LOAD_USER,
    DRAW_ADD_USER,
    FAILED_ADD_USER,
    SUCCESS_RESEND_USER
} from '../constants'

const users = (state = [], action) => {
    switch (action.type) {
        case DRAW_LOAD_USER:
            return action.users.map((item) => {
                return {
                    total: item.total,
                    id: item.id,
                    name: item.name,
                    phone: item.phone,
                    sent: true
                }
            })

        case DRAW_ADD_USER:
            return [
                ...state,
                {
                    id: action.id,
                    name: action.name,
                    phone: action.phone,
                    sent: true
                }
            ]

        case FAILED_ADD_USER:
            return state.map((item) => {
                if (item.username === action.username) {
                    item.sent = false;
                }
                return item
            })

            case SUCCESS_RESEND_USER:
            return state.map((item) => {
                if (item.username === action.username) {
                    item.sent = true;
                }
                return item
            })

        default:
            return state
    }
}

export default users