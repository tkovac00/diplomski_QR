import * as api from '../api/index';
import { SAVE, GET , REMOVE, UPDATE} from '../constants/actionTypes';

export const saveQR = (QR) => async (dispatch) => {
    try {
        const { data } = await api.saveQR(QR);
        dispatch({ type: SAVE, payload: data });
    } catch (err) {
        console.log(err);
    }
}

export const getQRs = () => async (dispatch) => {
    try {
        const { data } = await api.fetchQRs(); // const response = await... --> u res uvijek ima data objekt pa se odma destruktuira {data}
        dispatch({ type: GET, payload: data });//funkcija dispatcha akciju umjesto da je vrati, action je objekt koji ima type i payload pa ide dispatch({})
    } catch (err) {
        console.log(err);
    }
}

export const deleteQR = (id) => async (dispatch) => {
    try {
        await api.deleteQR(id);

        dispatch({ type: REMOVE, payload: id })
    } catch (err) {
        console.log(err);
    }
}

export const updateQR = (id, QR) => async (dispatch) => {
    try {
        const { data } = await api.updateQR(id, QR); // vraca upddated post
        dispatch({ type: UPDATE, payload: data });
    } catch (err) {
        console.log(err);
    }
}