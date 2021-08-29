import React, { useEffect, useState } from 'react';
import { CardActions, Button } from '@material-ui/core/';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import './styles.css';
import { useDispatch } from 'react-redux';
import { deletePost } from '../../../actions/posts';
import QRCode from 'qrcode';
import { useHistory} from "react-router-dom";


const Post = ({ post, setCurrentId,setIsEditing, setIsForm }) => {

    const dispatch = useDispatch();
    const [image, setImage] = useState('');
    const history = useHistory();
    let stringdata = JSON.stringify(post);


    useEffect(() => { //pozovemo f-ju,prvi arg, je callback funkcija,a drugi niz  --- kao mount i update
        const fetchQR = async () => {
            const response = await QRCode.toDataURL(stringdata);
            setImage(response);
        }
        fetchQR();
    }, [post]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className="card1">

            <div className="edit">
                <h4 className="title1">{post.title}</h4>
                <Button style={{ color: 'white' }} size="small" onClick={() => { history.push("/form"); setIsEditing(true); setCurrentId(post._id); setIsForm(false); }}><MoreHorizIcon fontSize="medium" /></Button>
            </div>

            <img className="post_photo" loading="lazy" src={image} alt="" />

            <div className="details">
                <h5>Bill for: {post.month_year}</h5>
                <h5>Payer: {post.payer_name}</h5>
                <h5>Amount: {post.amount} kn</h5>
            </div>

            <div className="bottom">
                <p>{post.date}</p>
                <CardActions>
                    <Button size="small" fontSize='10px' color="primary" onClick={() => dispatch(deletePost(post._id))}><DeleteIcon fontSize="small" /> Delete</Button>
                </CardActions>
            </div>
        </div>
    );
}

export default Post;