const initialState = {
    user_id: 0,
    email: '',
    username: '',
    bio: '',
    image: '',
    open: false,
    openTwo: false,
    snack: false,
}

const UPDATE_USER = 'UPDATE_USER';
const CLEAR_USER = 'CLEAR_USER';
const MODAL_ONE_OPEN = 'MODAL_ONE_OPEN';
const MODAL_ONE_CLOSE = 'MODAL_ONE_CLOSE';
const MODAL_TWO_OPEN = 'MODAL_TWO_OPEN';
const MODAL_TWO_CLOSE = 'MODAL_TWO_CLOSE';
const SNACK_OPEN = 'SNACK_OPEN';
const SNACK_CLOSE = 'SNACK_CLOSE';

export function modalOneOpen(){
    return{
        type: MODAL_ONE_OPEN
    }
}

export function modalOneClose(){
    return{
        type: MODAL_ONE_CLOSE
    }
}

export function modalTwoOpen(){
    return{
        type: MODAL_TWO_OPEN
    }
}
export function modalTwoClose(){
    return{
        type: MODAL_TWO_CLOSE
    }
}
export function snackOpen(){
    return{
        type: SNACK_OPEN
    }
}
export function snackClose(){
    return{
        type: SNACK_CLOSE
    }
}

export function updateUser(user){
    return{
        type: UPDATE_USER,
        payload: user
    }
}

export function clearUser(){
    return{
        type: CLEAR_USER
    }
}





export default function reducer(state=initialState,action){
    const {type, payload} = action;
    switch(type){
        case UPDATE_USER:
        const { user_id, username, email, bio, image } = payload;
        return{ ...state, user_id, username, email,  bio, image}
        case CLEAR_USER:
        return { ...state, user_id: 0, email: '', username: '', image: ''}
        //modals and snacks
        case MODAL_ONE_OPEN:
        return{ ...state, open: true }
        case MODAL_ONE_CLOSE:
        return{ ...state, open: false }
        case MODAL_TWO_OPEN:
        return{ ...state, open: false, openTwo: true }
        case MODAL_TWO_CLOSE:
        return{ ...state, openTwo: false}
        case SNACK_OPEN:
        return{ ...state, snack: true}
        case SNACK_CLOSE:
        return{ ...state, snack: false}
        default:
            return state;
    }
}