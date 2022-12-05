import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { Alert } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import app from '../../firebase/firebase.init';



const auth = getAuth(app)



const Login = () => {
    const [loginSuccess, SetLoginSuccess] = useState(false)
    const [emailReset, setEmailReset] = useState('')

    const handleLogin = event =>{
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password)
        signInWithEmailAndPassword(auth, email, password)
        .then(result =>{
            const user = result.user;
            console.log(user)
            SetLoginSuccess(true);
        })
        .catch(error =>{
            console.error('error', error)
        })

    }
    const emailOnBlur = (event) =>{
        const email = event.target.value;
        setEmailReset(email)
        console.log(email)
    }

    const resetPassword = () =>{
        sendPasswordResetEmail(auth, emailReset)
        .then( ()=>{
            Alert('send a email in your email.')
        })
        .catch( error =>{
            console.error(error)
        })
    }
    
    return (
        <div className='w-50 mx-auto'>
            <h3>Please Login</h3>
            <Form onSubmit={handleLogin}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control onBlur={emailOnBlur} type="email" name='email' placeholder="Enter email" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name='password' placeholder="Password" />
                    </Form.Group>
                
                    <Button variant="primary" type="submit">
                        Login
                    </Button>
                    {loginSuccess && <p>Successfully login </p>}
                    <p><small>If you are a new user? go here <Link to='/register'>Register</Link></small></p>
                    <p>Forgot Password? <Button onClick={resetPassword} variant="link">Reset Password</Button></p>
                </Form>
        </div>
    );
};

export default Login;