import React, { useRef, useState, useEffect } from 'react';
import axios from '../api/axios';
import useAuth from '../_hooks/useAuth';
import MapuaLogo from '../_imgsrc/mapua-logo.png';
import ScopusLogo from '../_imgsrc/scopus-logo.png';
import { RegLink } from '../LinkStyles';
import './style.css';
import { useLocation, useNavigate } from 'react-router-dom';

const LOGIN_URL = '/login';

function LoginSection() {
    const { setAuth } = useAuth();

    const nav = useNavigate();
    const loc = useLocation();
    const from = loc.state?.from?.pathname || '/';

    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ user, pwd }),
                {
                    headers: { 'Content-type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(JSON.stringify(response?.data));
            const accessToken = response?.data?.accessToken;
            const roles = response?.data?.roles;
            setAuth({ user, pwd, roles, accessToken });
            setUser('');
            setPwd('');
            nav(from, { replace: true });

        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Username does not exist');
            } else if (err.response?.status === 401) {
                setErrMsg('Password Invalid');
            } else if (err.response?.status === 404) {
                setErrMsg('Resource/Document not found.');
            } else {
                setErrMsg('Login Failed.');
            }
            errRef.current.focus();
        }
    }

    return (
        <>
            <div className="login-container">
                <div className='login-welcome'>
                    Mapua-Scopus Article Finder
                </div>
                <div className='img-container'>
                    <img src={MapuaLogo} alt='mapua-logo' width='170px' height='200px'></img>
                    <span><img src={ScopusLogo} alt='scopus-logo' width='300px' height='86px'></img></span>
                </div>
                <div className='lif-c'>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <div className='login-form'>
                        <form onSubmit={handleSubmit} className='lf-form'>
                            <div className='tb-wrapper'>
                                <input type='text' id="username" placeholder='Username' ref={userRef} onChange={(e) => setUser(e.target.value)} value={user} required />
                                <input type='password' id="password" placeholder='Password' ref={userRef} onChange={(e) => setPwd(e.target.value)} value={pwd} required />
                            </div>
                            <button type='submit'>Login</button>
                        </form>
                        <div className='reg-link'>
                            <span>No account yet? <RegLink to='/signup'>Register here.</RegLink></span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LoginSection