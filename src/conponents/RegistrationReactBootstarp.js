import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification } from "firebase/auth";
import app from '../firebase/firebase.init';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Alert } from 'react-bootstrap';




const auth =getAuth(app)


const RegistrationReactBootstarp = () => {
    const [passwordError, setPasswordError] = useState('');
    const [submitSuccess, setSubmitSuccess] = useState(false)

    const handleSubmittedForm = event =>{
        event.preventDefault();
        setSubmitSuccess(false)
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password)
       
        if( !/(?=.*[A-Z])/.test(password)){
            setPasswordError('Please add atleast one upperchase');
            return;
        }
        if(!/(?=.*[0-9])/.test(password)){
            setPasswordError('Please atleast one number')
            return;
        }
        if(!/(?=.*[!@#$%^&*])/.test(password)){
            setPasswordError('Atleast one speacial character added')
            return;
        }
        setPasswordError('')

        createUserWithEmailAndPassword(auth, email, password)
        .then(result =>{
            const user = result.user;
            setSubmitSuccess(true)
            form.reset();
            console.log(user)
            emailVarification()
            updateUserProfile(name)
        })
        .catch(error =>{
            console.error('error', error)
           setPasswordError(error.message)
            
        })
    }

    const emailVarification = ()=>{
        sendEmailVerification(auth.currentUser)
        .then(() =>{
            Alert('send varification code in your email')
        })
    }

    const updateUserProfile = (name) =>{
        updateUserProfile(auth.currentUser, {
            displayName: name
        })
        .then( () =>{
            Alert('User name updated')
        })
        .catch(error =>{
            console.error(error)
        })
    }

    return (
        <div className='w-50 mx-auto'>
            <h2>Please Register </h2>
            <Form onSubmit={handleSubmittedForm}>
                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>Your Name</Form.Label>
                    <Form.Control type="text" name="name" placeholder="Enter Name" required/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" name="email" placeholder="Enter email" required/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="password" placeholder="Password" required />
                </Form.Group>
                <h3>{passwordError}</h3>
                {
                    submitSuccess && <h4>Created user Successfully</h4>
                }
                <Button variant="primary" type="submit">
                   Register
                </Button>
                <p><small>If you have already an account? Please go <Link to='/login'>Login</Link></small></p>
                
            </Form>
        </div>
    );
};

export default RegistrationReactBootstarp;