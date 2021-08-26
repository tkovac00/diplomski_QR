import { SAVE, GET, REMOVE, UPDATE } from '../constants/actionTypes';
//reducer je funkcija koja prima stanje i akciju te odredi trenutno stanje
//da li se promijenilo ili ne i salje dalje to stanje
const QRs = (state = [], action) => { //state = posts
    switch (action.type) {
        case GET:
       // console.log(action.payload);
            return action.payload;
        //...sprad all states and add a new one action.payload
        case SAVE:
            return [...state, action.payload];
        case UPDATE:
            return state.map((qr) => qr._id === action.payload._id ? action.payload : qr); // output od bilo kojeg map methode, array.map -> izlaz je array, action.payload je updateani post
        case REMOVE:
            return state.filter((qr) => qr._id !== action.payload); // ??? zasto id ne usporedemojemo
        default:
            return state;
    }
}

export default QRs;