import axios from 'axios';
import { errorHandler } from '../utils/errorHandler';
import { setRequestStatus } from '../utils/setRequestStatus';
import { GET_BROWSER_ANALYTICS } from '../actions/types'
import moment from 'moment'

// GET BROWSER ANALYTICS
export const getBrowserAnalytics = (startingDate, endingDate, proposalId) => async(dispatch) => {
    try{
        let data= {
            startDate: moment(startingDate).format('YYYY-MM-DD'),
            endDate: moment(endingDate).format('YYYY-MM-DD'),
            proposalId: proposalId
        }
        const res = await axios.post(`/analytics/browser`, data)
        dispatch(setRequestStatus(false));
        if (res.status === 200) {
            dispatch(setRequestStatus(true));
            dispatch({
                type: GET_BROWSER_ANALYTICS,
                payload: res.data.proposal || res.data.msg,
            })
        }
    }
    catch(error){
        dispatch(errorHandler(error))
    }
}