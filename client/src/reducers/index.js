import { combineReducers} from 'redux';
import posts from './posts';
import QRs from './QRs';

export default combineReducers({
    posts: posts,
    QRs: QRs
});