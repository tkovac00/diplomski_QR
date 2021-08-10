import React from 'react';
import { CardActions, Button } from '@material-ui/core/';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import './styles.css';
import { useDispatch } from 'react-redux';
import { deletePost } from '../../../actions/posts';


const Post = ({ post, setCurrentId, setIsEditing }) => {

    const dispatch = useDispatch();
    
    return (
        <div className="card">

            <div className="edit">
                <h4 className="title">{post.title}</h4>
                <Button style={{ color: 'white' }} size="small" onClick={() => {setIsEditing(true);  setCurrentId(post._id)}}><MoreHorizIcon fontSize="medium" /></Button>
            </div>

            <img className="post_photo"  loading="lazy" src={post.selectedFile} alt="" />

            <div className="details">
                <p>{post.description}</p>
                <h5>Bill for: {post.month}</h5>
                <h5>Payer: {post.payer}</h5>
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