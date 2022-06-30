import React from 'react'
import { useNavigate } from 'react-router-dom'
import './style.css';
function Unauthorized() {
    const nav = useNavigate();

    const previousLink = () => nav(-1);
    return (
        <div className='un-container'>
            <h1>Unauthorized access.</h1>
            <p>You do not have access to this page.</p>
            <div>
                <button onClick={previousLink}>Go back</button>
            </div>
        </div>
    )
}

export default Unauthorized