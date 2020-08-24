

const initialState = {
    potluckName: '',
    date: '',
    foodList: [''],
    invited: [{
        name:'',
        confirmedAttendence: false,
    }],
    myFoodList: [''],
}

const GET = 'GET'
const ADD = 'ADD'
const EDIT = 'EDIT'
const DELETE = 'DELETE'

export default function reducer(state = initialState, action){
    switch(action.type){
        case GET:
            return state
        case ADD:
            return state
        case EDIT:
            return state
        case DELETE:
            return state
        default:
            return state
    }
}