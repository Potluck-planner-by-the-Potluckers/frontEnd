// ACTIONS
export const GET = 'GET'
export const ADD = 'ADD'
export const EDIT = 'EDIT'
export const DELETE = 'DELETE'
//stretch goal const USER_LOADING = 'USER_LOADING'

const initialState = [{
    potluckName: '',
    date: '',
    foodList: [''],
    location: '',
    invited: [{
        name:'',
        confirmedAttendence: false,
    }],
    myFoodList: [''],
}]


export default function reducer(state = initialState, action){
    switch(action.type){
        case GET:
            return state
        case ADD: 
        //from CreatePotluckForm: dispatch({ type: ADD, payload: resp.data })
        console.log(action.payload)
            return {
                ...state,
                action.payload,
            }
        case EDIT:
            return state
        case DELETE:
            return state
        default:
            return state
    }
}