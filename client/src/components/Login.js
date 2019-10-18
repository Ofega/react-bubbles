import React, { useState } from "react";
import axios from "axios";
import styled from 'styled-components';


const Login = props => {

    const initialFormState = { username: '', password: '' }
    const [ internalState, setInternalState ] = useState(initialFormState);

    
    //Handler Functions
    const handleChange = (e) => {
        setInternalState({
            ...internalState,
            [e.target.name]: e.target.value
        })
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();

        axios
            .post("http://localhost:5000/api/login", internalState)
            .then(res => { 
                localStorage.setItem('token', res.data.payload);
                props.history.push('/')
            })
            .catch(err => { 
                alert(err)
            }); 
    }

  return (
    <div className="login-page">
        <h1>Welcome to the Bubble App!</h1>

        <Form autoComplete="off">
            <div className="form-inputs">
                <label htmlFor="username">Username</label>
                <input type='text' onChange={handleChange} value={internalState.username} id="username" name='username' placeholder='Username' required/>
            </div>

            <div className="form-inputs">
                <label htmlFor="password">Password</label>
                <input type='password' onChange={handleChange} value={internalState.password} id="password" name='password' placeholder='Password' required/>
            </div>

            <button type='submit' onClick={handleFormSubmit}>
                Login
            </button>
        </Form>
    </div>
  );
};

export default Login;

const Form = styled.form`
    padding: 4rem 2rem;
    max-width: 500px;
    width: 100%;
    border-radius: 5px;
    box-shadow: 0 1px 3px 0 #d4d4d5, 0 0 0 1px #d4d4d5;
    background: white;

    @media (min-width : 768px) {
        padding: 4rem 3rem;
    }
    .form-inputs {
        display: flex;
        flex-direction: column;
        margin-bottom: 2.5rem;
        width: 100%;
        &:last-of-type {
            margin-bottom: 3rem;
        }
        label {
            font-size: 1.3rem;
            margin-bottom: .5rem;
            font-weight: 600;
            color: rgba(0,0,0,.4);
            text-align: justify;
        }
        input {
            outline: none;
            border: 1px solid #ddd;
            padding: 0 1rem;
            min-height: 40px;
            border-radius: 5px;
            font-size: 1.4rem;
            width: 100%;
            background: transparent;
            &:-webkit-autofill { 
                -webkit-box-shadow:200px 200px 100px white inset; 
                box-shadow:200px 200px 100px white inset; 
            }
            &:focus {
                border: 1px solid #419BA0;
            }
        }
        .error-msg {
            margin-top: .5rem;
            color: red;
        }
    }
    button {
        outline: 0;
        border: none;
        background: #419BA0 none;
        color: #fff;
        font-weight: 700;
        text-align: center;
        border-radius: 5px;
        box-shadow: 0 0 0 1px transparent inset, 0 0 0 0 rgba(34,36,38,.15) inset;
        user-select: none;
        transition: opacity .1s ease,background-color .1s ease,color .1s ease,box-shadow .1s ease,background .1s ease,-webkit-box-shadow .1s ease;
        -webkit-tap-highlight-color: transparent;
        padding: .5rem 2rem;
        min-height: 40px;
        width: 100%;
        max-width: 150px
        font-size: 1.5rem; 
        margin-top: 1rem;
        &:hover {
            background-color: #63ADB1;
            background-image: none;
            -webkit-box-shadow: 0 0 0 1px transparent inset, 0 0 0 0 rgba(34,36,38,.15) inset;
            box-shadow: 0 0 0 1px transparent inset, 0 0 0 0 rgba(34,36,38,.15) inset;
            color: rgba(255, 255, 255, .8);
        }
    }
`
