import React, { useEffect, useState } from 'react';
import { CardActions, Button } from '@material-ui/core/';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import './styles.css';
import { useDispatch } from 'react-redux';
import { deletePost } from '../../../actions/posts';
import QRCode from 'qrcode';
import CurrencyFormat from 'react-currency-format';
import { useHistory } from "react-router-dom";


const Post = ({ post, setCurrentId, setIsEditing, setIsForm }) => {

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

            <img className="post_photo" loading="lazy" src={image} alt="" />

            <div className="edit">
                <Button style={{ color: 'white' }} size="small" onClick={() => { history.push("/form"); setIsEditing(true); setCurrentId(post._id); setIsForm(false); }}><MoreHorizIcon fontSize="medium" /></Button>
            </div>

            <div className="title_details">
                {<h4 className="title1">{post.title}</h4>}
            </div>
            <div className="details">
                <h5>{post.payer_name.toUpperCase()}</h5>
                <h5 style={{ display: "inline-block", paddingLeft: "10px", paddingTop: "10px" }}><CurrencyFormat value={post.amount} displayType={'text'} thousandSeparator={true} /> kn</h5>
                <h5>{post.month_year}</h5>
            </div>

            <div className="bottom">
                <CardActions>
                    <h5>{post.date}</h5> <Button size="small" fontSize='10px' color="primary" onClick={() => dispatch(deletePost(post._id))}><DeleteIcon style={{ color: "#e5a00d" }} fontSize="medium" /></Button>
                </CardActions>
            </div>
        </div>
    );
}

export default Post;