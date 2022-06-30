import React, { useEffect, useRef, useState } from 'react';
import './style.css';
import axios from '../api/axios';
import { RegLink } from '../LinkStyles';

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]){8-30}$/;
const REG_URL = '/register';

function RegisterSection() {
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState('');
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);
  const [pwd, setPwd] = useState('');
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);
  const [matchPwd, setMatchPwd] = useState('');
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, [])

  useEffect(() => {
    const result = USER_REGEX.test(user);
    console.log(result);
    console.log(user);
    setValidName(result);
  }, [user])

  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    console.log(result);
    console.log(pwd);
    setValidPwd(pwd);
    const match = pwd === matchPwd;
    setValidMatch(match);
  }, [pwd, matchPwd])

  useEffect(() => {
    setErrMsg('');
  }, [user, pwd, matchPwd])

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(REG_URL,
        JSON.stringify({ user, pwd }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      );
      console.log(response.data);
      console.log(response.accessToken);
      setSuccess(true);
    } catch (err) {
      if (!err?.response) {
        setErrMsg('No Server Response');
      } else if (err.response?.status === 409) {
        setErrMsg('Username already taken.');
      } else if (err.response?.status === 500) {
        setErrMsg('500 -- Internal Server Error.');
      } else {
        setErrMsg('Registration Failed.');
      }
      errRef.current.focus();
    }
  }
  return (
    <>
      {success ? (
        <div className='reg-container'>
          <div className='sif-c'>
            <div className='reg-form'>
              <div className='reg-success'>
                <h1 className='r-h1'>Success!</h1>
                <p className='r-p'>
                  Go to home and <span><RegLink to='/'>Log In</RegLink></span>
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className='reg-container'>
          <div className='sif-c'>
            <div className='reg-form'>
              <form onSubmit={handleSubmit} className='rf-form'>
                <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                <h1>Register</h1>
                <div className='rf-inner-tb-wr'>
                  <label htmlFor='user'>Username: </label>
                  <input
                    type='text'
                    id="user"
                    autoComplete='off'
                    ref={userRef}
                    onChange={(e) => setUser(e.target.value)}
                    aria-invalid={validName ? "false" : "true"}
                    aria-describedby="uidnote"
                    onFocus={() => setUserFocus(true)}
                    onBlur={() => setUserFocus(false)}
                    required
                  />
                  <p id='uidnote' className={userFocus && user && !validName ? "instructions" : "offscreen"}>
                    4 to 24 characters.<br />
                    Must begin with a letter.<br />
                    Letters, numbers, underscores, hypens allowed.
                  </p>
                </div>
                <div className='rf-inner-tb-wr'>
                  <label htmlFor='pwd'>Password: </label>
                  <input
                    type='password'
                    id="pwd"
                    onChange={(e) => setPwd(e.target.value)}
                    aria-invalid={validPwd ? "false" : "true"}
                    aria-describedby="pwdnote"
                    onFocus={() => setPwdFocus(true)}
                    onBlur={() => setPwdFocus(false)}
                    required
                  />
                  <p id='pwdnote' className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                    8 to 30 characters.<br />
                    Must include upper/lowercase, number, and special character.<br />
                    Letters, numbers, underscores, hypens allowed.
                  </p>
                </div>
                <div className='rf-inner-tb-wr'>
                  <label htmlFor='confirm_pwd'>Confirm Password: </label>
                  <input
                    type='password'
                    id="confirm_pwd"
                    onChange={(e) => setMatchPwd(e.target.value)}
                    aria-invalid={validMatch ? "false" : "true"}
                    aria-describedby="matchnote"
                    onFocus={() => setMatchFocus(true)}
                    onBlur={() => setMatchFocus(false)}
                    required
                  />
                  <p id='matchnote' className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                    Passwords must match<br />
                  </p>
                </div>
                <button disabled={
                  !validName ||
                    !validPwd ||
                    !validMatch ? true : false
                }>Sign Up</button>
                <p className='r-p'>
                  Go to home and <span><RegLink to='/'>Log In</RegLink></span>
                </p>
              </form>
            </div>
          </div>
        </div>
      )
      }
    </>
  )
}

export default RegisterSection