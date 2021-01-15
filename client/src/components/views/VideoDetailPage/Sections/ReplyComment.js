import React, { useEffect, useState } from 'react'
import SingleComment from './SingleComment';

function ReplyComment({commentList, parentCommentId, refreshFunction, videoId}) {
    const [childCommentNumber, setChildCommentNumber] = useState(0);
    const [openReplyComment, setOpenReplyComment] = useState(false);
    useEffect(()=>{
        let commentNumber = 0;
        commentList.map((comment) => {
            if(comment.responseTo === parentCommentId) {
                commentNumber++;
            }
        })
        setChildCommentNumber(commentNumber);
    },[commentList])

    const renderReplyComment = (parentCommentId) => 
        commentList.map((comment, index) => (
            <React.Fragment>
                {comment.responseTo === parentCommentId &&
                    <div style={{ width: '80%', marginLeft: '40px' }}>
                        <SingleComment refreshFunction={refreshFunction} comment={comment} videoId={videoId} />
                        <ReplyComment refreshFunction={refreshFunction} parentCommentId={comment._id} commentList={commentList} videoId={videoId}/>
                    </div>
                }
            </React.Fragment>
        ))
    

    const handleChange = () => {
        setOpenReplyComment(!openReplyComment);
    }
    return (
        <div>
            {childCommentNumber > 0 &&
                <p style={{ fontSize: '14px', margin: 0, color: 'gray' }} onClick={handleChange}>
                    View {childCommentNumber} more comment(s)
                </p>
             }
             {openReplyComment && renderReplyComment(parentCommentId)}
        </div>
    )
}

export default ReplyComment
