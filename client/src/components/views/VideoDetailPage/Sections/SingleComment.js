import React, { useState } from 'react';
import { Comment, Avatar, Button, Input } from 'antd';
import Axios from 'axios';
import { useSelector } from 'react-redux';
import LikeDislikes from './LikeDislikes';

const { TextArea } = Input;

function SingleComment({refreshFunction, comment, videoId}) {
    const user = useSelector(state => state.user);
    const [openReply, setOpenReply] = useState(false);
    const [commentValue, setCommentValue] = useState('');
    const onClickReplyOpen = () => {
        setOpenReply(!openReply);
    }

    const handleChange = (event) => {
        setCommentValue(event.currentTarget.value);
    }

    const onSubmit = (event) => {
        event.preventDefault();
        const variables = {
            content: commentValue,
            writer: user.userData._id,
            videoId: videoId,
            responseTo: comment._id
        }
        Axios.post('/api/comment/saveComment', variables)
        .then(response => {
            if(response.data.success){
                setCommentValue('');
                setOpenReply(false);
                refreshFunction(response.data.result)
            } else {

            }
        })

    }

    const actions = [
        <LikeDislikes userId={localStorage.getItem('userId')} commentId={comment._id} />,
        <span onClick={onClickReplyOpen} key="comment-basic-reply-to">Reply to</span>
    ]
    return (
        <div>
            <Comment 
                actions={actions}
                author={comment.writer.name}
                avatar={<Avatar src={comment.writer.image} alt="userimage" />}
                content={<p>{comment.content}</p>}
            />
            { openReply &&
                <form style={{ display: 'flex', marginBottom: '5px' }} onSubmit={onSubmit} >
                    <textarea
                        style={{ width: '100%', borderRadius: '5px' }}
                        onChange={handleChange}
                        value={commentValue}
                        placeholder="코멘트를 작성해 주세요"
                    />
                    <br />
                    <button style={{ width: '20%', height: '52px' }} onClick={onSubmit}>Submit</button>
                </form>
            }
        </div>
    )
}

export default SingleComment
