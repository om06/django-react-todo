import { USER } from '../actions/actions'

const initialState = {user : {userName : 'ajit'}}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER:
            return {
                ...state,
                user: action.user
            }
        default:
            return state;
    }


}

export default userReducer