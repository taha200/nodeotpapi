import { setSessions } from "./actionNames";

export function addOrder(order){
    return dispatch =>{
        dispatch({
            type:'ADD_ORDER',
            payload:order
        })
    }
}
export function checkState(){
    return dispatch=>{
        dispatch({
            type:'CHECK_STATE'
        })
    }
}
export function addInfo(info){
    return dispatch =>{
        dispatch({
            type:'ADD_INFO',
            payload:info
        })
    }
}
export function calculateTotal(totalAmount){
    return dispatch=>{
        dispatch({
            type:"CALCULATE_TOTAL",
            payload:totalAmount
        })
    }
}
export function forder(data){
    return dispatch=>{
        dispatch({
            type:"FINAL_ORDERS",
            payload:data
        })
    }
}

export function setSessionsActions(sessions){
    return dispatch=>{
        dispatch({
            type:setSessions,
            payload:sessions
        })
    }
}
