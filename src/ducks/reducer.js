const initialState = {
    user_id: 0,
    email: '',
    username: '',
    image: ''
}

const UPDATE_USER = 'UPDATE_USER';
const CLEAR_USER = 'CLEAR_USER'

export function updateUser(user){
    console.log(8888, user)
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
        const { user_id, username, email, image } = payload;
        return{ ...state, user_id, email, username, image}
        case CLEAR_USER:
        return { ...state, user_id: 0, email: '', username: '', image: ''}
        default:
            return state;
    }
}