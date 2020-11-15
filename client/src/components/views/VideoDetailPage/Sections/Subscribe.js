import React, { useEffect, useState } from 'react';
import Axios from 'axios';

function Subscribe(props) {

    const [ subscribeNumber, setSubscribeNumber ] = useState(0);
    const [subscribed, setSubscribed] = useState(false);
    useEffect(() => {
        let variable = { userTo: props.userTo }
        Axios.post('/api/subscribe/subscribeNumber', variable)
            .then( response => {
                if(response.data.success) {
                    setSubscribeNumber(response.data.subscribeNumber);
                } else {
                    alert('구독자 수를 가져오지 못했습니다');
                }
            })
        
        let subscribeVariable = { userTo: props.userTo, userFrom: localStorage.getItem('userId')}
        
        Axios.post('/api/subscribe/subscribed', subscribeVariable)
        .then(response => {
            if(response.data.success){
                setSubscribed(response.data.subscribed);
            } else {
                alert('정보를 받아오지 못했습니다.')
            }
        })

    }, [])
    return (
        <div>
            <button
                style={{ 
                    backgroundColor: `${subscribed ? '#AAAAAA' : '#CC0000'}`, padding:'10px 16px',
                    color: 'white', borderRadius: '4px',
                    fontWeight: '500', fontSize: '1rem', textTransform: 'uppercase'
                }}
                onClick 

            >
                {subscribeNumber} {subscribed? 'Subscribed': 'Subscribe'}
            </button>
        </div>
    )
}

export default Subscribe
