import { FETCH_ALL, CREATE, UPDATE, DELETE } from '../constants/actionTypes';
//reducer je funkcija koja prima stanje i akciju te odredi trenutno stanje
//da li se promijenilo ili ne i salje dalje to stanje
const fname = (state = [], action) => { //state = posts
    switch (action.type) {
        case DELETE:
            return state.filter((post) => post._id !== action.payload); // ??? zasto id ne usporedemojemo
        case UPDATE:
            return state.map((post) => post._id === action.payload._id ? action.payload : post); // output od bilo kojeg map methode, array.map -> izlaz je array, action.payload je updateani post
        case FETCH_ALL:
            return action.payload;
        case CREATE:
            return [...state, action.payload]; //...sprad all states and add a new one action.payload
        default:
            return state;
    }
}

export default fname;