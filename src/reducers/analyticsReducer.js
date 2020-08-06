import {GET_BROWSER_ANALYTICS, GET_COUNTRY_ANALYTICS, GET_DEVICE_ANALYTICS, GET_MOSTVIEWED_ANALYTICS, GET_PROPOSALVIEW_ANALYTICS} from '../actions/types'

const initialState = {
    browserAnalytics: [],
    countryAnalytics: [],
    deviceAnalytics: [],
    mostviewedAnalytics: {rows: []},
    proposalviewAnalytics: []
}

export default (state = initialState, action) => {
    switch(action.type){
        case GET_BROWSER_ANALYTICS: {
            return {
                ...state,
                browserAnalytics: action.payload
            }
        }
        case GET_COUNTRY_ANALYTICS: {
            return {
                ...state,
                countryAnalytics: action.payload
            }
        }
        case GET_DEVICE_ANALYTICS: {
            return{
                ...state,
                deviceAnalytics: action.payload
            }
        }
        case GET_MOSTVIEWED_ANALYTICS:{
            return{
                ...state,
                mostviewedAnalytics: action.payload
            }
        }
        case GET_PROPOSALVIEW_ANALYTICS:{
            return{
                ...state,
                proposalviewAnalytics: action.payload
            }
        }
        default: {
            return state;
        }
    }
}