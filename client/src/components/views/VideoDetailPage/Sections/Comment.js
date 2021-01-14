import React, { useState } from 'react'
import Axios from 'axios'
import { useSelector } from 'react-redux';
import SingleComment from './SingleComment';

function Comment({refreshFunction, commentList, videoId}) {
    const user = useSelector(state => state.user);
    const [commentValue, setCommentValue] = useState("");
    const handleClick = (event) => {
        setCommentValue(event.currentTarget.value)
    }

    const onSubmit = (event) => {
        event.preventDefault();
        const variables = {
            content: commentValue,
            writer: user.userData._id,
            videoId: videoId,
        }
        Axios.post('/api/comment/saveComment', variables)
        .then(response => {
            if(response.data.success){
                refreshFunction(response.data.result);
                setCommentValue('');
            } else {

            }
        })
    }

    return (
        <div>
            <br />
            <p>Replies</p>
            <hr />

            {/* Comment Lists*/}

            {commentList && commentList.map((comment, index) => (!comment.responseTo && <SingleComment refreshFunction={refreshFunction} comment={comment} videoId={videoId} />))}


            <form style={{ display: 'flex' }} onSubmit={onSubmit} >
                <textarea
                    style={{ width: '100%', borderRadius: '5px' }}
                    onChange={handleClick}
                    value={commentValue}
                    placeholder="코멘트를 작성해 주세요"
                />
                <br />
                <button style={{ width: '20%', height: '52px' }} onClick={onSubmit}>Submit</button>
            </form>
        </div>
    )
}

export default Comment
