import { combineReducers} from 'redux';
import posts from './posts';
import QRs from './QRs';
import auth from './auth'

export default combineReducers({
    posts: posts,
    QRs: QRs,
    auth: auth
});