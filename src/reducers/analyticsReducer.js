import {GET_BROWSER_ANALYTICS} from '../actions/types'

const initialState = {
    browserAnalytics: {}
}

export default (state = initialState, action) => {
    switch(action.type){
        case GET_BROWSER_ANALYTICS: {
            return {
                ...state,
                browserAnalytics: action.payload
            }
        }
        default: {
            return state;
          }
    }
}