const initialState = {
    email: '',
    userId: ''
}

// const EDIT_POST_ID = 'EDIT_POST_ID';




// export function editPostId(post_id){
//     return {
//         type: EDIT_POST_ID,
//         payload: post_id
//     }
// }



export default function reducer(state=initialState,action){
    const {type, payload} = action;
    switch(type){
      
        default:
            return state;
    }
}