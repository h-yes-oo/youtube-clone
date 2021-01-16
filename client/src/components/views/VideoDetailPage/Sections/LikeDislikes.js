import React, { useEffect, useState } from 'react'
import { Tooltip, Icon } from 'antd';
import Axios from 'axios';

function LikeDislikes(props) {
    let variable = { }
    const[ likes, setLikes] = useState(0);
    const[ likeAction, setLikeAction ] = useState(false);
    const[ dislikes, setDislikes] = useState(0);
    const[ dislikeAction, setDislikeAction ] = useState(false);

    if(props.videoId) {
        variable = {videoId: props.videoId, userId: props.userId}
    } else {
        variable = {commentId: props.commentId, userId: props.userId}
    }

    useEffect(()=>{
        Axios.post('/api/like/getLikes', variable)
        .then(response => {
            if(response.data.success){
                setLikes(response.data.likes.length);
                response.data.likes.map(like => {
                    if(like.userId === props.userId) {
                        setLikeAction(true);
                    }
                })
            } else {
                alert('좋아요 가져오기 실패')
            }
        })

        Axios.post('/api/like/getDislikes', variable)
        .then(response => {
            if(response.data.success){
                setDislikes(response.data.likes.length);

                response.data.likes.map(like => {
                    if(like.userId === props.userId) {
                        setDislikeAction(true);
                    }
                })
            } else {
                alert('싫어요 가져오기 실패')
            }
        })
    },[])

    const onClickLike = () => {
        if(likeAction){
            Axios.post('/api/like/unlike', variable)
                .then(response => {
                    if(response.data.success){
                        setLikes(likes-1);
                        setLikeAction(false);
                    } else {
                        alert('좋아요 취소 실패')
                    }
                })

        } else {
            Axios.post('/api/like/uplike', variable)
                .then(response => {
                    if(response.data.success){
                        setLikes(likes+1);
                        setLikeAction(true);
                        if(dislikeAction){
                            setDislikeAction(false);
                            setDislikes(dislikes-1);
                        }
                    } else {
                        alert('좋아요 누르기 실패')
                    }
                })
        }
        
    };

    const onClickDislike = () => {
        if(dislikeAction){
            Axios.post('/api/like/undislike', variable)
                .then(response => {
                    if(response.data.success){
                        setDislikes(dislikes-1);
                        setDislikeAction(false);
                    } else {
                        alert('싫어요 취소 실패')
                    }
                })

        } else {
            Axios.post('/api/like/updislike', variable)
                .then(response => {
                    if(response.data.success){
                        setDislikes(dislikes+1);
                        setDislikeAction(true);
                        if(likeAction){
                            setLikeAction(false);
                            setLikes(likes-1);
                        }
                    } else {
                        alert('좋아요 누르기 실패')
                    }
                })
        }
    };

    return (
        <div>
            <span key="comment-basic-like">
                <Tooltip title="Like">
                    <Icon type="like"
                        theme={likeAction ? "filled" : 'outlined'}
                        onClick={onClickLike}
                    />
                </Tooltip>
                <span style={{ paddingLeft: '8px', cursor: 'auto' }}> {likes} </span>
            </span>
            <span key="comment-basic-dislike">
                <Tooltip title="Dislike">
                    <Icon type="dislike"
                        theme={dislikeAction ? "filled" : 'outlined'}
                        onClick={onClickDislike}
                    />
                </Tooltip>
                <span style={{ paddingLeft: '8px', cursor: 'auto'}}> {dislikes} </span>
            </span>
        </div>
    )
}

export default LikeDislikes
