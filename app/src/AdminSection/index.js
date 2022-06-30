import React from 'react';
import { Link } from 'react-router-dom';
import Articles from '../_datacontext/Articles';
import Users from '../_datacontext/Users';
import './style.css';

function AdminSection() {
    return (
        <>
            <div className='container'>
                <div className='header'>
                    <h1>Admin Page</h1>
                </div>
                <div className='content'>
                    <div className='admin-sub-content'>
                        <div className='admin-list-users'>
                            <Users />
                        </div>
                        <div className='admin-list-articles'>
                            <Articles />
                        </div>
                    </div>
                    <Link to='/'>Home</Link>
                </div>
            </div>
        </>
    )
}

export default AdminSection